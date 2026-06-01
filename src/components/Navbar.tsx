"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const LINKS = [
  { label: "The Shift", href: "#the-shift" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Solution", href: "#solution" },
  { label: "Vision", href: "#vision" },
];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const Logo = () => (
  <a href="#top" className="flex items-center gap-2.5" data-testid="navbar-logo">
    <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
      <span className="absolute h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-400 to-orange-300" />
    </span>
    <span className="font-heading text-xl font-medium tracking-tight text-slate-900">GeoAI</span>
  </a>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const Router = useRouter();

  const handleRedirect = () => {
    Router.push("/login")
  }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      id="top"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-white/70 border-b border-slate-200/50"
          : "bg-transparent border-b border-transparent"
      }`}
      data-testid="navbar"
    >
      <nav className="max-w-7xl mx-auto px-6 sm:px-8 h-[72px] flex items-center justify-between">
        <Logo />
        <div className="hidden md:flex items-center gap-9">
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
              data-testid={`navbar-link-${l.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={() => handleRedirect()}
          className="inline-flex items-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300"
          data-testid="navbar-cta-button"
        >
          Signup
        </button>
      </nav>
    </motion.header>
  );
}
