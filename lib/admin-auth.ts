import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { isAdminSession } from "./admin-session";

export async function getAdminSession() {
  const session = await auth();
  return isAdminSession(session) ? session : null;
}

export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export async function requireAdminPage() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}
