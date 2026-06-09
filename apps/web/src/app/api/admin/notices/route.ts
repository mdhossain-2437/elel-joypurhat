import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { upsertNotice } from "@/lib/cms-store";
import type { NoticeEntry } from "@/lib/cms-types";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

export async function POST(request: NextRequest) {
  const session = await requireApiAdmin(request, [...contentRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as Partial<NoticeEntry> | null;
  if (!body?.title) return NextResponse.json({ error: "নোটিশের শিরোনাম দিতে হবে।" }, { status: 400 });

  const notice = await upsertNotice(body, session.email);
  return NextResponse.json({ notice });
}
