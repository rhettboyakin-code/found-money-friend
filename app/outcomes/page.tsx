import { AppHeader, TagFooter } from "@/components/AppHeader";
import { money, typeLabel } from "@/lib/format";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function OutcomesPage() {
  const state = readState();
  const closed = state.opportunities.filter((o) => o.outcome);
  const recovered = state.recoveredTotal;

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader state={state} />
      <main className="mx-auto w-full max-w-3xl flex-1 px-5 py-12">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
          Northgate HVAC
        </p>
        <h1 className="mt-3 font-headline text-5xl text-ink sm:text-6xl">Outcomes</h1>
        <p className="mt-4 max-w-xl text-taupe">
          Money that was sitting in the book — stale estimates, overdue tune-ups,
          incomplete quotes — and then was not.
        </p>
        <p className="mt-8 font-headline text-6xl text-green sm:text-7xl">
          {money(recovered)}
        </p>
        <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-taupe">
          Recovered this loop · round {state.round}
        </p>

        {closed.length ? (
          <ul className="mt-10 space-y-4">
            {closed.map((o) => (
              <li key={o.id} className="card p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-taupe">
                      {typeLabel(o.type)}
                    </p>
                    <p className="font-headline text-2xl text-ink">{o.customer}</p>
                    <p className="text-sm text-taupe">{o.outcome?.label}</p>
                  </div>
                  <p
                    className={`font-headline text-3xl ${
                      o.outcome?.recovered ? "text-green" : "text-taupe"
                    }`}
                  >
                    {money(o.outcome?.recovered || 0)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="card mt-10 p-8 text-center">
            <p className="font-headline text-2xl text-ink">Nothing recovered yet.</p>
            <p className="mt-2 text-taupe">There&apos;s money hiding. Go get it.</p>
            <p className="mt-6">
              <a href="/opportunities" className="btn-ink">
                Open the list
              </a>
            </p>
          </div>
        )}

        <p className="mt-12 text-center text-sm text-taupe">
          Revenue Bloom finds the next opportunity. You make it more.
        </p>
      </main>
      <TagFooter />
    </div>
  );
}
