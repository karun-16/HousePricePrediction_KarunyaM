import { Code2 } from "lucide-react";
import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { GITHUB_URL } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] py-10">
      <div className="container-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/" aria-label="HouseVision AI home"><BrandMark /></Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500">Machine learning estimates for exploration—not a substitute for a professional property appraisal.</p>
        </div>
        <div className="flex items-center gap-5 text-sm text-zinc-400">
          <Link href="/model" className="transition hover:text-white">Methodology</Link>
          <Link href="/about" className="transition hover:text-white">About</Link>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition hover:text-white"><Code2 size={15} /> Source</a>
        </div>
      </div>
    </footer>
  );
}
