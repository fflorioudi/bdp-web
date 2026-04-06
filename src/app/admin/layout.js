import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase/server";

export default async function AdminLayout({ children }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((mail) => mail.trim().toLowerCase())
    .filter(Boolean);

  const userEmail = user.email?.toLowerCase() || "";

  if (allowedEmails.length > 0 && !allowedEmails.includes(userEmail)) {
    redirect("/");
  }

  return <>{children}</>;
}