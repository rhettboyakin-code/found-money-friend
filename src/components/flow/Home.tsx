const opportunities = [
  { amount: "$7,200", label: "11 estimates never followed up", primary: true },
  { amount: "$4,850", label: "23 customers ready to return" },
  { amount: "$3,970", label: "Abandoned purchases" },
  { amount: "$2,400", label: "Customers ready for an upgrade" },
];

export function Home({ onStart }: { onStart: () => void }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-24">
      <div className="count-in pt-10 sm:pt-20">
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
          Good evening, Dana
        </p>
        <h1 className="mt-6 text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.9] text-foreground">
          We found <span className="text-money">$18,420.</span>
        </h1>
        <p className="mt-6 max-w-xl text-xl text-muted-foreground sm:text-2xl">
          Potential revenue hiding inside your business.
        </p>
      </div>

      <div className="rise mt-14 grid gap-4 sm:grid-cols-2" style={{ animationDelay: "160ms" }}>
        {opportunities.map((o) => (
          <button
            key={o.amount}
            onClick={o.primary ? onStart : undefined}
            className={`surface group flex flex-col items-start p-7 text-left transition-all ${
              o.primary
                ? "cursor-pointer hover:-translate-y-1 hover:shadow-lg"
                : "cursor-default opacity-70"
            }`}
          >
            <span className="font-display text-4xl text-foreground">{o.amount}</span>
            <span className="mt-2 text-base text-muted-foreground">{o.label}</span>
            {o.primary && (
              <span className="mt-4 text-sm font-medium text-ember">Ready to act →</span>
            )}
          </button>
        ))}
      </div>

      <div
        className="rise mt-12 flex flex-wrap items-center gap-5"
        style={{ animationDelay: "320ms" }}
      >
        <button
          onClick={onStart}
          className="rounded-full bg-primary px-9 py-4 text-lg font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Show me the money
        </button>
        <p className="text-sm text-muted-foreground">
          Reviewed 2,184 jobs, quotes and messages this week.
        </p>
      </div>
    </section>
  );
}
