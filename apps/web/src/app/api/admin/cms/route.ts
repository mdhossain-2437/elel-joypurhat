import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { readCmsStore, sanitizeCmsStore } from "@/lib/cms-store";

export async function GET(request: NextRequest) {
  const session = await requireApiAdmin(request);
  if (session instanceof NextResponse) return session;

  const store = await readCmsStore();
  return NextResponse.json({
    admin: session,
    store: sanitizeCmsStore(store),
  });
}
