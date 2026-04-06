import { requireAdmin } from "../../../lib/auth/requireAdmin";
import AdminMiembrosClient from "./AdminMiembrosClient";

export default async function AdminMiembrosPage() {
  await requireAdmin();

  return <AdminMiembrosClient />;
}