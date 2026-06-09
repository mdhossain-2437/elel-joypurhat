import JuboFreelancingPage from "@/components/jubo-freelancing-page";
import { getPublishedTeamMembers } from "@/lib/cms-store";

export const metadata = {
  title: "যুব উন্নয়ন ফ্রিল্যান্সিং প্রশিক্ষণ",
};

export const dynamic = "force-dynamic";

export default async function JuboFreelancingCourseRoute() {
  const teamMembers = await getPublishedTeamMembers();
  return <JuboFreelancingPage teamMembers={teamMembers} />;
}
