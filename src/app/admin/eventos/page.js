import { requireAdmin } from "../../../lib/auth/requireAdmin";
import AdminEventosClient from "./AdminEventosClient";

export default async function AdminEventosPage() {
  await requireAdmin();

  return <AdminEventosClient />;
}