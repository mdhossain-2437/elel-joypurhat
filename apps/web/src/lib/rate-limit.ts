import "server-only";

import { NextRequest, NextResponse } from "next/server";

type Bucket = {
  count: number;
  resetAt: number;
  blockedUntil?: number;
};

const buckets = new Map<string, Bucket>();

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

function clientKey(request: NextRequest, scope: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip");
  return `${scope}:${forwardedFor || realIp || "local"}`;
}

export function rateLimit(
  request: NextRequest,
  scope: string,
  { limit, windowMs, blockMs = windowMs }: { limit: number; windowMs: number; blockMs?: number },
) {
  const key = clientKey(request, scope);
  const now = Date.now();
  cleanupExpiredBuckets(now);
  const current = buckets.get(key);

  if (current?.blockedUntil && current.blockedUntil > now) {
    const retryAfter = Math.max(1, Math.ceil((current.blockedUntil - now) / 1000));
    return NextResponse.json(
      { error: "অস্বাভাবিকভাবে অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।" },
      {
        status: 429,
        headers: {
          "Retry-After": String(retryAfter),
        },
      },
    );
  }

  if (!current || current.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return null;
  }

  current.count += 1;
  if (current.count <= limit) return null;

  current.blockedUntil = now + blockMs;
  current.resetAt = Math.max(current.resetAt, current.blockedUntil);
  const retryAfter = Math.max(1, Math.ceil((current.blockedUntil - now) / 1000));
  return NextResponse.json(
    { error: "অনেকবার চেষ্টা করা হয়েছে। কিছুক্ষণ পরে আবার চেষ্টা করুন।" },
    {
      status: 429,
      headers: {
        "Retry-After": String(retryAfter),
      },
    },
  );
}
