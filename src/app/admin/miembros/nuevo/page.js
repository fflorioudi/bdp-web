import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import NuevoMiembroClient from "./NuevoMiembroClient";

export default async function NuevoMiembroPage() {
  await requireAdmin();

  return <NuevoMiembroClient />;
}