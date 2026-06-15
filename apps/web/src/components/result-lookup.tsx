"use client";

import { useState } from "react";
import { BadgeCheck, BookOpenCheck, Layers3, Search, Trophy } from "lucide-react";
import type { PublicAdmissionResult, PublicMonthlyResult } from "@/lib/cms-types";

type Mode = "admission" | "monthly";

const demoData = {
  admission: {
    roll: "JYP-7001",
    phone: "01332852670",
  },
  monthly: {
    phone: "01332852670",
  },
};

const admissionBatchOptions = ["৭ম ব্যাচ", "৬ষ্ঠ ব্যাচ"];
const monthlyBatchOptions = ["৬ষ্ঠ ব্যাচ", "৭ম ব্যাচ"];
const labOptions = [
  ["", "সব ল্যাব"],
  ["Lab A", "Lab A"],
  ["Lab B", "Lab B"],
  ["Lab C", "Lab C"],
];

const admissionStatusBn = {
  Selected: "নির্বাচিত",
  Waiting: "অপেক্ষমান",
  "Not Selected": "নির্বাচিত নয়",
};

export function ResultLookup({ mode }: { mode: Mode }) {
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [batch, setBatch] = useState(mode === "admission" ? "৭ম ব্যাচ" : "৬ষ্ঠ ব্যাচ");
  const [lab, setLab] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [admission, setAdmission] = useState<PublicAdmissionResult | null>(null);
  const [monthly, setMonthly] = useState<PublicMonthlyResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [lookupError, setLookupError] = useState("");

  const isAdmission = mode === "admission";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
    setLoading(true);
    setLookupError("");
    setAdmission(null);
    setMonthly([]);

    const response = await fetch(isAdmission ? "/api/results/admission" : "/api/results/monthly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(isAdmission ? { roll, phone, batch } : { phone, batch, lab: lab || undefined }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { result?: PublicAdmissionResult | null; results?: PublicMonthlyResult[]; error?: string }
      | null;

    setLoading(false);

    if (!response.ok) {
      setLookupError(payload?.error || "ফলাফল খুঁজে পাওয়া যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    if (isAdmission) {
      setAdmission(payload?.result || null);
    } else {
      setMonthly(payload?.results || []);
    }
  }

  return (
    <main className="v2">
      <section className="v2-page-hero">
        <div className="v2-hero-aurora" />
        <div className="v2-container">
          <div className="v2-result-grid">
            <div>
              <span className="v2-eyebrow">{isAdmission ? "ভর্তি পরীক্ষার ফলাফল" : "মাসিক পরীক্ষার ফলাফল"}</span>
              <h1 className="v2-h2 font-display" style={{ marginTop: 18 }}>
                {isAdmission ? (
                  <>
                    নিজের ভর্তি ফলাফল <span className="v2-ink-accent">দেখুন।</span>
                  </>
                ) : (
                  <>
                    নিজের মাসিক ফলাফল <span className="v2-ink-accent">দেখুন।</span>
                  </>
                )}
              </h1>
              <p className="v2-lead" style={{ marginTop: 18 }}>
                {isAdmission
                  ? "অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিলে শুধু নিজের ফলাফল দেখা যাবে। এখানে কোনো পাবলিক মেরিট তালিকা প্রকাশ করা হয় না।"
                  : "ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল দেখতে ব্যাচ, ল্যাব ও রেজিস্টার্ড ফোন নম্বর ব্যবহার করুন।"}
              </p>

              <div className="v2-demo">
                <span>ডেমো দিয়ে পরীক্ষা করুন</span>
                {isAdmission ? (
                  <>
                    <p>
                      রোল: <strong>{demoData.admission.roll}</strong>
                    </p>
                    <p>
                      ফোন: <strong>{demoData.admission.phone}</strong>
                    </p>
                  </>
                ) : (
                  <p>
                    ফোন: <strong>{demoData.monthly.phone}</strong>
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    if (isAdmission) {
                      setRoll(demoData.admission.roll);
                      setPhone(demoData.admission.phone);
                      setBatch("৭ম ব্যাচ");
                    } else {
                      setPhone(demoData.monthly.phone);
                      setBatch("৬ষ্ঠ ব্যাচ");
                      setLab("");
                    }
                    setSubmitted(false);
                  }}
                >
                  ডেমো তথ্য বসান
                </button>
              </div>
            </div>

            <div className="v2-result-panel">
              <form className="v2-form" onSubmit={handleSubmit}>
                {isAdmission ? (
                  <label className="v2-field">
                    রোল নম্বর
                    <input
                      value={roll}
                      onChange={(event) => setRoll(event.target.value)}
                      placeholder="JYP-7001"
                      required
                    />
                  </label>
                ) : null}
                <label className="v2-field">
                  ব্যাচ নির্বাচন
                  <select value={batch} onChange={(event) => setBatch(event.target.value)} required>
                    {(isAdmission ? admissionBatchOptions : monthlyBatchOptions).map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </label>
                {!isAdmission ? (
                  <label className="v2-field">
                    ল্যাব নির্বাচন
                    <select value={lab} onChange={(event) => setLab(event.target.value)}>
                      {labOptions.map(([value, label]) => (
                        <option key={label} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                ) : null}
                <label className="v2-field">
                  ফোন নম্বর
                  <input
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="01332852670"
                    required
                  />
                </label>
                <button className="v2-btn v2-btn-primary" type="submit" style={{ marginTop: 6 }}>
                  <Search size={18} />
                  {loading ? "ফলাফল খোঁজা হচ্ছে..." : "ফলাফল দেখুন"}
                </button>
              </form>

              <div style={{ marginTop: 26 }}>
                {lookupError ? <EmptyState text={lookupError} /> : null}
                {submitted && isAdmission ? (
                  admission ? (
                    <div className="v2-result-card">
                      <div className="head">
                        <div>
                          <p>প্রার্থী / {admission.batch}</p>
                          <h2>{admission.name}</h2>
                        </div>
                        <div className="chip">
                          <BadgeCheck size={16} />
                          {admissionStatusBn[admission.status]}
                        </div>
                      </div>
                      <div className="metrics">
                        <Metric label="লিখিত" value={admission.written} />
                        <Metric label="মৌখিক" value={admission.viva} />
                        <Metric label="মোট" value={admission.total} />
                      </div>
                      <p className="note">
                        দেওয়া রোল ও ফোন নম্বরের সঙ্গে মিল পাওয়া যাওয়ায় এই ব্যক্তিগত ফলাফল দেখানো হচ্ছে।
                      </p>
                    </div>
                  ) : (
                    <EmptyState text="এই রোল ও ফোন নম্বর দিয়ে কোনো ভর্তি ফলাফল পাওয়া যায়নি। তথ্য মিলিয়ে আবার চেষ্টা করুন।" />
                  )
                ) : null}

                {submitted && !isAdmission ? (
                  monthly.length ? (
                    <div style={{ display: "grid", gap: 12 }}>
                      {monthly.map((item) => (
                        <div key={item.id} className="v2-result-card">
                          <div className="head">
                            <div>
                              <p>
                                {item.batch} / {item.lab} / {item.month}
                              </p>
                              <h2>{item.subject}</h2>
                              <span>{item.name}</span>
                            </div>
                            <div className="chip green">
                              <Trophy size={16} />
                              {item.grade}
                            </div>
                          </div>
                          <div className="v2-progress" aria-label={`নম্বর ${item.score} এর মধ্যে ${item.maxScore}`}>
                            <div style={{ width: `${Math.min(100, Math.max(0, (item.score / item.maxScore) * 100))}%` }} />
                          </div>
                          <p className="score-line">
                            নম্বর: {item.score}/{item.maxScore}
                          </p>
                          <div className="metrics">
                            <Metric label="মেরিট" value={item.displayedMerit} />
                            <Metric label="সার্বিক" value={item.overallMerit} />
                            <Metric label={`${item.lab} মেরিট`} value={item.labMerit} />
                          </div>
                          <p className="note">
                            <Layers3 size={14} />
                            {item.meritMode === "LAB_ONLY"
                              ? "এই ফলাফলে শুধু নির্বাচিত ল্যাবের মেরিট দেখানো হচ্ছে।"
                              : "এই ফলাফলে সব ল্যাব মিলিয়ে মেরিট দেখানো হচ্ছে।"}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState text="এই ফোন নম্বর দিয়ে কোনো মাসিক ফলাফল পাওয়া যায়নি। রেজিস্টার্ড নম্বরটি ঠিক আছে কি না দেখে আবার চেষ্টা করুন।" />
                  )
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="v2-section tight">
        <div className="v2-container">
          <div className="v2-card-grid cols-2">
            <div className="v2-tile">
              <span className="v2-tile-icon">
                <BadgeCheck size={24} />
              </span>
              <h3>ভর্তি পরীক্ষার ফলাফল</h3>
              <p>অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিয়ে ব্যক্তিগত ফলাফল দেখা যাবে।</p>
            </div>
            <div className="v2-tile">
              <span className="v2-tile-icon">
                <BookOpenCheck size={24} />
              </span>
              <h3>মাসিক পরীক্ষার ফলাফল</h3>
              <p>ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল রেজিস্টার্ড ফোন নম্বর দিয়েই দেখা যাবে।</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="v2-metric">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="v2-empty">{text}</div>;
}
