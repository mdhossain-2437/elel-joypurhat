export type AdmissionResult = {
  roll: string;
  phone: string;
  name: string;
  written: number;
  viva: number;
  status: "Selected" | "Waiting" | "Not Selected";
};

export type MonthlyResult = {
  phone: string;
  name: string;
  batch: string;
  month: string;
  subject: string;
  score: number;
  maxScore: number;
  grade: string;
};

const admissionRows: AdmissionResult[] = [
  { roll: "JYP-7001", phone: "01332852670", name: "আয়েশা সুলতানা", written: 82, viva: 18, status: "Selected" },
  { roll: "JYP-7002", phone: "01332852671", name: "রাকিব হাসান", written: 80, viva: 20, status: "Selected" },
  { roll: "JYP-7003", phone: "01700000001", name: "নুসরাত জাহান", written: 78, viva: 19, status: "Selected" },
  { roll: "JYP-7004", phone: "01700000002", name: "সাব্বির আহমেদ", written: 77, viva: 18, status: "Waiting" },
  { roll: "JYP-7005", phone: "01700000003", name: "মিম আক্তার", written: 66, viva: 15, status: "Not Selected" },
];

export const monthlyRows: MonthlyResult[] = [
  { phone: "01332852670", name: "আয়েশা সুলতানা", batch: "৬ষ্ঠ ব্যাচ", month: "মে ২০২৬", subject: "ডিজিটাল মার্কেটিং", score: 86, maxScore: 100, grade: "A" },
  { phone: "01332852670", name: "আয়েশা সুলতানা", batch: "৬ষ্ঠ ব্যাচ", month: "জুন ২০২৬", subject: "গ্রাফিক ডিজাইন", score: 91, maxScore: 100, grade: "A+" },
  { phone: "01332852671", name: "রাকিব হাসান", batch: "৬ষ্ঠ ব্যাচ", month: "মে ২০২৬", subject: "ফ্রিল্যান্সিং", score: 79, maxScore: 100, grade: "A-" },
  { phone: "01700000001", name: "নুসরাত জাহান", batch: "৬ষ্ঠ ব্যাচ", month: "মে ২০২৬", subject: "অফিস অ্যাপ্লিকেশন", score: 74, maxScore: 100, grade: "B+" },
];

export function withMerit(rows: AdmissionResult[]) {
  let previousTotal: number | null = null;
  let previousMerit = 0;

  return rows
    .toSorted((a, b) => b.written + b.viva - (a.written + a.viva))
    .map((row, index) => {
      const total = row.written + row.viva;
      const merit = previousTotal === total ? previousMerit : index + 1;
      previousTotal = total;
      previousMerit = merit;
      return { ...row, total, merit };
    });
}

export const admissionMerit = withMerit(admissionRows);

export function findAdmissionResult(roll: string, phone: string) {
  return admissionMerit.find(
    (row) =>
      row.roll.toLowerCase() === roll.trim().toLowerCase() &&
      row.phone.replace(/\D/g, "") === phone.replace(/\D/g, ""),
  );
}

export function findMonthlyResults(phone: string) {
  const normalized = phone.replace(/\D/g, "");
  return monthlyRows.filter((row) => row.phone.replace(/\D/g, "") === normalized);
}
