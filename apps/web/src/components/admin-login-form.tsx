"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { KeyRound, LockKeyhole, RotateCcw } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [recoveryOpen, setRecoveryOpen] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveryLoading, setRecoveryLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    setLoading(false);

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setError(payload?.error || "লগইন করা যায়নি।");
      return;
    }

    router.replace(searchParams.get("next") || "/admin");
    router.refresh();
  }

  async function handleRecovery(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecoveryLoading(true);
    setRecoveryError("");
    setRecoveryMessage("");

    const response = await fetch("/api/admin/auth/recovery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: recoveryEmail,
        recoveryCode,
        nextPassword,
        confirmPassword,
      }),
    });

    setRecoveryLoading(false);

    const payload = (await response.json().catch(() => null)) as { error?: string; message?: string } | null;
    if (!response.ok) {
      setRecoveryError(payload?.error || "Password reset করা যায়নি।");
      return;
    }

    setRecoveryMessage(payload?.message || "Password reset হয়েছে।");
    setEmail(recoveryEmail);
    setPassword("");
    setRecoveryCode("");
    setNextPassword("");
    setConfirmPassword("");
  }

  return (
    <div className="admin-login-stack">
      <form className="admin-login-card" onSubmit={handleSubmit}>
        <div className="auth-card-heading">
          <LockKeyhole size={19} />
          <div>
            <span>Admin access</span>
            <strong>Secure sign in</strong>
          </div>
        </div>
        <label className="form-label">
          ইমেইল
          <input className="form-input" value={email} autoComplete="email" onChange={(event) => setEmail(event.target.value)} />
        </label>
        <label className="form-label mt-4">
          পাসওয়ার্ড
          <input
            className="form-input"
            type="password"
            value={password}
            autoComplete="current-password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {error ? <p className="admin-form-error">{error}</p> : null}
        <button className="button-primary mt-5" disabled={loading} type="submit">
          <LockKeyhole size={18} />
          {loading ? "লগইন হচ্ছে..." : "কনটেন্ট প্যানেলে লগইন করুন"}
        </button>
        <button className="auth-link-button" type="button" onClick={() => setRecoveryOpen((value) => !value)}>
          <KeyRound size={16} />
          পাসওয়ার্ড ভুলে গেলে
        </button>
      </form>

      {recoveryOpen ? (
        <form className="admin-login-card recovery-card" onSubmit={handleRecovery}>
          <div className="auth-card-heading">
            <RotateCcw size={19} />
            <div>
              <span>Emergency reset</span>
              <strong>Recovery code দিয়ে নতুন পাসওয়ার্ড সেট করুন</strong>
            </div>
          </div>
          <p className="auth-note">
            Recovery code শুধু owner-এর private env-এ থাকবে। SMS/Email provider যুক্ত হলে এখান থেকে reset link পাঠানো যাবে।
          </p>
          <label className="form-label">
            অ্যাডমিন ইমেইল
            <input className="form-input" value={recoveryEmail} autoComplete="email" onChange={(event) => setRecoveryEmail(event.target.value)} />
          </label>
          <label className="form-label">
            Recovery code
            <input className="form-input" value={recoveryCode} autoComplete="one-time-code" onChange={(event) => setRecoveryCode(event.target.value)} />
          </label>
          <label className="form-label">
            নতুন পাসওয়ার্ড
            <input className="form-input" type="password" value={nextPassword} autoComplete="new-password" onChange={(event) => setNextPassword(event.target.value)} />
          </label>
          <label className="form-label">
            নতুন পাসওয়ার্ড আবার লিখুন
            <input className="form-input" type="password" value={confirmPassword} autoComplete="new-password" onChange={(event) => setConfirmPassword(event.target.value)} />
          </label>
          {recoveryError ? <p className="admin-form-error">{recoveryError}</p> : null}
          {recoveryMessage ? <p className="admin-form-success">{recoveryMessage}</p> : null}
          <button className="button-primary" disabled={recoveryLoading} type="submit">
            <RotateCcw size={17} />
            {recoveryLoading ? "Reset হচ্ছে..." : "পাসওয়ার্ড reset করুন"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
