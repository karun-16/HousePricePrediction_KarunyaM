"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { GITHUB_URL } from "@/lib/site-data";

const links = [
  { href: "/", label: "Home" },
  { href: "/predict", label: "Predict" },
  { href: "/analytics", label: "Analytics" },
  { href: "/model", label: "Model" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-ink/78 backdrop-blur-2xl">
      <nav className="container-shell flex h-[72px] items-center justify-between" aria-label="Primary navigation">
        <Link href="/" aria-label="HouseVision AI home"><BrandMark /></Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`relative rounded-full px-4 py-2 text-sm transition ${active ? "text-white" : "text-zinc-400 hover:text-white"}`}>
                {active && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-white/10 bg-white/[0.07]" />}
                {link.label}
              </Link>
            );
          })}
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-white/20 hover:text-white">
            <Code2 size={16} aria-hidden="true" /> GitHub
          </a>
        </div>
        <button type="button" className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t border-white/[0.06] bg-ink/95 md:hidden">
            <div className="container-shell flex flex-col gap-1 py-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className={`rounded-xl px-4 py-3 text-sm ${pathname === link.href ? "bg-mint/10 text-mint" : "text-zinc-300"}`}>
                  {link.label}
                </Link>
              ))}
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm text-zinc-300"><Code2 size={16} /> GitHub</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
