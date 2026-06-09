import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE, readSessionToken, type AdminSession } from "@/lib/auth";
import type { AdminRole } from "@/lib/cms-types";

export function getSessionFromRequest(request: NextRequest) {
  return readSessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

export function unauthorized() {
  return NextResponse.json({ error: "অনুমতি নেই। আগে লগইন করুন।" }, { status: 401 });
}

export function forbidden() {
  return NextResponse.json({ error: "এই কাজ করার অনুমতি আপনার নেই।" }, { status: 403 });
}

export function requireApiAdmin(request: NextRequest, roles?: AdminRole[]): AdminSession | NextResponse {
  const session = getSessionFromRequest(request);
  if (!session) return unauthorized();
  if (roles && !roles.includes(session.role)) return forbidden();
  return session;
}
