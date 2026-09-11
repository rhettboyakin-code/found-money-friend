import { resetDemoAction } from "@/app/actions";
import { Logo } from "@/components/Logo";
import { LoopStepper } from "@/components/LoopStepper";
import { PreferenceChips } from "@/components/PreferenceChips";
import { money } from "@/lib/format";
import { openTotal } from "@/lib/engine";
import type { AppState } from "@/lib/types";

export function AppHeader({ state }: { state: AppState }) {
  return (
    <header className="border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-5 py-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col gap-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
              {state.demo.companyName}
            </p>
            <Logo compact />
          </div>
          <nav className="flex flex-wrap items-center gap-4 text-sm text-taupe">
            <a href="/opportunities" className="hover:text-ink">
              Opportunities
            </a>
            <a href="/loop" className="hover:text-ink">
              Loop
            </a>
            <a href="/outcomes" className="hover:text-ink">
              Outcomes
            </a>
            <form action={resetDemoAction}>
              <button type="submit" className="text-xs uppercase tracking-[0.14em] hover:text-ink">
                Reset demo
              </button>
            </form>
          </nav>
        </div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
              Demo client · {state.demo.city}
            </p>
            <p className="font-headline text-2xl text-ink">
              {money(openTotal(state))} still sitting
            </p>
          </div>
          <p className="text-sm text-taupe">
            Recovered{" "}
            <span className="font-semibold text-green">{money(state.recoveredTotal)}</span>
          </p>
        </div>
        <LoopStepper phase={state.phase} round={state.round} />
        <PreferenceChips preferences={state.preferences} />
      </div>
    </header>
  );
}

export function TagFooter() {
  return (
    <footer className="mt-auto bg-ink">
      <div className="px-5 py-5 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
          <span className="text-orange">Beehive &amp; Branch</span>
          {" · "}
          There&apos;s money hiding in your business.
        </p>
        <p className="mt-2 text-[10px] tracking-wide text-cream/70">
          Beehive &amp; Branch LLC · rhett@beehivebranch.com · Revenue Bloom
        </p>
      </div>
    </footer>
  );
}
