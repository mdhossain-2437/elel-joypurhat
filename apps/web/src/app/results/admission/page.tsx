import { ResultLookup } from "@/components/result-lookup";

export const metadata = {
  title: "ভর্তি পরীক্ষার ফলাফল",
};

export default function AdmissionResultPage() {
  return <ResultLookup mode="admission" />;
}
