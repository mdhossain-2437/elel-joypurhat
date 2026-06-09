import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, authenticateAdmin, createSessionToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  const limited = rateLimit(request, "admin-login", { limit: 8, windowMs: 60_000, blockMs: 3 * 60_000 });
  if (limited) return limited;

  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  if (!body?.email || !body.password) {
    return NextResponse.json({ error: "ইমেইল ও পাসওয়ার্ড দিতে হবে।" }, { status: 400 });
  }

  const admin = await authenticateAdmin(body.email, body.password);
  if (!admin) {
    return NextResponse.json({ error: "লগইন তথ্য সঠিক নয়।" }, { status: 401 });
  }

  const response = NextResponse.json({
    admin: {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });

  response.cookies.set(ADMIN_COOKIE, createSessionToken(admin), {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  return response;
}
