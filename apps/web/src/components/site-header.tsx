"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, PhoneCall, X } from "lucide-react";
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

function isActive(pathname: string, href: string) {
  const clean = href.split("#")[0];
  if (clean === "/") return pathname === "/";
  if (clean === "") return false;
  return pathname === clean || pathname.startsWith(`${clean}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 16);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className={`v2-header ${scrolled || menuOpen ? "scrolled" : ""}`}>
      <div className="v2-container v2-header-inner">
        <Link href="/" className="v2-logo" aria-label="হোম পেজে যান">
          <span className="v2-logo-frame">
            <Image
              src="/media/elogo.png"
              alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো"
              fill
              sizes="(max-width: 560px) 124px, 150px"
              className="brand-logo-image"
              priority
            />
          </span>
          <span className="v2-logo-tag">{branch.titleBn}</span>
        </Link>

        <nav className="v2-nav" aria-label="প্রধান মেনু">
          {navItems.map(([label, href]) => (
            <Link
              key={label}
              href={href}
              className={isActive(pathname, href) ? "is-active" : ""}
              aria-current={isActive(pathname, href) ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="v2-header-actions">
          <a className="v2-call" href={`tel:${branch.phones[0]}`} aria-label="ফোন করুন">
            <PhoneCall size={17} />
          </a>
          <Link className="v2-btn v2-btn-primary v2-header-apply" href="/courses/jubo-freelancing#admission">
            আবেদন করুন
            <ArrowUpRight size={16} />
          </Link>
          <button
            type="button"
            className="v2-burger"
            aria-controls="v2-mobile-menu"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div className="v2-mobile-panel" id="v2-mobile-menu">
          <nav aria-label="মোবাইল মেনু">
            {navItems.map(([label, href]) => (
              <Link
                key={label}
                href={href}
                className={isActive(pathname, href) ? "is-active" : ""}
                onClick={() => setMenuOpen(false)}
              >
                {label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </nav>
          <Link className="v2-btn v2-btn-primary" href="/courses/jubo-freelancing#admission" onClick={() => setMenuOpen(false)}>
            ৭ম ব্যাচে আবেদন করুন
            <ArrowUpRight size={16} />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
