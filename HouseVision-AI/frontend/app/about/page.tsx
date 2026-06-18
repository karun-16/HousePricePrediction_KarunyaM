import type { Metadata } from "next";
import { ArrowUpRight, Braces, Code2, GitBranch, Layers3, Server, Sparkles } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { GITHUB_URL } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description: "About the HouseVision AI property valuation portfolio project and its technology stack.",
};

const technologies = [
  { icon: Code2, name: "Next.js + TypeScript", role: "Responsive application shell and product experience" },
  { icon: Sparkles, name: "Tailwind + Motion", role: "Design system, accessibility, and restrained interaction" },
  { icon: Server, name: "FastAPI + Python", role: "Validated prediction API and insight orchestration" },
  { icon: Braces, name: "scikit-learn", role: "Reproducible Linear Regression model inference" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About the project" title="Machine learning, shaped into a product." description="HouseVision AI turns a housing-price analysis into a polished residential intelligence experience—without hiding the evidence, tradeoffs, or limitations behind the estimate." />
      <section className="container-shell pb-16">
        <div className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
          <Reveal className="glass-panel rounded-[2rem] p-6 sm:p-9">
            <span className="eyebrow">Project overview</span>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight">Built to answer more than “what price?”</h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-zinc-400"><p>The project began with the Kaggle Housing Prices Dataset: 545 residential records spanning area, room counts, amenities, access, parking, and furnishing status.</p><p>The application keeps the original Linear Regression work at its center, then adds the context a useful product needs—market segment, average comparison, model reliability, value drivers, and clear limitations.</p><p>The result is intentionally focused. There are no accounts, listings, maps, payments, or invented marketplace features.</p></div>
          </Reveal>
          <Reveal delay={.06} className="glass-panel rounded-[2rem] p-6 sm:p-9">
            <Layers3 className="text-mint" size={24} />
            <p className="mt-8 text-xs uppercase tracking-[.18em] text-zinc-500">Dataset at a glance</p>
            <div className="mt-5 space-y-4">{[["545", "residential records"], ["12", "input features"], ["₹4.77M", "average selling price"], ["₹13.30M", "highest observed price"]].map(([value, label]) => <div key={label} className="flex items-end justify-between border-b border-white/[0.08] pb-4"><span className="text-xl font-semibold">{value}</span><span className="text-xs text-zinc-500">{label}</span></div>)}</div>
          </Reveal>
        </div>
      </section>
      <section className="container-shell py-16">
        <Reveal className="max-w-2xl"><span className="eyebrow">Technology</span><h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A maintainable two-service architecture.</h2><p className="mt-4 text-sm leading-7 text-zinc-500">The frontend and model API deploy independently, with a typed JSON contract between them.</p></Reveal>
        <div className="mt-10 grid gap-4 md:grid-cols-2">{technologies.map((tech, index) => <Reveal key={tech.name} delay={(index % 2) * .05} className="glass-panel flex items-start gap-5 rounded-3xl p-6"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-mint/[0.07] text-mint"><tech.icon size={20} /></span><div><h3 className="font-semibold text-white">{tech.name}</h3><p className="mt-2 text-sm leading-6 text-zinc-500">{tech.role}</p></div></Reveal>)}</div>
      </section>
      <section className="container-shell pb-28 pt-14">
        <Reveal className="glass-panel flex flex-col items-start justify-between gap-8 rounded-[2rem] p-7 sm:flex-row sm:items-center sm:p-10">
          <div><span className="eyebrow">Developer</span><h2 className="mt-4 text-2xl font-semibold">M. Karunya Sarma</h2><p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">Built as a production-minded portfolio project from an original data science analysis and model evaluation.</p></div>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="button-primary shrink-0"><GitBranch size={17} /> View repository <ArrowUpRight size={15} /></a>
        </Reveal>
      </section>
    </>
  );
}
