import { Reveal } from "@/components/reveal";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="container-shell pb-12 pt-20 sm:pb-16 sm:pt-28">
      <Reveal className="max-w-3xl">
        <span className="eyebrow"><span className="size-1.5 rounded-full bg-mint shadow-[0_0_12px_#73f2bd]" />{eyebrow}</span>
        <h1 className="gradient-text mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">{description}</p>
      </Reveal>
    </section>
  );
}

