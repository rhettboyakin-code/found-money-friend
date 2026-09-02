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
          <Logo compact />
          <nav className="flex flex-wrap items-center gap-4 text-sm text-taupe">
            <a href="/opportunities" className="hover:text-ink">
              Opportunities
            </a>
            <a href="/loop" className="hover:text-ink">
              Loop
            </a>
            <a href="/outcomes" className="hover:text-ink">
              We MadeThis
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
              {state.demo.companyName} · {state.demo.city}
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
      <p className="px-5 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-cream">
        <span className="text-orange">MadeThis</span> finds the next opportunity. You make it more.
      </p>
    </footer>
  );
}
