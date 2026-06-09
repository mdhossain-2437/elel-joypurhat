import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { branch } from "@/lib/content";

const quickLinks = [
  ["হোম", "/"],
  ["কোর্স", "/courses"],
  ["প্রকল্প", "/projects"],
  ["শিক্ষার্থীর গল্প", "/success-stories"],
  ["নোটিশ", "/notices"],
  ["ফলাফল", "/results"],
  ["মাসিক ফলাফল", "/results/monthly"],
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-container footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="হোম পেজে যান">
            <span className="footer-logo-frame">
              <Image
                src="/media/elogo.png"
                alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো"
                fill
                sizes="178px"
                className="brand-logo-image"
              />
            </span>
          </Link>
          <strong>{branch.titleBn}</strong>
          <p>{branch.tagline}</p>
        </div>

        <div>
          <h2>দরকারি লিংক</h2>
          <div className="footer-links">
            {quickLinks.map(([label, href]) => (
              <Link key={label} href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2>ব্রাঞ্চ যোগাযোগ</h2>
          <div className="footer-contact">
            <p>
              <MapPin size={17} />
              {branch.address}
            </p>
            <p>
              <PhoneCall size={17} />
              {branch.phones.join(" / ")}
            </p>
            <p>
              <Mail size={17} />
              {branch.email}
            </p>
          </div>
        </div>
      </div>

      <div className="site-container footer-bottom">
        <span>© ই-লার্নিং এন্ড আর্নিং, জয়পুরহাট ব্রাঞ্চ। সর্বস্বত্ব সংরক্ষিত।</span>
        <span>
          Design & Development:{" "}
          <Link href="https://delowarhossain.dev/" target="_blank" rel="noopener noreferrer">
            Delowar Hossain
          </Link>
        </span>
      </div>
    </footer>
  );
}
