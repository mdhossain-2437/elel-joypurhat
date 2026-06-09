import { NextRequest, NextResponse } from "next/server";

const ADMIN_COOKIE = "elel_admin_session";

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
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  );

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAdminCookie = request.cookies.has(ADMIN_COOKIE);
  const isAdminPage = pathname.startsWith("/admin") && pathname !== "/admin/login";
  const isProtectedAdminApi = pathname.startsWith("/api/admin") && !pathname.startsWith("/api/admin/auth/login");

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
