import type { Metadata } from "next";
import Image from "next/image";
import { ArrowUpRight, Database, IndianRupee, Layers3 } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { analyticsCards } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Market Analytics",
  description: "Explore residential market patterns, segmentation, feature relationships, and model performance.",
};

const highlights = [
  { icon: IndianRupee, value: "₹4.77M", label: "Average house price", note: "Across all 545 records" },
  { icon: Database, value: "₹1.75M—₹13.30M", label: "Observed price range", note: "Useful market boundaries" },
  { icon: Layers3, value: "3 segments", label: "Market structure", note: "Budget, Mid Range, Premium" },
];

export default function AnalyticsPage() {
  return (
    <>
      <PageHero eyebrow="Market intelligence" title="Patterns beneath the price tag." description="Explore the dataset through a business lens: how prices are distributed, which property signals matter, and how the selected model compares." />
      <section className="container-shell pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((highlight, index) => (
            <Reveal key={highlight.label} delay={index * .05} className="glass-panel rounded-3xl p-6">
              <highlight.icon className="text-mint" size={20} strokeWidth={1.7} />
              <p className="mt-6 text-2xl font-semibold tracking-tight text-white">{highlight.value}</p>
              <p className="mt-2 text-sm font-medium text-zinc-300">{highlight.label}</p>
              <p className="mt-1 text-xs text-zinc-600">{highlight.note}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="container-shell pb-28 pt-10">
        <div className="grid gap-5 lg:grid-cols-2">
          {analyticsCards.map((card, index) => (
            <Reveal key={card.title} delay={(index % 2) * .05} className="glass-panel group overflow-hidden rounded-[2rem]">
              <div className="relative aspect-[16/10] overflow-hidden bg-[#f7faf8]">
                <Image src={card.image} alt={`${card.title} visualization`} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain p-2 transition duration-500 group-hover:scale-[1.015]" />
              </div>
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-5">
                  <div><p className="eyebrow">{card.eyebrow}</p><h2 className="mt-3 text-2xl font-semibold tracking-tight text-white">{card.title}</h2></div>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-mint"><card.icon size={18} /></span>
                </div>
                <p className="mt-4 text-sm leading-7 text-zinc-400">{card.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6 flex flex-col items-start justify-between gap-5 rounded-3xl border border-mint/15 bg-mint/[0.045] p-6 sm:flex-row sm:items-center sm:p-8">
          <div><p className="text-sm font-semibold text-white">Want the methodology behind these views?</p><p className="mt-2 text-sm text-zinc-500">See the split, metrics, model choice, and known limitations.</p></div>
          <a href="/model" className="button-secondary shrink-0">Review the model <ArrowUpRight size={16} /></a>
        </Reveal>
      </section>
    </>
  );
}

