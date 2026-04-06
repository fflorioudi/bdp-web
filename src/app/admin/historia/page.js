import { requireAdmin } from "../../../lib/auth/requireAdmin";
import AdminHistoriaClient from "./AdminHistoriaClient";

export default async function AdminHistoriaPage() {
  await requireAdmin();

  return <AdminHistoriaClient />;
}