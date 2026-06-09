import "server-only";

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type {
  AdmissionPopupSettings,
  AdmissionResultEntry,
  CmsStore,
  CourseEntry,
  MediaAssetEntry,
  MonthlyResultEntry,
  NoticeEntry,
  PublicAdmissionResult,
  PublicMonthlyResult,
  SiteSettings,
  SuccessStoryEntry,
  TeamMemberEntry,
} from "@/lib/cms-types";

const storePath = path.join(process.cwd(), "data", "cms-store.json");

const defaultAdmissionPopup: AdmissionPopupSettings = {
  enabled: true,
  title: "৭ম ব্যাচে ভর্তি চলছে",
  detail: "যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণের ৭ম ব্যাচে আবেদন চলছে। সঠিক তথ্য দিয়ে আবেদন করুন, অ্যাডমিট কার্ড সংরক্ষণ করুন এবং পরীক্ষার তারিখ মনে রাখুন।",
  image: "/media/jubo-64-banner.jpeg",
  imageGuidance: "Recommended image size: 1200x900px বা 4:3 ratio, JPG/PNG/WebP, 500KB-এর নিচে হলে দ্রুত load হবে।",
  startsAt: "2026-06-01",
  deadline: "2026-06-15",
  applyHref: "https://e-laeltd.com/64-student-reg-jubo",
  primaryLabel: "Apply now",
};
export type CmsActionCollection =
  | "notices"
  | "courses"
  | "teamMembers"
  | "successStories"
  | "mediaAssets"
  | "admissionResults"
  | "monthlyResults";

function now() {
  return new Date().toISOString();
}

function normalizePhone(phone: string) {
  return phone.replace(/\D/g, "");
}

function newId(prefix: string) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function readCmsStore(): Promise<CmsStore> {
  const raw = await readFile(storePath, "utf8");
  const store = JSON.parse(raw) as CmsStore;
  return normalizeStore(store);
}

export async function writeCmsStore(store: CmsStore) {
  await mkdir(path.dirname(storePath), { recursive: true });
  store.updatedAt = now();
  await writeFile(storePath, `${JSON.stringify(store, null, 2)}\n`, "utf8");
  return store;
}

export async function addAuditLog(actor: string, action: string, target: string, meta?: string) {
  const store = await readCmsStore();
  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action,
    target,
    createdAt: now(),
    meta,
  });
  store.auditLogs = store.auditLogs.slice(0, 100);
  await writeCmsStore(store);
}

export function sanitizeCmsStore(store: CmsStore) {
  return {
    ...store,
    admins: store.admins.map((admin) => ({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status,
      createdAt: admin.createdAt,
      lastLoginAt: admin.lastLoginAt,
      passwordChangedAt: admin.passwordChangedAt || null,
    })),
  };
}

function normalizeStore(store: CmsStore): CmsStore {
  return {
    ...store,
    settings: {
      ...store.settings,
      admissionPopup: {
        ...defaultAdmissionPopup,
        ...(store.settings?.admissionPopup || {}),
      },
    },
    admins: (store.admins || []).map((admin) => ({
      ...admin,
      passwordChangedAt: admin.passwordChangedAt || null,
    })),
    monthlyResults: (store.monthlyResults || []).map((row) => ({
      ...row,
      lab: row.lab || "Lab A",
      meritMode: row.meritMode || "COMBINED",
    })),
    teamMembers: store.teamMembers || [],
    successStories: store.successStories || [],
    mediaAssets: store.mediaAssets || [],
    auditLogs: store.auditLogs || [],
  };
}

function actionName(collection: CmsActionCollection, mode: "DELETE" | "ARCHIVE" | "PUBLISH") {
  const names: Record<CmsActionCollection, string> = {
    notices: "NOTICE",
    courses: "COURSE",
    teamMembers: "TEAM_MEMBER",
    successStories: "SUCCESS_STORY",
    mediaAssets: "MEDIA_ASSET",
    admissionResults: "ADMISSION_RESULT",
    monthlyResults: "MONTHLY_RESULT",
  };
  return `${mode}_${names[collection]}`;
}

export async function deleteCmsEntry(collection: CmsActionCollection, id: string, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  let deleted = false;

  if (collection === "notices") {
    const before = store.notices.length;
    store.notices = store.notices.filter((item) => item.id !== id);
    deleted = store.notices.length !== before;
  }

  if (collection === "courses") {
    const before = store.courses.length;
    store.courses = store.courses.filter((item) => item.id !== id);
    deleted = store.courses.length !== before;
  }

  if (collection === "teamMembers") {
    const before = store.teamMembers.length;
    store.teamMembers = store.teamMembers.filter((item) => item.id !== id);
    deleted = store.teamMembers.length !== before;
  }

  if (collection === "successStories") {
    const before = store.successStories.length;
    store.successStories = store.successStories.filter((item) => item.id !== id);
    deleted = store.successStories.length !== before;
  }

  if (collection === "mediaAssets") {
    const before = store.mediaAssets.length;
    store.mediaAssets = store.mediaAssets.filter((item) => item.id !== id);
    deleted = store.mediaAssets.length !== before;
  }

  if (collection === "admissionResults") {
    const before = store.admissionResults.length;
    store.admissionResults = store.admissionResults.filter((item) => item.id !== id);
    deleted = store.admissionResults.length !== before;
  }

  if (collection === "monthlyResults") {
    const before = store.monthlyResults.length;
    store.monthlyResults = store.monthlyResults.filter((item) => item.id !== id);
    deleted = store.monthlyResults.length !== before;
  }

  if (!deleted) return { deleted: false };

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: actionName(collection, "DELETE"),
    target: id,
    createdAt: timestamp,
    meta: "মুছে ফেলা হয়েছে",
  });

  await writeCmsStore(store);
  return { deleted: true };
}

export async function archiveCmsEntry(collection: CmsActionCollection, id: string, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  let changed = false;

  if (collection === "notices" || collection === "teamMembers" || collection === "successStories" || collection === "mediaAssets") {
    const item = store[collection].find((entry) => entry.id === id);
    if (item) {
      item.status = "ARCHIVED";
      item.updatedAt = timestamp;
      changed = true;
    }
  }

  if (collection === "courses") {
    const item = store.courses.find((entry) => entry.id === id);
    if (item) {
      item.featured = false;
      item.status = "আর্কাইভে রাখা হয়েছে";
      item.updatedAt = timestamp;
      changed = true;
    }
  }

  if (collection === "admissionResults" || collection === "monthlyResults") {
    const item = store[collection].find((entry) => entry.id === id);
    if (item) {
      item.published = false;
      item.updatedAt = timestamp;
      changed = true;
    }
  }

  if (!changed) return { archived: false };

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: actionName(collection, "ARCHIVE"),
    target: id,
    createdAt: timestamp,
    meta: "পাবলিক ভিউ থেকে সরানো হয়েছে",
  });

  await writeCmsStore(store);
  return { archived: true };
}

export async function publishCmsEntry(collection: CmsActionCollection, id: string, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  let changed = false;

  if (collection === "notices" || collection === "teamMembers" || collection === "successStories" || collection === "mediaAssets") {
    const item = store[collection].find((entry) => entry.id === id);
    if (item) {
      item.status = "PUBLISHED";
      item.updatedAt = timestamp;
      changed = true;
    }
  }

  if (collection === "courses") {
    const item = store.courses.find((entry) => entry.id === id);
    if (item) {
      item.featured = true;
      item.updatedAt = timestamp;
      changed = true;
    }
  }

  if (collection === "admissionResults" || collection === "monthlyResults") {
    const item = store[collection].find((entry) => entry.id === id);
    if (item) {
      item.published = true;
      item.updatedAt = timestamp;
      changed = true;
    }
  }

  if (!changed) return { published: false };

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: actionName(collection, "PUBLISH"),
    target: id,
    createdAt: timestamp,
    meta: "প্রকাশিত",
  });

  await writeCmsStore(store);
  return { published: true };
}

export async function getPublishedNotices() {
  const store = await readCmsStore();
  return store.notices
    .filter((notice) => notice.status === "PUBLISHED")
    .toSorted((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getCourses() {
  const store = await readCmsStore();
  return store.courses.toSorted((a, b) => Number(b.featured) - Number(a.featured));
}

export async function getPublishedTeamMembers() {
  const store = await readCmsStore();
  return store.teamMembers
    .filter((member) => member.status === "PUBLISHED")
    .toSorted((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
}

export async function getPublishedSuccessStories() {
  const store = await readCmsStore();
  return store.successStories
    .filter((story) => story.status === "PUBLISHED")
    .toSorted((a, b) => Number(b.featured) - Number(a.featured) || a.sortOrder - b.sortOrder || b.updatedAt.localeCompare(a.updatedAt));
}

export async function getPublishedMediaAssets() {
  const store = await readCmsStore();
  return store.mediaAssets
    .filter((asset) => asset.status === "PUBLISHED")
    .toSorted((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function withMerit(rows: AdmissionResultEntry[]): PublicAdmissionResult[] {
  let previousTotal: number | null = null;
  let previousMerit = 0;

  return rows
    .filter((row) => row.published)
    .toSorted((a, b) => b.written + b.viva - (a.written + a.viva))
    .map((row, index) => {
      const total = row.written + row.viva;
      const merit = previousTotal === total ? previousMerit : index + 1;
      previousTotal = total;
      previousMerit = merit;
      return { ...row, total, merit };
    });
}

export async function findAdmissionResult(roll: string, phone: string, batch?: string) {
  const store = await readCmsStore();
  const normalizedPhone = normalizePhone(phone);

  return withMerit(store.admissionResults).find(
    (row) =>
      row.roll.toLowerCase() === roll.trim().toLowerCase() &&
      normalizePhone(row.phone) === normalizedPhone &&
      (!batch || row.batch === batch),
  );
}

export async function findMonthlyResults(phone: string, filters: { batch?: string; lab?: string } = {}) {
  const store = await readCmsStore();
  const normalizedPhone = normalizePhone(phone);

  return withMonthlyMerit(store.monthlyResults)
    .filter((row) =>
      normalizePhone(row.phone) === normalizedPhone &&
      (!filters.batch || row.batch === filters.batch) &&
      (!filters.lab || row.lab === filters.lab)
    )
    .toSorted((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

function meritMap(rows: MonthlyResultEntry[], scope: (row: MonthlyResultEntry) => string) {
  const grouped = new Map<string, MonthlyResultEntry[]>();
  for (const row of rows.filter((item) => item.published)) {
    const key = scope(row);
    grouped.set(key, [...(grouped.get(key) || []), row]);
  }

  const merits = new Map<string, number>();
  for (const groupRows of grouped.values()) {
    let previousScore: number | null = null;
    let previousMerit = 0;
    groupRows
      .toSorted((a, b) => b.score - a.score)
      .forEach((row, index) => {
        const merit = previousScore === row.score ? previousMerit : index + 1;
        previousScore = row.score;
        previousMerit = merit;
        merits.set(row.id, merit);
      });
  }
  return merits;
}

export function withMonthlyMerit(rows: MonthlyResultEntry[]): PublicMonthlyResult[] {
  const published = rows.filter((row) => row.published);
  const examScope = (row: MonthlyResultEntry) => `${row.batch}|${row.month}|${row.subject}`;
  const labScope = (row: MonthlyResultEntry) => `${examScope(row)}|${row.lab}`;
  const overallMerits = meritMap(published, examScope);
  const labMerits = meritMap(published, labScope);

  return published.map((row) => {
    const percentage = row.maxScore ? Math.round((row.score / row.maxScore) * 100) : 0;
    const overallMerit = overallMerits.get(row.id) || 0;
    const labMerit = labMerits.get(row.id) || 0;
    const displayedMerit = row.meritMode === "LAB_ONLY" ? labMerit : overallMerit;
    return {
      ...row,
      percentage,
      overallMerit,
      labMerit,
      displayedMerit,
      meritLabel: row.meritMode === "LAB_ONLY" ? `${row.lab} merit` : "Overall merit",
    };
  });
}

export async function upsertNotice(input: Partial<NoticeEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const id = input.id || newId("notice");
  const existingIndex = store.notices.findIndex((notice) => notice.id === id);
  const nextNotice: NoticeEntry = {
    id,
    title: input.title?.trim() || "শিরোনামহীন নোটিশ",
    date: input.date?.trim() || timestamp.slice(0, 10),
    type: input.type?.trim() || "সাধারণ",
    status: input.status || "DRAFT",
    detail: input.detail?.trim() || "নোটিশের বিস্তারিত এখনো লেখা হয়নি।",
    href: input.href?.trim() || "/notices",
    createdAt: existingIndex >= 0 ? store.notices[existingIndex].createdAt : timestamp,
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.notices[existingIndex] = nextNotice;
  } else {
    store.notices.unshift(nextNotice);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: existingIndex >= 0 ? "UPDATE_NOTICE" : "CREATE_NOTICE",
    target: id,
    createdAt: timestamp,
    meta: nextNotice.status,
  });

  await writeCmsStore(store);
  return nextNotice;
}

export async function upsertCourse(input: Partial<CourseEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const id = input.id || newId("course");
  const existingIndex = store.courses.findIndex((course) => course.id === id);
  const nextCourse: CourseEntry = {
    id,
    type: input.type?.trim() || "কোর্স",
    title: input.title?.trim() || "শিরোনামহীন কোর্স",
    status: input.status?.trim() || "খসড়া",
    detail: input.detail?.trim() || "কোর্সের বিস্তারিত এখনো লেখা হয়নি।",
    href: input.href?.trim() || "/courses",
    featured: Boolean(input.featured),
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.courses[existingIndex] = nextCourse;
  } else {
    store.courses.unshift(nextCourse);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: existingIndex >= 0 ? "UPDATE_COURSE" : "CREATE_COURSE",
    target: id,
    createdAt: timestamp,
    meta: nextCourse.status,
  });

  await writeCmsStore(store);
  return nextCourse;
}

export async function updateSettings(input: Partial<SiteSettings>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const nextSettings: SiteSettings = {
    siteName: input.siteName?.trim() || store.settings.siteName,
    tagline: input.tagline?.trim() || store.settings.tagline,
    admissionStatus: input.admissionStatus?.trim() || store.settings.admissionStatus,
    activeBatch: input.activeBatch?.trim() || store.settings.activeBatch,
    seoTitle: input.seoTitle?.trim() || store.settings.seoTitle,
    seoDescription: input.seoDescription?.trim() || store.settings.seoDescription,
    maintenanceMode: input.maintenanceMode ?? store.settings.maintenanceMode,
    admissionPopup: {
      ...defaultAdmissionPopup,
      ...store.settings.admissionPopup,
      ...(input.admissionPopup || {}),
      enabled: input.admissionPopup?.enabled ?? store.settings.admissionPopup.enabled,
      title: input.admissionPopup?.title?.trim() || store.settings.admissionPopup.title,
      detail: input.admissionPopup?.detail?.trim() || store.settings.admissionPopup.detail,
      image: input.admissionPopup?.image?.trim() || store.settings.admissionPopup.image,
      imageGuidance: input.admissionPopup?.imageGuidance?.trim() || store.settings.admissionPopup.imageGuidance,
      startsAt: input.admissionPopup?.startsAt?.trim() || store.settings.admissionPopup.startsAt,
      deadline: input.admissionPopup?.deadline?.trim() || store.settings.admissionPopup.deadline,
      applyHref: input.admissionPopup?.applyHref?.trim() || store.settings.admissionPopup.applyHref,
      primaryLabel: input.admissionPopup?.primaryLabel?.trim() || store.settings.admissionPopup.primaryLabel,
    },
  };

  store.settings = nextSettings;
  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: "UPDATE_SITE_SETTINGS",
    target: "settings",
    createdAt: timestamp,
    meta: nextSettings.activeBatch,
  });

  await writeCmsStore(store);
  return nextSettings;
}

export async function upsertTeamMember(input: Partial<TeamMemberEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const slugSource = input.name || newId("member");
  const id = input.id || `team-${slugSource.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const existingIndex = store.teamMembers.findIndex((member) => member.id === id);
  const nextMember: TeamMemberEntry = {
    id,
    name: input.name?.trim() || "নতুন টিম সদস্য",
    role: input.role?.trim() || "টিম সদস্য",
    org: input.org?.trim() || "ই-লার্নিং এন্ড আর্নিং লিমিটেড, জয়পুরহাট ব্রাঞ্চ",
    category: input.category || "TRAINER",
    image: input.image?.trim() || "/media/elogo.png",
    status: input.status || "DRAFT",
    sortOrder: Number(input.sortOrder ?? store.teamMembers.length + 1),
    bio: input.bio?.trim() || "ব্রাঞ্চ টিমের সংক্ষিপ্ত পরিচিতি।",
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.teamMembers[existingIndex] = nextMember;
  } else {
    store.teamMembers.push(nextMember);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: existingIndex >= 0 ? "UPDATE_TEAM_MEMBER" : "CREATE_TEAM_MEMBER",
    target: id,
    createdAt: timestamp,
    meta: nextMember.status,
  });

  await writeCmsStore(store);
  return nextMember;
}

export async function upsertSuccessStory(input: Partial<SuccessStoryEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const slugSource = input.name || input.title || newId("story");
  const id = input.id || `story-${slugSource.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const existingIndex = store.successStories.findIndex((story) => story.id === id);
  const nextStory: SuccessStoryEntry = {
    id,
    name: input.name?.trim() || "নতুন শিক্ষার্থী",
    batch: input.batch?.trim() || "৬ষ্ঠ ব্যাচ",
    course: input.course?.trim() || "যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণ",
    image: input.image?.trim() || "/media/team/halima-akter.jpg",
    title: input.title?.trim() || "শেখার নতুন আত্মবিশ্বাস",
    excerpt: input.excerpt?.trim() || "ক্লাসের নিয়মিত অনুশীলন ও শিক্ষক সহায়তায় শিক্ষার্থী নিজের কাজের আত্মবিশ্বাস তৈরি করেছে।",
    story: input.story?.trim() || "শুরুর দিকে অনলাইন কাজের নিয়ম বুঝতে সময় লাগলেও নিয়মিত ল্যাব অনুশীলন, ক্লাস টাস্ক এবং ফিডব্যাকের মাধ্যমে ধীরে ধীরে কাজের গতি তৈরি হয়েছে।",
    achievement: input.achievement?.trim() || "পোর্টফোলিও প্রস্তুত",
    status: input.status || "DRAFT",
    featured: Boolean(input.featured),
    sortOrder: Number(input.sortOrder ?? store.successStories.length + 1),
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.successStories[existingIndex] = nextStory;
  } else {
    store.successStories.push(nextStory);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: existingIndex >= 0 ? "UPDATE_SUCCESS_STORY" : "CREATE_SUCCESS_STORY",
    target: id,
    createdAt: timestamp,
    meta: nextStory.status,
  });

  await writeCmsStore(store);
  return nextStory;
}

export async function upsertMediaAsset(input: Partial<MediaAssetEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const slugSource = input.title || newId("asset");
  const id = input.id || `media-${slugSource.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const existingIndex = store.mediaAssets.findIndex((asset) => asset.id === id);
  const nextAsset: MediaAssetEntry = {
    id,
    title: input.title?.trim() || "শিরোনামহীন মিডিয়া",
    kind: input.kind || "IMAGE",
    url: input.url?.trim() || "/media/elogo.png",
    alt: input.alt?.trim() || input.title?.trim() || "ই-লার্নিং এন্ড আর্নিং জয়পুরহাট মিডিয়া",
    status: input.status || "DRAFT",
    usedIn: input.usedIn?.trim() || "মিডিয়া লাইব্রেরি",
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.mediaAssets[existingIndex] = nextAsset;
  } else {
    store.mediaAssets.unshift(nextAsset);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: existingIndex >= 0 ? "UPDATE_MEDIA_ASSET" : "CREATE_MEDIA_ASSET",
    target: id,
    createdAt: timestamp,
    meta: nextAsset.kind,
  });

  await writeCmsStore(store);
  return nextAsset;
}

export async function upsertAdmissionResult(input: Partial<AdmissionResultEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const id = input.id || `admission-${(input.roll || newId("roll")).toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const existingIndex = store.admissionResults.findIndex((row) => row.id === id || row.roll === input.roll);
  const nextResult: AdmissionResultEntry = {
    id,
    roll: input.roll?.trim() || "JYP-0000",
    phone: input.phone?.trim() || "",
    name: input.name?.trim() || "নামহীন প্রার্থী",
    written: Number(input.written || 0),
    viva: Number(input.viva || 0),
    status: input.status || "Waiting",
    published: Boolean(input.published),
    batch: input.batch?.trim() || "৭ম ব্যাচ",
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.admissionResults[existingIndex] = nextResult;
  } else {
    store.admissionResults.unshift(nextResult);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: "PUBLISH_ADMISSION_RESULT",
    target: nextResult.roll,
    createdAt: timestamp,
    meta: nextResult.published ? "প্রকাশিত" : "খসড়া",
  });

  await writeCmsStore(store);
  return nextResult;
}

export async function upsertMonthlyResult(input: Partial<MonthlyResultEntry>, actor: string) {
  const store = await readCmsStore();
  const timestamp = now();
  const id =
    input.id ||
    `monthly-${normalizePhone(input.phone || "")}-${(input.month || "month").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${(input.subject || "subject").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const existingIndex = store.monthlyResults.findIndex((row) => row.id === id);
  const nextResult: MonthlyResultEntry = {
    id,
    phone: input.phone?.trim() || "",
    name: input.name?.trim() || "নামহীন শিক্ষার্থী",
    batch: input.batch?.trim() || "৬ষ্ঠ ব্যাচ",
    lab: input.lab || "Lab A",
    month: input.month?.trim() || "জুন ২০২৬",
    subject: input.subject?.trim() || "ক্লাস টেস্ট",
    score: Number(input.score || 0),
    maxScore: Number(input.maxScore || 100),
    grade: input.grade?.trim() || "প্রযোজ্য নয়",
    meritMode: input.meritMode || "COMBINED",
    published: Boolean(input.published),
    updatedAt: timestamp,
  };

  if (existingIndex >= 0) {
    store.monthlyResults[existingIndex] = nextResult;
  } else {
    store.monthlyResults.unshift(nextResult);
  }

  store.auditLogs.unshift({
    id: newId("audit"),
    actor,
    action: "PUBLISH_MONTHLY_RESULT",
    target: `${nextResult.phone}-${nextResult.subject}`,
    createdAt: timestamp,
    meta: nextResult.published ? "প্রকাশিত" : "খসড়া",
  });

  await writeCmsStore(store);
  return nextResult;
}
