"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Gauge, Sparkles, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Reveal } from "@/components/reveal";
import { features } from "@/lib/site-data";

const stats = [
  { value: "545", label: "verified records" },
  { value: "12", label: "property signals" },
  { value: "0.653", label: "test R² score" },
];

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-[calc(100vh-72px)] overflow-hidden">
        <div className="pointer-events-none absolute left-1/2 top-20 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-emerald-400/[0.07] blur-[100px]" />
        <div className="container-shell grid min-h-[calc(100vh-72px)] items-center gap-14 py-20 lg:grid-cols-[1.08fr_.92fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
            <div className="eyebrow rounded-full border border-mint/20 bg-mint/[0.06] px-4 py-2">
              <Sparkles size={14} aria-hidden="true" /> AI-Powered Residential Intelligence Platform
            </div>
            <h1 className="gradient-text mt-7 max-w-4xl text-6xl font-semibold leading-[.93] tracking-[-0.065em] sm:text-7xl lg:text-[6.1rem]">
              See the value behind every home.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400 sm:text-xl">
              Estimate residential property values using machine learning and market intelligence—then understand what shaped the result.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/predict" className="button-primary">Start valuation <ArrowRight size={17} /></Link>
              <Link href="/analytics" className="button-secondary">Explore market analytics</Link>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-7">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{stat.value}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[.14em] text-zinc-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }} className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-8 rounded-full bg-mint/[0.05] blur-3xl" />
            <div className="glass-panel relative overflow-hidden rounded-[2rem] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-xs uppercase tracking-[.18em] text-zinc-500">Illustrative valuation</p>
                  <p className="mt-1 text-sm text-zinc-300">4-bed residential property</p>
                </div>
                <span className="rounded-full border border-mint/20 bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">Premium</span>
              </div>
              <div className="py-8">
                <p className="text-sm text-zinc-500">Estimated market value</p>
                <p className="mt-2 text-4xl font-semibold tracking-[-.04em] text-white sm:text-5xl">₹9,413,967</p>
                <div className="mt-5 flex items-center gap-2 text-sm text-mint"><TrendingUp size={16} /> 97.5% above dataset average</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500"><Gauge size={15} /> Model confidence</div>
                  <div className="mt-3 flex items-end justify-between"><span className="text-xl font-semibold">85%</span><span className="text-xs text-mint">High</span></div>
                  <div className="mt-3 h-1.5 rounded-full bg-white/10"><motion.div initial={{ width: 0 }} animate={{ width: "85%" }} transition={{ duration: 1.1, delay: .7 }} className="h-full rounded-full bg-gradient-to-r from-mint to-cyan" /></div>
                </div>
                <div className="rounded-2xl border border-white/[0.08] bg-black/15 p-4">
                  <div className="text-xs text-zinc-500">Leading value signal</div>
                  <div className="mt-3 text-base font-semibold">Generous floor area</div>
                  <div className="mt-2 inline-flex items-center gap-1 text-xs text-mint"><Check size={13} /> Positive impact</div>
                </div>
              </div>
            </div>
            <motion.div animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="glass-panel absolute -bottom-6 -left-4 hidden rounded-2xl px-5 py-4 sm:block">
              <p className="text-[10px] uppercase tracking-[.18em] text-zinc-500">Value range</p>
              <p className="mt-1 text-sm font-semibold text-white">₹7.72M — ₹11.11M</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="container-shell py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">Intelligence, without the noise</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] text-white sm:text-5xl">One focused view of property potential.</h2>
          <p className="mt-5 text-base leading-7 text-zinc-400">A clean valuation workflow backed by real model evidence, contextual analytics, and explanations you can actually use.</p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * .06} className="glass-panel group rounded-3xl p-6 transition duration-300 hover:-translate-y-1 hover:border-mint/20">
              <div className="grid size-12 place-items-center rounded-2xl border border-mint/20 bg-mint/[0.07] text-mint transition group-hover:bg-mint/10"><feature.icon size={21} strokeWidth={1.7} /></div>
              <h3 className="mt-8 text-lg font-semibold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-shell pb-28">
        <Reveal className="glass-panel relative overflow-hidden rounded-[2rem] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-mint/10 blur-[80px]" />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow">Ready when you are</span>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Turn property details into market context.</h2>
            <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-400">A thoughtful estimate takes less than a minute. No login, no clutter, and no personal data required.</p>
            <Link href="/predict" className="button-primary mt-8">Analyze a property <ArrowRight size={17} /></Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

