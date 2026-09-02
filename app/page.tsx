import { enterDemoAction } from "@/app/actions";
import { DotWave } from "@/components/DotWave";
import { IntegrationStubs } from "@/components/IntegrationStubs";
import { Logo } from "@/components/Logo";
import { TagFooter } from "@/components/AppHeader";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <main className="relative flex flex-1 flex-col">
        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center px-5 pb-28 pt-10 text-center">
          <Logo />
          <h1 className="mt-16 font-headline text-4xl leading-tight text-ink sm:text-6xl sm:leading-[1.12]">
            There’s <span className="text-green">money</span> hiding
            <br className="hidden sm:block" /> in your business.
          </h1>
          <div className="my-8 h-px w-16 bg-orange" />
          <form action={enterDemoAction} className="flex w-full max-w-md flex-col items-center gap-3">
            <button type="submit" className="btn-ink w-full max-w-xs py-4 text-base">
              Go get it.
            </button>
            <button
              type="submit"
              className="btn-outline w-full max-w-xs border-ink text-[12px] font-semibold uppercase tracking-[0.14em]"
            >
              Enter demo as Northgate HVAC
            </button>
          </form>
          <p className="mt-5 max-w-md text-sm text-taupe">
            One click. No login. Northgate HVAC’s book — stale estimates, overdue
            tune-ups, incomplete quotes. Preference on the whiteboard:{" "}
            <span className="font-semibold text-ink">NO DISCOUNTS</span>.
          </p>
          <p className="mt-8 max-w-lg font-headline text-xl text-ink">
            MadeThis finds the next opportunity. You make it more.
          </p>
          <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
            Revenue Bloom · Find → Recommend → Act → Learn → Find again
          </p>
          <img
            src="/madethis-close.png"
            alt="MadeThis: there’s money hiding in your business. Go get it."
            className="mt-12 w-full max-w-xl rounded-3xl border border-line shadow-soft"
          />
          <div className="mt-12 w-full max-w-lg text-left">
            <IntegrationStubs />
          </div>
        </div>
        <DotWave />
      </main>
      <TagFooter />
    </div>
  );
}
