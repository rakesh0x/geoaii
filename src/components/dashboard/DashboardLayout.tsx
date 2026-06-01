"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (user && !user.onboarded) {
    router.replace("/onboarding");
    return null;
  }

  return (
    <div className="min-h-screen bg-white font-body text-slate-900">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar />
      </div>

      <div className="lg:hidden sticky top-0 z-40 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-xl px-5 h-16">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
            <span className="absolute h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-400 to-orange-300" />
          </span>
          <span className="font-heading text-lg font-medium tracking-tight">GeoAI</span>
        </div>
        <button onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-600 hover:bg-slate-50" data-testid="mobile-menu-button">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-slate-900/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: "tween", duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <div className="relative h-full">
                <button onClick={() => setMobileOpen(false)} className="absolute -right-12 top-4 rounded-lg bg-white p-2 text-slate-600 shadow">
                  <X className="h-5 w-5" />
                </button>
                <Sidebar onNavigate={() => setMobileOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="lg:pl-[260px]">
        <div className="mx-auto max-w-6xl px-6 sm:px-10 py-10 sm:py-14">
          {children}
        </div>
      </div>
    </div>
  );
}
