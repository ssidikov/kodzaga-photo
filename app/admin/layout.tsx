import { auth } from "@/auth";
import AdminSidebar from "@/components/admin/Sidebar";
import SessionProvider from "@/components/admin/SessionProvider";

export const metadata = {
  title: "Admin | AL3X Photos",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Login page lives inside /admin route group but must render without sidebar
  // Proxy handles redirect for unauthenticated non-login routes
  if (!session) {
    return <>{children}</>;
  }

  return (
    <SessionProvider session={session}>
      <div className="flex h-[100dvh] bg-[#06080f] text-[#f0ece3]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </SessionProvider>
  );
}
