import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";

export const metadata = {
  title: "পেজ পাওয়া যায়নি",
};

export default function NotFound() {
  return (
    <main className="site-shell">
      <section className="section-light">
        <div className="site-container">
          <p className="kicker-light">পেজ পাওয়া যায়নি</p>
          <h1 className="hero-heading mt-5 max-w-4xl">আপনি যে পেজটি খুঁজছেন সেটি এখানে নেই।</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
            লিংকটি বদলে যেতে পারে অথবা ভুল ঠিকানা দেওয়া হতে পারে। নিচের লিংক থেকে প্রয়োজনীয় পেজে যেতে পারেন।
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-orange" href="/">
              <Home size={18} />
              হোমে যান
            </Link>
            <Link className="btn-black" href="/courses">
              কোর্স দেখুন
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
