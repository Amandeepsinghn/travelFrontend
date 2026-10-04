import { cn } from "@/lib/utils";

export function StatusPill({ active }: { active: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide",
        active ? "bg-[#5d8a32]/25 text-[#f4b42a]" : "bg-white/8 text-white/45",
      )}
    >
      {active ? "Active" : "Off"}
    </span>
  );
}
