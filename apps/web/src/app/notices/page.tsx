import Link from "next/link";
import { ArrowRight, Bell, CalendarDays, FileText } from "lucide-react";
import { admissionNotice } from "@/lib/content";
import { getPublishedNotices } from "@/lib/cms-store";

export const metadata = {
  title: "নোটিশ",
};

export const dynamic = "force-dynamic";

export default async function NoticesPage() {
  const notices = await getPublishedNotices();

  return (
    <main className="site-shell">
      <section className="section-light">
        <div className="site-container">
          <p className="kicker-light">অফিসিয়াল নোটিশ</p>
          <h1 className="hero-heading mt-5 max-w-5xl">ভর্তি, পরীক্ষা ও ফলাফলের গুরুত্বপূর্ণ আপডেট।</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">
            জয়পুরহাট ব্রাঞ্চের চলমান নোটিশগুলো এখানে প্রকাশ করা হয়। ভর্তি, পরীক্ষা, ফলাফল, নতুন কোর্স ঘোষণা বা প্রকল্প আপডেট—সব গুরুত্বপূর্ণ তথ্য এই পেজে পাওয়া যাবে।
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {notices.map((notice) => (
              <Link key={notice.id} href={notice.href} className="notice-card">
                <Bell size={24} />
                <span>{notice.date}</span>
                <h2>{notice.title}</h2>
                <p>{notice.detail}</p>
                <strong>
                  বিস্তারিত দেখুন
                  <ArrowRight size={16} />
                </strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container grid gap-6 md:grid-cols-3">
          {[
            [CalendarDays, "আবেদনের শেষ সময়", admissionNotice.deadline],
            [FileText, "লিখিত পরীক্ষা", admissionNotice.writtenExam],
            [FileText, "চূড়ান্ত ফলাফল", admissionNotice.finalResult],
          ].map(([Icon, title, value]) => (
            <div key={title as string} className="service-card">
              <Icon size={24} />
              <h3>{title as string}</h3>
              <p>{value as string}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
