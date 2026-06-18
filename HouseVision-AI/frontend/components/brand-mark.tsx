import { House } from "lucide-react";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3">
      <span className="grid size-10 place-items-center rounded-xl border border-mint/30 bg-mint/10 text-mint shadow-[inset_0_0_18px_rgba(115,242,189,.08)]">
        <House size={20} strokeWidth={1.8} aria-hidden="true" />
      </span>
      {!compact && (
        <span className="text-[15px] font-bold tracking-tight text-white">
          HouseVision <span className="text-mint">AI</span>
        </span>
      )}
    </span>
  );
}

