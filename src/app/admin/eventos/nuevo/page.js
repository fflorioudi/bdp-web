import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import NuevoEventoClient from "./NuevoEventoClient";

export default async function NuevoEventoPage() {
  await requireAdmin();

  return <NuevoEventoClient />;
}