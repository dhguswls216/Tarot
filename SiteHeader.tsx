"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SiteHeader() {
  const pathname = usePathname();
  const isNight = pathname === "/" || pathname.startsWith("/start");

  return (
    <header
      className={
        isNight
          ? "absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-[#0a1c36]/80 via-[#0a1c36]/35 to-transparent px-4 py-5 pb-16 sm:px-8"
          : "relative bg-gradient-to-b from-[#f3eee4] to-[#f3eee4]/0 px-4 py-5 sm:px-8"
      }
    >
      <Link
        href="/"
        className={
          isNight
            ? "font-[family-name:var(--font-serif)] text-sm tracking-[0.04em] text-[#fffaf2] drop-shadow-[0_1px_10px_rgba(0,0,0,0.75)] sm:text-base"
            : "font-[family-name:var(--font-serif)] text-sm tracking-[0.04em] text-[#6e4b32] sm:text-base"
        }
      >
        Numerology & Tarot
      </Link>
    </header>
  );
}
