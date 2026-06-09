import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import {
  archiveCmsEntry,
  deleteCmsEntry,
  publishCmsEntry,
  type CmsActionCollection,
} from "@/lib/cms-store";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"] as const;
const resultRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "RESULT_MANAGER"] as const;
const collections: CmsActionCollection[] = [
  "notices",
  "courses",
  "teamMembers",
  "successStories",
  "mediaAssets",
  "admissionResults",
  "monthlyResults",
];

function isResultCollection(collection: CmsActionCollection) {
  return collection === "admissionResults" || collection === "monthlyResults";
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { collection?: CmsActionCollection; id?: string; action?: "publish" | "archive" | "delete" }
    | null;

  if (!body?.collection || !collections.includes(body.collection) || !body.id || !body.action) {
    return NextResponse.json({ error: "কোন কনটেন্টে কী কাজ করবেন তা পরিষ্কারভাবে দিতে হবে।" }, { status: 400 });
  }

  const session = await requireApiAdmin(request, [...(isResultCollection(body.collection) ? resultRoles : contentRoles)]);
  if (session instanceof NextResponse) return session;

  if (body.action === "publish") {
    const result = await publishCmsEntry(body.collection, body.id, session.email);
    return NextResponse.json({ result });
  }

  if (body.action === "archive") {
    const result = await archiveCmsEntry(body.collection, body.id, session.email);
    return NextResponse.json({ result });
  }

  const result = await deleteCmsEntry(body.collection, body.id, session.email);
  return NextResponse.json({ result });
}
