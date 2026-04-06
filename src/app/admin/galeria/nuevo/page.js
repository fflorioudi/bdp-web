import { requireAdmin } from "../../../../lib/auth/requireAdmin";
import NuevoGaleriaClient from "./NuevoGaleriaClient";

export default async function Page() {
  await requireAdmin();
  return <NuevoGaleriaClient />;
}