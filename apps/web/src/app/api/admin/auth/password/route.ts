import { NextRequest, NextResponse } from "next/server";
import { requireApiAdmin } from "@/lib/api-auth";
import { ADMIN_COOKIE, changeAdminPassword, createSessionToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "admin-password-change", { limit: 5, windowMs: 10 * 60_000 });
  if (limited) return limited;

  const session = await requireApiAdmin(request);
  if (session instanceof NextResponse) return session;

  const body = (await request.json().catch(() => null)) as
    | { currentPassword?: string; nextPassword?: string; confirmPassword?: string }
    | null;

  if (!body?.currentPassword || !body.nextPassword || !body.confirmPassword) {
    return NextResponse.json({ error: "বর্তমান পাসওয়ার্ড, নতুন পাসওয়ার্ড ও confirmation দিতে হবে।" }, { status: 400 });
  }

  if (body.nextPassword !== body.confirmPassword) {
    return NextResponse.json({ error: "নতুন পাসওয়ার্ড ও confirmation মিলছে না।" }, { status: 400 });
  }

  const result = await changeAdminPassword(session.email, body.currentPassword, body.nextPassword);
  if ("error" in result) return NextResponse.json({ error: result.error }, { status: 400 });

  const response = NextResponse.json({
    admin: {
      id: result.admin.id,
      name: result.admin.name,
      email: result.admin.email,
      role: result.admin.role,
    },
  });

  response.cookies.set(ADMIN_COOKIE, createSessionToken(result.admin), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
