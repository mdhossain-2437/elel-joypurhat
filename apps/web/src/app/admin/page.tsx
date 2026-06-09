import { AdminDashboard } from "@/components/admin-dashboard";
import { requireAdmin } from "@/lib/auth";
import { readCmsStore, sanitizeCmsStore } from "@/lib/cms-store";

export const metadata = {
  title: "অ্যাডমিন ড্যাশবোর্ড",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await requireAdmin();
  const store = sanitizeCmsStore(await readCmsStore());

  return <AdminDashboard admin={admin} initialStore={store} />;
}
