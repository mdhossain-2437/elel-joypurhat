import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { upsertMediaAsset } from "@/lib/cms-store";
import type { MediaAssetEntry } from "@/lib/cms-types";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

export async function POST(request: NextRequest) {
  const session = requireApiAdmin(request, [...contentRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as Partial<MediaAssetEntry> | null;
  if (!body?.title || !body?.url) {
    return NextResponse.json({ error: "মিডিয়ার শিরোনাম ও লিংক দিতে হবে।" }, { status: 400 });
  }

  const asset = await upsertMediaAsset(body, session.email);
  return NextResponse.json({ asset });
}
