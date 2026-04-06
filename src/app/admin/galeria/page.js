import { requireAdmin } from "../../../lib/auth/requireAdmin";
import AdminGaleriaClient from "./AdminGaleriaClient";

export default async function AdminGaleriaPage() {
  await requireAdmin();

  return <AdminGaleriaClient />;
}