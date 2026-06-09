import { Suspense } from "react";
import { KeyRound, ShieldCheck } from "lucide-react";
import { AdminLoginForm } from "@/components/admin-login-form";

export const metadata = {
  title: "অ্যাডমিন লগইন",
};

export default function AdminLoginPage() {
  return (
    <main className="site-shell">
      <section className="admin-login-section">
        <div className="site-container admin-hero-grid">
          <div>
            <p className="kicker-light">সুরক্ষিত অ্যাডমিন</p>
            <h1 className="section-heading mt-4">জয়পুরহাট কনটেন্ট প্যানেলে লগইন করুন।</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-zinc-700">
              নোটিশ, কোর্স, ফলাফল ও ওয়েবসাইটের কনটেন্ট নিরাপদ অ্যাডমিন সেশনের মাধ্যমে সুরক্ষিত রাখা হয়েছে।
            </p>
            <div className="demo-admin-card">
              <KeyRound size={22} />
              <div>
                <span>ডেমো লগইন তথ্য</span>
                <p>ইমেইল: <strong>owner@eleljoypurhat.local</strong></p>
                <p>পাসওয়ার্ড: <strong>Demo@12345</strong></p>
                <p>ভূমিকা: <strong>সাইট মালিক</strong></p>
              </div>
            </div>
          </div>
          <Suspense fallback={<div className="admin-login-card">লগইন ফর্ম লোড হচ্ছে...</div>}>
            <AdminLoginForm />
          </Suspense>
        </div>
        <div className="site-container mt-8">
          <div className="security-list login-security-strip">
            <p><ShieldCheck size={16} /> নিরাপদ সেশন কুকি</p>
            <p><ShieldCheck size={16} /> ভূমিকাভিত্তিক অনুরোধ নিয়ন্ত্রণ</p>
            <p><ShieldCheck size={16} /> কনটেন্ট পরিবর্তনের অডিট লগ</p>
          </div>
        </div>
      </section>
    </main>
  );
}
