import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BookOpenCheck, LockKeyhole } from "lucide-react";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "ফলাফল দেখুন",
  description: "ভর্তি পরীক্ষার ফলাফল ও মাসিক পরীক্ষার ফলাফল দেখার নিরাপদ পোর্টাল।",
};

const resultOptions = [
  {
    title: "ভর্তি পরীক্ষার ফলাফল",
    text: "অ্যাডমিট কার্ডের রোল নম্বর, ব্যাচ ও রেজিস্টার্ড ফোন নম্বর দিয়ে নিজের ফলাফল দেখুন।",
    href: "/results/admission",
    icon: BadgeCheck,
    query: "রোল + ফোন",
  },
  {
    title: "মাসিক পরীক্ষার ফলাফল",
    text: "ব্যাচ, ল্যাব ও ফোন নম্বর দিয়ে ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল দেখুন।",
    href: "/results/monthly",
    icon: BookOpenCheck,
    query: "শুধু ফোন",
  },
];

export default function ResultsPage() {
  return (
    <main className="v2">
      <section className="v2-page-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <Reveal>
            <span className="v2-eyebrow">ফলাফল পোর্টাল</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display font-display">
              নিজের ফলাফল দেখুন, <span className="v2-ink-accent">নিরাপদে।</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="v2-lead">
              এখানে কোনো পাবলিক মেরিট তালিকা দেখানো হয় না। রোল, ফোন, ব্যাচ বা ল্যাবের তথ্য মিললে শুধু নিজের
              ফলাফল দেখা যাবে।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-portal">
            {resultOptions.map(({ title, text, href, icon: Icon, query }, index) => (
              <Reveal key={href} delay={index * 100} y={32}>
                <Link href={href} className={`v2-portal-card ${index === 1 ? "green" : ""}`}>
                  <Icon className="ic" size={32} />
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                  <span className="go">
                    {query} <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <div className="v2-note">
              <LockKeyhole size={18} />
              ভুল তথ্য দিলে কোনো ফলাফল দেখাবে না। অস্বাভাবিক request হলে সিস্টেম সাময়িকভাবে access block করবে।
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
