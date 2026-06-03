import type { Metadata } from "next";
import { Fraunces, Figtree, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-heading",
  axes: ["opsz"],
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GeoAI — The visibility layer for the AI internet",
  description: "People used to search for businesses. Now they ask AI. GeoAI is the visibility layer that keeps your company discoverable, trusted, and cited inside the answers AI gives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${figtree.variable} ${jetbrainsMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-body text-slate-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
