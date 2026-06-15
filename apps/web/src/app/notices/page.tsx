import Link from "next/link";
import { ArrowUpRight, Bell, CalendarDays, FileText } from "lucide-react";
import { admissionNotice } from "@/lib/content";
import { getPublishedNotices } from "@/lib/cms-store";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "নোটিশ",
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await getPublishedNotices();

  return (
    <main className="v2">
      <section className="v2-page-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <Reveal>
            <span className="v2-eyebrow">অফিসিয়াল নোটিশ</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display font-display">
              ভর্তি, পরীক্ষা ও <span className="v2-ink-accent">ফলাফলের আপডেট।</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="v2-lead">
              জয়পুরহাট ব্রাঞ্চের চলমান নোটিশগুলো এখানে প্রকাশ করা হয়। ভর্তি, পরীক্ষা, ফলাফল, নতুন কোর্স ঘোষণা
              বা প্রকল্প আপডেট—সব গুরুত্বপূর্ণ তথ্য এই পেজে পাওয়া যাবে।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-card-grid cols-2">
            {notices.map((notice, index) => (
              <Reveal key={notice.id} delay={index * 70} y={30}>
                <Link href={notice.href} className="v2-course">
                  <Bell className="ic" size={28} />
                  <span className="tag">{notice.date}</span>
                  <h3>{notice.title}</h3>
                  <p>{notice.detail}</p>
                  <span className="foot">
                    বিস্তারিত দেখুন
                    <ArrowUpRight size={16} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-dark grain tight">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <Reveal>
            <span className="v2-eyebrow on-dark">গুরুত্বপূর্ণ তারিখ</span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="v2-h2 font-display" style={{ marginTop: 18, marginBottom: 40 }}>
              ৭ম ব্যাচের <span className="v2-ink-accent">সময়সূচি।</span>
            </h2>
          </Reveal>
          <div className="v2-card-grid cols-3">
            {[
              [CalendarDays, "আবেদনের শেষ সময়", admissionNotice.deadline],
              [FileText, "লিখিত পরীক্ষা", admissionNotice.writtenExam],
              [FileText, "চূড়ান্ত ফলাফল", admissionNotice.finalResult],
            ].map(([Icon, title, value], index) => (
              <Reveal key={title as string} delay={index * 80} y={26}>
                <div className="v2-tile is-ink" style={{ minHeight: 0 }}>
                  <span className="v2-tile-icon">
                    <Icon size={22} />
                  </span>
                  <h3>{title as string}</h3>
                  <p>{value as string}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
