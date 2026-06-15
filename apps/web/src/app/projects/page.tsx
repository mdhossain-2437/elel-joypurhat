import Link from "next/link";
import { ArrowUpRight, BadgeCheck, BriefcaseBusiness, CheckCircle2, Landmark } from "lucide-react";
import { admissionNotice } from "@/lib/content";
import { Reveal } from "@/components/motion";

const projects = [
  {
    code: "P-01",
    title: "যুব উন্নয়ন ফ্রিল্যান্সিং প্রকল্প",
    type: "সরকারি প্রকল্প",
    status: "ভর্তি চলছে",
    detail:
      "দেশের ৬৪ জেলায় শিক্ষিত কর্মপ্রত্যাশী যুবদের ফ্রিল্যান্সিং প্রশিক্ষণ দিয়ে আত্মকর্মসংস্থানের পথে এগিয়ে নেওয়ার উদ্যোগ।",
    href: "/courses/jubo-freelancing",
    icon: Landmark,
  },
  {
    code: "P-02",
    title: "পেইড ক্যারিয়ার কোর্স",
    type: "ইনস্টিটিউট প্রোগ্রাম",
    status: "শিগগির শুরু হবে",
    detail:
      "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ওয়েব স্কিল ও ফ্রিল্যান্সিং প্রস্তুতি নিয়ে ভবিষ্যতের পেইড কোর্স।",
    href: "/courses",
    icon: BriefcaseBusiness,
  },
  {
    code: "P-03",
    title: "নোটিশ ও ফলাফল কেন্দ্র",
    type: "শিক্ষার্থী সেবা",
    status: "চালু আছে",
    detail:
      "ভর্তি ফলাফল, ক্লাস টেস্টের ফলাফল, অফিসিয়াল নোটিশ ও ব্রাঞ্চ আপডেট শিক্ষার্থীদের জন্য এক জায়গায় রাখা হয়েছে।",
    href: "/notices",
    icon: BadgeCheck,
  },
];

const projectModules = [
  ["ভর্তি ব্যবস্থাপনা", "আবেদন নির্দেশনা, অ্যাডমিট কার্ড, লিখিত ও মৌখিক পরীক্ষার সময়সূচি পরিষ্কারভাবে প্রকাশ করা যায়।"],
  ["কোর্স সম্প্রসারণ", "সরকারি প্রকল্প, পেইড কোর্স, কর্মশালা ও ভবিষ্যতের ব্রাঞ্চ প্রোগ্রাম একই কাঠামোতে যুক্ত করা যায়।"],
  ["ব্যক্তিগত ফলাফল", "ভর্তি ফলাফল রোল ও ফোন দিয়ে, আর মাসিক ফলাফল শুধু ফোন নম্বর দিয়ে দেখা যাবে।"],
  ["নোটিশ প্রকাশ", "ব্রাঞ্চ নোটিশ, সময়সীমা, পরীক্ষার সময়সূচি ও ফলাফল ঘোষণা কনটেন্ট প্যানেল থেকে প্রকাশ করা যাবে।"],
  ["অ্যাডমিন প্যানেল", "অডিট লগ, সুরক্ষিত অনুরোধ নিয়ন্ত্রণ ও প্রকাশ ব্যবস্থাসহ অ্যাডমিন ড্যাশবোর্ড।"],
  ["ব্রাঞ্চ সহায়তা", "ঠিকানা, ফোন, ইমেইল, টিম ও শিক্ষার্থী সহায়তা এক জায়গায় সাজানো থাকবে।"],
];

const workflow = [
  ["০১", "প্রোগ্রাম প্রকাশ", "অ্যাডমিন কনটেন্ট প্যানেল থেকে কোর্স বা প্রকল্পের তথ্য প্রকাশ করা হয়।"],
  ["০২", "শিক্ষার্থীকে জানানো", "নোটিশ ও কোর্স পেজে সময়সীমা, পরীক্ষার তারিখ ও নির্দেশনা দেওয়া হয়।"],
  ["০৩", "প্রশিক্ষণ পরিচালনা", "সরাসরি ক্লাস, অনুশীলন, উপস্থিতি ও মাসিক মূল্যায়নের মাধ্যমে শেখার অগ্রগতি দেখা হয়।"],
  ["০৪", "ফলাফল প্রকাশ", "সুরক্ষিত ড্যাশবোর্ড থেকে শুধু ব্যক্তিগত ফলাফল দেখা চালু করা হয়।"],
];

export const metadata = {
  title: "প্রকল্প ও প্রোগ্রাম",
};

export default function ProjectsPage() {
  return (
    <main className="v2">
      <section className="v2-page-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <Reveal>
            <span className="v2-eyebrow">জয়পুরহাট ব্রাঞ্চের রোডম্যাপ</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="v2-display font-display">
              প্রকল্প ও <span className="v2-ink-accent">প্রোগ্রাম।</span>
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p className="v2-lead">
              চলমান সরকারি প্রশিক্ষণ প্রকল্প, ভবিষ্যতের পেইড কোর্স এবং শিক্ষার্থী সেবাগুলো একটি পূর্ণাঙ্গ
              ইনস্টিটিউট ওয়েবসাইটের মতো সুসংগঠিতভাবে সাজানো হয়েছে।
            </p>
          </Reveal>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-rows">
            {projects.map((project, index) => (
              <Reveal key={project.code} delay={index * 80} y={28}>
                <article className="v2-row">
                  <div className="code">{project.code}</div>
                  <div className="title">
                    <span>{project.type}</span>
                    <h3>{project.title}</h3>
                  </div>
                  <p className="copy">{project.detail}</p>
                  <div className="meta">
                    <em>{project.status}</em>
                    <em>{admissionNotice.batch}</em>
                  </div>
                  <Link className="go" href={project.href} aria-label={`${project.title} বিস্তারিত`}>
                    <project.icon size={22} />
                    <ArrowUpRight size={18} />
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section v2-dark grain">
        <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
          <div className="v2-section-head split">
            <div>
              <Reveal>
                <span className="v2-eyebrow on-dark">সিস্টেম মডিউল</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  এক <span className="v2-outline-text">পরিচ্ছন্ন সিস্টেমে।</span>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={140}>
              <p className="v2-lead">
                এখানে শুধু প্রকল্পের তালিকা নয়; ভর্তি, নোটিশ, প্রশিক্ষণ, ফলাফল ও কনটেন্ট নিয়ন্ত্রণের পুরো কাজের
                ধারা দেখানো হয়েছে।
              </p>
            </Reveal>
          </div>
          <div className="v2-card-grid cols-3">
            {projectModules.map(([title, detail], index) => (
              <Reveal key={title} delay={(index % 3) * 80} y={26}>
                <div className="v2-tile is-ink">
                  <span className="v2-tile-icon">
                    <CheckCircle2 size={22} />
                  </span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-stack">
            <div className="v2-stack-copy">
              <Reveal>
                <span className="v2-eyebrow">কাজের ধারা</span>
              </Reveal>
              <Reveal delay={80}>
                <h2 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                  নোটিশ থেকে ফলাফল—<span className="v2-ink-accent">নির্ভরযোগ্য ধারা।</span>
                </h2>
              </Reveal>
            </div>
            <div className="v2-stack-cards">
              {workflow.map(([step, title, detail]) => (
                <Reveal key={step} className="v2-stack-card" y={26}>
                  <span className="idx">{step}</span>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
