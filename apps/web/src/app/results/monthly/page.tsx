import { ResultLookup } from "@/components/result-lookup";

export const metadata = {
  title: "মাসিক পরীক্ষার ফলাফল",
};

export default function MonthlyResultPage() {
  return <ResultLookup mode="monthly" />;
}
