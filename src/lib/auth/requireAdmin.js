import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const adminEmails =
    process.env.ADMIN_EMAILS
      ?.split(",")
      .map((email) => email.trim().toLowerCase()) || [];

  const userEmail = user.email?.trim().toLowerCase();

  if (!adminEmails.includes(userEmail)) {
    redirect("/");
  }

  return user;
}