import { requireAdmin } from "../../../lib/auth/requireAdmin";
import AdminTestimoniosClient from "./AdminTestimoniosClient";

export default async function AdminTestimoniosPage() {
  await requireAdmin();

  return <AdminTestimoniosClient />;
}