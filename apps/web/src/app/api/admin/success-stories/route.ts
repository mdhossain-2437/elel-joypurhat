import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { upsertSuccessStory } from "@/lib/cms-store";
import type { SuccessStoryEntry } from "@/lib/cms-types";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

export async function POST(request: NextRequest) {
  const session = await requireApiAdmin(request, [...contentRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as Partial<SuccessStoryEntry> | null;
  if (!body?.name || !body.title || !body.excerpt) {
    return NextResponse.json({ error: "শিক্ষার্থীর নাম, শিরোনাম ও সংক্ষিপ্ত গল্প দিতে হবে।" }, { status: 400 });
  }

  const story = await upsertSuccessStory(body, session.email);
  return NextResponse.json({ story });
}
