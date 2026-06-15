import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, PhoneCall } from "lucide-react";
import { branch } from "@/lib/content";
import { Marquee, Reveal } from "@/components/motion";

const quickLinks = [
  ["হোম", "/"],
  ["কোর্স", "/courses"],
  ["প্রকল্প", "/projects"],
  ["শিক্ষার্থীর গল্প", "/success-stories"],
  ["নোটিশ", "/notices"],
  ["ফলাফল", "/results"],
];

const studentLinks = [
  ["ভর্তি ফলাফল", "/results/admission"],
  ["মাসিক ফলাফল", "/results/monthly"],
  ["৭ম ব্যাচে আবেদন", "/courses/jubo-freelancing#admission"],
  ["অ্যাডমিন", "/admin"],
];

export function SiteFooter() {
  return (
    <footer className="v2-footer">
      <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="v2-footer-top">
          <div>
            <Link href="/" aria-label="হোম পেজে যান" style={{ display: "inline-block" }}>
              <span style={{ position: "relative", display: "block", width: 180, aspectRatio: "168 / 54" }}>
                <Image
                  src="/media/elogo.png"
                  alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো"
                  fill
                  sizes="180px"
                  className="brand-logo-image"
                />
              </span>
            </Link>
            <p className="v2-lead" style={{ marginTop: 20, maxWidth: "32ch" }}>
              {branch.tagline}
            </p>
            <Link className="v2-btn v2-btn-ink" href="/#contact" style={{ marginTop: 24 }}>
              যোগাযোগ করুন
              <ArrowUpRight size={17} />
            </Link>
          </div>

          <div>
            <h4>সাইটম্যাপ</h4>
            <div className="v2-footer-links">
              {quickLinks.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4>শিক্ষার্থী</h4>
            <div className="v2-footer-links">
              {studentLinks.map(([label, href]) => (
                <Link key={label} href={href}>
                  {label}
                </Link>
              ))}
            </div>
            <div className="v2-footer-links" style={{ marginTop: 26, gap: 14 }}>
              <span style={{ display: "inline-flex", gap: 10, color: "#5c5c64", fontSize: 14, lineHeight: 1.6 }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: 2 }} />
                {branch.address}
              </span>
              <a href={`tel:${branch.phones[0]}`} style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
                <PhoneCall size={16} />
                {branch.phones.join(" / ")}
              </a>
              <a href={`mailto:${branch.email}`} style={{ display: "inline-flex", gap: 10, alignItems: "center" }}>
                <Mail size={16} />
                {branch.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <Reveal className="v2-container" style={{ position: "relative", zIndex: 2 }}>
        <Marquee speed={26}>
          <span className="v2-footer-huge" style={{ paddingRight: 60 }}>
            ELEL JOYPURHAT —
          </span>
          <span className="v2-footer-huge v2-outline-text" style={{ paddingRight: 60 }}>
            শিখুন · গড়ুন —
          </span>
        </Marquee>
      </Reveal>

      <div className="v2-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="v2-footer-bottom">
          <span>© ই-লার্নিং এন্ড আর্নিং, জয়পুরহাট ব্রাঞ্চ। সর্বস্বত্ব সংরক্ষিত।</span>
          <span>
            Design &amp; Development:{" "}
            <Link href="https://delowarhossain.dev/" target="_blank" rel="noopener noreferrer">
              Delowar Hossain
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
