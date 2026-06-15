import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/Sidebar";
import SessionProvider from "@/components/admin/SessionProvider";

export const metadata = {
  title: "Admin | AL3X Photos",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <SessionProvider session={session}>
      <div className="flex h-[100dvh] bg-[#06080f] text-[#f0ece3]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </SessionProvider>
  );
}
