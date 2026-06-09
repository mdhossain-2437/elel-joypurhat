"use client";

import { useState } from "react";
import { BadgeCheck, BookOpenCheck, Search, Trophy } from "lucide-react";
import type { MonthlyResultEntry, PublicAdmissionResult } from "@/lib/cms-types";

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

const admissionStatusBn = {
  Selected: "নির্বাচিত",
  Waiting: "অপেক্ষমান",
  "Not Selected": "নির্বাচিত নয়",
};

export function ResultLookup({ mode }: { mode: Mode }) {
  const [roll, setRoll] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [admission, setAdmission] = useState<PublicAdmissionResult | null>(null);
  const [monthly, setMonthly] = useState<MonthlyResultEntry[]>([]);
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
      body: JSON.stringify(isAdmission ? { roll, phone } : { phone }),
    });

    const payload = (await response.json().catch(() => null)) as
      | { result?: PublicAdmissionResult | null; results?: MonthlyResultEntry[]; error?: string }
      | null;

    setLoading(false);

    if (!response.ok) {
      setLookupError(payload?.error || "ফলাফল খুঁজে পাওয়া যায়নি। আবার চেষ্টা করুন।");
      return;
    }

    if (isAdmission) {
      setAdmission(payload?.result || null);
    } else {
      setMonthly(payload?.results || []);
    }
  }

  return (
    <main className="site-shell">
      <section className="result-portal section-light">
        <div className="site-container result-portal-grid">
          <div className="result-copy">
            <p className="kicker-light">{isAdmission ? "ভর্তি পরীক্ষার ফলাফল" : "মাসিক পরীক্ষার ফলাফল"}</p>
            <h1 className="section-heading mt-4">
              {isAdmission ? "নিজের ভর্তি পরীক্ষার ফলাফল দেখুন।" : "নিজের মাসিক পরীক্ষার ফলাফল দেখুন।"}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700">
              {isAdmission
                ? "অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিলে শুধু নিজের ফলাফল দেখা যাবে। এখানে কোনো পাবলিক মেরিট তালিকা প্রকাশ করা হয় না।"
                : "ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল দেখতে রেজিস্টার্ড ফোন নম্বর ব্যবহার করুন।"}
            </p>

            <div className="demo-result-card">
              <span>ডেমো দিয়ে পরীক্ষা করুন</span>
              {isAdmission ? (
                <>
                  <p>রোল: <strong>{demoData.admission.roll}</strong></p>
                  <p>ফোন: <strong>{demoData.admission.phone}</strong></p>
                </>
              ) : (
                <p>ফোন: <strong>{demoData.monthly.phone}</strong></p>
              )}
              <button
                type="button"
                onClick={() => {
                  if (isAdmission) {
                    setRoll(demoData.admission.roll);
                    setPhone(demoData.admission.phone);
                  } else {
                    setPhone(demoData.monthly.phone);
                  }
                  setSubmitted(false);
                }}
              >
                ডেমো তথ্য বসান
              </button>
            </div>
          </div>

          <div className="result-panel">
            <form
              className="grid gap-4"
              onSubmit={handleSubmit}
            >
              {isAdmission ? (
                <label className="form-label">
                  রোল নম্বর
                  <input
                    value={roll}
                    onChange={(event) => setRoll(event.target.value)}
                    className="form-input"
                    placeholder="JYP-7001"
                    required
                  />
                </label>
              ) : null}
              <label className="form-label">
                ফোন নম্বর
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  className="form-input"
                  placeholder="01332852670"
                  required
                />
              </label>
              <button className="button-primary mt-2" type="submit">
                <Search size={18} />
                {loading ? "ফলাফল খোঁজা হচ্ছে..." : "ফলাফল দেখুন"}
              </button>
            </form>

            <div className="mt-7">
              {lookupError ? <EmptyState text={lookupError} /> : null}
              {submitted && isAdmission ? (
                admission ? (
                  <div className="result-card">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-sm font-bold text-zinc-500">প্রার্থী</p>
                        <h2 className="mt-1 text-2xl font-black text-zinc-950">{admission.name}</h2>
                      </div>
                      <div className="status-chip">
                        <BadgeCheck size={16} />
                        {admissionStatusBn[admission.status]}
                      </div>
                    </div>
                    <div className="mt-6 grid grid-cols-3 gap-3">
                      <Metric label="লিখিত" value={admission.written} />
                      <Metric label="মৌখিক" value={admission.viva} />
                      <Metric label="মোট" value={admission.total} />
                    </div>
                    <p className="mt-5 text-sm leading-6 text-zinc-600">
                      দেওয়া রোল ও ফোন নম্বরের সঙ্গে মিল পাওয়া যাওয়ায় এই ব্যক্তিগত ফলাফল দেখানো হচ্ছে।
                    </p>
                  </div>
                ) : (
                  <EmptyState text="এই রোল ও ফোন নম্বর দিয়ে কোনো ভর্তি ফলাফল পাওয়া যায়নি। তথ্য মিলিয়ে আবার চেষ্টা করুন।" />
                )
              ) : null}

              {submitted && !isAdmission ? (
                monthly.length ? (
                  <div className="grid gap-3">
                    {monthly.map((item: MonthlyResultEntry) => (
                      <div key={`${item.phone}-${item.month}-${item.subject}`} className="result-card">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-zinc-500">{item.batch} / {item.month}</p>
                            <h2 className="mt-1 text-xl font-black text-zinc-950">{item.subject}</h2>
                            <p className="mt-1 text-sm text-zinc-600">{item.name}</p>
                          </div>
                          <div className="grade-chip">
                            <Trophy size={16} />
                            {item.grade}
                          </div>
                        </div>
                        <div className="mt-5 h-2 rounded-full bg-zinc-200">
                          <div
                            className="h-2 rounded-full bg-[#118040]"
                            style={{ width: `${(item.score / item.maxScore) * 100}%` }}
                          />
                        </div>
                        <p className="mt-3 text-sm text-zinc-600">
                          নম্বর: {item.score}/{item.maxScore}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EmptyState text="এই ফোন নম্বর দিয়ে কোনো মাসিক ফলাফল পাওয়া যায়নি। রেজিস্টার্ড নম্বরটি ঠিক আছে কি না দেখে আবার চেষ্টা করুন।" />
                )
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-white">
        <div className="site-container grid gap-5 md:grid-cols-2">
          <div className="result-guide-card">
            <BadgeCheck size={26} />
            <h2>ভর্তি পরীক্ষার ফলাফল</h2>
            <p>অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিয়ে ব্যক্তিগত ফলাফল দেখা যাবে।</p>
          </div>
          <div className="result-guide-card">
            <BookOpenCheck size={26} />
            <h2>মাসিক পরীক্ষার ফলাফল</h2>
            <p>ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল রেজিস্টার্ড ফোন নম্বর দিয়েই দেখা যাবে।</p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="metric-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <div className="empty-result-state">{text}</div>;
}
