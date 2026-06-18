import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Database, FlaskConical, Scale, TriangleAlert } from "lucide-react";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Model Methodology",
  description: "How HouseVision AI's Linear Regression model was prepared, evaluated, and selected.",
};

const workflow = [
  ["01", "Prepare", "Validate 545 records, check completeness, and separate property features from the target price."],
  ["02", "Encode", "Convert yes/no amenities and furnishing status into model-ready numeric signals."],
  ["03", "Split", "Reserve 20% of records for evaluation using a reproducible random state of 42."],
  ["04", "Evaluate", "Compare generalization error and R², then retain the simpler model that performed better."],
];

const limitations = [
  "The training set contains 545 historical records from a single public dataset.",
  "Locality, property age, construction quality, and live demand are not included.",
  "Linear Regression assumes additive, approximately linear feature effects.",
  "Outputs are exploratory estimates—not certified appraisals or guaranteed sale values.",
];

export default function ModelPage() {
  return (
    <>
      <PageHero eyebrow="Transparent by design" title="A model chosen for evidence, not novelty." description="Linear Regression was retained because it generalized better than the Random Forest comparison on the held-out test set—and because its behavior remains easier to explain." />
      <section className="container-shell pb-14">
        <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr]">
          <Reveal className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-mint/10 text-mint"><FlaskConical size={20} /></span><div><p className="text-xs uppercase tracking-[.16em] text-zinc-500">Selected model</p><h2 className="text-xl font-semibold">Linear Regression</h2></div></div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[{ label: "MAE", value: "₹970K" }, { label: "RMSE", value: "₹1.325M" }, { label: "R² score", value: "0.653" }].map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/[0.08] bg-black/10 p-4"><p className="text-xl font-semibold tracking-tight sm:text-2xl">{metric.value}</p><p className="mt-2 text-[10px] uppercase tracking-[.14em] text-zinc-600">{metric.label}</p></div>
              ))}
            </div>
            <p className="mt-6 text-sm leading-7 text-zinc-400">R² indicates that the model explains roughly 65.3% of price variation in the held-out sample. RMSE is also used to form the interface&apos;s approximate value band.</p>
          </Reveal>
          <Reveal delay={.06} className="glass-panel rounded-[2rem] p-6 sm:p-8">
            <div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-cyan/10 text-cyan"><Scale size={20} /></span><div><p className="text-xs uppercase tracking-[.16em] text-zinc-500">Comparison</p><h2 className="text-xl font-semibold">Test-set performance</h2></div></div>
            <div className="mt-7 overflow-hidden rounded-2xl border border-white/[0.08]">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/[0.04] text-xs uppercase tracking-[.1em] text-zinc-500"><tr><th className="px-4 py-3 font-medium">Metric</th><th className="px-4 py-3 font-medium">Linear</th><th className="px-4 py-3 font-medium">Forest</th></tr></thead>
                <tbody className="divide-y divide-white/[0.07] text-zinc-300"><tr><td className="px-4 py-3">MAE</td><td className="px-4 py-3 text-mint">₹970K</td><td className="px-4 py-3">₹1.022M</td></tr><tr><td className="px-4 py-3">RMSE</td><td className="px-4 py-3 text-mint">₹1.325M</td><td className="px-4 py-3">₹1.401M</td></tr><tr><td className="px-4 py-3">R²</td><td className="px-4 py-3 text-mint">0.653</td><td className="px-4 py-3">0.612</td></tr></tbody>
              </table>
            </div>
            <div className="mt-5 flex items-start gap-2 text-xs leading-5 text-zinc-500"><CheckCircle2 className="mt-0.5 shrink-0 text-mint" size={15} /> Linear Regression delivered lower error and a higher test R² on this evaluation.</div>
          </Reveal>
        </div>
      </section>

      <section className="container-shell py-16">
        <Reveal className="max-w-2xl"><span className="eyebrow">Machine learning workflow</span><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">From raw records to a usable estimate.</h2></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {workflow.map(([number, title, description], index) => <Reveal key={number} delay={index * .05} className="glass-panel rounded-3xl p-6"><span className="font-mono text-xs text-mint">{number}</span><h3 className="mt-6 text-lg font-semibold">{title}</h3><p className="mt-3 text-sm leading-6 text-zinc-500">{description}</p></Reveal>)}
        </div>
      </section>

      <section className="container-shell py-14">
        <div className="grid items-center gap-6 lg:grid-cols-2">
          <Reveal className="overflow-hidden rounded-[2rem] bg-[#f7faf8] p-3"><div className="relative aspect-[16/10]"><Image src="/analytics/actual_vs_predicted.png" alt="Actual prices compared with Linear Regression predictions" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-contain" /></div></Reveal>
          <Reveal delay={.06} className="lg:pl-10"><span className="eyebrow"><Database size={14} /> Evaluation view</span><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Useful signal, visible residual error.</h2><p className="mt-5 text-sm leading-7 text-zinc-400">Predictions generally follow the true-price direction, while the spread around the diagonal makes the model&apos;s uncertainty visible. HouseVision keeps that uncertainty in the product through an estimated range and model-confidence context.</p><Link href="/predict" className="button-primary mt-7">Try the model <ArrowRight size={16} /></Link></Reveal>
        </div>
      </section>

      <section className="container-shell pb-28 pt-14">
        <Reveal className="rounded-[2rem] border border-amber-300/15 bg-amber-300/[0.035] p-6 sm:p-8">
          <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-amber-300/10 text-amber-200"><TriangleAlert size={20} /></span><div><p className="eyebrow !text-amber-200">Known limitations</p><h2 className="mt-3 text-2xl font-semibold">Where judgment still matters.</h2></div></div>
          <ul className="mt-7 grid gap-3 md:grid-cols-2">{limitations.map((item) => <li key={item} className="flex items-start gap-3 rounded-2xl border border-white/[0.07] bg-black/10 p-4 text-sm leading-6 text-zinc-400"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-200" />{item}</li>)}</ul>
        </Reveal>
      </section>
    </>
  );
}

