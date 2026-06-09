import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  GraduationCap,
  Laptop,
  MapPin,
  Medal,
  Phone,
  ShieldCheck,
  UploadCloud,
  UsersRound,
} from "lucide-react";

export const branch = {
  name: "ই-লার্নিং এন্ড আর্নিং লিমিটেড",
  titleBn: "জয়পুরহাট ব্রাঞ্চ",
  tagline: "জয়পুরহাটে দক্ষতা শেখা, ক্যারিয়ার প্রস্তুতি ও নির্ভরযোগ্য শিক্ষার্থী সহায়তা",
  address:
    "সূর্যের হাসি ক্লিনিক, ৭ম তলা, লিফট #৬, প্রফেসর পাড়া, জামালগঞ্জ রোড, নতুনহাট, জয়পুরহাট সদর, জয়পুরহাট",
  phones: ["01332852670", "01332852671"],
  email: "joypurhat.elel@gmail.com",
  source: "https://e-laeltd.com/branch",
};

export const admissionNotice = {
  status: "ভর্তি চলছে",
  batch: "৭ম ব্যাচে রেজিস্ট্রেশন চলছে",
  deadline: "১৫ জুন ২০২৬",
  writtenExam: "২০ জুন ২০২৬",
  vivaExam: "২১ জুন ২০২৬",
  finalResult: "২৪ জুন ২০২৬",
  qualification: "সর্বনিম্ন এইচএসসি বা সমমান পাস; বয়স ১৮ থেকে ৩৫ বছরের মধ্যে হতে হবে",
  bullets: [
    "আবেদন ফর্মে নিজের তথ্য সতর্কভাবে পূরণ করুন।",
    "অ্যাডমিট কার্ড ডাউনলোড করে নিরাপদে সংরক্ষণ করুন।",
    "পরীক্ষার দিন অ্যাডমিট কার্ড অবশ্যই সঙ্গে আনতে হবে।",
    "পরীক্ষার স্থান ও সময় এসএমএসের মাধ্যমে জানানো হবে।",
  ],
};

export const projectFacts = [
  {
    label: "যোগ্যতা",
    value: "এইচএসসি বা সমমান",
    detail: "১৮ থেকে ৩৫ বছর বয়সী শিক্ষিত কর্মপ্রত্যাশী যুবক-যুবতীরা আবেদন করতে পারবেন।",
    icon: GraduationCap,
  },
  {
    label: "সময়কাল",
    value: "৩ মাসে ৬০০ ঘণ্টা",
    detail: "সপ্তাহে ৬ দিন, প্রতিদিন ৮ ঘণ্টা করে মোট ৭৫টি ক্লাস হবে।",
    icon: CalendarDays,
  },
  {
    label: "ক্লাস পদ্ধতি",
    value: "সরাসরি ল্যাব ক্লাস",
    detail: "জয়পুরহাট ব্রাঞ্চে উপস্থিত থেকে হাতে-কলমে প্রশিক্ষণ নিতে হবে।",
    icon: UsersRound,
  },
  {
    label: "ভাতা",
    value: "দৈনিক ২০০ টাকা",
    detail: "নিয়মিত উপস্থিতি ও প্রশিক্ষণ নীতিমালা অনুযায়ী ভাতা ও খাবারের ব্যবস্থা রয়েছে।",
    icon: Medal,
  },
];

export const courseTracks = [
  "অফিস অ্যাপ্লিকেশন",
  "ফ্রিল্যান্সিং মার্কেটপ্লেস পরিচিতি",
  "বেসিক ইংরেজি",
  "ডিজিটাল মার্কেটিং",
  "গ্রাফিক ডিজাইন",
  "ভিডিও এডিটিং",
  "ক্লায়েন্ট কমিউনিকেশন ও সফট স্কিল",
  "স্মার্টফোন ব্যবহার করে কাজের প্রস্তুতি",
  "এআই টুল ব্যবহার করে কাজের গতি বাড়ানো",
];

export const resultSystems = [
  {
    title: "ভর্তি পরীক্ষার ফলাফল",
    description:
      "অ্যাডমিট কার্ডের রোল নম্বর ও রেজিস্টার্ড ফোন নম্বর দিলে শুধু নিজের ফলাফল দেখা যাবে।",
    href: "/results/admission",
    icon: BadgeCheck,
    query: "রোল + ফোন",
  },
  {
    title: "মাসিক পরীক্ষার ফলাফল",
    description:
      "ক্লাস টেস্ট বা মাসিক পরীক্ষার ফলাফল রেজিস্টার্ড ফোন নম্বর দিয়েই দেখা যাবে।",
    href: "/results/monthly",
    icon: BookOpenCheck,
    query: "শুধু ফোন নম্বর",
  },
];

export const crmFeatures: Array<{
  title: string;
  detail: string;
  icon: LucideIcon;
}> = [
  {
    title: "ভূমিকাভিত্তিক অ্যাডমিন",
    detail: "কোন অ্যাডমিন কোন কাজ করতে পারবেন, তা ভূমিকা অনুযায়ী আলাদা করে নিয়ন্ত্রণ করা যায়।",
    icon: ShieldCheck,
  },
  {
    title: "ফলাফল আপলোড",
    detail: "ফলাফল আগে যাচাই করে রাখা যায়, তারপর প্রয়োজন হলে প্রকাশ বা লুকানো যায়।",
    icon: UploadCloud,
  },
  {
    title: "মালিকের অনুমোদন",
    detail: "নতুন অ্যাডমিন যোগ করা ও অনুমতি দেওয়ার কাজ মালিকের নিয়ন্ত্রণে থাকে।",
    icon: UsersRound,
  },
  {
    title: "নিরাপদ ফলাফল দেখা",
    detail: "শিক্ষার্থীকে লগইন করতে হয় না; রোল/ফোন যাচাই করে শুধু ব্যক্তিগত ফলাফল দেখানো হয়।",
    icon: BrainCircuit,
  },
];

export const team = {
  officers: [
    {
      name: "Md Raju Ahmed",
      role: "বিভাগীয় প্রধান, রাজশাহী",
      org: "ই-লার্নিং এন্ড আর্নিং লিমিটেড",
      image: "/media/team/md-raju-ahmed.png",
    },
    {
      name: "Forhad Hasan Ripon",
      role: "কো-অর্ডিনেটর, জয়পুরহাট ব্রাঞ্চ",
      org: "ই-লার্নিং এন্ড আর্নিং লিমিটেড",
      image: "/media/team/forhad-hasan-ripon.png",
    },
    {
      name: "Roton Ali",
      role: "সহকারী কো-অর্ডিনেটর, জয়পুরহাট ব্রাঞ্চ",
      org: "ই-লার্নিং এন্ড আর্নিং লিমিটেড",
      image: "/media/team/roton-ali.png",
    },
  ],
  trainers: [
    {
      name: "Debashish Karmaker",
      role: "প্রশিক্ষক (ডিজিটাল মার্কেটিং)",
      image: "/media/team/debashish-karmaker.webp",
    },
    {
      name: "Mohaimin Islam",
      role: "প্রশিক্ষক (ডিজিটাল মার্কেটিং)",
      image: "/media/team/mohaimin-islam.webp",
    },
    {
      name: "Antor Hossen",
      role: "প্রশিক্ষক (গ্রাফিক ডিজাইন)",
      image: "/media/team/antor-hossen.webp",
    },
    {
      name: "Halima Akter",
      role: "সহকারী প্রশিক্ষক (ডিজিটাল মার্কেটিং)",
      image: "/media/team/halima-akter.jpg",
    },
    {
      name: "Razia Akter",
      role: "সহকারী প্রশিক্ষক (গ্রাফিক ডিজাইন)",
      image: "/media/team/razia-akter.jpg",
    },
  ],
};

export const districtGroups = [
  ["ঢাকা", "ঢাকা, গোপালগঞ্জ, গাজীপুর, শরীয়তপুর, মাদারীপুর, রাজবাড়ী, নারায়ণগঞ্জ, মানিকগঞ্জ, নরসিংদী, মুন্সিগঞ্জ, কিশোরগঞ্জ, টাঙ্গাইল, ফরিদপুর"],
  ["ময়মনসিংহ", "ময়মনসিংহ, শেরপুর, জামালপুর, নেত্রকোনা"],
  ["চট্টগ্রাম", "চট্টগ্রাম, কক্সবাজার, বান্দরবান, খাগড়াছড়ি, রাঙ্গামাটি, নোয়াখালী, ফেনী, ব্রাহ্মণবাড়ীয়া, কুমিল্লা, লক্ষ্মীপুর, চাঁদপুর"],
  ["রাজশাহী", "রাজশাহী, চাঁপাইনবাবগঞ্জ, নওগাঁ, নাটোর, বগুড়া, জয়পুরহাট, পাবনা, সিরাজগঞ্জ"],
  ["খুলনা", "খুলনা, সাতক্ষীরা, বাগেরহাট, যশোর, ঝিনাইদহ, মাগুরা, চুয়াডাঙ্গা, মেহেরপুর, কুষ্টিয়া, নড়াইল"],
  ["রংপুর", "রংপুর, কুড়িগ্রাম, লালমনিরহাট, ঠাকুরগাঁও, গাইবান্ধা, নীলফামারী, দিনাজপুর, পঞ্চগড়"],
  ["বরিশাল", "বরিশাল, ঝালকাঠি, পিরোজপুর, পটুয়াখালী, বরগুনা, ভোলা"],
  ["সিলেট", "হবিগঞ্জ ও মৌলভীবাজার, সিলেট, সুনামগঞ্জ"],
];

export const nav = [
  ["ভর্তি", "#admission"],
  ["ফলাফল", "#results"],
  ["প্রকল্প", "#project"],
  ["টিম", "#team"],
  ["অ্যাডমিন", "/admin"],
];

export const contactItems = [
  { label: "ঠিকানা", value: branch.address, icon: MapPin },
  { label: "ফোন", value: branch.phones.join(" / "), icon: Phone },
  { label: "প্রশিক্ষণ", value: "জয়পুরহাট সদরে সরাসরি ক্লাসভিত্তিক প্রশিক্ষণ", icon: Laptop },
];
