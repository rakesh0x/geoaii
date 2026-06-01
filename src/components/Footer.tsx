"use client";

import { motion } from "framer-motion";

const FOOTER_LINKS = ["About", "Blog", "Contact", "Privacy"];

const scrollTo = (href: string) => {
  const el = document.querySelector(href);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-100 bg-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 sm:py-24">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="geo-display max-w-3xl font-heading text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.08] text-slate-900"
        >
          The visibility layer for the{" "}
          <span className="italic bg-gradient-to-r from-indigo-600 to-orange-500 bg-clip-text text-transparent">
            AI internet.
          </span>
        </motion.p>

        <div className="mt-16 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900">
              <span className="absolute h-2 w-2 rounded-full bg-gradient-to-tr from-indigo-400 to-orange-300" />
            </span>
            <span className="font-heading text-xl font-medium tracking-tight text-slate-900">GeoAI</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-9 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
                data-testid={`footer-link-${link.toLowerCase()}`}
              >
                {link}
              </a>
            ))}
            <button
              onClick={() => scrollTo("#waitlist")}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
              data-testid="footer-cta"
            >
              Contact the Founder
            </button>
          </nav>
        </div>

        <div className="geo-hairline mt-12" />
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-400">&copy; {new Date().getFullYear()} GeoAI. Building the future of discovery.</p>
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-slate-300">Built for the AI Era</p>
        </div>
      </div>
    </footer>
  );
}
