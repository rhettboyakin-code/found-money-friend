import { AppHeader, TagFooter } from "@/components/AppHeader";
import { OpportunityCard } from "@/components/OpportunityCard";
import { rankOpportunities, recommendationFor } from "@/lib/engine";
import { money } from "@/lib/format";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function OpportunitiesPage() {
  const state = readState();
  const ranked = rankOpportunities(state);
  const open = ranked.filter((o) => o.status === "open");
  const done = ranked.filter((o) => o.status !== "open");

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader state={state} />
      <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
          Recommend
        </p>
        <h1 className="mt-2 font-headline text-4xl text-ink">The next money.</h1>
        <p className="mt-3 max-w-2xl text-taupe">
          Ranked from Northgate’s book. Not a dashboard — pick one and act.
          {state.preferences.some((p) => p.key === "no_discounts" && p.active)
            ? " NO DISCOUNTS is on: recommendations hold the price."
            : ""}
        </p>
        <div className="mt-8 space-y-4">
          {open.map((o, i) => (
            <OpportunityCard
              key={o.id}
              opportunity={o}
              rank={i + 1}
              rec={recommendationFor(o, state.preferences)}
            />
          ))}
        </div>
        {done.length ? (
          <section className="mt-12">
            <h2 className="font-headline text-2xl text-ink">Already in the loop</h2>
            <div className="mt-4 space-y-4 opacity-80">
              {done.map((o, i) => (
                <OpportunityCard
                  key={o.id}
                  opportunity={o}
                  rank={open.length + i + 1}
                  rec={recommendationFor(o, state.preferences)}
                />
              ))}
            </div>
          </section>
        ) : null}
        {!open.length ? (
          <p className="mt-10 text-taupe">
            Nothing open in this round. See{" "}
            <a className="text-ink underline" href="/outcomes">
              We MadeThis
            </a>{" "}
            · {money(state.recoveredTotal)} recovered.
          </p>
        ) : null}
      </main>
      <TagFooter />
    </div>
  );
}
