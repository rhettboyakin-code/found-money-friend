import { useEffect, useState } from "react";

export function SecondExecution({ onRestart }: { onRestart: () => void }) {
  const [phase, setPhase] = useState<0 | 1 | 2>(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 3200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="mx-auto max-w-3xl px-6 pb-28 pt-6">
      <div className="count-in">
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
          Execution
        </p>
        <h1 className="mt-5 text-[clamp(2.2rem,6vw,3.75rem)] leading-tight">
          MADETHIS IS ON IT.
        </h1>
      </div>

      <div className="mt-12 space-y-4">
        <div
          className={`surface p-8 transition-all duration-700 ${
            phase >= 1
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Simulated action
          </p>
          <h2 className="mt-3 text-2xl">
            9 past customers invited to Northgate Priority Care
          </h2>
          <div className="mt-5 space-y-2 text-base text-muted-foreground">
            <p>Offer: Guaranteed 48-hour response + complimentary seasonal system check</p>
            <p>Discount: None</p>
          </div>
        </div>

        <div
          className={`surface p-8 transition-all duration-700 ${
            phase >= 2
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-money">
            CAMPAIGN LAUNCHED
          </p>
          <p className="mt-3 font-display text-4xl text-money">$2,900–$4,100</p>
          <p className="mt-1 text-sm text-muted-foreground">Expected return</p>
          <p className="mt-6 text-base text-muted-foreground">
            Your premium positioning preference was applied automatically.
          </p>
        </div>

        <div
          className={`transition-all duration-700 ${
            phase >= 2 ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={onRestart}
            className="mt-6 rounded-full border border-border px-7 py-4 text-lg font-medium hover:bg-secondary"
          >
            Back to home
          </button>
        </div>
      </div>
    </section>
  );
}
