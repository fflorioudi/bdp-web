import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import NuevoTestimonioClient from "./NuevoTestimonioClient";

export default async function NuevoTestimonioPage() {
  await requireAdmin();

  return <NuevoTestimonioClient />;
}