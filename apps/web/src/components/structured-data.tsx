import { branch } from "@/lib/content";

export function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "ই-লার্নিং এন্ড আর্নিং লিমিটেড জয়পুরহাট ব্রাঞ্চ",
    alternateName: "E-Learning and Earning Joypurhat",
    url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    logo: "/media/elogo.png",
    email: branch.email,
    telephone: branch.phones[0],
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "জয়পুরহাট সদর",
      addressRegion: "রাজশাহী",
      addressCountry: "BD",
    },
    sameAs: ["https://e-laeltd.com/"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
