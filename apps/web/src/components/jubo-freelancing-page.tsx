import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  MapPin,
  PhoneCall,
} from "lucide-react";
import {
  admissionNotice,
  branch,
  contactItems,
  courseTracks,
  districtGroups,
  projectFacts,
  resultSystems,
} from "@/lib/content";
import { TeamShowcase } from "@/components/team-showcase";
import type { TeamMemberEntry } from "@/lib/cms-types";

const admissionFlow = [
  ["০১", "আবেদন জমা দিন", "নিজের নাম, ফোন নম্বর, ঠিকানা ও শিক্ষাগত তথ্য সতর্কভাবে পূরণ করুন।"],
  ["০২", "অ্যাডমিট কার্ড সংরক্ষণ করুন", "অ্যাডমিট কার্ড ডাউনলোড করে রাখুন; পরীক্ষার দিন এটি সঙ্গে আনতে হবে।"],
  ["০৩", "লিখিত পরীক্ষায় অংশ নিন", `${admissionNotice.writtenExam} লিখিত পরীক্ষা অনুষ্ঠিত হবে।`],
  ["০৪", "মৌখিক পরীক্ষার প্রস্তুতি নিন", `${admissionNotice.vivaExam} লিখিত পরীক্ষায় উত্তীর্ণদের মৌখিক পরীক্ষা অনুষ্ঠিত হবে।`],
  ["০৫", "চূড়ান্ত নির্বাচন প্রকাশ", "লিখিত ও মৌখিক পরীক্ষার মোট নম্বর অনুযায়ী সর্বোচ্চ নম্বরপ্রাপ্ত ৭৫ জন নির্বাচিত হবেন।"],
];

const learningCards = [
  {
    title: "সরাসরি ল্যাবভিত্তিক ক্লাস",
    text: "জয়পুরহাট ব্রাঞ্চে উপস্থিত থেকে শিক্ষক সহায়তায় নিয়মিত অনুশীলন, ক্লাস টেস্ট ও বাস্তব কাজের প্রস্তুতি।",
    icon: ClipboardList,
  },
  {
    title: "কাজের বাজারের জন্য প্রস্তুতি",
    text: "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ভিডিও এডিটিং, অফিস অ্যাপ্লিকেশন ও ফ্রিল্যান্সিংয়ের ভিত্তি শেখানো হবে।",
    icon: BadgeCheck,
  },
  {
    title: "ভাতা ও খাবারের সহায়তা",
    text: "প্রশিক্ষণ চলাকালীন নিয়ম অনুযায়ী দৈনিক ২০০ টাকা ভাতা ও খাবারের ব্যবস্থা রয়েছে।",
    icon: CalendarDays,
  },
];

export default function Home({ teamMembers }: { teamMembers?: TeamMemberEntry[] }) {
  return (
    <main className="site-shell">
      <section className="hero-section">
        <div className="site-container grid gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="kicker">জয়পুরহাট ব্রাঞ্চ / যুব উন্নয়ন ফ্রিল্যান্সিং প্রকল্প</p>
            <h1 className="hero-heading mt-5">
              জয়পুরহাটে সরকারি ফ্রিল্যান্সিং প্রশিক্ষণে ভর্তি চলছে।
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-700">
              ই-লার্নিং এন্ড আর্নিং লিমিটেডের জয়পুরহাট ব্রাঞ্চে যুব উন্নয়ন অধিদপ্তরের ৬৪ জেলা প্রকল্পের আওতায় সরাসরি ফ্রিল্যান্সিং প্রশিক্ষণ, ভর্তি নির্দেশনা, পরীক্ষা, ফলাফল ও ব্রাঞ্চ সহায়তা দেওয়া হচ্ছে।
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a className="btn-orange" href="#admission">
                <CalendarDays size={18} />
                ৭ম ব্যাচে আবেদন করুন
              </a>
              <Link className="btn-dark" href="/results/admission">
                <BadgeCheck size={18} />
                ভর্তি ফলাফল দেখুন
              </Link>
            </div>

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-3">
              {[
                ["৩", "মাস"],
                ["৬০০", "ঘণ্টা"],
                ["৭৫", "আসন"],
              ].map(([value, label]) => (
                <div key={label} className="hero-stat">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hero-media">
            <Image src="/media/jubo-64-banner.jpeg" alt="যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণের অফিসিয়াল ব্যানার" fill sizes="(max-width: 1024px) 100vw, 54vw" className="object-cover" priority />
            <div className="hero-notice">
              <span>{admissionNotice.status}</span>
              <h2>{admissionNotice.batch}</h2>
              <div className="grid gap-3 text-sm text-zinc-300 sm:grid-cols-2">
                <p>শেষ সময়: {admissionNotice.deadline}</p>
                <p>লিখিত: {admissionNotice.writtenExam}</p>
                <p>মৌখিক: {admissionNotice.vivaExam}</p>
                <p>ফলাফল: {admissionNotice.finalResult}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="site-container grid gap-3 md:grid-cols-5">
          {["এইচএসসি বা সমমান", "বয়স ১৮-৩৫", "সরাসরি ক্লাস", "দৈনিক ২০০ টাকা", "৬৪ জেলা প্রকল্প"].map((item) => (
            <div key={item} className="proof-item">{item}</div>
          ))}
        </div>
      </section>

      <section id="admission" className="section-light">
        <div className="site-container grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <p className="kicker-light">ভর্তি নোটিশ</p>
            <h2 className="section-heading mt-4">৭ম ব্যাচের ভর্তি, পরীক্ষা ও নির্বাচন প্রক্রিয়া এক নজরে।</h2>
            <p className="mt-5 text-base leading-8 text-zinc-700">
              আবেদন করতে হলে {admissionNotice.qualification}। লিখিত পরীক্ষায় উত্তীর্ণদের মৌখিক পরীক্ষা যুব উন্নয়ন অফিসে অনুষ্ঠিত হবে। লিখিত ও মৌখিক পরীক্ষার মোট নম্বরের ভিত্তিতে সর্বোচ্চ নম্বরপ্রাপ্ত ৭৫ জন চূড়ান্তভাবে নির্বাচিত হবেন।
            </p>
            <div className="mt-7 grid gap-3">
              {admissionNotice.bullets.map((item) => (
                <div key={item} className="check-line">
                  <Check size={18} />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="flow-panel">
            {admissionFlow.map(([step, title, text]) => (
              <div key={step} className="flow-row">
                <span>{step}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
            <a className="btn-black mt-3" href="https://e-laeltd.com/64-student-reg-jubo" target="_blank" rel="noreferrer">
              অফিসিয়াল আবেদন পেজ
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="training" className="section-white">
        <div className="site-container">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="image-frame">
              <Image src="/media/jubo-48.jpg" alt="ফ্রিল্যান্সিং প্রশিক্ষণ প্রকল্পের অফিসিয়াল গ্রাফিক" fill sizes="(max-width: 1024px) 100vw, 42vw" className="object-cover" />
            </div>
            <div>
              <p className="kicker-light">প্রশিক্ষণের সারাংশ</p>
              <h2 className="section-heading mt-4">শিখুন, অনুশীলন করুন, ফ্রিল্যান্সিং ক্যারিয়ারের জন্য প্রস্তুত হন।</h2>
              <p className="mt-5 text-base leading-8 text-zinc-700">
                দক্ষ জনশক্তি তৈরি, আত্মকর্মসংস্থান বৃদ্ধি এবং উদ্যোক্তা তৈরির লক্ষ্য নিয়ে দেশের ৮টি বিভাগের ৬৪টি জেলায় যুব ও যুব মহিলাদের জন্য এই প্রশিক্ষণ কার্যক্রম পরিচালিত হচ্ছে।
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {projectFacts.map((fact) => (
                  <div key={fact.label} className="simple-card">
                    <fact.icon size={24} />
                    <h3>{fact.value}</h3>
                    <p>{fact.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {learningCards.map((card) => (
              <div key={card.title} className="service-card">
                <card.icon size={26} />
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="section-dark">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="kicker">ফলাফল পোর্টাল</p>
              <h2 className="section-heading">নিজের ভর্তি ও ক্লাস টেস্টের ফলাফল সহজে দেখুন।</h2>
            </div>
            <p className="text-base leading-8 text-zinc-700">
              ভর্তি পরীক্ষার ফলাফল দেখতে অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর প্রয়োজন হবে। মাসিক বা ক্লাস টেস্টের ফলাফল শুধু রেজিস্টার্ড ফোন নম্বর দিয়ে দেখা যাবে।
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {resultSystems.map((system) => (
              <Link key={system.title} href={system.href} className="result-link-card">
                <system.icon size={28} />
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <span>
                  {system.query}
                  <ChevronRight size={18} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="kicker-light">কোর্সে যা থাকবে</p>
              <h2 className="section-heading mt-4">ফ্রিল্যান্সিংয়ের প্রস্তুতির জন্য প্রয়োজনীয় ব্যবহারিক দক্ষতা।</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-600">
              আবেদন করার আগে শিক্ষার্থী ও অভিভাবক যেন কোর্সে কী শেখানো হবে এবং কীভাবে ক্লাস চলবে তা পরিষ্কারভাবে বুঝতে পারেন।
            </p>
          </div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {courseTracks.map((track) => (
              <div key={track} className="module-pill">
                <CheckCircle2 size={18} />
                {track}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="site-container resource-board">
          <div>
            <p className="kicker-light">প্রশিক্ষণ রিসোর্স</p>
            <h2 className="section-heading mt-4">ক্লাস পরিকল্পনা ও অনুশীলনের ক্যালেন্ডার সঙ্গে রাখুন।</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700">
              ক্লাস রুটিন, অনুশীলনের সময় ও গুরুত্বপূর্ণ ধাপগুলো মনে রাখতে ক্যালেন্ডার ফাইল ব্যবহার করতে পারবেন।
            </p>
          </div>
          <div className="resource-card">
            <CalendarDays size={28} />
            <span>ক্যালেন্ডার ফাইল</span>
            <h3>ফ্রিল্যান্সিং মাস্টার প্ল্যান</h3>
            <p>নিজের ক্যালেন্ডার অ্যাপে যোগ করলে ক্লাস প্ল্যান, অনুশীলন ও গুরুত্বপূর্ণ সময়সীমা মনে রাখা সহজ হবে।</p>
            <a href="/downloads/Freelance_Master_Plan.ics" download>
              ক্যালেন্ডার ডাউনলোড
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="section-dark compact">
        <div className="site-container">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="kicker">শিক্ষার্থী সহায়তা</p>
              <h2 className="section-heading">প্রশিক্ষণ চলাকালীন যে সহায়তাগুলো পাবেন।</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                ["ক্লাস টেস্ট", "মাসিক পরীক্ষার মাধ্যমে শেখার অগ্রগতি যাচাই করা হবে।", BookOpenCheck],
                ["শিক্ষক সহায়তা", "ক্লাসে প্রশিক্ষক ও সহকারী প্রশিক্ষকের সরাসরি সহায়তা পাওয়া যাবে।", BadgeCheck],
                ["অ্যাডমিট ও নোটিশ", "ভর্তি, অ্যাডমিট কার্ড, পরীক্ষার তারিখ ও এসএমএস নোটিশ সম্পর্কে পরিষ্কার নির্দেশনা দেওয়া হবে।", ClipboardList],
                ["ব্রাঞ্চ হেল্প ডেস্ক", "জয়পুরহাট ব্রাঞ্চে ফোন ও অফিস সহায়তা পাওয়া যাবে।", PhoneCall],
              ].map(([title, text, Icon]) => (
                <div key={title as string} className="dark-card">
                  <Icon size={22} />
                  <h3>{title as string}</h3>
                  <p>{text as string}</p>
                </div>
              ))}
            </div>
          </div>
          <Link className="btn-dark mt-8" href="/results/monthly">
            <BookOpenCheck size={18} />
            মাসিক ফলাফল
          </Link>
        </div>
      </section>

      <TeamShowcase
        title="আমাদের কর্মকর্তাবৃন্দ ও শিক্ষকবৃন্দ"
        description="ক্লাস পরিচালনা, ভর্তি সহায়তা, ফলাফল ব্যবস্থাপনা ও শিক্ষার্থীদের নিয়মিত পাশে থাকার কাজে জয়পুরহাট ব্রাঞ্চের টিম কাজ করছে।"
        members={teamMembers}
      />

      <section className="section-white">
        <div className="site-container grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="kicker-light">প্রশিক্ষণের জেলা</p>
            <h2 className="section-heading mt-4">৬৪ জেলার প্রশিক্ষণ এলাকা একসাথে দেখুন।</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {districtGroups.map(([division, districts]) => (
              <div key={division} className="district-card">
                <h3>{division} বিভাগ</h3>
                <p>{districts}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-dark">
        <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="kicker">যোগাযোগ</p>
            <h2 className="section-heading">ভর্তি সহায়তার জন্য ব্রাঞ্চে আসুন অথবা ফোন করুন।</h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a className="btn-orange" href={`tel:${branch.phones[0]}`}>
                <PhoneCall size={18} />
                ব্রাঞ্চে ফোন করুন
              </a>
              <Link className="btn-dark" href="/results/monthly">
                <BookOpenCheck size={18} />
                মাসিক ফলাফল
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
