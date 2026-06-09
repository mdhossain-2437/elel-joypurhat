"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import NextImage from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Activity,
  ArrowUpDown,
  BadgeCheck,
  BookOpenCheck,
  DatabaseZap,
  ExternalLink,
  FileText,
  FileUp,
  Globe2,
  Images,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Megaphone,
  MonitorCog,
  Settings,
  ShieldCheck,
  Sparkles,
  Trash2,
  UploadCloud,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type {
  AdminRole,
  AdminUser,
  AdmissionResultEntry,
  CmsStore,
  CourseEntry,
  MediaAssetEntry,
  MonthlyResultEntry,
  NoticeEntry,
  PublishStatus,
  SiteSettings,
  SuccessStoryEntry,
  TeamMemberEntry,
} from "@/lib/cms-types";
import { branch } from "@/lib/content";

type AdminSession = {
  sub: string;
  email: string;
  name: string;
  role: AdminRole;
  exp: number;
};

type SafeAdmin = Omit<AdminUser, "passwordHash">;
type SafeStore = Omit<CmsStore, "admins"> & { admins: SafeAdmin[] };
type TabId = "overview" | "settings" | "notices" | "courses" | "results" | "team" | "stories" | "media" | "security";

const tabs: Array<{ id: TabId; label: string; icon: LucideIcon }> = [
  { id: "overview", label: "ড্যাশবোর্ড", icon: LayoutDashboard },
  { id: "settings", label: "সেটিংস", icon: Settings },
  { id: "notices", label: "নোটিশ", icon: Megaphone },
  { id: "courses", label: "কোর্স", icon: BookOpenCheck },
  { id: "results", label: "ফলাফল", icon: BadgeCheck },
  { id: "team", label: "টিম", icon: UsersRound },
  { id: "stories", label: "গল্প", icon: Sparkles },
  { id: "media", label: "মিডিয়া", icon: Images },
  { id: "security", label: "নিরাপত্তা", icon: ShieldCheck },
];

const publishOptions: PublishStatus[] = ["DRAFT", "PUBLISHED", "ARCHIVED"];
const mediaKindOptions: MediaAssetEntry["kind"][] = ["IMAGE", "DOCUMENT", "DOWNLOAD", "VIDEO"];
const teamCategoryOptions: TeamMemberEntry["category"][] = ["OFFICER", "TRAINER"];
const admissionStatusOptions: AdmissionResultEntry["status"][] = ["Selected", "Waiting", "Not Selected"];
const labOptions: MonthlyResultEntry["lab"][] = ["Lab A", "Lab B", "Lab C"];
const meritModeOptions: MonthlyResultEntry["meritMode"][] = ["COMBINED", "LAB_ONLY"];
const resultImportSample = {
  admission: "roll,phone,name,written,viva,status,batch,published\nJYP-7020,01700000020,নতুন প্রার্থী,78,17,Selected,৭ম ব্যাচ,true",
  monthly: "phone,name,batch,lab,month,subject,score,maxScore,grade,meritMode,published\n01700000020,New Student,৬ষ্ঠ ব্যাচ,Lab B,জুন ২০২৬,Digital Marketing,84,100,A,COMBINED,true",
};

const optionLabels: Record<string, string> = {
  DRAFT: "খসড়া",
  PUBLISHED: "প্রকাশিত",
  ARCHIVED: "আর্কাইভে রাখা",
  IMAGE: "ছবি",
  DOCUMENT: "নথি",
  DOWNLOAD: "ডাউনলোড",
  VIDEO: "ভিডিও",
  admission: "ভর্তি ফলাফল",
  monthly: "মাসিক ফলাফল",
  "Lab A": "Lab A",
  "Lab B": "Lab B",
  "Lab C": "Lab C",
  COMBINED: "All labs merit",
  LAB_ONLY: "Lab-wise merit",
  OFFICER: "কর্মকর্তা",
  TRAINER: "প্রশিক্ষক",
  Selected: "নির্বাচিত",
  Waiting: "অপেক্ষমান",
  "Not Selected": "নির্বাচিত নয়",
  ACTIVE: "চালু",
  PENDING: "অপেক্ষমান",
  SUSPENDED: "স্থগিত",
  OWNER: "সাইট মালিক",
  SUPER_ADMIN: "প্রধান অ্যাডমিন",
  ADMIN: "অ্যাডমিন",
  RESULT_MANAGER: "ফলাফল ব্যবস্থাপক",
  EDITOR: "সম্পাদক",
  VIEWER: "পাঠক",
};

function displayAdminValue(value: string) {
  return optionLabels[value] || value;
}

const actionLabels: Record<string, string> = {
  UPDATE_MEDIA_ASSET: "মিডিয়া আপডেট",
  UPDATE_TEAM_MEMBER: "টিম প্রোফাইল আপডেট",
  UPDATE_SUCCESS_STORY: "সাফল্যের গল্প আপডেট",
  UPDATE_SITE_SETTINGS: "সাইট সেটিংস আপডেট",
  ADMIN_LOGIN: "অ্যাডমিন লগইন",
  CHANGE_ADMIN_PASSWORD: "পাসওয়ার্ড পরিবর্তন",
  RECOVER_ADMIN_PASSWORD: "পাসওয়ার্ড রিকভারি",
  CREATE_NOTICE: "নোটিশ তৈরি",
  UPDATE_NOTICE: "নোটিশ আপডেট",
  CREATE_COURSE: "কোর্স তৈরি",
  UPDATE_COURSE: "কোর্স আপডেট",
  CREATE_TEAM_MEMBER: "টিম প্রোফাইল তৈরি",
  CREATE_SUCCESS_STORY: "সাফল্যের গল্প তৈরি",
  CREATE_MEDIA_ASSET: "মিডিয়া যুক্ত",
  DELETE_NOTICE: "নোটিশ মুছে ফেলা",
  DELETE_COURSE: "কোর্স মুছে ফেলা",
  DELETE_TEAM_MEMBER: "টিম প্রোফাইল মুছে ফেলা",
  DELETE_SUCCESS_STORY: "সাফল্যের গল্প মুছে ফেলা",
  DELETE_MEDIA_ASSET: "মিডিয়া মুছে ফেলা",
  DELETE_ADMISSION_RESULT: "ভর্তি ফলাফল মুছে ফেলা",
  DELETE_MONTHLY_RESULT: "মাসিক ফলাফল মুছে ফেলা",
  ARCHIVE_NOTICE: "নোটিশ আর্কাইভে রাখা",
  ARCHIVE_COURSE: "কোর্স আর্কাইভে রাখা",
  ARCHIVE_TEAM_MEMBER: "টিম প্রোফাইল আর্কাইভে রাখা",
  ARCHIVE_SUCCESS_STORY: "সাফল্যের গল্প আর্কাইভে রাখা",
  ARCHIVE_MEDIA_ASSET: "মিডিয়া আর্কাইভে রাখা",
  ARCHIVE_ADMISSION_RESULT: "ভর্তি ফলাফল লুকানো",
  ARCHIVE_MONTHLY_RESULT: "মাসিক ফলাফল লুকানো",
  PUBLISH_NOTICE: "নোটিশ প্রকাশ",
  PUBLISH_COURSE: "কোর্স হোমে দেখানো",
  PUBLISH_TEAM_MEMBER: "টিম প্রোফাইল প্রকাশ",
  PUBLISH_SUCCESS_STORY: "সাফল্যের গল্প প্রকাশ",
  PUBLISH_MEDIA_ASSET: "মিডিয়া প্রকাশ",
  PUBLISH_ADMISSION_RESULT: "ভর্তি ফলাফল প্রকাশ",
  PUBLISH_MONTHLY_RESULT: "মাসিক ফলাফল প্রকাশ",
  IMPORT_ADMISSION_RESULTS: "ভর্তি ফলাফল ইমপোর্ট",
  IMPORT_MONTHLY_RESULTS: "মাসিক ফলাফল ইমপোর্ট",
  SEED_DATABASE: "প্রাথমিক ডেটা প্রস্তুত",
};

function displayAction(value: string) {
  return actionLabels[value] || displayAdminValue(value);
}

export function AdminDashboard({ admin, initialStore }: { admin: AdminSession; initialStore: SafeStore }) {
  const router = useRouter();
  const [store, setStore] = useState(initialStore);
  const [settings, setSettings] = useState<SiteSettings>(initialStore.settings);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [message, setMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    nextPassword: "",
    confirmPassword: "",
  });
  const [importKind, setImportKind] = useState<"admission" | "monthly">("admission");
  const [importText, setImportText] = useState(resultImportSample.admission);
  const [importPublished, setImportPublished] = useState(true);
  const [notice, setNotice] = useState<Partial<NoticeEntry>>({
    title: "৭ম ব্যাচের ভর্তি সংক্রান্ত আপডেট",
    date: "১৫ জুন ২০২৬",
    type: "ভর্তি",
    status: "DRAFT",
    detail: "আবেদন, পরীক্ষা বা ক্লাস সংক্রান্ত নোটিশের বিস্তারিত এখানে লিখুন।",
    href: "/notices",
  });
  const [course, setCourse] = useState<Partial<CourseEntry>>({
    title: "প্রফেশনাল ডিজিটাল মার্কেটিং",
    type: "পেইড কোর্স",
    status: "শিগগির শুরু হবে",
    detail: "কোর্সে কী শেখানো হবে, ক্লাস কীভাবে চলবে এবং শিক্ষার্থীরা কী ফলাফল পাবে তা পরিষ্কারভাবে লিখুন।",
    href: "/courses",
    featured: true,
  });
  const [admissionResult, setAdmissionResult] = useState<Partial<AdmissionResultEntry>>({
    roll: "JYP-7010",
    phone: "01700000010",
    name: "ডেমো প্রার্থী",
    written: 72,
    viva: 16,
    status: "Waiting",
    published: true,
    batch: "৭ম ব্যাচ",
  });
  const [monthlyResult, setMonthlyResult] = useState<Partial<MonthlyResultEntry>>({
    phone: "01700000010",
    name: "ডেমো শিক্ষার্থী",
    batch: "৬ষ্ঠ ব্যাচ",
    lab: "Lab A",
    month: "জুন ২০২৬",
    subject: "ডিজিটাল মার্কেটিং",
    score: 82,
    maxScore: 100,
    grade: "A",
    meritMode: "COMBINED",
    published: true,
  });
  const [teamMember, setTeamMember] = useState<Partial<TeamMemberEntry>>({
    name: "নতুন টিম সদস্য",
    role: "প্রশিক্ষক",
    org: "ই-লার্নিং এন্ড আর্নিং লিমিটেড, জয়পুরহাট ব্রাঞ্চ",
    category: "TRAINER",
    image: "/media/team/debashish-karmaker.webp",
    status: "DRAFT",
    sortOrder: initialStore.teamMembers.length + 1,
    bio: "দায়িত্ব, অভিজ্ঞতা ও শিক্ষার্থী সহায়তার ভূমিকা সংক্ষেপে লিখুন।",
  });
  const [successStory, setSuccessStory] = useState<Partial<SuccessStoryEntry>>({
    name: "নতুন শিক্ষার্থী",
    batch: "৬ষ্ঠ ব্যাচ",
    course: "যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণ",
    image: "/media/team/halima-akter.jpg",
    title: "ক্লাস অনুশীলন থেকে আত্মবিশ্বাস তৈরি",
    excerpt: "নিয়মিত ক্লাস, অনুশীলন ও প্রশিক্ষকের ফিডব্যাকে শিক্ষার্থী নিজের কাজ গুছিয়ে উপস্থাপন করতে শিখেছে।",
    story: "শুরুর দিকে অনলাইন কাজের ধাপগুলো জটিল মনে হলেও নিয়মিত ল্যাব ক্লাস, ছোট টাস্ক এবং ফিডব্যাকের মাধ্যমে শিক্ষার্থী ধীরে ধীরে আত্মবিশ্বাস পেয়েছে।",
    achievement: "প্রথম পোর্টফোলিও প্রস্তুত",
    status: "DRAFT",
    featured: true,
    sortOrder: initialStore.successStories.length + 1,
  });
  const [mediaAsset, setMediaAsset] = useState<Partial<MediaAssetEntry>>({
    title: "নতুন মিডিয়া ফাইল",
    kind: "IMAGE",
    url: "/media/elogo.png",
    alt: "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট মিডিয়া",
    status: "DRAFT",
    usedIn: "ওয়েবসাইটের কোন অংশে ব্যবহার হবে তা লিখুন",
  });

  const metrics = useMemo(
    () => [
      ["চলমান ব্যাচ", store.settings.activeBatch],
      ["ভর্তি অবস্থা", store.settings.admissionStatus],
      ["প্রকাশিত নোটিশ", String(store.notices.filter((item) => item.status === "PUBLISHED").length)],
      ["টিম প্রোফাইল", String(store.teamMembers.filter((item) => item.status === "PUBLISHED").length)],
      ["সাফল্যের গল্প", String(store.successStories.filter((item) => item.status === "PUBLISHED").length)],
      ["কোর্স", String(store.courses.length)],
      ["মিডিয়া", String(store.mediaAssets.length)],
    ],
    [store],
  );

  const contentHealth = useMemo(
    () => [
      ["ব্রাঞ্চ ফোন", branch.phones.join(" / ")],
      ["প্রকাশিত ফলাফল", `${store.admissionResults.filter((row) => row.published).length} ভর্তি / ${store.monthlyResults.filter((row) => row.published).length} মাসিক`],
      ["শেষ আপডেট", new Date(store.updatedAt).toLocaleString("bn-BD")],
      ["লগইন ব্যবহারকারী", `${admin.name} (${displayAdminValue(admin.role)})`],
    ],
    [admin.name, admin.role, store],
  );

  async function refreshStore() {
    const response = await fetch("/api/admin/cms", { cache: "no-store" });
    if (!response.ok) return;
    const payload = (await response.json()) as { store: SafeStore };
    setStore(payload.store);
    setSettings(payload.store.settings);
  }

  async function postJson(url: string, payload: unknown, success: string) {
    setMessage("তথ্য সংরক্ষণ করা হচ্ছে...");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setMessage(data?.error || "তথ্য সংরক্ষণ করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    await refreshStore();
    setMessage(success);
  }

  async function runCmsAction(
    collection: "notices" | "courses" | "teamMembers" | "successStories" | "mediaAssets" | "admissionResults" | "monthlyResults",
    id: string,
    action: "publish" | "archive" | "delete",
  ) {
    if (action === "delete" && !window.confirm("এই আইটেমটি স্থায়ীভাবে মুছে ফেলতে চান?")) return;
    await postJson(
      "/api/admin/cms/actions",
      { collection, id, action },
      action === "delete"
        ? "আইটেমটি মুছে ফেলা হয়েছে।"
        : action === "archive"
          ? "আইটেমটি পাবলিক ভিউ থেকে সরানো হয়েছে।"
          : "আইটেমটি প্রকাশ করা হয়েছে।",
    );
  }

  async function importResults() {
    await postJson(
      "/api/admin/results/import",
      { kind: importKind, content: importText, published: importPublished },
      "ফলাফল ইমপোর্ট সম্পন্ন হয়েছে।",
    );
  }

  async function logout() {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  async function changePassword() {
    setMessage("পাসওয়ার্ড যাচাই করা হচ্ছে...");
    const response = await fetch("/api/admin/auth/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(passwordForm),
    });
    const payload = (await response.json().catch(() => null)) as { error?: string } | null;
    if (!response.ok) {
      setMessage(payload?.error || "পাসওয়ার্ড পরিবর্তন করা যায়নি।");
      return;
    }

    setPasswordForm({ currentPassword: "", nextPassword: "", confirmPassword: "" });
    await refreshStore();
    setMessage("পাসওয়ার্ড পরিবর্তন হয়েছে। নতুন সেশন নিরাপদভাবে চালু আছে।");
  }

  return (
    <main className="admin-console">
      <section className="admin-console-hero">
        <div className="admin-hero-main">
          <div className="admin-brand-chip">
            <NextImage src="/media/elogo.png" alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো" width={180} height={64} style={{ width: "180px", height: "auto" }} priority />
            <span>জয়পুরহাট কনটেন্ট প্যানেল</span>
          </div>
          <p className="kicker-light">ব্রাঞ্চ কন্ট্রোল প্যানেল</p>
          <h1>ওয়েবসাইটের সব আপডেট এক জায়গা থেকে নিয়ন্ত্রণ করুন।</h1>
          <p>
            নোটিশ, কোর্স, ফলাফল, টিম, মিডিয়া, সার্চের তথ্য ও ব্রাঞ্চ সেটিংস একই ড্যাশবোর্ড থেকে পরিচালনা করা যাবে। সিস্টেমটি হালকা, দ্রুত এবং ব্যবহারবান্ধব রাখা হয়েছে।
          </p>
          <div className="admin-hero-actions">
            <Link href="/" target="_blank">
              <Globe2 size={17} />
              ওয়েবসাইট দেখুন
            </Link>
            <Link href="/courses/jubo-freelancing" target="_blank">
              <ExternalLink size={17} />
              চলমান কোর্স
            </Link>
            <Link href="/results/admission" target="_blank">
              <BadgeCheck size={17} />
              ফলাফল পোর্টাল
            </Link>
          </div>
        </div>

        <div className="admin-profile-card">
          <span>লগইন করা হয়েছে</span>
          <strong>{admin.name}</strong>
          <p>{admin.email}</p>
          <em>{displayAdminValue(admin.role)}</em>
          <div className="admin-status-list">
            <p><ShieldCheck size={15} /> নিরাপদ সেশন চালু</p>
            <p><DatabaseZap size={15} /> লোকাল কনটেন্ট ডেটাবেস</p>
          </div>
          <button type="button" onClick={logout}>
            <LogOut size={16} />
            লগআউট
          </button>
        </div>
      </section>

      <nav className="admin-tabbar" aria-label="অ্যাডমিন সেকশন">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "active" : ""}
            type="button"
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon size={17} />
            {tab.label}
          </button>
        ))}
      </nav>

      {message ? <div className="admin-toast">{message}</div> : null}

      {activeTab === "overview" ? (
        <section className="admin-grid command-grid">
          {metrics.map(([label, value]) => (
            <article key={label} className="admin-metric-card">
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}

          <article className="admin-wide-panel admin-command-panel">
            <div className="admin-panel-title">
              <Sparkles size={22} />
              <h2>ব্রাঞ্চ পরিচালনা কেন্দ্র</h2>
            </div>
            <div className="admin-command-layout">
              <div className="admin-branch-card">
                <NextImage src="/media/elogo.png" alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো" width={210} height={80} style={{ width: "210px", height: "auto" }} />
                <h3>{store.settings.siteName}</h3>
                <p>{branch.address}</p>
                <div>
                  <span>{store.settings.activeBatch}</span>
                  <span>{store.settings.admissionStatus}</span>
                </div>
              </div>
              <div className="admin-health-grid">
                {contentHealth.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <article className="admin-wide-panel">
            <div className="admin-panel-title">
              <Activity size={22} />
              <h2>সাম্প্রতিক কার্যক্রম</h2>
            </div>
            <div className="admin-activity-list">
              {store.auditLogs.slice(0, 8).map((log) => (
                <div key={log.id}>
                  <strong>{displayAction(log.action)}</strong>
                  <span>{log.actor} / {log.target}</span>
                  <p>{new Date(log.createdAt).toLocaleString("bn-BD")}</p>
                </div>
              ))}
            </div>
          </article>
        </section>
      ) : null}

      {activeTab === "settings" ? (
        <section className="admin-two-col">
          <Panel title="ওয়েবসাইট পরিচিতি ও সার্চ তথ্য" icon={MonitorCog}>
            <AdminInput label="সাইটের নাম" value={settings.siteName} onChange={(value) => setSettings({ ...settings, siteName: value })} />
            <AdminInput label="ট্যাগলাইন" value={settings.tagline} onChange={(value) => setSettings({ ...settings, tagline: value })} />
            <AdminInput label="ভর্তির অবস্থা" value={settings.admissionStatus} onChange={(value) => setSettings({ ...settings, admissionStatus: value })} />
            <AdminInput label="চলমান ব্যাচ" value={settings.activeBatch} onChange={(value) => setSettings({ ...settings, activeBatch: value })} />
            <AdminInput label="সার্চ শিরোনাম" value={settings.seoTitle} onChange={(value) => setSettings({ ...settings, seoTitle: value })} />
            <AdminInput label="সার্চ বিবরণ" value={settings.seoDescription} onChange={(value) => setSettings({ ...settings, seoDescription: value })} textarea />
            <label className="admin-check">
              <input
                checked={settings.maintenanceMode}
                type="checkbox"
                onChange={(event) => setSettings({ ...settings, maintenanceMode: event.target.checked })}
              />
              রক্ষণাবেক্ষণ মোড
            </label>
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/settings", settings, "ওয়েবসাইট সেটিংস সংরক্ষণ করা হয়েছে।")}>
              <UploadCloud size={17} />
              সেটিংস সংরক্ষণ
            </button>
          </Panel>

          <Panel title="লাইভ ব্রাঞ্চ প্রিভিউ" icon={Globe2}>
            <div className="admin-preview-card">
              <NextImage src="/media/elogo.png" alt="ই-লার্নিং এন্ড আর্নিং লিমিটেডের লোগো" width={190} height={70} style={{ width: "190px", height: "auto" }} />
              <span>{settings.admissionStatus}</span>
              <h3>{settings.siteName}</h3>
              <p>{settings.tagline}</p>
              <strong>{settings.activeBatch}</strong>
            </div>
            <div className="admin-link-grid">
              {[
                ["হোম", "/"],
                ["কোর্স", "/courses"],
                ["নোটিশ", "/notices"],
                ["ভর্তি ফলাফল", "/results/admission"],
                ["মাসিক ফলাফল", "/results/monthly"],
              ].map(([label, href]) => (
                <Link key={href} href={href} target="_blank">
                  {label}
                  <ExternalLink size={15} />
                </Link>
              ))}
            </div>
          </Panel>
        </section>
      ) : null}

      {activeTab === "notices" ? (
        <section className="admin-two-col">
          <Panel title="নোটিশ প্রকাশ" icon={Megaphone}>
            <AdminInput label="শিরোনাম" value={notice.title} onChange={(value) => setNotice({ ...notice, title: value })} />
            <AdminInput label="তারিখ" value={notice.date} onChange={(value) => setNotice({ ...notice, date: value })} />
            <AdminInput label="ধরন" value={notice.type} onChange={(value) => setNotice({ ...notice, type: value })} />
            <AdminInput label="বিস্তারিত" value={notice.detail} onChange={(value) => setNotice({ ...notice, detail: value })} textarea />
            <AdminInput label="লিংক" value={notice.href} onChange={(value) => setNotice({ ...notice, href: value })} />
            <AdminSelect label="অবস্থা" value={notice.status || "DRAFT"} options={publishOptions} onChange={(value) => setNotice({ ...notice, status: value as PublishStatus })} />
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/notices", notice, "নোটিশ সংরক্ষণ করা হয়েছে।")}>
              <UploadCloud size={17} />
              নোটিশ সংরক্ষণ
            </button>
          </Panel>
          <Panel title="নোটিশ ডেটাবেস" icon={FileText}>
            <AdminDataTable
              searchPlaceholder="শিরোনাম, ধরন বা তারিখ লিখুন"
              statusOptions={publishOptions.map((value) => ({ value, label: displayAdminValue(value) }))}
              initialSortKey="date"
              columns={[
                { key: "title", label: "শিরোনাম", sortable: true },
                { key: "type", label: "ধরন", sortable: true },
                { key: "date", label: "তারিখ", sortable: true },
                { key: "status", label: "অবস্থা", sortable: true },
              ]}
              rows={store.notices.map((item) => ({
                id: item.id,
                statusValue: item.status,
                statusLabel: displayAdminValue(item.status),
                searchText: [item.title, item.type, item.date, item.detail, item.status].join(" "),
                sortValues: { title: item.title, type: item.type, date: item.date, status: item.status },
                cells: {
                  title: <strong>{item.title}</strong>,
                  type: item.type,
                  date: item.date,
                  status: displayAdminValue(item.status),
                },
                actions: {
                  onPick: () => setNotice(item),
                  onPublish: () => runCmsAction("notices", item.id, "publish"),
                  onArchive: () => runCmsAction("notices", item.id, "archive"),
                  onDelete: () => runCmsAction("notices", item.id, "delete"),
                },
              }))}
            />
          </Panel>
        </section>
      ) : null}

      {activeTab === "courses" ? (
        <section className="admin-two-col">
          <Panel title="কোর্স ব্যবস্থাপনা" icon={BookOpenCheck}>
            <AdminInput label="শিরোনাম" value={course.title} onChange={(value) => setCourse({ ...course, title: value })} />
            <AdminInput label="ধরন" value={course.type} onChange={(value) => setCourse({ ...course, type: value })} />
            <AdminInput label="অবস্থা" value={course.status} onChange={(value) => setCourse({ ...course, status: value })} />
            <AdminInput label="বিস্তারিত" value={course.detail} onChange={(value) => setCourse({ ...course, detail: value })} textarea />
            <AdminInput label="লিংক" value={course.href} onChange={(value) => setCourse({ ...course, href: value })} />
            <label className="admin-check">
              <input
                checked={Boolean(course.featured)}
                type="checkbox"
                onChange={(event) => setCourse({ ...course, featured: event.target.checked })}
              />
              হোমপেজ ও কোর্স তালিকায় দেখান
            </label>
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/courses", course, "কোর্স সংরক্ষণ করা হয়েছে।")}>
              <UploadCloud size={17} />
              কোর্স সংরক্ষণ
            </button>
          </Panel>
          <Panel title="কোর্স ডেটাবেস" icon={LayoutDashboard}>
            <AdminDataTable
              searchPlaceholder="কোর্সের নাম, ধরন বা অবস্থা লিখুন"
              statusOptions={[
                { value: "FEATURED", label: "হোমে দেখানো" },
                { value: "NORMAL", label: "সাধারণ" },
              ]}
              initialSortKey="title"
              columns={[
                { key: "title", label: "কোর্স", sortable: true },
                { key: "type", label: "ধরন", sortable: true },
                { key: "status", label: "অবস্থা", sortable: true },
                { key: "featured", label: "হোম", sortable: true },
              ]}
              rows={store.courses.map((item) => ({
                id: item.id,
                statusValue: item.featured ? "FEATURED" : "NORMAL",
                statusLabel: item.featured ? "হোমে দেখানো" : "সাধারণ",
                filterValues: [item.featured ? "FEATURED" : "NORMAL"],
                searchText: [item.title, item.type, item.status, item.detail, item.featured].join(" "),
                sortValues: { title: item.title, type: item.type, status: item.status, featured: Number(item.featured) },
                cells: {
                  title: <strong>{item.title}</strong>,
                  type: item.type,
                  status: item.status,
                  featured: item.featured ? "হ্যাঁ" : "না",
                },
                actions: {
                  onPick: () => setCourse(item),
                  onPublish: () => runCmsAction("courses", item.id, "publish"),
                  onArchive: () => runCmsAction("courses", item.id, "archive"),
                  onDelete: () => runCmsAction("courses", item.id, "delete"),
                },
              }))}
            />
          </Panel>
        </section>
      ) : null}

      {activeTab === "results" ? (
        <section className="admin-two-col">
          <Panel title="ভর্তি ফলাফল প্রকাশ" icon={BadgeCheck}>
            <AdminInput label="রোল" value={admissionResult.roll} onChange={(value) => setAdmissionResult({ ...admissionResult, roll: value })} />
            <AdminInput label="ফোন" value={admissionResult.phone} onChange={(value) => setAdmissionResult({ ...admissionResult, phone: value })} />
            <AdminInput label="নাম" value={admissionResult.name} onChange={(value) => setAdmissionResult({ ...admissionResult, name: value })} />
            <AdminInput label="লিখিত" value={String(admissionResult.written ?? "")} onChange={(value) => setAdmissionResult({ ...admissionResult, written: Number(value) })} />
            <AdminInput label="মৌখিক" value={String(admissionResult.viva ?? "")} onChange={(value) => setAdmissionResult({ ...admissionResult, viva: Number(value) })} />
            <AdminInput label="ব্যাচ" value={admissionResult.batch} onChange={(value) => setAdmissionResult({ ...admissionResult, batch: value })} />
            <AdminSelect label="অবস্থা" value={admissionResult.status || "Waiting"} options={admissionStatusOptions} onChange={(value) => setAdmissionResult({ ...admissionResult, status: value as AdmissionResultEntry["status"] })} />
            <label className="admin-check">
              <input
                checked={Boolean(admissionResult.published)}
                type="checkbox"
                onChange={(event) => setAdmissionResult({ ...admissionResult, published: event.target.checked })}
              />
              ব্যক্তিগত ফলাফল প্রকাশ করুন
            </label>
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/results", { kind: "admission", result: admissionResult }, "ভর্তি ফলাফল সংরক্ষণ করা হয়েছে।")}>
              ভর্তি ফলাফল প্রকাশ
            </button>
          </Panel>
          <Panel title="মাসিক ফলাফল প্রকাশ" icon={BookOpenCheck}>
            <AdminInput label="ফোন" value={monthlyResult.phone} onChange={(value) => setMonthlyResult({ ...monthlyResult, phone: value })} />
            <AdminInput label="নাম" value={monthlyResult.name} onChange={(value) => setMonthlyResult({ ...monthlyResult, name: value })} />
            <AdminInput label="ব্যাচ" value={monthlyResult.batch} onChange={(value) => setMonthlyResult({ ...monthlyResult, batch: value })} />
            <AdminSelect label="Lab" value={monthlyResult.lab || "Lab A"} options={labOptions} onChange={(value) => setMonthlyResult({ ...monthlyResult, lab: value as MonthlyResultEntry["lab"] })} />
            <AdminInput label="মাস" value={monthlyResult.month} onChange={(value) => setMonthlyResult({ ...monthlyResult, month: value })} />
            <AdminInput label="বিষয়" value={monthlyResult.subject} onChange={(value) => setMonthlyResult({ ...monthlyResult, subject: value })} />
            <AdminInput label="নম্বর" value={String(monthlyResult.score ?? "")} onChange={(value) => setMonthlyResult({ ...monthlyResult, score: Number(value) })} />
            <AdminInput label="পূর্ণমান" value={String(monthlyResult.maxScore ?? "")} onChange={(value) => setMonthlyResult({ ...monthlyResult, maxScore: Number(value) })} />
            <AdminInput label="গ্রেড" value={monthlyResult.grade} onChange={(value) => setMonthlyResult({ ...monthlyResult, grade: value })} />
            <AdminSelect label="Merit type" value={monthlyResult.meritMode || "COMBINED"} options={meritModeOptions} onChange={(value) => setMonthlyResult({ ...monthlyResult, meritMode: value as MonthlyResultEntry["meritMode"] })} />
            <label className="admin-check">
              <input
                checked={Boolean(monthlyResult.published)}
                type="checkbox"
                onChange={(event) => setMonthlyResult({ ...monthlyResult, published: event.target.checked })}
              />
              ব্যক্তিগত ফলাফল প্রকাশ করুন
            </label>
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/results", { kind: "monthly", result: monthlyResult }, "মাসিক ফলাফল সংরক্ষণ করা হয়েছে।")}>
              মাসিক ফলাফল প্রকাশ
            </button>
          </Panel>

          <Panel title="ভর্তি ফলাফল ডেটাবেস" icon={DatabaseZap}>
            <AdminDataTable
              searchPlaceholder="রোল, ফোন, নাম বা ব্যাচ লিখুন"
              statusOptions={[
                { value: "PUBLISHED", label: "প্রকাশিত" },
                { value: "HIDDEN", label: "লুকানো" },
                ...admissionStatusOptions.map((value) => ({ value, label: displayAdminValue(value) })),
              ]}
              initialSortKey="total"
              columns={[
                { key: "roll", label: "রোল", sortable: true },
                { key: "name", label: "নাম", sortable: true },
                { key: "phone", label: "ফোন", sortable: true },
                { key: "total", label: "মোট", sortable: true, align: "right" },
                { key: "status", label: "অবস্থা", sortable: true },
              ]}
              rows={store.admissionResults.map((item) => {
                const total = item.written + item.viva;
                return {
                  id: item.id,
                  statusValue: item.published ? item.status : "HIDDEN",
                  statusLabel: item.published ? displayAdminValue(item.status) : "লুকানো",
                  filterValues: [item.published ? "PUBLISHED" : "HIDDEN", item.status],
                  searchText: [item.roll, item.phone, item.name, item.batch, item.status, item.published, total].join(" "),
                  sortValues: { roll: item.roll, name: item.name, phone: item.phone, total, status: item.status },
                  cells: {
                    roll: <strong>{item.roll}</strong>,
                    name: item.name,
                    phone: item.phone,
                    total: `${total}`,
                    status: item.published ? displayAdminValue(item.status) : "লুকানো",
                  },
                  actions: {
                    onPick: () => setAdmissionResult(item),
                    onPublish: () => runCmsAction("admissionResults", item.id, "publish"),
                    onArchive: () => runCmsAction("admissionResults", item.id, "archive"),
                    onDelete: () => runCmsAction("admissionResults", item.id, "delete"),
                  },
                };
              })}
            />
          </Panel>

          <Panel title="মাসিক ফলাফল ডেটাবেস" icon={BookOpenCheck}>
            <AdminDataTable
              searchPlaceholder="ফোন, নাম, মাস বা বিষয় লিখুন"
              statusOptions={[
                { value: "PUBLISHED", label: "প্রকাশিত" },
                { value: "HIDDEN", label: "লুকানো" },
                ...labOptions.map((value) => ({ value, label: value })),
                ...meritModeOptions.map((value) => ({ value, label: displayAdminValue(value) })),
              ]}
              initialSortKey="score"
              columns={[
                { key: "name", label: "শিক্ষার্থী", sortable: true },
                { key: "phone", label: "ফোন", sortable: true },
                { key: "lab", label: "Lab", sortable: true },
                { key: "subject", label: "বিষয়", sortable: true },
                { key: "score", label: "নম্বর", sortable: true, align: "right" },
                { key: "grade", label: "গ্রেড", sortable: true },
              ]}
              rows={store.monthlyResults.map((item) => ({
                id: item.id,
                statusValue: item.published ? "PUBLISHED" : "HIDDEN",
                statusLabel: item.published ? "প্রকাশিত" : "লুকানো",
                filterValues: [item.published ? "PUBLISHED" : "HIDDEN", item.grade, item.lab, item.meritMode],
                searchText: [item.phone, item.name, item.batch, item.lab, item.month, item.subject, item.grade, item.meritMode, item.published].join(" "),
                sortValues: { name: item.name, phone: item.phone, lab: item.lab, subject: item.subject, score: item.score, grade: item.grade },
                cells: {
                  name: <strong>{item.name}</strong>,
                  phone: item.phone,
                  lab: item.lab,
                  subject: `${item.subject} / ${item.month}`,
                  score: `${item.score}/${item.maxScore}`,
                  grade: item.published ? item.grade : "লুকানো",
                },
                actions: {
                  onPick: () => setMonthlyResult(item),
                  onPublish: () => runCmsAction("monthlyResults", item.id, "publish"),
                  onArchive: () => runCmsAction("monthlyResults", item.id, "archive"),
                  onDelete: () => runCmsAction("monthlyResults", item.id, "delete"),
                },
              }))}
            />
          </Panel>

          <Panel title="CSV/TSV ফলাফল ইমপোর্ট" icon={FileUp}>
            <AdminSelect
              label="ফলাফলের ধরন"
              value={importKind}
              options={["admission", "monthly"]}
              onChange={(value) => {
                const nextKind = value as "admission" | "monthly";
                setImportKind(nextKind);
                setImportText(resultImportSample[nextKind]);
              }}
            />
            <AdminInput
              label="ফলাফলের ডেটা"
              value={importText}
              onChange={setImportText}
              textarea
              placeholder="প্রথম লাইনে কলামের নাম, এরপর প্রতিটি লাইনে একটি ফলাফল দিন"
            />
            <label className="admin-check">
              <input
                checked={importPublished}
                type="checkbox"
                onChange={(event) => setImportPublished(event.target.checked)}
              />
              ইমপোর্ট করার সঙ্গে সঙ্গে প্রকাশ করুন
            </label>
            <button className="button-primary" type="button" onClick={importResults}>
              <FileUp size={17} />
              ফলাফল ইমপোর্ট করুন
            </button>
            <p className="admin-help-text">ইমপোর্ট শেষ হলে সংশ্লিষ্ট ফলাফল ডেটাবেস টেবিলে সারিটি দেখা যাবে। সেখান থেকে সম্পাদনা, প্রকাশ, লুকানো বা মুছে ফেলা যাবে।</p>
          </Panel>
        </section>
      ) : null}

      {activeTab === "team" ? (
        <section className="admin-two-col">
          <Panel title="টিম প্রোফাইল সম্পাদনা" icon={UsersRound}>
            <AdminInput label="নাম" value={teamMember.name} onChange={(value) => setTeamMember({ ...teamMember, name: value })} />
            <AdminInput label="পদবি" value={teamMember.role} onChange={(value) => setTeamMember({ ...teamMember, role: value })} />
            <AdminInput label="সংগঠন" value={teamMember.org} onChange={(value) => setTeamMember({ ...teamMember, org: value })} />
            <AdminInput label="ছবির পথ" value={teamMember.image} onChange={(value) => setTeamMember({ ...teamMember, image: value })} />
            <AdminSelect label="ধরন" value={teamMember.category || "TRAINER"} options={teamCategoryOptions} onChange={(value) => setTeamMember({ ...teamMember, category: value as TeamMemberEntry["category"] })} />
            <AdminSelect label="অবস্থা" value={teamMember.status || "DRAFT"} options={publishOptions} onChange={(value) => setTeamMember({ ...teamMember, status: value as PublishStatus })} />
            <AdminInput label="প্রদর্শনের ক্রম" value={String(teamMember.sortOrder ?? "")} onChange={(value) => setTeamMember({ ...teamMember, sortOrder: Number(value) })} />
            <AdminInput label="সংক্ষিপ্ত পরিচিতি" value={teamMember.bio} onChange={(value) => setTeamMember({ ...teamMember, bio: value })} textarea />
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/team", teamMember, "টিম প্রোফাইল সংরক্ষণ করা হয়েছে।")}>
              <UploadCloud size={17} />
              টিম প্রোফাইল সংরক্ষণ
            </button>
          </Panel>
          <Panel title="টিম লাইব্রেরি" icon={Images}>
            <AdminDataTable
              searchPlaceholder="নাম, পদবি বা সংগঠন লিখুন"
              statusOptions={[
                ...publishOptions.map((value) => ({ value, label: displayAdminValue(value) })),
                ...teamCategoryOptions.map((value) => ({ value, label: displayAdminValue(value) })),
              ]}
              initialSortKey="sortOrder"
              columns={[
                { key: "sortOrder", label: "ক্রম", sortable: true, align: "right" },
                { key: "name", label: "নাম", sortable: true },
                { key: "role", label: "পদবি", sortable: true },
                { key: "category", label: "ধরন", sortable: true },
                { key: "status", label: "অবস্থা", sortable: true },
              ]}
              rows={store.teamMembers.map((item) => ({
                id: item.id,
                statusValue: item.status,
                statusLabel: displayAdminValue(item.status),
                filterValues: [item.status, item.category],
                searchText: [item.name, item.role, item.org, item.category, item.status].join(" "),
                sortValues: { sortOrder: item.sortOrder, name: item.name, role: item.role, category: item.category, status: item.status },
                cells: {
                  sortOrder: item.sortOrder,
                  name: <strong>{item.name}</strong>,
                  role: item.role,
                  category: displayAdminValue(item.category),
                  status: displayAdminValue(item.status),
                },
                actions: {
                  onPick: () => setTeamMember(item),
                  onPublish: () => runCmsAction("teamMembers", item.id, "publish"),
                  onArchive: () => runCmsAction("teamMembers", item.id, "archive"),
                  onDelete: () => runCmsAction("teamMembers", item.id, "delete"),
                },
              }))}
            />
          </Panel>
        </section>
      ) : null}

      {activeTab === "stories" ? (
        <section className="admin-two-col">
          <Panel title="সাফল্যের গল্প সম্পাদনা" icon={Sparkles}>
            <AdminInput label="শিক্ষার্থীর নাম" value={successStory.name} onChange={(value) => setSuccessStory({ ...successStory, name: value })} />
            <AdminInput label="ব্যাচ" value={successStory.batch} onChange={(value) => setSuccessStory({ ...successStory, batch: value })} placeholder="যেমন: ৬ষ্ঠ ব্যাচ" />
            <AdminInput label="কোর্স" value={successStory.course} onChange={(value) => setSuccessStory({ ...successStory, course: value })} />
            <AdminInput label="ছবির পথ" value={successStory.image} onChange={(value) => setSuccessStory({ ...successStory, image: value })} placeholder="/media/team/halima-akter.jpg" />
            <AdminInput label="গল্পের শিরোনাম" value={successStory.title} onChange={(value) => setSuccessStory({ ...successStory, title: value })} />
            <AdminInput label="হোমপেজে দেখানোর সংক্ষিপ্ত লেখা" value={successStory.excerpt} onChange={(value) => setSuccessStory({ ...successStory, excerpt: value })} textarea />
            <AdminInput label="পূর্ণ গল্প" value={successStory.story} onChange={(value) => setSuccessStory({ ...successStory, story: value })} textarea />
            <AdminInput label="বর্তমান অগ্রগতি / অর্জন" value={successStory.achievement} onChange={(value) => setSuccessStory({ ...successStory, achievement: value })} />
            <div className="admin-form-grid">
              <AdminSelect label="অবস্থা" value={successStory.status || "DRAFT"} options={publishOptions} onChange={(value) => setSuccessStory({ ...successStory, status: value as PublishStatus })} />
              <AdminInput label="প্রদর্শনের ক্রম" value={String(successStory.sortOrder ?? "")} onChange={(value) => setSuccessStory({ ...successStory, sortOrder: Number(value) })} />
            </div>
            <label className="admin-check">
              <input
                checked={Boolean(successStory.featured)}
                type="checkbox"
                onChange={(event) => setSuccessStory({ ...successStory, featured: event.target.checked })}
              />
              হোমপেজের marquee section-এ আগে দেখান
            </label>
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/success-stories", successStory, "সাফল্যের গল্প সংরক্ষণ করা হয়েছে।")}>
              <UploadCloud size={17} />
              গল্প সংরক্ষণ
            </button>
            <p className="admin-help-text">প্রকাশিত গল্প হোমপেজে marquee হিসেবে দেখাবে এবং /success-stories পেজে ৯টি করে pagination সহ যাবে।</p>
          </Panel>

          <Panel title="সাফল্যের গল্প ডেটাবেস" icon={DatabaseZap}>
            <AdminDataTable
              searchPlaceholder="নাম, ব্যাচ, কোর্স বা অর্জন লিখুন"
              statusOptions={[
                ...publishOptions.map((value) => ({ value, label: displayAdminValue(value) })),
                { value: "FEATURED", label: "হোমে আগে দেখানো" },
              ]}
              initialSortKey="sortOrder"
              columns={[
                { key: "sortOrder", label: "ক্রম", sortable: true, align: "right" },
                { key: "name", label: "নাম", sortable: true },
                { key: "batch", label: "ব্যাচ", sortable: true },
                { key: "course", label: "কোর্স", sortable: true },
                { key: "featured", label: "হোম", sortable: true },
                { key: "status", label: "অবস্থা", sortable: true },
              ]}
              rows={store.successStories.map((item) => ({
                id: item.id,
                statusValue: item.status,
                statusLabel: displayAdminValue(item.status),
                filterValues: [item.status, item.featured ? "FEATURED" : ""],
                searchText: [item.name, item.batch, item.course, item.title, item.excerpt, item.achievement, item.status].join(" "),
                sortValues: {
                  sortOrder: item.sortOrder,
                  name: item.name,
                  batch: item.batch,
                  course: item.course,
                  featured: item.featured,
                  status: item.status,
                },
                cells: {
                  sortOrder: item.sortOrder,
                  name: <strong>{item.name}</strong>,
                  batch: item.batch,
                  course: item.course,
                  featured: item.featured ? "হ্যাঁ" : "না",
                  status: displayAdminValue(item.status),
                },
                actions: {
                  onPick: () => setSuccessStory(item),
                  onPublish: () => runCmsAction("successStories", item.id, "publish"),
                  onArchive: () => runCmsAction("successStories", item.id, "archive"),
                  onDelete: () => runCmsAction("successStories", item.id, "delete"),
                },
              }))}
            />
          </Panel>
        </section>
      ) : null}

      {activeTab === "media" ? (
        <section className="admin-two-col">
          <Panel title="মিডিয়া লাইব্রেরি" icon={Images}>
            <AdminInput label="শিরোনাম" value={mediaAsset.title} onChange={(value) => setMediaAsset({ ...mediaAsset, title: value })} />
            <AdminInput label="লিংক / ফাইলের পথ" value={mediaAsset.url} onChange={(value) => setMediaAsset({ ...mediaAsset, url: value })} />
            <AdminInput label="বিকল্প লেখা" value={mediaAsset.alt} onChange={(value) => setMediaAsset({ ...mediaAsset, alt: value })} />
            <AdminInput label="কোথায় ব্যবহার হবে" value={mediaAsset.usedIn} onChange={(value) => setMediaAsset({ ...mediaAsset, usedIn: value })} />
            <AdminSelect label="ধরন" value={mediaAsset.kind || "IMAGE"} options={mediaKindOptions} onChange={(value) => setMediaAsset({ ...mediaAsset, kind: value as MediaAssetEntry["kind"] })} />
            <AdminSelect label="অবস্থা" value={mediaAsset.status || "DRAFT"} options={publishOptions} onChange={(value) => setMediaAsset({ ...mediaAsset, status: value as PublishStatus })} />
            <button className="button-primary" type="button" onClick={() => postJson("/api/admin/media", mediaAsset, "মিডিয়া সংরক্ষণ করা হয়েছে।")}>
              <UploadCloud size={17} />
              মিডিয়া সংরক্ষণ
            </button>
          </Panel>
          <Panel title="মিডিয়া ডেটাবেস" icon={DatabaseZap}>
            <AdminDataTable
              searchPlaceholder="শিরোনাম, ধরন বা ব্যবহার লিখুন"
              statusOptions={[
                ...publishOptions.map((value) => ({ value, label: displayAdminValue(value) })),
                ...mediaKindOptions.map((value) => ({ value, label: displayAdminValue(value) })),
              ]}
              initialSortKey="title"
              columns={[
                { key: "title", label: "মিডিয়া", sortable: true },
                { key: "kind", label: "ধরন", sortable: true },
                { key: "usedIn", label: "ব্যবহার", sortable: true },
                { key: "status", label: "অবস্থা", sortable: true },
              ]}
              rows={store.mediaAssets.map((item) => ({
                id: item.id,
                statusValue: item.status,
                statusLabel: displayAdminValue(item.status),
                filterValues: [item.status, item.kind],
                searchText: [item.title, item.kind, item.url, item.usedIn, item.status, item.alt].join(" "),
                sortValues: { title: item.title, kind: item.kind, usedIn: item.usedIn, status: item.status },
                cells: {
                  title: <strong>{item.title}</strong>,
                  kind: displayAdminValue(item.kind),
                  usedIn: item.usedIn,
                  status: displayAdminValue(item.status),
                },
                actions: {
                  onPick: () => setMediaAsset(item),
                  onPublish: () => runCmsAction("mediaAssets", item.id, "publish"),
                  onArchive: () => runCmsAction("mediaAssets", item.id, "archive"),
                  onDelete: () => runCmsAction("mediaAssets", item.id, "delete"),
                },
              }))}
            />
          </Panel>
        </section>
      ) : null}

      {activeTab === "security" ? (
        <section className="admin-two-col">
          <Panel title="পাসওয়ার্ড পরিবর্তন" icon={KeyRound}>
            <AdminInput
              label="বর্তমান পাসওয়ার্ড"
              type="password"
              value={passwordForm.currentPassword}
              onChange={(value) => setPasswordForm({ ...passwordForm, currentPassword: value })}
            />
            <AdminInput
              label="নতুন পাসওয়ার্ড"
              type="password"
              value={passwordForm.nextPassword}
              onChange={(value) => setPasswordForm({ ...passwordForm, nextPassword: value })}
            />
            <AdminInput
              label="নতুন পাসওয়ার্ড আবার লিখুন"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={(value) => setPasswordForm({ ...passwordForm, confirmPassword: value })}
            />
            <div className="admin-help-text">
              পাসওয়ার্ড কমপক্ষে ১২ অক্ষরের হবে এবং বড় letter, ছোট letter, number ও special character থাকবে। Password change করলে নতুন hash CMS database-এ save হবে।
            </div>
            <button className="button-primary" type="button" onClick={changePassword}>
              <KeyRound size={17} />
              পাসওয়ার্ড পরিবর্তন
            </button>
          </Panel>

          <Panel title="নিরাপত্তা নিয়ন্ত্রণ" icon={ShieldCheck}>
            <div className="security-list">
              {[
                "নিরাপদ সেশন কুকি দিয়ে অ্যাডমিন লগইন",
                "অ্যাডমিন রুটে সার্ভার-সাইড সুরক্ষা",
                "কনটেন্ট ও ফলাফলের জন্য ভূমিকাভিত্তিক অনুরোধ নিয়ন্ত্রণ",
                "পাসওয়ার্ড পরিবর্তন ও emergency recovery code ব্যবস্থা",
                "শুধু ব্যক্তিগত ফলাফল দেখা, পাবলিক মেরিট তালিকা নয়",
                "নিরাপত্তা হেডার ও কনটেন্ট সুরক্ষা নীতি সক্রিয়",
                "প্রতিটি কনটেন্ট পরিবর্তনের অডিট লগ",
              ].map((item) => (
                <p key={item}><ShieldCheck size={16} /> {item}</p>
              ))}
            </div>
          </Panel>
          <Panel title="অ্যাডমিন ব্যবহারকারী" icon={LayoutDashboard}>
            <AdminDataTable
              searchPlaceholder="নাম, ইমেইল বা ভূমিকা লিখুন"
              statusOptions={[
                { value: "ACTIVE", label: "চালু" },
                { value: "PENDING", label: "অপেক্ষমান" },
                { value: "SUSPENDED", label: "স্থগিত" },
              ]}
              initialSortKey="name"
              columns={[
                { key: "name", label: "নাম", sortable: true },
                { key: "email", label: "ইমেইল", sortable: true },
                { key: "role", label: "ভূমিকা", sortable: true },
                { key: "status", label: "অবস্থা", sortable: true },
              ]}
              rows={store.admins.map((item) => ({
                id: item.id,
                statusValue: item.status,
                statusLabel: displayAdminValue(item.status),
                searchText: [item.name, item.email, item.role, item.status].join(" "),
                sortValues: { name: item.name, email: item.email, role: item.role, status: item.status },
                cells: {
                  name: <strong>{item.name}</strong>,
                  email: item.email,
                  role: displayAdminValue(item.role),
                  status: displayAdminValue(item.status),
                },
              }))}
            />
          </Panel>
        </section>
      ) : null}
    </main>
  );
}

function Panel({ title, icon: Icon, children }: { title: string; icon: LucideIcon; children: ReactNode }) {
  return (
    <article className="admin-panel premium">
      <div className="admin-panel-title">
        <Icon size={21} />
        <h2>{title}</h2>
      </div>
      <div className="mt-5 grid gap-4">{children}</div>
    </article>
  );
}

function AdminInput({
  label,
  value,
  onChange,
  textarea = false,
  placeholder,
  type = "text",
}: {
  label: string;
  value?: string;
  onChange: (value: string) => void;
  textarea?: boolean;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="form-label">
      {label}
      {textarea ? (
        <textarea className="form-input admin-textarea" value={value || ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className="form-input" type={type} value={value || ""} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
      )}
    </label>
  );
}

function AdminSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="form-label">
      {label}
      <select className="form-input" value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {displayAdminValue(option)}
          </option>
        ))}
      </select>
    </label>
  );
}

type AdminTableColumn = {
  key: string;
  label: string;
  sortable?: boolean;
  align?: "left" | "right";
};

type AdminTableRow = {
  id: string;
  cells: Record<string, ReactNode>;
  sortValues: Record<string, string | number | boolean | undefined>;
  searchText: string;
  statusValue: string;
  statusLabel: string;
  filterValues?: string[];
  actions?: {
    onPick?: () => void;
    onPublish?: () => void;
    onArchive?: () => void;
    onDelete?: () => void;
  };
};

function normalizeSortValue(value: string | number | boolean | undefined) {
  if (typeof value === "number") return value;
  if (typeof value === "boolean") return value ? 1 : 0;
  return String(value ?? "").toLocaleLowerCase("bn-BD");
}

function AdminDataTable({
  columns,
  rows,
  searchPlaceholder,
  statusOptions = [],
  initialSortKey,
}: {
  columns: AdminTableColumn[];
  rows: AdminTableRow[];
  searchPlaceholder: string;
  statusOptions?: Array<{ value: string; label: string }>;
  initialSortKey?: string;
}) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [sortKey, setSortKey] = useState(initialSortKey || columns[0]?.key || "");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("bn-BD");
    return rows
      .filter((row) => {
        const matchesStatus =
          statusFilter === "ALL" ||
          row.statusValue === statusFilter ||
          row.statusLabel === statusFilter ||
          Boolean(row.filterValues?.includes(statusFilter));
        const matchesSearch =
          !normalizedQuery || row.searchText.toLocaleLowerCase("bn-BD").includes(normalizedQuery);
        return matchesStatus && matchesSearch;
      })
      .toSorted((a, b) => {
        const left = normalizeSortValue(a.sortValues[sortKey]);
        const right = normalizeSortValue(b.sortValues[sortKey]);
        const order = typeof left === "number" && typeof right === "number"
          ? left - right
          : String(left).localeCompare(String(right), "bn-BD", { numeric: true });
        return sortDirection === "asc" ? order : -order;
      });
  }, [query, rows, sortDirection, sortKey, statusFilter]);

  function toggleSort(key: string) {
    setSortKey(key);
    setSortDirection((current) => (sortKey === key && current === "asc" ? "desc" : "asc"));
  }

  return (
    <div className="admin-table-shell">
      <div className="admin-table-toolbar">
        <label>
          <span>খুঁজুন</span>
          <input value={query} placeholder={searchPlaceholder} onChange={(event) => setQuery(event.target.value)} />
        </label>
        <label>
          <span>ফিল্টার</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="ALL">সব অবস্থা</option>
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <strong>{visibleRows.length}টি সারি</strong>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-data-table">
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={column.align === "right" ? "align-right" : ""}>
                  {column.sortable ? (
                    <button type="button" onClick={() => toggleSort(column.key)}>
                      {column.label}
                      <ArrowUpDown size={13} />
                    </button>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
              <th>কাজ</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.length ? visibleRows.map((row) => (
              <tr key={row.id} className={row.actions?.onPick ? "is-editable-row" : ""} onClick={row.actions?.onPick}>
                {columns.map((column) => (
                  <td key={column.key} className={column.align === "right" ? "align-right" : ""}>
                    {row.cells[column.key] ?? "-"}
                  </td>
                ))}
                <td>
                  <div className="admin-row-actions" onClick={(event) => event.stopPropagation()}>
                    {row.actions?.onPick ? <button type="button" onClick={row.actions.onPick}>সম্পাদনা</button> : null}
                    {row.actions?.onPublish ? <button type="button" onClick={row.actions.onPublish}>প্রকাশ</button> : null}
                    {row.actions?.onArchive ? <button type="button" onClick={row.actions.onArchive}>লুকান</button> : null}
                    {row.actions?.onDelete ? (
                      <button className="danger" type="button" onClick={row.actions.onDelete}>
                        <Trash2 size={13} />
                        মুছুন
                      </button>
                    ) : null}
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={columns.length + 1}>
                  <div className="admin-empty-state">এই খোঁজ বা ফিল্টারে কোনো তথ্য পাওয়া যায়নি।</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
