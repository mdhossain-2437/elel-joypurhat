import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpenCheck, LockKeyhole } from "lucide-react";

export const metadata = {
  title: "ফলাফল দেখুন",
  description: "ভর্তি পরীক্ষার ফলাফল ও মাসিক পরীক্ষার ফলাফল দেখার নিরাপদ পোর্টাল।",
};

const resultOptions = [
  {
    title: "ভর্তি পরীক্ষার ফলাফল",
    text: "অ্যাডমিট কার্ডের রোল নম্বর, ব্যাচ ও রেজিস্টার্ড ফোন নম্বর দিয়ে নিজের ফলাফল দেখুন।",
    href: "/results/admission",
    icon: BadgeCheck,
  },
  {
    title: "মাসিক পরীক্ষার ফলাফল",
    text: "ব্যাচ, ল্যাব ও ফোন নম্বর দিয়ে ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল দেখুন।",
    href: "/results/monthly",
    icon: BookOpenCheck,
  },
];

export default function ResultsPage() {
  return (
    <main className="site-shell">
      <section className="results-hub-hero">
        <div className="site-container results-hub-head">
          <p className="kicker-light">ফলাফল পোর্টাল</p>
          <h1 className="hero-heading mt-5 max-w-5xl">নিজের <span className="accent">ফলাফল</span> দেখার জন্য সঠিক বিভাগ বেছে নিন।</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">
            এখানে কোনো পাবলিক মেরিট তালিকা দেখানো হয় না। রোল, ফোন, ব্যাচ বা ল্যাবের তথ্য মিললে শুধু নিজের ফলাফল দেখা যাবে।
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container results-option-grid">
          {resultOptions.map(({ title, text, href, icon: Icon }) => (
            <Link key={href} href={href} className="results-option-card">
              <Icon size={28} />
              <span>নিরাপদ যাচাই</span>
              <h2>{title}</h2>
              <p>{text}</p>
              <strong>
                খুলুন
                <ArrowRight size={17} />
              </strong>
            </Link>
          ))}
        </div>
        <div className="site-container result-privacy-note">
          <LockKeyhole size={18} />
          ভুল তথ্য দিলে কোনো ফলাফল দেখাবে না। অস্বাভাবিক request হলে সিস্টেম সাময়িকভাবে access block করবে।
        </div>
      </section>
    </main>
  );
}
