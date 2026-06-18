import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ValuationWorkspace } from "@/components/valuation-workspace";

export const metadata: Metadata = {
  title: "Property Valuation",
  description: "Estimate a residential property's market value with explainable machine learning.",
};

export default function PredictPage() {
  return (
    <>
      <PageHero eyebrow="Residential valuation" title="A clearer view of property value." description="Set the property profile and HouseVision AI will estimate its market value, position it against the dataset, and explain the signals behind the result." />
      <section className="container-shell pb-28"><ValuationWorkspace /></section>
    </>
  );
}

