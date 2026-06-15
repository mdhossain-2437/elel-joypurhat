import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Landmark,
  MonitorCheck,
} from "lucide-react";
import { admissionNotice } from "@/lib/content";
import { getCourses } from "@/lib/cms-store";
import { Reveal } from "@/components/motion";

export const metadata = {
  title: "কোর্সসমূহ",
};

export const dynamic = "force-dynamic";

function getCourseIcon(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("government") || normalized.includes("সরকারি")) return Landmark;
  if (normalized.includes("graphics") || normalized.includes("গ্রাফিক")) return MonitorCheck;
  if (normalized.includes("workshop") || normalized.includes("কর্মশালা")) return GraduationCap;
  return BriefcaseBusiness;
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <main className="v2">
      <section className="v2-page-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <Reveal>
            <span className="v2-eyebrow">কোর্স তালিকা</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display font-display">
              সরকারি প্রকল্প থেকে <span className="v2-ink-accent">ক্যারিয়ার কোর্স।</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="v2-lead">
              ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চের চলমান ও আসন্ন কোর্সগুলো এখানে সাজানো আছে। নতুন সরকারি
              প্রকল্প, পেইড কোর্স বা ছোট কর্মশালা চালু হলে সেগুলোও যুক্ত হবে।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-card-grid cols-2">
            {courses.map((course, index) => {
              const CourseIcon = getCourseIcon(`${course.type} ${course.title}`);
              return (
                <Reveal key={course.id} delay={index * 70} y={32}>
                  <Link href={course.href} className="v2-course">
                    <CourseIcon className="ic" size={30} />
                    <span className="tag">{course.type}</span>
                    <h3>{course.title}</h3>
                    <p>{course.detail}</p>
                    <span className="foot">
                      {course.status}
                      <ArrowUpRight size={16} />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="v2-section v2-dark grain tight">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow on-dark">এখন চলছে</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  ৭ম ব্যাচে <span className="v2-ink-accent">রেজিস্ট্রেশন চলছে।</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <Link className="v2-btn v2-btn-primary" href="/courses/jubo-freelancing" style={{ marginTop: 24 }}>
                  ভর্তি নির্দেশনা দেখুন
                  <ArrowUpRight size={18} />
                </Link>
              </Reveal>
            </div>
            <div className="v2-stack-cards">
              {[
                ["আবেদনের শেষ সময়", admissionNotice.deadline],
                ["লিখিত পরীক্ষা", admissionNotice.writtenExam],
                ["মৌখিক পরীক্ষা", admissionNotice.vivaExam],
                ["চূড়ান্ত ফলাফল", admissionNotice.finalResult],
              ].map(([label, value], index) => (
                <Reveal key={label} delay={index * 60} y={26}>
                  <div className="v2-timeline-row">
                    <CalendarDays size={22} />
                    <div>
                      <h3>{label}</h3>
                      <p>{value}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
