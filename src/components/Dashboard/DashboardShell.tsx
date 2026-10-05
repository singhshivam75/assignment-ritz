"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Dashboard/Sidebar";

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard/login")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-8">{children}</main>
    </div>
  );
}
