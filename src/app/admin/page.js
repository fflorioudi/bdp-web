import { requireAdmin } from "../../lib/auth/requireAdmin";
import AdminClient from "./AdminClient";

export default async function AdminPage() {
  await requireAdmin();

  return <AdminClient />;
}