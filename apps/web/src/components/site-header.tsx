"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, BookOpenCheck, ChevronRight, Menu, PhoneCall, X, type LucideIcon } from "lucide-react";
import { branch } from "@/lib/content";

const navItems: Array<[string, string]> = [
  ["হোম", "/"],
  ["কোর্স", "/courses"],
  ["প্রকল্প", "/projects"],
  ["গল্প", "/success-stories"],
  ["নোটিশ", "/notices"],
  ["ফলাফল", "/results"],
  ["যোগাযোগ", "/#contact"],
];

const studentLinks: Array<[string, string, LucideIcon]> = [
  ["ভর্তি পরীক্ষার ফলাফল", "/results/admission", BadgeCheck],
  ["মাসিক পরীক্ষার ফলাফল", "/results/monthly", BookOpenCheck],
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
      <div className="site-container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="brand-link" aria-label="হোম পেজে যান">
          <span className="brand-logo-frame">
            <Image
              src="/media/elogo.png"
              alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো"
              fill
              sizes="(max-width: 760px) 128px, 168px"
              className="brand-logo-image"
              priority
            />
          </span>
          <span>{branch.titleBn}</span>
        </Link>

        <nav className="site-nav" aria-label="প্রধান মেনু">
          {navItems.map(([label, href]) => (
            <Link key={label} href={href} className="nav-link">
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <a className="nav-call" href={`tel:${branch.phones[0]}`} aria-label="জয়পুরহাট ব্রাঞ্চে ফোন করুন">
            <PhoneCall size={16} />
          </a>
          <Link className="btn-orange header-apply" href="/courses/jubo-freelancing#admission">
            আবেদন করুন
            <ArrowRight size={16} />
          </Link>
          <button
            type="button"
            className="mobile-menu-toggle"
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="mobile-menu-layer" id="mobile-navigation">
          <button className="mobile-menu-backdrop" type="button" aria-label="মেনু বন্ধ করুন" onClick={closeMenu} />
          <div className="mobile-menu-card">
            <div className="mobile-menu-head">
              <span>জয়পুরহাট ব্রাঞ্চ</span>
              <strong>শিক্ষার্থী মেনু</strong>
            </div>

            <nav className="mobile-menu-nav" aria-label="মোবাইল মেনু">
              {navItems.map(([label, href]) => (
                <Link key={label} href={href} className="mobile-menu-link" onClick={closeMenu}>
                  {label}
                  <ChevronRight size={17} />
                </Link>
              ))}
            </nav>

            <div className="mobile-student-actions">
              {studentLinks.map(([label, href, Icon]) => (
                <Link key={label as string} href={href as string} onClick={closeMenu}>
                  <Icon size={19} />
                  <span>{label as string}</span>
                  <ChevronRight size={16} />
                </Link>
              ))}
            </div>

            <div className="mobile-menu-footer">
              <a href={`tel:${branch.phones[0]}`} onClick={closeMenu}>
                <PhoneCall size={16} />
                {branch.phones[0]}
              </a>
              <Link href="/courses/jubo-freelancing#admission" onClick={closeMenu}>
                ৭ম ব্যাচে আবেদন করুন
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
