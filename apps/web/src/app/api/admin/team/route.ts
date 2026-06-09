import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { upsertTeamMember } from "@/lib/cms-store";
import type { TeamMemberEntry } from "@/lib/cms-types";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

export async function POST(request: NextRequest) {
  const session = requireApiAdmin(request, [...contentRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as Partial<TeamMemberEntry> | null;
  if (!body?.name || !body?.role || !body?.image) {
    return NextResponse.json({ error: "নাম, পদবি ও ছবির পথ দিতে হবে।" }, { status: 400 });
  }

  const member = await upsertTeamMember(body, session.email);
  return NextResponse.json({ member });
}
