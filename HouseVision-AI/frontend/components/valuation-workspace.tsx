"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Check,
  CircleAlert,
  Gauge,
  LoaderCircle,
  RotateCcw,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { analyzeProperty } from "@/lib/api";
import { currency } from "@/lib/site-data";
import type { PredictionResponse, PropertyInput, YesNo } from "@/lib/types";

const initialProperty: PropertyInput = {
  area: 5000,
  bedrooms: 3,
  bathrooms: 2,
  stories: 2,
  parking: 1,
  mainroad: "yes",
  guestroom: "no",
  basement: "no",
  hotwaterheating: "no",
  airconditioning: "yes",
  prefarea: "no",
  furnishingstatus: "semi-furnished",
};

const loadingMessages = [
  "Analyzing property...",
  "Studying market...",
  "Calculating valuation...",
  "Generating insights...",
];

type NumericKey = "area" | "bedrooms" | "bathrooms" | "stories" | "parking";
type BooleanKey = "mainroad" | "guestroom" | "basement" | "hotwaterheating" | "airconditioning" | "prefarea";

function SliderField({ label, field, value, min, max, step = 1, suffix, onChange }: { label: string; field: NumericKey; value: number; min: number; max: number; step?: number; suffix?: string; onChange: (field: NumericKey, value: number) => void }) {
  return (
    <label className="block rounded-2xl border border-white/[0.08] bg-black/10 p-4 transition focus-within:border-mint/35">
      <span className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-zinc-300">{label}</span>
        <span className="rounded-lg border border-white/10 bg-white/[0.05] px-3 py-1 text-sm font-semibold text-white">
          {value.toLocaleString("en-IN")}{suffix && <span className="ml-1 text-xs font-normal text-zinc-500">{suffix}</span>}
        </span>
      </span>
      <input className="mt-5 w-full" type="range" min={min} max={max} step={step} value={value} onInput={(event) => onChange(field, Number(event.currentTarget.value))} aria-label={label} />
      <span className="mt-2 flex justify-between text-[10px] text-zinc-600"><span>{min.toLocaleString("en-IN")}</span><span>{max.toLocaleString("en-IN")}</span></span>
    </label>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: YesNo; onChange: (value: YesNo) => void }) {
  const enabled = value === "yes";
  return (
    <button type="button" role="switch" aria-checked={enabled} onClick={() => onChange(enabled ? "no" : "yes")} className="flex min-h-[68px] w-full items-center justify-between rounded-2xl border border-white/[0.08] bg-black/10 px-4 text-left transition hover:bg-white/[0.03] focus:border-mint/40">
      <span>
        <span className="block text-sm font-medium text-zinc-300">{label}</span>
        <span className={`mt-1 block text-xs ${enabled ? "text-mint" : "text-zinc-600"}`}>{enabled ? "Included" : "Not included"}</span>
      </span>
      <span className={`relative h-7 w-12 rounded-full transition ${enabled ? "bg-mint" : "bg-white/10"}`}>
        <motion.span layout className="absolute top-1 size-5 rounded-full bg-white shadow-md" animate={{ left: enabled ? 24 : 4 }} />
      </span>
    </button>
  );
}

function LoadingState({ index }: { index: number }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-panel grid min-h-[420px] place-items-center rounded-[2rem] p-8 text-center" aria-live="polite" aria-busy="true">
      <div>
        <div className="relative mx-auto grid size-24 place-items-center">
          <motion.div className="absolute inset-0 rounded-full border border-mint/20" animate={{ scale: [1, 1.28], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }} />
          <div className="grid size-16 place-items-center rounded-full border border-mint/30 bg-mint/10 text-mint"><LoaderCircle className="animate-spin" size={28} /></div>
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={loadingMessages[index]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mt-8 text-lg font-semibold text-white">{loadingMessages[index]}</motion.p>
        </AnimatePresence>
        <p className="mt-2 text-sm text-zinc-500">Translating property signals into market context.</p>
      </div>
    </motion.div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const degrees = value * 3.6;
  return (
    <div className="relative grid size-28 place-items-center rounded-full" style={{ background: `conic-gradient(#73f2bd ${degrees}deg, rgba(255,255,255,.08) 0deg)` }}>
      <div className="absolute inset-[7px] rounded-full bg-[#0b1714]" />
      <div className="relative text-center"><div className="text-2xl font-semibold">{value}</div><div className="text-[9px] uppercase tracking-[.16em] text-zinc-500">of 100</div></div>
    </div>
  );
}

function ValuationResult({ result, onReset }: { result: PredictionResponse; onReset: () => void }) {
  const aboveAverage = result.difference_percent >= 0;
  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4" aria-labelledby="valuation-result">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="absolute right-0 top-0 size-56 rounded-full bg-mint/[0.07] blur-[60px]" />
        <div className="relative flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow"><Sparkles size={14} /> Valuation complete</span>
              <span className="rounded-full border border-mint/20 bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{result.category}</span>
            </div>
            <p className="mt-7 text-sm text-zinc-500">Estimated market value</p>
            <h2 id="valuation-result" className="mt-2 text-4xl font-semibold tracking-[-.05em] text-white sm:text-6xl">{currency.format(result.predicted_price)}</h2>
            <p className={`mt-4 inline-flex items-center gap-2 text-sm ${aboveAverage ? "text-mint" : "text-amber-300"}`}>
              {aboveAverage ? <ArrowUpRight size={17} /> : <ArrowDownRight size={17} />}
              {Math.abs(result.difference_percent).toFixed(1)}% {aboveAverage ? "above" : "below"} dataset average
            </p>
          </div>
          <div className="rounded-2xl border border-white/[0.08] bg-black/15 px-5 py-4 sm:min-w-48">
            <p className="text-xs uppercase tracking-[.16em] text-zinc-500">Estimated value band</p>
            <p className="mt-2 text-sm font-semibold text-white">{currency.format(result.estimated_range[0])}</p>
            <div className="my-2 h-px bg-white/10" />
            <p className="text-sm font-semibold text-white">{currency.format(result.estimated_range[1])}</p>
          </div>
        </div>
        <div className="relative mt-8 rounded-2xl border border-white/[0.08] bg-black/15 p-5">
          <div className="flex items-start gap-3"><WandSparkles className="mt-0.5 shrink-0 text-mint" size={19} /><p className="text-sm leading-7 text-zinc-300">{result.summary}</p></div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div><p className="eyebrow"><BarChart3 size={14} /> Property score</p><p className="mt-3 max-w-xs text-sm leading-6 text-zinc-500">Market position within the dataset&apos;s observed price distribution.</p></div>
            <ScoreRing value={result.property_score} />
          </div>
        </div>
        <div className="glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between"><p className="eyebrow"><Gauge size={14} /> Model confidence</p><span className="text-lg font-semibold text-mint">{result.confidence.label}</span></div>
          <div className="mt-6 flex items-end justify-between"><span className="text-3xl font-semibold">{result.confidence.score}%</span><span className="text-xs text-zinc-600">Reliability indicator</span></div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/[0.07]"><motion.div initial={{ width: 0 }} animate={{ width: `${result.confidence.score}%` }} transition={{ duration: .9 }} className="h-full rounded-full bg-gradient-to-r from-mint to-cyan" /></div>
          <p className="mt-4 text-xs leading-5 text-zinc-500">{result.confidence.explanation}</p>
        </div>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">What shaped the value</p><h3 className="mt-3 text-2xl font-semibold">Major value drivers</h3></div><p className="hidden text-xs text-zinc-600 sm:block">Relative to a typical dataset property</p></div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {result.major_value_drivers.map((driver) => (
            <div key={driver.feature} className="rounded-2xl border border-white/[0.08] bg-black/10 p-4">
              <div className="flex items-center justify-between gap-3"><span className="text-sm font-semibold text-zinc-200">{driver.label}</span><span className={`inline-flex items-center gap-1 text-xs ${driver.impact === "positive" ? "text-mint" : "text-amber-300"}`}>{driver.impact === "positive" ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{currency.format(Math.abs(driver.contribution))}</span></div>
              <p className="mt-2 text-xs leading-5 text-zinc-500">{driver.explanation}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 sm:flex-row sm:items-center">
        <p className="max-w-2xl text-xs leading-5 text-zinc-500">This estimate is exploratory and based on a historical public dataset. It is not a certified appraisal or financial advice.</p>
        <button type="button" onClick={onReset} className="button-secondary shrink-0"><RotateCcw size={16} /> New valuation</button>
      </div>
    </motion.section>
  );
}

export function ValuationWorkspace() {
  const [property, setProperty] = useState<PropertyInput>(initialProperty);
  const [loading, setLoading] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading) return;
    const interval = window.setInterval(() => setLoadingIndex((index) => Math.min(index + 1, loadingMessages.length - 1)), 520);
    return () => window.clearInterval(interval);
  }, [loading]);

  const setNumeric = (field: NumericKey, value: number) => setProperty((current) => ({ ...current, [field]: value }));
  const setBoolean = (field: BooleanKey, value: YesNo) => setProperty((current) => ({ ...current, [field]: value }));

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);
    setLoadingIndex(0);
    setLoading(true);
    try {
      const [response] = await Promise.all([analyzeProperty(property), new Promise((resolve) => setTimeout(resolve, 1800))]);
      setResult(response);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to complete this valuation.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (loading) return <LoadingState index={loadingIndex} />;
  if (result) return <ValuationResult result={result} onReset={reset} />;

  return (
    <form onSubmit={submit} className="glass-panel rounded-[2rem] p-5 sm:p-8">
      <div className="flex flex-col gap-3 border-b border-white/[0.08] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div><p className="eyebrow">Property profile</p><h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">Tell us about the home.</h2></div>
        <p className="max-w-xs text-xs leading-5 text-zinc-500">All fields are used by the valuation model. No personal information is collected.</p>
      </div>
      <div className="mt-7 grid gap-4 md:grid-cols-2">
        <SliderField label="Area" field="area" value={property.area} min={1000} max={20000} step={50} suffix="sq ft" onChange={setNumeric} />
        <SliderField label="Bedrooms" field="bedrooms" value={property.bedrooms} min={1} max={10} onChange={setNumeric} />
        <SliderField label="Bathrooms" field="bathrooms" value={property.bathrooms} min={1} max={6} onChange={setNumeric} />
        <SliderField label="Stories" field="stories" value={property.stories} min={1} max={6} onChange={setNumeric} />
        <SliderField label="Parking spaces" field="parking" value={property.parking} min={0} max={5} onChange={setNumeric} />
        <label className="block rounded-2xl border border-white/[0.08] bg-black/10 p-4 transition focus-within:border-mint/35">
          <span className="text-sm font-medium text-zinc-300">Furnishing status</span>
          <select value={property.furnishingstatus} onChange={(event) => setProperty((current) => ({ ...current, furnishingstatus: event.target.value as PropertyInput["furnishingstatus"] }))} className="mt-4 h-11 w-full rounded-xl border border-white/10 bg-[#0b1714] px-3 text-sm text-white outline-none">
            <option value="furnished">Furnished</option><option value="semi-furnished">Semi-furnished</option><option value="unfurnished">Unfurnished</option>
          </select>
        </label>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <ToggleField label="Main road access" value={property.mainroad} onChange={(value) => setBoolean("mainroad", value)} />
        <ToggleField label="Guest room" value={property.guestroom} onChange={(value) => setBoolean("guestroom", value)} />
        <ToggleField label="Basement" value={property.basement} onChange={(value) => setBoolean("basement", value)} />
        <ToggleField label="Hot water heating" value={property.hotwaterheating} onChange={(value) => setBoolean("hotwaterheating", value)} />
        <ToggleField label="Air conditioning" value={property.airconditioning} onChange={(value) => setBoolean("airconditioning", value)} />
        <ToggleField label="Preferred area" value={property.prefarea} onChange={(value) => setBoolean("prefarea", value)} />
      </div>
      {error && <div role="alert" className="mt-5 flex items-start gap-3 rounded-2xl border border-red-300/20 bg-red-400/[0.07] p-4 text-sm text-red-200"><CircleAlert className="mt-0.5 shrink-0" size={18} /><span>{error} Make sure the FastAPI service is running and try again.</span></div>}
      <div className="mt-7 flex flex-col items-center justify-between gap-4 border-t border-white/[0.08] pt-7 sm:flex-row">
        <span className="inline-flex items-center gap-2 text-xs text-zinc-600"><Check size={14} className="text-mint" /> 12 model signals ready</span>
        <button type="submit" className="button-primary w-full sm:w-auto"><WandSparkles size={17} /> Analyze property</button>
      </div>
    </form>
  );
}
