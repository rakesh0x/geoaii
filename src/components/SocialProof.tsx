"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { fadeUp, staggerContainer, EASE } from "@/lib/motion";
import { LOGOS, TESTIMONIALS, MEDIA } from "@/data/content";

const API = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`;

const formatCount = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k+` : `${n}+`);

export default function SocialProof() {
  const [count, setCount] = useState(10000);
  const featured = TESTIMONIALS[0];

  useEffect(() => {
    axios.get(`${API}/waitlist/count`).then((r) => setCount(r.data.count)).catch(() => {});
  }, []);

  return (
    <section id="social-proof" className="relative bg-white py-28 sm:py-40" data-testid="social-proof">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <Reveal variants={fadeUp} amount={0.5} className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white px-5 py-2.5 shadow-sm">
            <div className="flex -space-x-2">
              {MEDIA.avatars.map((a, i) => (
                <img key={i} src={a} alt="member" className="h-7 w-7 rounded-full border-2 border-white object-cover" />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-600" data-testid="waitlist-counter">
              Join <span className="font-semibold text-slate-900">{formatCount(count)}</span> founders & operators
            </span>
          </div>
        </Reveal>

        <Reveal variants={fadeUp} amount={0.4} className="mx-auto mt-14 max-w-4xl text-center">
          <blockquote
            className="geo-display font-heading text-3xl sm:text-4xl lg:text-5xl font-light leading-[1.12] text-slate-900"
            data-testid="testimonial-featured"
          >
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-10 flex items-center justify-center gap-4">
            <img src={MEDIA.avatars[featured.avatar]} alt={featured.name} className="h-12 w-12 rounded-full object-cover" />
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900">{featured.name}</div>
              <div className="text-sm text-slate-500">{featured.role}</div>
            </div>
          </figcaption>
        </Reveal>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          className="mt-20"
        >
          <motion.p variants={fadeUp} className="text-center text-xs font-medium tracking-[0.25em] uppercase text-slate-400">
            Backed by builders from
          </motion.p>
          <motion.div
            variants={fadeUp}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="geo-marquee-mask mt-8 overflow-hidden"
          >
            <div className="geo-marquee-track gap-16 pr-16">
              {[...LOGOS, ...LOGOS].map((logo, i) => (
                <span
                  key={i}
                  className="font-heading text-2xl italic font-normal text-slate-300 whitespace-nowrap"
                  data-testid={i < LOGOS.length ? `logo-${logo.toLowerCase()}` : undefined}
                >
                  {logo}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
