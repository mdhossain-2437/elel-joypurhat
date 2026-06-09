import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  Landmark,
  MapPin,
  MonitorCheck,
  PhoneCall,
  UsersRound,
} from "lucide-react";
import { InstituteCanvas } from "@/components/institute-canvas";
import { SuccessStoryMarquee } from "@/components/success-story-marquee";
import { TeamShowcase } from "@/components/team-showcase";
import { admissionNotice, branch, contactItems } from "@/lib/content";
import { getCourses, getPublishedSuccessStories, getPublishedTeamMembers } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

const projectCards = [
  ["সরকারি প্রশিক্ষণ", "ভর্তি নির্দেশনা, ক্লাসের নিয়ম, পরীক্ষা ও ফলাফল একই জায়গা থেকে জানা যাবে।"],
  ["পেইড কোর্স", "ভবিষ্যতের ক্যারিয়ার-কেন্দ্রিক কোর্স, কর্মশালা ও স্কিল ট্র্যাক ধাপে ধাপে যুক্ত হবে।"],
  ["ব্রাঞ্চ সহায়তা", "ঠিকানা, ফোন, শিক্ষক পরিচিতি ও জরুরি নোটিশ সহজে খুঁজে পাওয়া যাবে।"],
];

const instituteWorkflow = [
  ["০১", "সঠিক কোর্স বেছে নিন", "চলমান সরকারি প্রকল্প, আসন্ন পেইড কোর্স ও কর্মশালা এক জায়গায় দেখে সিদ্ধান্ত নিন।"],
  ["০২", "ভর্তি নির্দেশনা পড়ুন", "শেষ সময়, পরীক্ষার তারিখ, যোগ্যতা ও প্রয়োজনীয় নির্দেশনা পরিষ্কারভাবে দেখে আবেদন করুন।"],
  ["০৩", "নিয়মিত ক্লাসে অংশ নিন", "জয়পুরহাট ব্রাঞ্চে ল্যাব ক্লাস, শিক্ষক সহায়তা, অনুশীলন ও ক্লাস টেস্টের মাধ্যমে শিখুন।"],
  ["০৪", "নিজের ফলাফল দেখুন", "ভর্তি ফলাফল রোল ও ফোন দিয়ে, আর মাসিক ফলাফল শুধু ফোন নম্বর দিয়ে দেখা যাবে।"],
  ["০৫", "প্রয়োজনে সহায়তা নিন", "ব্রাঞ্চের ঠিকানা, ফোন, ইমেইল ও দায়িত্বশীল টিমের তথ্য সবসময় হাতের কাছে থাকবে।"],
];

const scrollCards = [
  {
    title: "একেক শিক্ষার্থীর জন্য একেক শেখার পথ",
    text: "সরকারি প্রকল্প, পেইড কোর্স, কর্মশালা ও ভবিষ্যতের নতুন প্রোগ্রাম এমনভাবে সাজানো হয়েছে, যেন শিক্ষার্থী নিজের লক্ষ্য অনুযায়ী পথ বেছে নিতে পারে।",
    icon: GraduationCap,
  },
  {
    title: "ভর্তি থেকে ফলাফল পর্যন্ত পরিষ্কার পথচলা",
    text: "কোথায় আবেদন করবেন, কখন পরীক্ষা, কীভাবে ফলাফল দেখবেন—প্রতিটি ধাপ শিক্ষার্থীর ভাষায় সহজ করে রাখা হয়েছে।",
    icon: BadgeCheck,
  },
  {
    title: "বিশ্বাসযোগ্য ব্রাঞ্চ পরিচিতি",
    text: "ব্রাঞ্চের ঠিকানা, প্রকল্পের তথ্য, শিক্ষক প্রোফাইল ও কোর্সভিত্তিক পেজ একসাথে থাকায় শিক্ষার্থী ও অভিভাবক দ্রুত সিদ্ধান্ত নিতে পারেন।",
    icon: UsersRound,
  },
];

const instituteSystems = [
  {
    code: "I-01",
    label: "সরকারি প্রকল্প",
    title: "যুব উন্নয়ন প্রশিক্ষণ",
    text: "৬৪ জেলা প্রকল্পের ভর্তি, সরাসরি ক্লাস, লিখিত পরীক্ষা, মৌখিক পরীক্ষা, ভাতা ও ফলাফল প্রকাশের পুরো প্রক্রিয়া।",
    tags: ["এইচএসসি", "১৮-৩৫ বছর", "৬০০ ঘণ্টা", "সরাসরি ক্লাস"],
    stats: [["৭৫", "আসন"], ["২০০৳", "দৈনিক"], ["৩ মাস", "সময়কাল"]],
  },
  {
    code: "I-02",
    label: "পেইড কোর্স",
    title: "ক্যারিয়ারভিত্তিক শেখার পথ",
    text: "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ওয়েব স্কিল, অফিস অ্যাপ্লিকেশন ও বাস্তব ফ্রিল্যান্সিং প্রস্তুতির ভবিষ্যৎ কোর্স।",
    tags: ["পোর্টফোলিও", "অনুশীলন", "শিক্ষক সহায়তা", "ক্যারিয়ার"],
    stats: [["৪+", "ট্র্যাক"], ["ল্যাব", "ক্লাস"], ["শিগগির", "চালু"]],
  },
  {
    code: "I-03",
    label: "শিক্ষার্থী সেবা",
    title: "নোটিশ ও ফলাফল কেন্দ্র",
    text: "ভর্তি ফলাফল, ক্লাস টেস্টের ফলাফল, অফিসিয়াল নোটিশ, কোর্স আপডেট ও ব্রাঞ্চ সহায়তা এক জায়গায় রাখা হয়েছে।",
    tags: ["নোটিশ", "ফলাফল", "এসএমএস", "সহায়তা"],
    stats: [["২", "ফলাফল"], ["১", "ব্রাঞ্চ"], ["সবসময়", "দেখা যাবে"]],
  },
];

const studentFlow = [
  ["আবেদন", "শেষ সময়, যোগ্যতা, পরীক্ষা ও অ্যাডমিট কার্ডের নির্দেশনা একই জায়গা থেকে পরিষ্কারভাবে জানা যাবে।", "১৫ জুন"],
  ["প্রস্তুতি", "লিখিত ও মৌখিক পরীক্ষার আগে কী করতে হবে, কোন তথ্য সঙ্গে রাখতে হবে—সবকিছু সহজ ভাষায় সাজানো থাকবে।", "২০-২১ জুন"],
  ["ক্লাস", "নির্দিষ্ট ল্যাবে সরাসরি ক্লাস, হাতে-কলমে অনুশীলন, উপস্থিতি ও প্রশিক্ষকের ফিডব্যাক নিয়মিত চলবে।", "৬০০ ঘণ্টা"],
  ["মূল্যায়ন", "ক্লাস টেস্ট ও মাসিক মূল্যায়নের ফলাফল নিজের ফোন নম্বর দিয়ে নিরাপদে দেখা যাবে।", "নিজস্ব ফলাফল"],
  ["সহায়তা", "কোর্স, নোটিশ, ফলাফল বা ডকুমেন্ট নিয়ে সমস্যা হলে ব্রাঞ্চ টিমের সঙ্গে দ্রুত যোগাযোগ করা যাবে।", "ব্রাঞ্চ সাপোর্ট"],
];

const lessonPath = [
  ["ভিত্তি তৈরি", "অফিস অ্যাপ্লিকেশন, ইংরেজি, অনলাইন কাজের নিয়ম ও কম্পিউটার ব্যবহারের আত্মবিশ্বাস।"],
  ["স্কিল অনুশীলন", "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ভিডিও এডিটিং ও বাস্তব ক্লাস টাস্ক।"],
  ["মার্কেট প্রস্তুতি", "মার্কেটপ্লেস পরিচিতি, ক্লায়েন্ট যোগাযোগ, পোর্টফোলিও ও কাজ জমা দেওয়ার প্রস্তুতি।"],
  ["ফলাফল ও ফলোআপ", "মাসিক মূল্যায়ন, ব্যক্তিগত ফলাফল, দুর্বল জায়গায় সহায়তা ও পরবর্তী শেখার পরামর্শ।"],
];

function getCourseIcon(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("government") || normalized.includes("সরকারি")) return Landmark;
  if (normalized.includes("graphics") || normalized.includes("গ্রাফিক")) return MonitorCheck;
  return BriefcaseBusiness;
}

export default async function Home() {
  const featuredCourses = (await getCourses()).filter((course) => course.featured).slice(0, 3);
  const teamMembers = await getPublishedTeamMembers();
  const successStories = await getPublishedSuccessStories();

  return (
    <main className="site-shell">
      <section className="global-hero">
        <InstituteCanvas />
        <div className="site-container relative grid gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="kicker-light">ই-লার্নিং এন্ড আর্নিং লিমিটেড / জয়পুরহাট ব্রাঞ্চ</p>
            <h1 className="hero-heading mt-5">
              দক্ষতা শিখুন, নিজের ভবিষ্যৎ গড়ার পথে আত্মবিশ্বাস নিয়ে এগিয়ে যান।
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              সরকারি প্রশিক্ষণ, পেইড কোর্স, ভর্তি নোটিশ, ফলাফল, শিক্ষক পরিচিতি ও ব্রাঞ্চ সহায়তা—জয়পুরহাট ব্রাঞ্চের প্রয়োজনীয় সব তথ্য এখন একটি নির্ভরযোগ্য প্ল্যাটফর্মে।
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link className="btn-orange" href="/courses">
                <BookOpenCheck size={18} />
                কোর্সগুলো দেখুন
              </Link>
              <Link className="btn-black" href="/courses/jubo-freelancing">
                <CalendarDays size={18} />
                ৭ম ব্যাচে ভর্তি
              </Link>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["সরকারি", "প্রকল্প"],
                ["পেইড", "কোর্স"],
                ["ফলাফল", "পোর্টাল"],
              ].map(([value, label]) => (
                <div key={label} className="hero-stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="global-hero-board">
            <div className="hero-board-header">
              <span>এখন চলছে</span>
              <strong>{admissionNotice.batch}</strong>
            </div>
            <div className="hero-course-card primary-course">
              <Landmark size={24} />
              <p>সরকারি প্রকল্প</p>
              <h2>যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণ</h2>
              <span>শেষ সময়: {admissionNotice.deadline}</span>
              <Link href="/courses/jubo-freelancing">
                ভর্তি নির্দেশনা দেখুন
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="mini-course-card">
                <BriefcaseBusiness size={21} />
                <h3>পেইড কোর্স</h3>
                <p>ডিজিটাল মার্কেটিং, ডিজাইন, ওয়েবসহ ক্যারিয়ার-কেন্দ্রিক আরও কোর্স আসবে।</p>
              </div>
              <div className="mini-course-card">
                <BadgeCheck size={21} />
                <h3>ফলাফল পোর্টাল</h3>
                <p>নিজের ভর্তি ও ক্লাস টেস্টের ফলাফল নিরাপদে দেখা যাবে।</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="site-container grid gap-3 md:grid-cols-5">
          {["সরকারি প্রকল্প", "পেইড কোর্স", "সরাসরি প্রশিক্ষণ", "ব্রাঞ্চ সহায়তা", "ফলাফল পোর্টাল"].map((item) => (
            <div key={item} className="proof-item">{item}</div>
          ))}
        </div>
      </section>

      <section className="experience-pass-section">
        <div className="site-container">
          <div className="experience-pass-head">
            <div>
              <p className="kicker-light">শিক্ষার্থীর পথচলা</p>
              <h2 className="section-heading mt-4">প্রথম আবেদন থেকে ক্লাসের অগ্রগতি—সব ধাপ যেন সামনে দেখা যায়।</h2>
            </div>
            <p>
              নতুন শিক্ষার্থীর সবচেয়ে বড় প্রয়োজন হলো পরিষ্কার নির্দেশনা। তাই ভর্তি, পরীক্ষা, ক্লাস, মূল্যায়ন ও সহায়তার তথ্য গল্পের মতো ধারাবাহিকভাবে সাজানো হয়েছে—আজ কী করবেন, আগামী ধাপে কী আসবে, কোথায় সাহায্য পাবেন।
            </p>
          </div>
          <div className="experience-pass-grid">
            {studentFlow.map(([title, text, badge], index) => (
              <article key={title} className="experience-pass-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{badge}</strong>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SuccessStoryMarquee stories={successStories} />

      <section className="lesson-journey-section">
        <div className="site-container lesson-journey-grid">
          <div>
            <p className="kicker-light">লার্নিং জার্নি</p>
            <h2 className="section-heading mt-4">ক্লাসের ভেতরের শেখাটা বাইরে থেকেও পরিষ্কার বোঝা যাবে।</h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-700">
              বিশ্বমানের কোর্স-জার্নি অভিজ্ঞতা থেকে অনুপ্রাণিত হয়ে এখানে শেখার ধাপগুলো পথচিত্র আকারে সাজানো হয়েছে, তবে সবকিছু জয়পুরহাট ব্রাঞ্চের বাস্তব প্রশিক্ষণ কাঠামোর সঙ্গে মিলিয়ে রাখা হয়েছে।
            </p>
          </div>
          <div className="lesson-rail">
            {lessonPath.map(([title, text], index) => (
              <article key={title} className="lesson-rail-card">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="kicker-light">শিক্ষার্থীর পথচলা</p>
              <h2 className="section-heading mt-4">শিক্ষার্থীর পরবর্তী ধাপ যেন সবসময় পরিষ্কার থাকে।</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-600">
              কোর্স খোঁজা থেকে ফলাফল দেখা ও সহায়তা নেওয়া পর্যন্ত পুরো অভিজ্ঞতা সহজ, পরিষ্কার ও ব্রাঞ্চ-কেন্দ্রিকভাবে সাজানো হয়েছে।
            </p>
          </div>
          <div className="workflow-map mt-10">
            {instituteWorkflow.map(([step, title, text]) => (
              <article key={step} className="workflow-card">
                <span>{step}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="section-white">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="kicker-light">চলমান ও আসন্ন কোর্স</p>
              <h2 className="section-heading mt-4">এক ব্রাঞ্চে শেখার অনেক পথ।</h2>
            </div>
            <Link className="btn-black" href="/courses">
              সব কোর্স দেখুন
              <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredCourses.map((course) => {
              const CourseIcon = getCourseIcon(`${course.type} ${course.title}`);
              return (
                <Link key={course.id} href={course.href} className="course-tile">
                  <CourseIcon size={26} />
                  <span>{course.type}</span>
                  <h3>{course.title}</h3>
                  <p>{course.detail}</p>
                  <strong>{course.status}</strong>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="section-light">
        <div className="site-container grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="sticky-copy">
            <p className="kicker-light">প্রোগ্রাম ও প্রকল্প</p>
            <h2 className="section-heading mt-4">আজকের প্রকল্প, আগামী দিনের কোর্স—সবকিছুর জন্য প্রস্তুত।</h2>
            <p className="mt-5 text-base leading-8 text-zinc-700">
              এই ওয়েবসাইট শুধু একটি ফ্রিল্যান্সিং কোর্সের জন্য তৈরি নয়। ভবিষ্যতে নতুন সরকারি প্রকল্প, পেইড কোর্স, নোটিশ, ফলাফল ও কোর্সভিত্তিক পেজ সহজেই যুক্ত করা যাবে।
            </p>
          </div>
          <div className="scroll-card-stack">
            {scrollCards.map((card, index) => (
              <div key={card.title} className="scroll-card" style={{ top: `${92 + index * 22}px` }}>
                <card.icon size={28} />
                <span>0{index + 1}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="architecture-section">
        <div className="architecture-marquee" aria-hidden="true">
          <span>জয়পুরহাটে দক্ষতা উন্নয়ন</span>
          <i />
          <span>সরকারি প্রকল্প</span>
          <i />
          <span>পেইড ক্যারিয়ার কোর্স</span>
        </div>
        <div className="site-container">
          <div className="architecture-head">
            <div>
              <p>প্রশিক্ষণের কাঠামো</p>
              <h2>
                শেখার{" "}
                <br />
                <span>পথচিত্র</span>
              </h2>
            </div>
            <p>
              জয়পুরহাট ব্রাঞ্চের প্রশিক্ষণ, প্রকল্প, ফলাফল, নোটিশ ও সহায়তা একটি সুসংগঠিত প্ল্যাটফর্মে রাখা হয়েছে, যাতে শিক্ষার্থীরা দ্রুত সঠিক তথ্য পায়।
            </p>
          </div>
          <div className="architecture-list">
            {instituteSystems.map((item) => (
              <article key={item.code} className="architecture-row">
                <div className="architecture-code">{item.code}</div>
                <div className="architecture-title">
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                </div>
                <div className="architecture-copy">
                  <p>{item.text}</p>
                  <div>
                    {item.tags.map((tag) => (
                      <em key={tag}>{tag}</em>
                    ))}
                  </div>
                </div>
                <div className="architecture-stats">
                  {item.stats.map(([value, label]) => (
                    <strong key={label}>
                      {value}
                      <span>{label}</span>
                    </strong>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <div className="architecture-actions">
            <Link href="/projects">প্রকল্প দেখুন</Link>
          </div>
        </div>
      </section>

      <section id="results" className="section-white">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="kicker-light">শিক্ষার্থী সেবা</p>
              <h2 className="section-heading mt-4">ভর্তি, নোটিশ ও ফলাফল—সবকিছু ঠিক জায়গায়।</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {projectCards.map(([title, text]) => (
                <div key={title} className="service-card">
                  <CheckCircle2 size={24} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            <Link href="/results/admission" className="result-link-card">
              <BadgeCheck size={28} />
              <h3>ভর্তি পরীক্ষার ফলাফল</h3>
              <p>অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিয়ে নিজের ফলাফল দেখুন।</p>
              <span>রোল + ফোন <ChevronRight size={18} /></span>
            </Link>
            <Link href="/results/monthly" className="result-link-card">
              <BookOpenCheck size={28} />
              <h3>মাসিক পরীক্ষার ফলাফল</h3>
              <p>ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল রেজিস্টার্ড ফোন নম্বর দিয়ে দেখুন।</p>
              <span>শুধু ফোন <ChevronRight size={18} /></span>
            </Link>
          </div>
        </div>
      </section>

      <TeamShowcase members={teamMembers} />

      <section id="contact" className="section-white">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker-light">যোগাযোগ</p>
            <h2 className="section-heading mt-4">কোর্স, ভর্তি বা ফলাফল নিয়ে প্রশ্ন থাকলে ব্রাঞ্চে যোগাযোগ করুন।</h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="btn-orange" href={`tel:${branch.phones[0]}`}>
                <PhoneCall size={18} />
                ব্রাঞ্চে ফোন করুন
              </a>
              <Link className="btn-black" href="/courses">
                <GraduationCap size={18} />
                কোর্স দেখুন
              </Link>
            </div>
          </div>
          <div className="grid gap-3">
            {contactItems.map((item) => (
              <div key={item.label} className="contact-card">
                <item.icon size={21} />
                <div>
                  <span>{item.label}</span>
                  <p>{item.value}</p>
                </div>
              </div>
            ))}
            <div className="contact-card">
              <MapPin size={21} />
              <div>
                <span>ইমেইল</span>
                <p>{branch.email}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
