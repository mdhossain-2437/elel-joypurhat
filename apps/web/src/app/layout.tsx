import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import { AdmissionPopup } from "@/components/admission-popup";
import { StructuredData } from "@/components/structured-data";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { readCmsStore } from "@/lib/cms-store";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBangla = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800", "900"],
});


const baseOpenGraph = {
  title: "ই-লার্নিং এন্ড আর্নিং লিমিটেড — জয়পুরহাট ব্রাঞ্চ",
  description:
    "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চের সরকারি ফ্রিল্যান্সিং প্রশিক্ষণ, কোর্স, নোটিশ, ভর্তি তথ্য ও ব্যক্তিগত ফলাফল দেখার নির্ভরযোগ্য পোর্টাল।",
  url: "/",
  siteName: "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট",
  locale: "bn_BD",
  type: "website" as const,
  images: [
    {
      url: "/media/jubo-64-banner.jpeg",
      width: 1200,
      height: 630,
      alt: "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চ",
    },
  ],
};

const baseTwitter = {
  card: "summary_large_image" as const,
  title: "ই-লার্নিং এন্ড আর্নিং লিমিটেড — জয়পুরহাট ব্রাঞ্চ",
  description: "কোর্স, নোটিশ, ভর্তি তথ্য ও ব্যক্তিগত ফলাফল দেখার পোর্টাল।",
  images: ["/media/jubo-64-banner.jpeg"],
};

const defaultMetadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "ই-লার্নিং এন্ড আর্নিং লিমিটেড — জয়পুরহাট ব্রাঞ্চ",
    template: "%s | ই-লার্নিং এন্ড আর্নিং জয়পুরহাট",
  },
  description:
    "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট ব্রাঞ্চের সরকারি ফ্রিল্যান্সিং প্রশিক্ষণ, কোর্স, ভর্তি নোটিশ, ব্যক্তিগত ফলাফল ও শিক্ষার্থী সহায়তার নির্ভরযোগ্য ওয়েবসাইট।",
  keywords: [
    "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট",
    "জয়পুরহাট ফ্রিল্যান্সিং প্রশিক্ষণ",
    "যুব উন্নয়ন ফ্রিল্যান্সিং কোর্স",
    "জয়পুরহাট আইটি প্রশিক্ষণ",
    "ই-লার্নিং এন্ড আর্নিং লিমিটেড",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: baseOpenGraph,
  twitter: baseTwitter,
  robots: {
    index: true,
    follow: true,
  },
};

export async function generateMetadata(): Promise<Metadata> {
  try {
    const store = await readCmsStore();
    return {
      ...defaultMetadata,
      title: {
        default: store.settings.seoTitle,
        template: "%s | ই-লার্নিং এন্ড আর্নিং জয়পুরহাট",
      },
      description: store.settings.seoDescription,
      openGraph: {
        ...baseOpenGraph,
        title: store.settings.seoTitle,
        description: store.settings.seoDescription,
      },
      twitter: {
        ...baseTwitter,
        title: store.settings.seoTitle,
        description: store.settings.seoDescription,
      },
    };
  } catch {
    return defaultMetadata;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const popup = await readCmsStore()
    .then((store) => store.settings.admissionPopup)
    .catch(() => null);

  return (
    <html
      lang="bn"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${notoBangla.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <StructuredData />
        <SiteHeader />
        <AdmissionPopup popup={popup} />
        <div className="flex-1">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
