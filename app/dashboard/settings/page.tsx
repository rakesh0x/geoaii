"use client";

import { useState } from "react";
import { toast } from "sonner";
import { LogOut, Save } from "lucide-react";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { PageIntro } from "@/components/dashboard/primitives";

const WEBSITE_KEY = "geoai_website";

export default function Settings() {
  const { user, refreshUser } = useAuth();
  const [website, setWebsite] = useState(user?.website || "");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      localStorage.setItem(WEBSITE_KEY, website.trim());
      await api.post("/onboarding", { website: website.trim() });
      refreshUser();
      toast.success("Website updated.");
    } catch {
      toast.error("Could not save. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const initial = (user?.name || user?.email || "U").trim().charAt(0).toUpperCase();

  return (
    <div data-testid="page-settings">
      <PageIntro eyebrow="Settings" title="Your account." subtitle="Manage your profile and the website GeoAI analyzes." />

      <section className="rounded-3xl border border-slate-100 bg-white p-7 sm:p-9">
        <h2 className="font-heading text-xl font-normal text-slate-900">Profile</h2>
        <div className="mt-6 flex items-center gap-4">
          {user?.picture ? (
            <img src={user.picture} alt={user.name} className="h-14 w-14 rounded-full object-cover" />
          ) : (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-orange-400 text-lg font-semibold text-white">{initial}</span>
          )}
          <div>
            <div className="text-base font-medium text-slate-900">{user?.name || "Founder"}</div>
            <div className="text-sm text-slate-500">{user?.email}</div>
            <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">
              Signed in with {user?.auth_provider === "google" ? "Google" : "email"}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-7 sm:p-9">
        <h2 className="font-heading text-xl font-normal text-slate-900">Analyzed website</h2>
        <p className="mt-1 text-sm text-slate-500">This is the site GeoAI uses to build your briefing.</p>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:max-w-lg">
          <input
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="yourcompany.com"
            className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
            data-testid="settings-website-input"
          />
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-colors disabled:opacity-70"
            data-testid="settings-save-button"
          >
            <Save className="h-4 w-4" /> Save
          </button>
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-100 bg-white p-7 sm:p-9">
        <h2 className="font-heading text-xl font-normal text-slate-900">Session</h2>
        <p className="mt-1 text-sm text-slate-500">Sign out of your GeoAI workspace on this device.</p>
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          data-testid="settings-logout-button"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </section>
    </div>
  );
}
