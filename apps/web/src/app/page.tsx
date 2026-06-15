import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpenCheck,
  BriefcaseBusiness,
  CalendarDays,
  GraduationCap,
  Landmark,
  MapPin,
  MonitorCheck,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Counter, KineticText, Magnetic, Marquee, Reveal } from "@/components/motion";
import { SuccessStoryMarquee } from "@/components/success-story-marquee";
import { TeamShowcase } from "@/components/team-showcase";
import { admissionNotice, branch, contactItems } from "@/lib/content";
import { getCourses, getPublishedSuccessStories, getPublishedTeamMembers } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

const stripWords = [
  "সরকারি প্রশিক্ষণ",
  "ফ্রিল্যান্সিং",
  "পেইড কোর্স",
  "ফলাফল পোর্টাল",
  "ক্যারিয়ার প্রস্তুতি",
  "ব্রাঞ্চ সহায়তা",
];

const journey = [
  ["০১", "আবেদন", "শেষ সময়, যোগ্যতা ও অ্যাডমিট কার্ডের নির্দেশনা এক জায়গা থেকে পরিষ্কারভাবে জানা যাবে।", "১৫ জুন"],
  ["০২", "প্রস্তুতি", "লিখিত ও মৌখিক পরীক্ষার আগে কী করতে হবে, কোন তথ্য সঙ্গে রাখতে হবে—সব সাজানো থাকবে।", "২০–২১ জুন"],
  ["০৩", "ক্লাস", "নির্দিষ্ট ল্যাবে সরাসরি ক্লাস, হাতে-কলমে অনুশীলন ও প্রশিক্ষকের ফিডব্যাক নিয়মিত চলবে।", "৬০০ ঘণ্টা"],
  ["০৪", "ফলাফল", "ক্লাস টেস্ট ও মাসিক মূল্যায়নের ফলাফল নিজের ফোন নম্বর দিয়ে নিরাপদে দেখা যাবে।", "নিজস্ব ফলাফল"],
];

const lessonPath = [
  ["ভিত্তি তৈরি", "অফিস অ্যাপ্লিকেশন, ইংরেজি, অনলাইন কাজের নিয়ম ও কম্পিউটার ব্যবহারের আত্মবিশ্বাস তৈরি হয়।"],
  ["স্কিল অনুশীলন", "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ভিডিও এডিটিং ও বাস্তব ক্লাস টাস্কে দক্ষতা গড়ে ওঠে।"],
  ["মার্কেট প্রস্তুতি", "মার্কেটপ্লেস পরিচিতি, ক্লায়েন্ট যোগাযোগ, পোর্টফোলিও ও কাজ জমা দেওয়ার প্রস্তুতি।"],
  ["ফলাফল ও ফলোআপ", "মাসিক মূল্যায়ন, ব্যক্তিগত ফলাফল, দুর্বল জায়গায় সহায়তা ও পরবর্তী শেখার পরামর্শ।"],
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
    <main className="v2">
      {/* ============================= HERO ============================= */}
      <section className="v2-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <div className="v2-hero-grid">
            <div>
              <Reveal>
                <span className="v2-eyebrow">
                  <Sparkles size={14} /> ই-লার্নিং এন্ড আর্নিং লিমিটেড · জয়পুরহাট ব্রাঞ্চ
                </span>
              </Reveal>
              <h1 className="font-display" style={{ marginTop: 22 }}>
                <span className="kinetic-line">
                  <KineticText text="দক্ষতা শিখুন," />
                </span>
                <span className="kinetic-line">
                  <KineticText text="ভবিষ্যৎ" className="v2-ink-accent" />{" "}
                  <KineticText text="গড়ুন।" />
                </span>
              </h1>
              <Reveal delay={120}>
                <p className="v2-hero-sub">
                  সরকারি প্রশিক্ষণ, পেইড কোর্স, ভর্তি নোটিশ, ফলাফল ও ব্রাঞ্চ সহায়তা—জয়পুরহাটের প্রয়োজনীয় সব
                  তথ্য এখন একটি নির্ভরযোগ্য প্ল্যাটফর্মে।
                </p>
              </Reveal>
              <Reveal delay={200} className="v2-hero-cta">
                <Magnetic strength={0.22}>
                  <Link className="v2-btn v2-btn-primary" href="/courses">
                    কোর্সগুলো দেখুন
                    <ArrowUpRight size={18} />
                  </Link>
                </Magnetic>
                <Link className="v2-btn v2-btn-ghost" href="/courses/jubo-freelancing">
                  <CalendarDays size={17} />
                  ৭ম ব্যাচে ভর্তি
                </Link>
              </Reveal>
            </div>

            <Reveal delay={160} y={40}>
              <div className="v2-hero-card">
                <div className="v2-hero-card-inner grain">
                  <p className="label" style={{ position: "relative", zIndex: 2 }}>
                    এখন চলছে · {admissionNotice.batch}
                  </p>
                  <h3 style={{ position: "relative", zIndex: 2 }}>যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণ</h3>
                  <div className="v2-hero-card-meta" style={{ position: "relative", zIndex: 2 }}>
                    <div>
                      <span>শেষ সময়</span>
                      <strong>{admissionNotice.deadline}</strong>
                    </div>
                    <div>
                      <span>লিখিত পরীক্ষা</span>
                      <strong>{admissionNotice.writtenExam}</strong>
                    </div>
                    <div>
                      <span>আসন</span>
                      <strong>৭৫ জন</strong>
                    </div>
                    <div>
                      <span>দৈনিক ভাতা</span>
                      <strong>২০০৳</strong>
                    </div>
                  </div>
                  <Link
                    className="v2-hero-card-cta"
                    href="/courses/jubo-freelancing"
                    style={{ position: "relative", zIndex: 2 }}
                  >
                    ভর্তি নির্দেশনা দেখুন
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="v2-hero-stats">
            <div className="v2-hero-stat">
              <strong>
                <Counter to={600} suffix="+" />
              </strong>
              <span>ঘণ্টা প্রশিক্ষণ</span>
            </div>
            <div className="v2-hero-stat">
              <strong>
                <Counter to={75} />
              </strong>
              <span>আসন প্রতি ব্যাচ</span>
            </div>
            <div className="v2-hero-stat">
              <strong>
                <Counter to={9} suffix="+" />
              </strong>
              <span>স্কিল ট্র্যাক</span>
            </div>
            <div className="v2-hero-stat">
              <strong>
                <Counter to={2} />
              </strong>
              <span>ফলাফল পোর্টাল</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================= MARQUEE STRIP ============================= */}
      <section className="v2-strip grain" style={{ position: "relative" }}>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Marquee speed={28}>
            {stripWords.map((word) => (
              <span className="v2-strip-item" key={word}>
                <span className="v2-strip-dot" />
                <i>{word}</i>
              </span>
            ))}
          </Marquee>
        </div>
      </section>

      {/* ============================= STUDENT JOURNEY ============================= */}
      <section className="v2-section">
        <div className="v2-container">
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow">শিক্ষার্থীর পথচলা</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  আবেদন থেকে ফলাফল—<br />
                  <span className="v2-ink-accent">প্রতিটি ধাপ স্পষ্ট।</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="v2-lead">
                নতুন শিক্ষার্থীর সবচেয়ে বড় প্রয়োজন পরিষ্কার নির্দেশনা। তাই পুরো যাত্রা গল্পের মতো ধাপে ধাপে
                সাজানো—আজ কী করবেন, পরের ধাপে কী আসবে, কোথায় সাহায্য পাবেন।
              </p>
            </Reveal>
          </div>

          <div className="v2-steps">
            {journey.map(([num, title, text, badge], index) => (
              <Reveal key={title} delay={index * 90} className="v2-step">
                <span className="num">{num}</span>
                <span className="badge">{badge}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= PROGRAMS / BENTO (DARK) ============================= */}
      <section className="v2-section v2-dark grain">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow on-dark">প্রোগ্রাম ও প্রকল্প</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  এক ব্রাঞ্চে শেখার <span className="v2-outline-text">অনেক পথ।</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="v2-lead">
                আজকের সরকারি প্রকল্প, আগামী দিনের পেইড কোর্স ও কর্মশালা—সবকিছু এমনভাবে সাজানো, যেন শিক্ষার্থী
                নিজের লক্ষ্য অনুযায়ী পথ বেছে নিতে পারে।
              </p>
            </Reveal>
          </div>

          <div className="v2-bento">
            <Reveal className="v2-tile is-orange col-3 row-2" y={36}>
              <span className="v2-tile-icon">
                <Landmark size={26} />
              </span>
              <h3>যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণ</h3>
              <p>
                ৬৪ জেলা প্রকল্পের ভর্তি, সরাসরি ক্লাস, লিখিত ও মৌখিক পরীক্ষা, ভাতা এবং ফলাফল প্রকাশ—পুরো
                প্রক্রিয়া এক জায়গায়।
              </p>
              <Link className="v2-btn v2-btn-ghost" href="/courses/jubo-freelancing" style={{ marginTop: 24 }}>
                বিস্তারিত দেখুন
                <ArrowUpRight size={17} />
              </Link>
            </Reveal>

            <Reveal className="v2-tile is-ink col-3" delay={80}>
              <span className="big-num">৭৫</span>
              <p style={{ marginTop: 8 }}>প্রতি ব্যাচে আসন, ৩ মাসে ৬০০ ঘণ্টা সরাসরি প্রশিক্ষণ।</p>
            </Reveal>

            <Reveal className="v2-tile col-3" delay={140}>
              <span className="v2-tile-icon">
                <BriefcaseBusiness size={24} />
              </span>
              <h3>পেইড ক্যারিয়ার কোর্স</h3>
              <p>ডিজিটাল মার্কেটিং, ডিজাইন, ওয়েবসহ ক্যারিয়ার-কেন্দ্রিক ভবিষ্যৎ কোর্স ধাপে ধাপে যুক্ত হবে।</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================= LEARNING PATH (STICKY STACK) ============================= */}
      <section className="v2-section">
        <div className="v2-container">
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow">লার্নিং জার্নি</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  ক্লাসের ভেতরের শেখাটা বাইরে থেকেও স্পষ্ট।
                </h2>
              </Reveal>
              <Reveal delay={140}>
                <p className="v2-lead" style={{ marginTop: 20 }}>
                  বিশ্বমানের কোর্স-জার্নি অভিজ্ঞতা থেকে অনুপ্রাণিত হয়ে শেখার ধাপগুলো পথচিত্র আকারে সাজানো,
                  তবে সবকিছু জয়পুরহাট ব্রাঞ্চের বাস্তব কাঠামোর সঙ্গে মিলিয়ে।
                </p>
              </Reveal>
            </div>
            <div className="v2-stack-cards">
              {lessonPath.map(([title, text], index) => (
                <Reveal key={title} delay={index * 60} className="v2-stack-card" y={34}>
                  <span className="idx">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= FEATURED COURSES ============================= */}
      {featuredCourses.length > 0 ? (
        <section className="v2-section tight">
          <div className="v2-container">
            <div className="v2-section-head split">
              <div>
                <Reveal>
                  <span className="v2-eyebrow">চলমান ও আসন্ন কোর্স</span>
                </Reveal>
                <Reveal delay={80}>
                  <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                    আপনার পরবর্তী <span className="v2-ink-accent">স্কিল ট্র্যাক।</span>
                  </h2>
                </Reveal>
              </div>
              <Reveal delay={140}>
                <Link className="v2-btn v2-btn-ink" href="/courses">
                  সব কোর্স দেখুন
                  <ArrowUpRight size={17} />
                </Link>
              </Reveal>
            </div>

            <div className="v2-card-grid cols-3">
              {featuredCourses.map((course, index) => {
                const CourseIcon = getCourseIcon(`${course.type} ${course.title}`);
                return (
                  <Reveal key={course.id} delay={index * 90} y={34}>
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
      ) : null}

      {/* ============================= SUCCESS STORIES ============================= */}
      <SuccessStoryMarquee stories={successStories} />

      {/* ============================= RESULT PORTALS (DARK) ============================= */}
      <section id="results" className="v2-section v2-dark grain">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow on-dark">শিক্ষার্থী সেবা</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  নিজের ফলাফল, <span className="v2-outline-text">নিরাপদে।</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="v2-lead">
                শিক্ষার্থীকে লগইন করতে হয় না—রোল ও ফোন নম্বর যাচাই করে শুধু নিজের ফলাফল দেখানো হয়।
              </p>
            </Reveal>
          </div>

          <div className="v2-portal">
            <Reveal y={34}>
              <Link href="/results/admission" className="v2-portal-card">
                <BadgeCheck className="ic" size={32} />
                <div>
                  <h3>ভর্তি পরীক্ষার ফলাফল</h3>
                  <p>অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিয়ে নিজের ফলাফল দেখুন।</p>
                </div>
                <span className="go">
                  রোল + ফোন <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
            <Reveal delay={100} y={34}>
              <Link href="/results/monthly" className="v2-portal-card green">
                <BookOpenCheck className="ic" size={32} />
                <div>
                  <h3>মাসিক পরীক্ষার ফলাফল</h3>
                  <p>ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল রেজিস্টার্ড ফোন নম্বর দিয়ে দেখুন।</p>
                </div>
                <span className="go">
                  শুধু ফোন <ArrowUpRight size={18} />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================= TEAM ============================= */}
      <TeamShowcase members={teamMembers} />

      {/* ============================= CONTACT (DARK) ============================= */}
      <section id="contact" className="v2-section v2-dark grain">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow on-dark">যোগাযোগ</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  প্রশ্ন থাকলে ব্রাঞ্চে <span className="v2-ink-accent">যোগাযোগ করুন।</span>
                </h2>
              </Reveal>
              <Reveal delay={140} className="v2-hero-cta">
                <Magnetic strength={0.2}>
                  <a className="v2-btn v2-btn-primary" href={`tel:${branch.phones[0]}`}>
                    <PhoneCall size={17} />
                    ফোন করুন
                  </a>
                </Magnetic>
                <Link className="v2-btn v2-btn-ghost" href="/courses">
                  <GraduationCap size={17} />
                  কোর্স দেখুন
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
