"use client";

import Link from "next/link";
import { RefreshCcw } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="site-shell">
      <section className="section-light">
        <div className="site-container">
          <div className="not-found-panel">
            <p className="kicker-light">কিছু সমস্যা হয়েছে</p>
            <h1 className="section-heading mt-4">পেজটি লোড করা যায়নি।</h1>
            <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600">
              সংযোগ অথবা সার্ভারের সাময়িক সমস্যার কারণে এই অংশটি দেখানো যাচ্ছে না। আবার চেষ্টা করুন, অথবা হোম পেজে ফিরে যান।
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <button className="btn-orange" type="button" onClick={reset}>
                <RefreshCcw size={18} />
                আবার চেষ্টা করুন
              </button>
              <Link className="button-soft" href="/">
                হোম পেজে যান
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
