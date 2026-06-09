"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LockKeyhole } from "lucide-react";

export function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("owner@eleljoypurhat.local");
  const [password, setPassword] = useState("Demo@12345");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  return (
    <form className="admin-login-card" onSubmit={handleSubmit}>
      <label className="form-label">
        ইমেইল
        <input className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label className="form-label mt-4">
        পাসওয়ার্ড
        <input
          className="form-input"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      {error ? <p className="admin-form-error">{error}</p> : null}
      <button className="button-primary mt-5" disabled={loading} type="submit">
        <LockKeyhole size={18} />
        {loading ? "লগইন হচ্ছে..." : "কনটেন্ট প্যানেলে লগইন করুন"}
      </button>
    </form>
  );
}
