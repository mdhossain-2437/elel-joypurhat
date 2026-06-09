import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Landmark,
} from "lucide-react";
import { admissionNotice } from "@/lib/content";

const projects = [
  {
    code: "P-01",
    title: "যুব উন্নয়ন ফ্রিল্যান্সিং প্রকল্প",
    type: "সরকারি প্রকল্প",
    status: "ভর্তি চলছে",
    detail: "দেশের ৬৪ জেলায় শিক্ষিত কর্মপ্রত্যাশী যুবদের ফ্রিল্যান্সিং প্রশিক্ষণ দিয়ে আত্মকর্মসংস্থানের পথে এগিয়ে নেওয়ার উদ্যোগ।",
    href: "/courses/jubo-freelancing",
    icon: Landmark,
  },
  {
    code: "P-02",
    title: "পেইড ক্যারিয়ার কোর্স",
    type: "ইনস্টিটিউট প্রোগ্রাম",
    status: "শিগগির শুরু হবে",
    detail: "ডিজিটাল মার্কেটিং, গ্রাফিক ডিজাইন, ওয়েব স্কিল ও ফ্রিল্যান্সিং প্রস্তুতি নিয়ে ভবিষ্যতের পেইড কোর্স।",
    href: "/courses",
    icon: BriefcaseBusiness,
  },
  {
    code: "P-03",
    title: "নোটিশ ও ফলাফল কেন্দ্র",
    type: "শিক্ষার্থী সেবা",
    status: "চালু আছে",
    detail: "ভর্তি ফলাফল, ক্লাস টেস্টের ফলাফল, অফিসিয়াল নোটিশ ও ব্রাঞ্চ আপডেট শিক্ষার্থীদের জন্য এক জায়গায় রাখা হয়েছে।",
    href: "/notices",
    icon: BadgeCheck,
  },
];

const projectModules = [
  ["ভর্তি ব্যবস্থাপনা", "আবেদন নির্দেশনা, অ্যাডমিট কার্ড, লিখিত পরীক্ষা ও মৌখিক পরীক্ষার সময়সূচি পরিষ্কারভাবে প্রকাশ করা যায়।"],
  ["কোর্স সম্প্রসারণ", "সরকারি প্রকল্প, পেইড কোর্স, কর্মশালা ও ভবিষ্যতের ব্রাঞ্চ প্রোগ্রাম একই কাঠামোতে যুক্ত করা যায়।"],
  ["ব্যক্তিগত ফলাফল", "ভর্তি ফলাফল রোল ও ফোন দিয়ে, আর মাসিক ফলাফল শুধু ফোন নম্বর দিয়ে দেখা যাবে।"],
  ["নোটিশ প্রকাশ", "ব্রাঞ্চ নোটিশ, সময়সীমা, পরীক্ষার সময়সূচি ও ফলাফল ঘোষণা কনটেন্ট প্যানেল থেকে প্রকাশ করা যাবে।"],
  ["অ্যাডমিন কনটেন্ট প্যানেল", "অডিট লগ, সুরক্ষিত অনুরোধ নিয়ন্ত্রণ ও প্রকাশ ব্যবস্থাসহ অ্যাডমিন ড্যাশবোর্ড।"],
  ["ব্রাঞ্চ সহায়তা", "ঠিকানা, ফোন, ইমেইল, টিম ও শিক্ষার্থী সহায়তা এক জায়গায় সাজানো থাকবে।"],
];

const workflow = [
  ["০১", "প্রোগ্রাম প্রকাশ", "অ্যাডমিন কনটেন্ট প্যানেল থেকে কোর্স বা প্রকল্পের তথ্য প্রকাশ করা হয়।"],
  ["০২", "শিক্ষার্থীকে জানানো", "নোটিশ ও কোর্স পেজে সময়সীমা, পরীক্ষার তারিখ ও নির্দেশনা দেওয়া হয়।"],
  ["০৩", "প্রশিক্ষণ পরিচালনা", "সরাসরি ক্লাস, অনুশীলন, উপস্থিতি ও মাসিক মূল্যায়নের মাধ্যমে শেখার অগ্রগতি দেখা হয়।"],
  ["০৪", "ফলাফল প্রকাশ", "সুরক্ষিত ড্যাশবোর্ড থেকে শুধু ব্যক্তিগত ফলাফল দেখা চালু করা হয়।"],
];

export const metadata = {
  title: "প্রকল্প ও প্রোগ্রাম",
};

export default function ProjectsPage() {
  return (
    <main className="site-shell">
      <section className="architecture-section min-h-screen">
        <div className="architecture-marquee" aria-hidden="true">
          <span>চলমান প্রকল্প</span>
          <i />
          <span>ভবিষ্যৎ প্রোগ্রাম</span>
          <i />
          <span>শিক্ষার্থী সেবা</span>
        </div>
        <div className="site-container">
          <div className="architecture-head">
            <div>
              <p>জয়পুরহাট ব্রাঞ্চের রোডম্যাপ</p>
              <h1>
                প্রকল্প{" "}
                <br />
                <span>ও প্রোগ্রাম</span>
              </h1>
            </div>
            <p>
              চলমান সরকারি প্রশিক্ষণ প্রকল্প, ভবিষ্যতের পেইড কোর্স এবং শিক্ষার্থী সেবাগুলো একটি পূর্ণাঙ্গ ইনস্টিটিউট ওয়েবসাইটের মতো সুসংগঠিতভাবে সাজানো হয়েছে।
            </p>
          </div>
          <div className="architecture-list">
            {projects.map((project) => (
              <article key={project.code} className="architecture-row">
                <div className="architecture-code">{project.code}</div>
                <div className="architecture-title">
                  <span>{project.type}</span>
                  <h3>{project.title}</h3>
                </div>
                <div className="architecture-copy">
                  <p>{project.detail}</p>
                  <div>
                    <em>{project.status}</em>
                    <em>{project.type}</em>
                    <em>{admissionNotice.batch}</em>
                  </div>
                </div>
                <div className="architecture-stats">
                  <strong>
                    <project.icon size={26} />
                    <span>দেখুন</span>
                  </strong>
                  <Link href={project.href}>
                    বিস্তারিত
                    <ArrowRight size={16} />
                  </Link>
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
              <p className="kicker-light">সিস্টেম মডিউল</p>
              <h2 className="section-heading mt-4">ব্রাঞ্চ পরিচালনার প্রয়োজনীয় কাজ এক পরিচ্ছন্ন সিস্টেমে।</h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-zinc-600">
              এখানে শুধু প্রকল্পের তালিকা নয়; ভর্তি, নোটিশ, প্রশিক্ষণ, ফলাফল ও কনটেন্ট নিয়ন্ত্রণের পুরো কাজের ধারা দেখানো হয়েছে।
            </p>
          </div>
          <div className="project-module-grid mt-10">
            {projectModules.map(([title, detail]) => (
              <article key={title} className="project-module-card">
                <CheckCircle2 size={22} />
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-light">
        <div className="site-container project-workflow-panel">
          <div>
            <p className="kicker-light">কাজের ধারা</p>
            <h2 className="section-heading mt-4">ভর্তি নোটিশ থেকে ব্যক্তিগত ফলাফল প্রকাশ পর্যন্ত একটি নির্ভরযোগ্য ধারা।</h2>
          </div>
          <div className="project-workflow-list">
            {workflow.map(([step, title, detail]) => (
              <article key={step}>
                <span>{step}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
