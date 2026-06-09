import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { readCmsStore, sanitizeCmsStore, writeCmsStore } from "@/lib/cms-store";
import type { AdmissionResultEntry, MonthlyResultEntry } from "@/lib/cms-types";

const resultRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "RESULT_MANAGER"] as const;

function parseDelimited(content: string) {
  const delimiter = content.includes("\t") ? "\t" : ",";
  const rows: string[][] = [];
  let current = "";
  let row: string[] = [];
  let quoted = false;

  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    const next = content[index + 1];

    if (char === '"' && quoted && next === '"') {
      current += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === delimiter && !quoted) {
      row.push(current.trim());
      current = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(current.trim());
      if (row.some(Boolean)) rows.push(row);
      current = "";
      row = [];
      continue;
    }

    current += char;
  }

  row.push(current.trim());
  if (row.some(Boolean)) rows.push(row);

  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.trim().toLowerCase());
  return rows.slice(1).map((values) =>
    Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() || ""])),
  );
}

function asBool(value: string | boolean | undefined, fallback = true) {
  if (typeof value === "boolean") return value;
  if (!value) return fallback;
  return !["false", "0", "না", "no", "draft"].includes(value.toString().trim().toLowerCase());
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || Date.now().toString(36);
}

function normalizeAdmissionStatus(value?: string): AdmissionResultEntry["status"] {
  const normalized = (value || "").trim().toLowerCase();
  if (["selected", "নির্বাচিত", "pass", "passed", "পাস"].includes(normalized)) return "Selected";
  if (["not selected", "rejected", "failed", "fail", "নির্বাচিত নয়", "নির্বাচিত নয়", "ফেল"].includes(normalized)) {
    return "Not Selected";
  }
  return "Waiting";
}

export async function GET(request: NextRequest) {
  const session = requireApiAdmin(request, [...resultRoles]);
  if (session instanceof NextResponse) return session;

  const store = await readCmsStore();

  return NextResponse.json({
    endpoint: "/api/admin/results/import",
    status: "সুরক্ষিত ফলাফল আপলোড ব্যবস্থা",
    acceptedFormats: ["csv", "tsv"],
    admin: session.email,
    currentDatabase: {
      admissionRows: store.admissionResults.length,
      monthlyRows: store.monthlyResults.length,
      auditLogs: store.auditLogs.length,
    },
    securityModel: [
      "অ্যাডমিন লগইন বাধ্যতামূলক",
      "ভূমিকাভিত্তিক অনুমতি যাচাই",
      "প্রকাশের আগে সারি যাচাই",
      "আপলোড, যাচাই, প্রকাশ ও প্রয়োজনীয় পরিবর্তনের অডিট লগ",
    ],
    meritRule: "একই মোট নম্বর হলে একই মেধাক্রম থাকবে। ডিফল্ট ক্রম: ১, ১, ৩।",
    storePreview: sanitizeCmsStore(store),
  });
}

export async function POST(request: NextRequest) {
  const session = requireApiAdmin(request, [...resultRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as
    | { kind?: "admission" | "monthly"; content?: string; published?: boolean }
    | null;

  if (!body?.kind || !body.content?.trim()) {
    return NextResponse.json({ error: "ফলাফলের ধরন ও CSV/TSV ডেটা দিতে হবে।" }, { status: 400 });
  }

  const rows = parseDelimited(body.content);
  if (!rows.length) {
    return NextResponse.json({ error: "কমপক্ষে একটি হেডার ও একটি ফলাফলের সারি থাকতে হবে।" }, { status: 400 });
  }

  const store = await readCmsStore();
  const timestamp = new Date().toISOString();

  if (body.kind === "admission") {
    const imported: AdmissionResultEntry[] = rows.map((row) => {
      const roll = row.roll || row["রোল"] || row["roll number"];
      return {
        id: `admission-${slug(roll)}`,
        roll,
        phone: row.phone || row["ফোন"] || row.mobile || "",
        name: row.name || row["নাম"] || "নামহীন প্রার্থী",
        written: Number(row.written || row["লিখিত"] || 0),
        viva: Number(row.viva || row["মৌখিক"] || 0),
        status: normalizeAdmissionStatus(row.status || row["অবস্থা"]),
        published: asBool(row.published, body.published ?? true),
        batch: row.batch || row["ব্যাচ"] || "৭ম ব্যাচ",
        updatedAt: timestamp,
      };
    }).filter((row) => row.roll && row.phone);

    for (const row of imported) {
      const index = store.admissionResults.findIndex((entry) => entry.id === row.id || entry.roll === row.roll);
      if (index >= 0) store.admissionResults[index] = row;
      else store.admissionResults.unshift(row);
    }

    store.auditLogs.unshift({
      id: `audit-${Date.now().toString(36)}`,
      actor: session.email,
      action: "IMPORT_ADMISSION_RESULTS",
      target: "admission-results",
      createdAt: timestamp,
      meta: `${imported.length}টি ভর্তি ফলাফল`,
    });

    await writeCmsStore(store);
    return NextResponse.json({ imported: imported.length });
  }

  const imported: MonthlyResultEntry[] = rows.map((row) => {
    const phone = row.phone || row["ফোন"] || row.mobile || "";
    const month = row.month || row["মাস"] || "জুন ২০২৬";
    const subject = row.subject || row["বিষয়"] || "ক্লাস টেস্ট";
    return {
      id: `monthly-${phone.replace(/\D/g, "")}-${slug(month)}-${slug(subject)}`,
      phone,
      name: row.name || row["নাম"] || "নামহীন শিক্ষার্থী",
      batch: row.batch || row["ব্যাচ"] || "৬ষ্ঠ ব্যাচ",
      month,
      subject,
      score: Number(row.score || row["নম্বর"] || 0),
      maxScore: Number(row.maxscore || row.maxScore || row["পূর্ণমান"] || 100),
      grade: row.grade || row["গ্রেড"] || "প্রযোজ্য নয়",
      published: asBool(row.published, body.published ?? true),
      updatedAt: timestamp,
    };
  }).filter((row) => row.phone && row.subject);

  for (const row of imported) {
    const index = store.monthlyResults.findIndex((entry) => entry.id === row.id);
    if (index >= 0) store.monthlyResults[index] = row;
    else store.monthlyResults.unshift(row);
  }

  store.auditLogs.unshift({
    id: `audit-${Date.now().toString(36)}`,
    actor: session.email,
    action: "IMPORT_MONTHLY_RESULTS",
    target: "monthly-results",
    createdAt: timestamp,
    meta: `${imported.length}টি মাসিক ফলাফল`,
  });

  await writeCmsStore(store);
  return NextResponse.json({ imported: imported.length });
}
