import type { LoopPhase } from "@/lib/types";
import { PHASES } from "@/lib/engine";

const labels: Record<LoopPhase, string> = {
  FIND: "Find",
  RECOMMEND: "Recommend",
  ACT: "Act",
  LEARN: "Learn",
  FIND_AGAIN: "Find again",
};

export function LoopStepper({
  phase,
  round,
}: {
  phase: LoopPhase;
  round: number;
}) {
  const current = PHASES.indexOf(phase);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
          Revenue Bloom · round {round}
        </p>
        <p className="text-[11px] uppercase tracking-[0.16em] text-orange">
          {labels[phase]}
        </p>
      </div>
      <ol className="flex flex-wrap items-center gap-1 sm:gap-0">
        {PHASES.map((p, i) => {
          const active = i === current;
          const done = i < current;
          return (
            <li key={p} className="flex items-center">
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                  active
                    ? "bg-ink text-cream"
                    : done
                    ? "bg-sage text-ink"
                    : "bg-transparent text-taupe"
                }`}
              >
                {labels[p]}
              </span>
              {i < PHASES.length - 1 ? (
                <span className="mx-1 hidden h-px w-4 bg-line sm:block" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
