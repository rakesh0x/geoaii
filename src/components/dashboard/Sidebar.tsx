"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Eye, Compass, Wand2, ListChecks, Users, Settings as SettingsIcon, LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/dashboard/visibility", label: "Visibility", icon: Eye },
  { to: "/dashboard/opportunities", label: "Discovery Opportunities", icon: Compass },
  { to: "/dashboard/simulator", label: "AI Simulator", icon: Wand2 },
  { to: "/dashboard/recommendations", label: "Recommendations", icon: ListChecks },
  { to: "/dashboard/competitors", label: "Competitors", icon: Users },
  { to: "/dashboard/settings", label: "Settings", icon: SettingsIcon },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const { user } = useAuth();
  const pathname = usePathname();
  const initial = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  const isActive = (path: string, end?: boolean) => {
    if (end) return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <div className="flex h-full w-[260px] flex-col border-r border-slate-100 bg-white">
      <Link href="/dashboard" className="flex items-center gap-2.5 px-6 h-[72px]">
        <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
          <span className="absolute h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-400 to-orange-300" />
        </span>
        <span className="font-heading text-xl font-medium tracking-tight text-slate-900">GeoAI</span>
      </Link>

      <nav className="flex-1 px-3 py-4 space-y-1" data-testid="sidebar-nav">
        {NAV.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.to, item.end);
          return (
            <Link
              key={item.to}
              href={item.to}
              onClick={onNavigate}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <Icon className={`h-[18px] w-[18px] ${active ? "text-white" : "text-slate-400 group-hover:text-slate-700"}`} strokeWidth={1.7} />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-100 p-3">
        <div className="flex items-center gap-3 rounded-xl px-3 py-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-orange-400 text-sm font-semibold text-white">
            {initial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-slate-800">{user?.name || "Founder"}</div>
            <div className="truncate text-xs text-slate-400">{user?.email}</div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-50 hover:text-slate-700 transition-colors"
            title="Log out"
            data-testid="logout-button"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
