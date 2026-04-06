import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import EditarEventoClient from "./EditarEventoClient";

export default async function EditarEventoPage({ params }) {
  await requireAdmin();

  const resolvedParams = await params;

  return <EditarEventoClient id={resolvedParams.id} />;
}