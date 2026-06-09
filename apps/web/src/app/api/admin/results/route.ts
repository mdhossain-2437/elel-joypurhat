import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { upsertAdmissionResult, upsertMonthlyResult } from "@/lib/cms-store";
import type { AdmissionResultEntry, MonthlyResultEntry } from "@/lib/cms-types";

const resultRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "RESULT_MANAGER"] as const;

export async function POST(request: NextRequest) {
  const session = await requireApiAdmin(request, [...resultRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as
    | ({ kind?: "admission"; result?: Partial<AdmissionResultEntry> })
    | ({ kind?: "monthly"; result?: Partial<MonthlyResultEntry> })
    | null;

  if (!body?.kind || !body.result) {
    return NextResponse.json({ error: "ফলাফলের ধরন ও তথ্য দিতে হবে।" }, { status: 400 });
  }

  if (body.kind === "admission") {
    const result = await upsertAdmissionResult(body.result as Partial<AdmissionResultEntry>, session.email);
    return NextResponse.json({ result });
  }

  if (body.kind === "monthly") {
    const result = await upsertMonthlyResult(body.result as Partial<MonthlyResultEntry>, session.email);
    return NextResponse.json({ result });
  }

  return NextResponse.json({ error: "এই ধরনের ফলাফল গ্রহণ করা যায়নি।" }, { status: 400 });
}
