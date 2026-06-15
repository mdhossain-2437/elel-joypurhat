import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  CalendarDays,
  Check,
  CheckCircle2,
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
import { Magnetic, Reveal } from "@/components/motion";
import type { TeamMemberEntry } from "@/lib/cms-types";

const admissionFlow = [
  ["০১", "আবেদন জমা দিন", "নিজের নাম, ফোন নম্বর, ঠিকানা ও শিক্ষাগত তথ্য সতর্কভাবে পূরণ করুন।"],
  ["০২", "অ্যাডমিট কার্ড সংরক্ষণ করুন", "অ্যাডমিট কার্ড ডাউনলোড করে রাখুন; পরীক্ষার দিন এটি সঙ্গে আনতে হবে।"],
  ["০৩", "লিখিত পরীক্ষায় অংশ নিন", `${admissionNotice.writtenExam} লিখিত পরীক্ষা অনুষ্ঠিত হবে।`],
  ["০৪", "মৌখিক পরীক্ষার প্রস্তুতি নিন", `${admissionNotice.vivaExam} লিখিত পরীক্ষায় উত্তীর্ণদের মৌখিক পরীক্ষা অনুষ্ঠিত হবে।`],
  ["০৫", "চূড়ান্ত নির্বাচন প্রকাশ", "লিখিত ও মৌখিক পরীক্ষার মোট নম্বর অনুযায়ী সর্বোচ্চ নম্বরপ্রাপ্ত ৭৫ জন নির্বাচিত হবেন।"],
];

const learningCards = [
  {
    title: "সরাসরি ল্যাবভিত্তিক ক্লাস",
    text: "জয়পুরহাট ব্রাঞ্চে উপস্থিত থেকে শিক্ষক সহায়তায় নিয়মিত অনুশীলন, ক্লাস টেস্ট ও বাস্তব কাজের প্রস্তুতি।",
    icon: ClipboardList,
  },
  {
    title: "কাজের বাজারের জন্য প্রস্তুতি",
    text: "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ভিডিও এডিটিং, অফিস অ্যাপ্লিকেশন ও ফ্রিল্যান্সিংয়ের ভিত্তি শেখানো হবে।",
    icon: BadgeCheck,
  },
  {
    title: "ভাতা ও খাবারের সহায়তা",
    text: "প্রশিক্ষণ চলাকালীন নিয়ম অনুযায়ী দৈনিক ২০০ টাকা ভাতা ও খাবারের ব্যবস্থা রয়েছে।",
    icon: CalendarDays,
  },
];

const supportCards = [
  ["ক্লাস টেস্ট", "মাসিক পরীক্ষার মাধ্যমে শেখার অগ্রগতি যাচাই করা হবে।", BookOpenCheck],
  ["শিক্ষক সহায়তা", "ক্লাসে প্রশিক্ষক ও সহকারী প্রশিক্ষকের সরাসরি সহায়তা পাওয়া যাবে।", BadgeCheck],
  ["অ্যাডমিট ও নোটিশ", "ভর্তি, অ্যাডমিট কার্ড, পরীক্ষার তারিখ ও এসএমএস নোটিশ সম্পর্কে পরিষ্কার নির্দেশনা।", ClipboardList],
  ["ব্রাঞ্চ হেল্প ডেস্ক", "জয়পুরহাট ব্রাঞ্চে ফোন ও অফিস সহায়তা পাওয়া যাবে।", PhoneCall],
] as const;

export default function JuboFreelancingPage({ teamMembers }: { teamMembers?: TeamMemberEntry[] }) {
  return (
    <main className="v2">
      {/* ---------------- HERO ---------------- */}
      <section className="v2-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <div className="v2-hero-grid">
            <div>
              <Reveal>
                <span className="v2-eyebrow">জয়পুরহাট ব্রাঞ্চ · যুব উন্নয়ন ফ্রিল্যান্সিং প্রকল্প</span>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="v2-display font-display" style={{ marginTop: 20 }}>
                  সরকারি ফ্রিল্যান্সিং প্রশিক্ষণে <span className="v2-ink-accent">ভর্তি চলছে।</span>
                </h1>
              </Reveal>
              <Reveal delay={140}>
                <p className="v2-hero-sub">
                  ই-লার্নিং এন্ড আর্নিং লিমিটেডের জয়পুরহাট ব্রাঞ্চে যুব উন্নয়ন অধিদপ্তরের ৬৪ জেলা প্রকল্পের
                  আওতায় সরাসরি ফ্রিল্যান্সিং প্রশিক্ষণ, ভর্তি নির্দেশনা, পরীক্ষা ও ফলাফল দেওয়া হচ্ছে।
                </p>
              </Reveal>
              <Reveal delay={200} className="v2-hero-cta">
                <Magnetic strength={0.22}>
                  <a className="v2-btn v2-btn-primary" href="#admission">
                    <CalendarDays size={18} />
                    ৭ম ব্যাচে আবেদন করুন
                  </a>
                </Magnetic>
                <Link className="v2-btn v2-btn-ghost" href="/results/admission">
                  <BadgeCheck size={17} />
                  ভর্তি ফলাফল দেখুন
                </Link>
              </Reveal>
            </div>

            <Reveal delay={160} y={40}>
              <div className="v2-image-hero">
                <Image
                  src="/media/jubo-64-banner.jpeg"
                  alt="যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণের অফিসিয়াল ব্যানার"
                  fill
                  sizes="(max-width: 1024px) 100vw, 54vw"
                  className="object-cover"
                  priority
                />
                <div className="v2-image-hero-card grain">
                  <span style={{ position: "relative", zIndex: 2 }}>{admissionNotice.status}</span>
                  <h2 style={{ position: "relative", zIndex: 2 }}>{admissionNotice.batch}</h2>
                  <div className="meta" style={{ position: "relative", zIndex: 2 }}>
                    <p>শেষ সময়: {admissionNotice.deadline}</p>
                    <p>লিখিত: {admissionNotice.writtenExam}</p>
                    <p>মৌখিক: {admissionNotice.vivaExam}</p>
                    <p>ফলাফল: {admissionNotice.finalResult}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="v2-hero-stats">
            {[
              ["৩", "মাস"],
              ["৬০০", "ঘণ্টা"],
              ["৭৫", "আসন"],
              ["২০০৳", "দৈনিক ভাতা"],
            ].map(([value, label]) => (
              <div className="v2-hero-stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------- PROOF STRIP ---------------- */}
      <section className="v2-strip grain" style={{ position: "relative" }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-container" style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
            {["এইচএসসি বা সমমান", "বয়স ১৮–৩৫", "সরাসরি ক্লাস", "দৈনিক ২০০ টাকা", "৬৪ জেলা প্রকল্প"].map((item) => (
              <span className="v2-strip-item" key={item} style={{ fontSize: 16, padding: "0 14px" }}>
                <span className="v2-strip-dot" />
                <i>{item}</i>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ADMISSION ---------------- */}
      <section id="admission" className="v2-section">
        <div className="v2-container">
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow">ভর্তি নোটিশ</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  ৭ম ব্যাচের প্রক্রিয়া <span className="v2-ink-accent">এক নজরে।</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="v2-lead" style={{ marginTop: 18 }}>
                  আবেদন করতে হলে {admissionNotice.qualification}। লিখিত ও মৌখিক পরীক্ষার মোট নম্বরের ভিত্তিতে
                  সর্বোচ্চ নম্বরপ্রাপ্ত ৭৫ জন চূড়ান্তভাবে নির্বাচিত হবেন।
                </p>
              </Reveal>
              <div style={{ display: "grid", gap: 10, marginTop: 22 }}>
                {admissionNotice.bullets.map((item, index) => (
                  <Reveal key={item} delay={index * 50}>
                    <div className="v2-check">
                      <Check size={18} />
                      {item}
                    </div>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={120}>
                <a
                  className="v2-btn v2-btn-ink"
                  href="https://e-laeltd.com/64-student-reg-jubo"
                  target="_blank"
                  rel="noreferrer"
                  style={{ marginTop: 24 }}
                >
                  অফিসিয়াল আবেদন পেজ
                  <ArrowUpRight size={18} />
                </a>
              </Reveal>
            </div>

            <div className="v2-stack-cards">
              {admissionFlow.map(([step, title, text]) => (
                <Reveal key={step} className="v2-stack-card" y={26}>
                  <span className="idx">{step}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TRAINING SUMMARY ---------------- */}
      <section id="training" className="v2-section v2-dark grain">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-stack">
            <Reveal y={36}>
              <div className="v2-image-frame">
                <Image
                  src="/media/jubo-48.jpg"
                  alt="ফ্রিল্যান্সিং প্রশিক্ষণ প্রকল্পের অফিসিয়াল গ্রাফিক"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <div>
              <Reveal>
                <span className="v2-eyebrow on-dark">প্রশিক্ষণের সারাংশ</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  শিখুন, অনুশীলন করুন, <span className="v2-ink-accent">প্রস্তুত হন।</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="v2-lead" style={{ marginTop: 18 }}>
                  দক্ষ জনশক্তি তৈরি, আত্মকর্মসংস্থান বৃদ্ধি ও উদ্যোক্তা তৈরির লক্ষ্য নিয়ে দেশের ৮টি বিভাগের ৬৪টি
                  জেলায় যুব ও যুব মহিলাদের জন্য এই প্রশিক্ষণ পরিচালিত হচ্ছে।
                </p>
              </Reveal>
              <div className="v2-card-grid cols-2" style={{ marginTop: 26 }}>
                {projectFacts.map((fact, index) => (
                  <Reveal key={fact.label} delay={index * 60} y={24}>
                    <div className="v2-tile is-ink">
                      <span className="v2-tile-icon">
                        <fact.icon size={22} />
                      </span>
                      <h3 style={{ fontSize: 22 }}>{fact.value}</h3>
                      <p>{fact.detail}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="v2-card-grid cols-3" style={{ marginTop: 18 }}>
            {learningCards.map((card, index) => (
              <Reveal key={card.title} delay={index * 70} y={24}>
                <div className="v2-tile is-ink">
                  <span className="v2-tile-icon">
                    <card.icon size={22} />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RESULTS ---------------- */}
      <section id="results" className="v2-section tight">
        <div className="v2-container">
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow">ফলাফল পোর্টাল</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  নিজের ফলাফল <span className="v2-ink-accent">সহজে দেখুন।</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="v2-lead">
                ভর্তি পরীক্ষার ফলাফল দেখতে রোল ও ফোন নম্বর প্রয়োজন। মাসিক বা ক্লাস টেস্টের ফলাফল শুধু রেজিস্টার্ড
                ফোন নম্বর দিয়ে দেখা যাবে।
              </p>
            </Reveal>
          </div>
          <div className="v2-portal">
            {resultSystems.map((system, index) => (
              <Reveal key={system.title} delay={index * 100} y={30}>
                <Link href={system.href} className={`v2-portal-card ${index === 1 ? "green" : ""}`}>
                  <system.icon className="ic" size={30} />
                  <div>
                    <h3>{system.title}</h3>
                    <p>{system.description}</p>
                  </div>
                  <span className="go">
                    {system.query} <ArrowUpRight size={18} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- COURSE TRACKS ---------------- */}
      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow">কোর্সে যা থাকবে</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  প্রয়োজনীয় <span className="v2-ink-accent">ব্যবহারিক দক্ষতা।</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="v2-lead">
                আবেদন করার আগে শিক্ষার্থী ও অভিভাবক যেন কোর্সে কী শেখানো হবে তা পরিষ্কারভাবে বুঝতে পারেন।
              </p>
            </Reveal>
          </div>
          <div className="v2-pills">
            {courseTracks.map((track, index) => (
              <Reveal key={track} delay={(index % 3) * 50} y={18}>
                <div className="v2-pill">
                  <CheckCircle2 size={18} />
                  {track}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- RESOURCE + SUPPORT ---------------- */}
      <section className="v2-section v2-dark grain tight">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow on-dark">শিক্ষার্থী সহায়তা</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  প্রশিক্ষণে যা <span className="v2-ink-accent">পাবেন।</span>
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <a className="v2-btn v2-btn-primary" href="/downloads/Freelance_Master_Plan.ics" download style={{ marginTop: 24 }}>
                  <CalendarDays size={17} />
                  ক্যালেন্ডার ডাউনলোড
                </a>
              </Reveal>
            </div>
            <div className="v2-card-grid cols-2">
              {supportCards.map(([title, text, Icon], index) => (
                <Reveal key={title} delay={index * 60} y={24}>
                  <div className="v2-tile is-ink">
                    <span className="v2-tile-icon">
                      <Icon size={22} />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TEAM ---------------- */}
      <TeamShowcase
        title="আমাদের কর্মকর্তাবৃন্দ ও শিক্ষকবৃন্দ"
        description="ক্লাস পরিচালনা, ভর্তি সহায়তা, ফলাফল ব্যবস্থাপনা ও শিক্ষার্থীদের নিয়মিত পাশে থাকার কাজে জয়পুরহাট ব্রাঞ্চের টিম কাজ করছে।"
        members={teamMembers}
      />

      {/* ---------------- DISTRICTS ---------------- */}
      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow">প্রশিক্ষণের জেলা</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  ৬৪ জেলার <span className="v2-ink-accent">প্রশিক্ষণ এলাকা।</span>
                </h2>
              </Reveal>
            </div>
          </div>
          <div className="v2-card-grid cols-2">
            {districtGroups.map(([division, districts], index) => (
              <Reveal key={division} delay={(index % 2) * 60} y={22}>
                <div className="v2-district">
                  <h3>{division} বিভাগ</h3>
                  <p>{districts}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="contact" className="v2-section v2-dark grain">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow on-dark">যোগাযোগ</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  ভর্তি সহায়তার জন্য <span className="v2-ink-accent">যোগাযোগ করুন।</span>
                </h2>
              </Reveal>
              <Reveal delay={140} className="v2-hero-cta">
                <Magnetic strength={0.2}>
                  <a className="v2-btn v2-btn-primary" href={`tel:${branch.phones[0]}`}>
                    <PhoneCall size={17} />
                    ব্রাঞ্চে ফোন করুন
                  </a>
                </Magnetic>
                <Link className="v2-btn v2-btn-ghost" href="/results/monthly">
                  <BookOpenCheck size={17} />
                  মাসিক ফলাফল
                </Link>
              </Reveal>
            </div>
            <div className="v2-contact">
              {contactItems.map((item, index) => (
                <Reveal key={item.label} delay={index * 70} className="v2-contact-row">
                  <item.icon size={20} />
                  <div>
                    <span>{item.label}</span>
                    <p>{item.value}</p>
                  </div>
                </Reveal>
              ))}
              <Reveal delay={210} className="v2-contact-row">
                <MapPin size={20} />
                <div>
                  <span>ইমেইল</span>
                  <p>{branch.email}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
