import { notFound } from "next/navigation";
import { actAction } from "@/app/actions";
import { AppHeader, TagFooter } from "@/components/AppHeader";
import { PreferenceChips } from "@/components/PreferenceChips";
import { actionsFor, recommendationFor } from "@/lib/engine";
import { money, typeLabel } from "@/lib/format";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function OpportunityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const state = readState();
  const opp = state.opportunities.find((o) => o.id === params.id);
  if (!opp) notFound();
  const rec = recommendationFor(opp, state.preferences);
  const actions = actionsFor(opp, state.preferences);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader state={state} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange">
          Act · {typeLabel(opp.type)}
        </p>
        <h1 className="mt-2 font-headline text-4xl text-ink">{opp.customer}</h1>
        <p className="mt-1 text-taupe">{opp.site}</p>
        <p className="mt-4 font-headline text-5xl text-green">{money(opp.value)}</p>
        <p className="mt-2 text-sm text-taupe">{opp.ageLabel}</p>

        <section className="card mt-8 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
            Why this is sitting
          </p>
          <p className="mt-2 text-ink">{opp.story}</p>
          <p className="mt-3 text-sm text-taupe">{opp.whyNow}</p>
          {opp.missing ? (
            <p className="mt-3 text-sm">
              <span className="font-semibold">Missing:</span> {opp.missing}
            </p>
          ) : null}
        </section>

        <section className="mt-8 rounded-2xl border border-green/30 bg-sage/40 p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-green">
            Revenue Bloom recommends
          </p>
          <h2 className="mt-2 font-headline text-2xl text-ink">{rec.headline}</h2>
          <p className="mt-2 text-ink">{rec.body}</p>
          <div className="mt-4">
            <PreferenceChips preferences={state.preferences} />
          </div>
        </section>

        {opp.status === "open" ? (
          <section className="mt-8">
            <h2 className="font-headline text-2xl text-ink">Take one action</h2>
            <p className="mt-1 text-sm text-taupe">
              This is the ACT step. One move. Then we learn.
            </p>
            <div className="mt-5 space-y-3">
              {actions.map((a) =>
                a.blocked ? (
                  <div
                    key={a.id}
                    className="rounded-2xl border border-dashed border-line bg-cream px-5 py-4 opacity-60"
                  >
                    <p className="text-sm line-through">{a.label}</p>
                    <p className="text-xs uppercase tracking-[0.14em] text-orange">
                      {a.blockReason}
                    </p>
                  </div>
                ) : (
                  <form key={a.id} action={actAction}>
                    <input type="hidden" name="id" value={opp.id} />
                    <input type="hidden" name="actionId" value={a.id} />
                    <button
                      type="submit"
                      className="card flex w-full flex-col items-start p-5 text-left transition hover:border-ink"
                    >
                      <span className="font-semibold text-ink">{a.label}</span>
                      <span className="mt-1 text-sm text-taupe">{a.detail}</span>
                    </button>
                  </form>
                )
              )}
            </div>
          </section>
        ) : (
          <p className="mt-8 text-taupe">
            Already acted.{" "}
            <a className="text-ink underline" href={`/learn/${opp.id}`}>
              Continue to Learn
            </a>
            .
          </p>
        )}

        <p className="mt-10 text-sm">
          <a href="/opportunities" className="text-taupe hover:text-ink">
            ← Back to the ranked list
          </a>
        </p>
      </main>
      <TagFooter />
    </div>
  );
}
