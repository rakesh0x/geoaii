"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp } from "@/lib/motion";

export default function Reveal({
  children,
  className,
  variants = fadeUp,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}
