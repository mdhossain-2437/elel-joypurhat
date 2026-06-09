import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { updateSettings } from "@/lib/cms-store";
import type { SiteSettings } from "@/lib/cms-types";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN"] as const;

export async function POST(request: NextRequest) {
  const session = await requireApiAdmin(request, [...contentRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as Partial<SiteSettings> | null;
  if (!body?.siteName || !body?.seoTitle) {
    return NextResponse.json({ error: "সাইটের নাম ও সার্চ শিরোনাম দিতে হবে।" }, { status: 400 });
  }

  const settings = await updateSettings(body, session.email);
  return NextResponse.json({ settings });
}
