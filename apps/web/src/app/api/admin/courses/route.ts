import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { upsertCourse } from "@/lib/cms-store";
import type { CourseEntry } from "@/lib/cms-types";

const contentRoles = ["OWNER", "SUPER_ADMIN", "ADMIN", "EDITOR"] as const;

export async function POST(request: NextRequest) {
  const session = requireApiAdmin(request, [...contentRoles]);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as Partial<CourseEntry> | null;
  if (!body?.title) return NextResponse.json({ error: "কোর্সের শিরোনাম দিতে হবে।" }, { status: 400 });

  const course = await upsertCourse(body, session.email);
  return NextResponse.json({ course });
}
