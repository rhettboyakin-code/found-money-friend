import { notFound } from "next/navigation";
import { learnAction } from "@/app/actions";
import { AppHeader, TagFooter } from "@/components/AppHeader";
import { LEARN_CHOICES, actionsFor } from "@/lib/engine";
import { money } from "@/lib/format";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function LearnPage({ params }: { params: { id: string } }) {
  const state = readState();
  const opp = state.opportunities.find((o) => o.id === params.id);
  if (!opp) notFound();

  const acted = actionsFor(opp, state.preferences).find(
    (a) => a.id === opp.actedActionId
  );

  if (opp.status === "learned" && opp.outcome) {
    return (
      <div className="flex min-h-screen flex-col">
        <AppHeader state={state} />
        <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-16 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
            Learned
          </p>
          <h1 className="mt-3 font-headline text-4xl text-ink">{opp.outcome.label}</h1>
          <p className="mt-4 font-headline text-5xl text-green">
            {money(opp.outcome.recovered)}
          </p>
          <p className="mt-4 text-taupe">{opp.outcome.note}</p>
          <p className="mt-8">
            <a href="/loop" className="btn-ink">
              See the loop
            </a>
          </p>
        </main>
        <TagFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader state={state} />
      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
          Learn
        </p>
        <h1 className="mt-2 font-headline text-4xl text-ink">What happened?</h1>
        <p className="mt-3 text-taupe">
          You acted on <span className="text-ink">{opp.customer}</span>
          {acted ? ` · ${acted.label}` : ""}. Tell Revenue Bloom the outcome.
          Later recommendations will change — especially around{" "}
          <span className="font-semibold text-ink">NO DISCOUNTS</span>.
        </p>
        <p className="mt-2 font-headline text-3xl text-green">{money(opp.value)} at stake</p>
        <div className="mt-8 space-y-3">
          {LEARN_CHOICES.map((c) => (
            <form key={c.id} action={learnAction}>
              <input type="hidden" name="id" value={opp.id} />
              <input type="hidden" name="choiceId" value={c.id} />
              <button
                type="submit"
                className="card flex w-full flex-col items-start p-5 text-left transition hover:border-ink"
              >
                <span className="font-semibold text-ink">{c.label}</span>
                <span className="mt-1 text-sm text-taupe">{c.hint}</span>
                <span className="mt-2 text-[11px] uppercase tracking-[0.14em] text-orange">
                  {c.recoveredMode === "full"
                    ? `Recover ${money(opp.value)}`
                    : "Recover $0 this turn · sharpen the rule"}
                </span>
              </button>
            </form>
          ))}
        </div>
      </main>
      <TagFooter />
    </div>
  );
}
