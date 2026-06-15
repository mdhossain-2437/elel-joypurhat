"use client";

import Link from "next/link";
import { RefreshCcw } from "lucide-react";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="v2">
      <section className="v2-page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <span className="v2-eyebrow">কিছু সমস্যা হয়েছে</span>
          <h1 className="v2-h2 font-display" style={{ marginTop: 18 }}>
            পেজটি <span className="v2-ink-accent">লোড করা যায়নি।</span>
          </h1>
          <p className="v2-lead" style={{ marginTop: 18, maxWidth: "46ch" }}>
            সংযোগ অথবা সার্ভারের সাময়িক সমস্যার কারণে এই অংশটি দেখানো যাচ্ছে না। আবার চেষ্টা করুন, অথবা হোম
            পেজে ফিরে যান।
          </p>
          <div className="v2-hero-cta" style={{ marginTop: 28 }}>
            <button className="v2-btn v2-btn-primary" type="button" onClick={reset}>
              <RefreshCcw size={18} />
              আবার চেষ্টা করুন
            </button>
            <Link className="v2-btn v2-btn-ghost" href="/">
              হোম পেজে যান
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
