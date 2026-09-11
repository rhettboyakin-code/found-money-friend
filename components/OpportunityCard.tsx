import { openOpportunityAction } from "@/app/actions";
import { money, typeLabel } from "@/lib/format";
import type { Opportunity, Recommendation } from "@/lib/types";

export function OpportunityCard({
  opportunity,
  rank,
  rec,
}: {
  opportunity: Opportunity;
  rank: number;
  rec: Recommendation;
}) {
  const open = opportunity.status === "open";
  return (
    <article className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
            {String(rank).padStart(2, "0")} · {typeLabel(opportunity.type)}
          </p>
          <h3 className="mt-1 font-headline text-2xl text-ink">{opportunity.customer}</h3>
          <p className="text-sm text-taupe">{opportunity.site}</p>
        </div>
        <p className="font-headline text-3xl text-green">{money(opportunity.value)}</p>
      </div>
      <p className="mt-3 text-sm text-ink">{rec.headline}</p>
      <p className="mt-1 text-sm text-taupe">{opportunity.ageLabel}</p>
      {opportunity.status !== "open" && opportunity.outcome ? (
        <p className="mt-3 text-sm text-green">
          {opportunity.outcome.label}
          {opportunity.outcome.recovered
            ? ` · recovered ${money(opportunity.outcome.recovered)}`
            : ""}
        </p>
      ) : null}
      <div className="mt-5">
        {open ? (
          <form action={openOpportunityAction}>
            <input type="hidden" name="id" value={opportunity.id} />
            <button type="submit" className="btn-ink text-[11px]">
              Act on this
            </button>
          </form>
        ) : (
          <span className="text-[11px] uppercase tracking-[0.16em] text-taupe">
            {opportunity.status === "learned" ? "Learned" : "Acted · waiting on learn"}
          </span>
        )}
      </div>
    </article>
  );
}
