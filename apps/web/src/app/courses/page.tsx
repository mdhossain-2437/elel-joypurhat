import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Landmark,
  MonitorCheck,
} from "lucide-react";
import { admissionNotice } from "@/lib/content";
import { getCourses } from "@/lib/cms-store";

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
    <main className="site-shell">
      <section className="section-light">
        <div className="site-container">
          <p className="kicker-light">কোর্স তালিকা</p>
          <h1 className="hero-heading mt-5 max-w-5xl">সরকারি প্রকল্প থেকে ক্যারিয়ার কোর্স—শেখার পথ বেছে নিন।</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-700">
            ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চের চলমান ও আসন্ন কোর্সগুলো এখানে সাজানো আছে। নতুন সরকারি প্রকল্প, পেইড কোর্স বা ছোট কর্মশালা চালু হলে সেগুলোও এই তালিকায় যুক্ত হবে।
          </p>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {courses.map((course) => {
              const CourseIcon = getCourseIcon(`${course.type} ${course.title}`);
              return (
                <Link key={course.id} href={course.href} className="course-tile">
                  <CourseIcon size={26} />
                  <span>{course.type}</span>
                  <h2>{course.title}</h2>
                  <p>{course.detail}</p>
                  <strong>{course.status}</strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker-light">এখন চলছে</p>
            <h2 className="section-heading mt-4">৭ম ব্যাচে রেজিস্ট্রেশন চলছে।</h2>
          </div>
          <div className="flow-panel">
            {[
              ["আবেদনের শেষ সময়", admissionNotice.deadline],
              ["লিখিত পরীক্ষা", admissionNotice.writtenExam],
              ["মৌখিক পরীক্ষা", admissionNotice.vivaExam],
              ["চূড়ান্ত ফলাফল", admissionNotice.finalResult],
            ].map(([label, value]) => (
              <div key={label} className="flow-row">
                <span><CalendarDays size={24} /></span>
                <div>
                  <h3>{label}</h3>
                  <p>{value}</p>
                </div>
              </div>
            ))}
            <Link className="btn-black mt-3" href="/courses/jubo-freelancing">
              ভর্তি নির্দেশনা দেখুন
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
