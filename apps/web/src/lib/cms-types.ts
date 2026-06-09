export type AdminRole = "OWNER" | "SUPER_ADMIN" | "ADMIN" | "RESULT_MANAGER" | "EDITOR" | "VIEWER";
export type PublishStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type AdmissionStatus = "Selected" | "Waiting" | "Not Selected";
export type TrainingLab = "Lab A" | "Lab B" | "Lab C";
export type MonthlyMeritMode = "COMBINED" | "LAB_ONLY";

export type SiteSettings = {
  siteName: string;
  tagline: string;
  admissionStatus: string;
  activeBatch: string;
  seoTitle: string;
  seoDescription: string;
  maintenanceMode: boolean;
  admissionPopup: AdmissionPopupSettings;
};

export type AdmissionPopupSettings = {
  enabled: boolean;
  title: string;
  detail: string;
  image: string;
  imageGuidance: string;
  startsAt: string;
  deadline: string;
  applyHref: string;
  primaryLabel: string;
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  passwordHash: string;
  createdAt: string;
  lastLoginAt: string | null;
  passwordChangedAt?: string | null;
};

export type NoticeEntry = {
  id: string;
  title: string;
  date: string;
  type: string;
  status: PublishStatus;
  detail: string;
  href: string;
  createdAt: string;
  updatedAt: string;
};

export type CourseEntry = {
  id: string;
  type: string;
  title: string;
  status: string;
  detail: string;
  href: string;
  featured: boolean;
  updatedAt: string;
};

export type AdmissionResultEntry = {
  id: string;
  roll: string;
  phone: string;
  name: string;
  written: number;
  viva: number;
  status: AdmissionStatus;
  published: boolean;
  batch: string;
  updatedAt: string;
};

export type MonthlyResultEntry = {
  id: string;
  phone: string;
  name: string;
  batch: string;
  lab: TrainingLab;
  month: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
  meritMode: MonthlyMeritMode;
  published: boolean;
  updatedAt: string;
};

export type TeamMemberEntry = {
  id: string;
  name: string;
  role: string;
  org: string;
  category: "OFFICER" | "TRAINER";
  image: string;
  status: PublishStatus;
  sortOrder: number;
  bio: string;
  updatedAt: string;
};

export type SuccessStoryEntry = {
  id: string;
  name: string;
  batch: string;
  course: string;
  image: string;
  title: string;
  excerpt: string;
  story: string;
  achievement: string;
  status: PublishStatus;
  featured: boolean;
  sortOrder: number;
  updatedAt: string;
};

export type MediaAssetEntry = {
  id: string;
  title: string;
  kind: "IMAGE" | "DOCUMENT" | "DOWNLOAD" | "VIDEO";
  url: string;
  alt: string;
  status: PublishStatus;
  usedIn: string;
  updatedAt: string;
};

export type AuditLogEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  createdAt: string;
  meta?: string;
};

export type CmsStore = {
  version: number;
  updatedAt: string;
  settings: SiteSettings;
  admins: AdminUser[];
  notices: NoticeEntry[];
  courses: CourseEntry[];
  admissionResults: AdmissionResultEntry[];
  monthlyResults: MonthlyResultEntry[];
  teamMembers: TeamMemberEntry[];
  successStories: SuccessStoryEntry[];
  mediaAssets: MediaAssetEntry[];
  auditLogs: AuditLogEntry[];
};

export type PublicAdmissionResult = AdmissionResultEntry & {
  total: number;
  merit: number;
};

export type PublicMonthlyResult = MonthlyResultEntry & {
  percentage: number;
  overallMerit: number;
  labMerit: number;
  displayedMerit: number;
  meritLabel: string;
};
