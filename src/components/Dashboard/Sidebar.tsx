"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users } from "lucide-react";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/dashboard/leads", icon: Users },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-black text-white">

      <div className="flex items-center gap-2 px-6 py-6 text-xl font-bold tracking-tight">
        Ritz Media World
      </div>

      <nav className="flex-1 space-y-1 px-3">

        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active
                  ? "border border-[#D49A34]/30 bg-[#D49A34]/15 text-[#D49A34]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}

      </nav>

      <div className="border-t border-white/10 px-6 py-4 text-xs text-gray-500">
        Admin Dashboard
      </div>

    </aside>
  );
}
