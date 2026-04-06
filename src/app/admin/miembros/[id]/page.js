import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import EditarMiembroClient from "./EditarMiembroClient";

export default async function EditarMiembroPage({ params }) {
  await requireAdmin();

  const resolvedParams = await params;

  return <EditarMiembroClient id={resolvedParams.id} />;
}