"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, CalendarDays, X } from "lucide-react";
import type { AdmissionPopupSettings } from "@/lib/cms-types";

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00+06:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function remainingDays(deadline: string) {
  const end = new Date(`${deadline}T23:59:59+06:00`).getTime();
  if (Number.isNaN(end)) return null;
  const diff = end - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export function AdmissionPopup({ popup }: { popup?: AdmissionPopupSettings | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const storageKey = useMemo(() => {
    if (!popup) return "elel-admission-popup";
    return `elel-admission-popup:${popup.deadline}:${popup.title}`;
  }, [popup]);

  useEffect(() => {
    if (!popup?.enabled || pathname.startsWith("/admin")) return;
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(storageKey) === "closed") return;

    const timer = window.setTimeout(() => setOpen(true), 700);
    return () => window.clearTimeout(timer);
  }, [pathname, popup?.enabled, storageKey]);

  if (!popup?.enabled || !open || pathname.startsWith("/admin")) return null;

  const daysLeft = remainingDays(popup.deadline);
  function closePopup() {
    window.sessionStorage.setItem(storageKey, "closed");
    setOpen(false);
  }

  return (
    <div className="admission-popup-layer" role="dialog" aria-modal="true" aria-labelledby="admission-popup-title">
      <button className="admission-popup-backdrop" type="button" aria-label="ভর্তি নোটিশ বন্ধ করুন" onClick={closePopup} />
      <section className="admission-popup-card">
        <button className="admission-popup-close" type="button" aria-label="পপআপ বন্ধ করুন" onClick={closePopup}>
          <X size={18} />
        </button>

        <div className="admission-popup-media">
          <Image
            src={popup.image}
            alt={popup.title}
            fill
            sizes="(max-width: 760px) 92vw, 430px"
            className="object-cover"
            priority
            unoptimized={!popup.image.startsWith("/")}
          />
        </div>

        <div className="admission-popup-body">
          <p className="kicker-light">ভর্তি আপডেট</p>
          <h2 id="admission-popup-title">{popup.title}</h2>
          <p>{popup.detail}</p>

          <div className="admission-popup-countdown">
            <span>
              <CalendarDays size={16} />
              শুরু: {formatDate(popup.startsAt)}
            </span>
            <span>শেষ সময়: {formatDate(popup.deadline)}</span>
            <strong>{daysLeft === null ? "সময় যাচাই করুন" : daysLeft === 0 ? "আজ শেষ দিন" : `বাকি ${daysLeft} দিন`}</strong>
          </div>

          <div className="admission-popup-actions">
            <Link href={popup.applyHref} target="_blank" rel="noopener noreferrer">
              {popup.primaryLabel || "Apply now"}
              <ArrowRight size={17} />
            </Link>
            <button type="button" onClick={closePopup}>
              পরে দেখব
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
