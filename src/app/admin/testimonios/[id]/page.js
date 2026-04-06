import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import EditarTestimonioClient from "./EditarTestimonioClient";

export default async function EditarTestimonioPage({ params }) {
  await requireAdmin();

  const resolvedParams = await params;

  return <EditarTestimonioClient id={resolvedParams.id} />;
}