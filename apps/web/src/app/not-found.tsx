import Link from "next/link";
import { ArrowUpRight, Home } from "lucide-react";

export const metadata = {
  title: "পেজ পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <main className="v2">
      <section className="v2-page-hero" style={{ minHeight: "70vh", display: "flex", alignItems: "center" }}>
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <span className="v2-eyebrow">Error 404</span>
          <h1 className="v2-display font-display" style={{ marginTop: 18 }}>
            পেজটি <span className="v2-ink-accent">পাওয়া যায়নি।</span>
          </h1>
          <p className="v2-lead" style={{ marginTop: 18 }}>
            লিংকটি বদলে যেতে পারে অথবা ভুল ঠিকানা দেওয়া হতে পারে। নিচের লিংক থেকে প্রয়োজনীয় পেজে যেতে পারেন।
          </p>
          <div className="v2-hero-cta" style={{ marginTop: 28 }}>
            <Link className="v2-btn v2-btn-primary" href="/">
              <Home size={18} />
              হোমে যান
            </Link>
            <Link className="v2-btn v2-btn-ghost" href="/courses">
              কোর্স দেখুন
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
