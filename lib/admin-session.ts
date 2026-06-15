import type { Session } from "next-auth";

export const ADMIN_ROLE = "admin";

export function isAdminSession(
  session: Session | null | undefined
): session is Session {
  return session?.user?.role === ADMIN_ROLE;
}
