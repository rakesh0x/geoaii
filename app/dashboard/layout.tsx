"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Loader from "@/components/dashboard/Loader";

export default function DashboardRouteLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) return <Loader label="Preparing your workspace" />;
  if (!user) return null;

  return <DashboardLayout>{children}</DashboardLayout>;
}
