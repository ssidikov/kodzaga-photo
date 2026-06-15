import { auth } from "@/auth";
import { isAdminSession } from "@/lib/admin-session";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = req.nextUrl.pathname === "/admin/login";
  const isAdmin = isAdminSession(req.auth);

  if (isAdminRoute && !isLoginPage && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  if (isLoginPage && isAdmin) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
});

export const config = {
  matcher: ["/admin/:path*"],
};
