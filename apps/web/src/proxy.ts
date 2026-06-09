import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "elel_admin_session";
const proxyBuckets = new Map<string, { count: number; resetAt: number; blockedUntil?: number }>();

function withSecurityHeaders(response: NextResponse) {
  const isDev = process.env.NODE_ENV !== "production";
  const scriptSrc = isDev ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";

  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=()");
  response.headers.set(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      `script-src ${scriptSrc}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  );

  return response;
}

function clientIp(request: NextRequest) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "local";
}

function proxyRateGuard(request: NextRequest, scope: string, limit: number, windowMs: number, blockMs: number) {
  const now = Date.now();
  const key = `${scope}:${clientIp(request)}`;
  const current = proxyBuckets.get(key);

  if (current?.blockedUntil && current.blockedUntil > now) {
    return NextResponse.json(
      { error: "অস্বাভাবিক অনুরোধের কারণে সাময়িকভাবে access বন্ধ আছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।" },
      { status: 429, headers: { "Retry-After": String(Math.ceil((current.blockedUntil - now) / 1000)) } },
    );
  }

  if (!current || current.resetAt < now) {
    proxyBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= limit) return null;
  current.blockedUntil = now + blockMs;
  current.resetAt = current.blockedUntil;

  return NextResponse.json(
    { error: "অনেকবার অনুরোধ করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।" },
    { status: 429, headers: { "Retry-After": String(Math.ceil(blockMs / 1000)) } },
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAdminCookie = request.cookies.has(ADMIN_COOKIE);
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isPublicAdminAuthApi =
    pathname.startsWith("/api/admin/auth/login") || pathname.startsWith("/api/admin/auth/recovery");
  const isProtectedAdminApi = pathname.startsWith("/api/admin") && !isPublicAdminAuthApi;
  const proxyLimited = pathname.startsWith("/api/admin")
    ? proxyRateGuard(request, "admin-surface", 80, 3 * 60_000, 30 * 60_000)
    : pathname.startsWith("/api/")
      ? proxyRateGuard(request, "public-api", 140, 3 * 60_000, 3 * 60_000)
      : null;

  if (proxyLimited) return withSecurityHeaders(proxyLimited);

  if (isAdminPage && !hasAdminCookie) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return withSecurityHeaders(NextResponse.redirect(loginUrl));
  }

  if (isProtectedAdminApi && !hasAdminCookie) {
    return withSecurityHeaders(NextResponse.json({ error: "অনুমতি নেই। আগে লগইন করুন।" }, { status: 401 }));
  }

  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|media|.*\\..*).*)"],
};
