import { findAgainAction } from "@/app/actions";
import { AppHeader, TagFooter } from "@/components/AppHeader";
import { LoopStepper } from "@/components/LoopStepper";
import { PreferenceChips } from "@/components/PreferenceChips";
import { PHASES, openTotal, rankOpportunities } from "@/lib/engine";
import { money } from "@/lib/format";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

const copy: Record<string, string> = {
  FIND: "Reading the book. Not summarizing a dashboard — hunting money that is sitting.",
  RECOMMEND: "Ranked opportunities. One list. The next move is on top.",
  ACT: "Pick one action. Discounts stay blocked while NO DISCOUNTS is on.",
  LEARN: "What happened changes the next recommendation.",
  FIND_AGAIN: "The loop turns. New ranking. Sometimes new money surfaces.",
};

export default function LoopPage() {
  const state = readState();
  const nextOpen = rankOpportunities(state).find((o) => o.status === "open");
  const last = [...state.events].reverse()[0];

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader state={state} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
          The loop
        </p>
        <h1 className="mt-2 font-headline text-4xl text-ink">Visible on purpose.</h1>
        <p className="mt-3 text-taupe">
          Revenue Bloom is FIND → RECOMMEND → ACT → LEARN → FIND AGAIN. You are on{" "}
          <span className="text-ink">{state.phase.replace("_", " ")}</span>, round{" "}
          {state.round}.
        </p>

        <div className="card mt-8 p-6">
          <LoopStepper phase={state.phase} round={state.round} />
          <p className="mt-5 text-ink">{copy[state.phase]}</p>
          {last ? (
            <p className="mt-3 text-sm text-taupe">{last.message}</p>
          ) : null}
        </div>

        <section className="mt-8">
          <h2 className="font-headline text-2xl text-ink">What it learned</h2>
          <div className="mt-3">
            <PreferenceChips preferences={state.preferences} />
          </div>
          <ul className="mt-4 space-y-3">
            {state.preferences
              .filter((p) => p.active)
              .map((p) => (
                <li key={p.key} className="card p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-orange">
                    {p.label} · {p.source}
                  </p>
                  <p className="mt-1 text-ink">{p.detail}</p>
                  <p className="mt-1 text-sm text-taupe">{p.note}</p>
                </li>
              ))}
          </ul>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="card p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-taupe">Sitting</p>
            <p className="font-headline text-3xl text-ink">{money(openTotal(state))}</p>
          </div>
          <div className="card p-5">
            <p className="text-[11px] uppercase tracking-[0.16em] text-taupe">Recovered</p>
            <p className="font-headline text-3xl text-green">{money(state.recoveredTotal)}</p>
          </div>
        </section>

        {state.phase === "FIND_AGAIN" ? (
          <form action={findAgainAction} className="mt-10">
            <button type="submit" className="btn-ink">
              Find again
            </button>
            {nextOpen ? (
              <p className="mt-3 text-sm text-taupe">
                Next likely: {nextOpen.customer} · {money(nextOpen.value)}
                {nextOpen.unlockRound === state.round
                  ? " · newly surfaced this round"
                  : ""}
              </p>
            ) : null}
          </form>
        ) : (
          <p className="mt-10 text-sm">
            <a href="/opportunities" className="btn-ink">
              Continue the loop
            </a>
          </p>
        )}

        <ol className="mt-12 space-y-2 text-sm text-taupe">
          {state.events
            .slice()
            .reverse()
            .slice(0, 8)
            .map((e, i) => (
              <li key={`${e.at}-${i}`}>
                <span className="font-semibold uppercase tracking-[0.12em] text-ink">
                  {e.phase.replace("_", " ")}
                </span>{" "}
                · {e.message}
              </li>
            ))}
        </ol>
        <p className="mt-6 hidden text-taupe">{PHASES.join(" → ")}</p>
      </main>
      <TagFooter />
    </div>
  );
}
