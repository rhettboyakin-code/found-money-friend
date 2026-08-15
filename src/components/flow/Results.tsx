const stats = [
  { value: "5", label: "customers contacted" },
  { value: "4", label: "replies" },
  { value: "2", label: "purchases" },
];

export function Results({
  remembered,
  onRestart,
  onGo,
}: {
  remembered: boolean;
  onRestart: () => void;
  onGo: () => void;
}) {
  return (
    <section className="mx-auto max-w-3xl px-6 pb-28">
      <div className="count-in pt-8">
        <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Outcome</p>
        <h1 className="mt-5 text-[clamp(3rem,10vw,6.5rem)] leading-[0.9] text-money">
          $3,850 recovered.
        </h1>
      </div>

      <div className="rise mt-10 grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="surface p-6">
            <p className="font-display text-4xl">{s.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div
        className="rise mt-12 rounded-2xl bg-primary p-9 text-primary-foreground"
        style={{ animationDelay: "180ms" }}
      >
        <p className="text-sm uppercase tracking-[0.22em] opacity-70">What I learned</p>
        <p className="mt-4 font-display text-2xl leading-snug sm:text-3xl">
          Premium service incentives converted better than discounts for customers like these.
        </p>
        {remembered && (
          <p className="mt-4 text-sm opacity-70">
            Saved to your preferences — I'll keep price off the table.
          </p>
        )}
      </div>

      <div className="rise mt-12" style={{ animationDelay: "300ms" }}>
        <h2 className="text-[clamp(2rem,6vw,3.25rem)] leading-tight">
          We found another <span className="text-money">$6,700.</span>
        </h2>
        <div className="surface mt-6 p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Next recommendation
          </p>
          <h3 className="mt-3 text-2xl">
            Invite 9 past customers into the Northgate Priority Care list.
          </h3>
          <p className="mt-4 text-base text-muted-foreground">
            Offer: guaranteed 48-hour response and a complimentary seasonal system check — no
            discount, applying what I learned from your last campaign.
          </p>
          <div className="mt-6 flex flex-wrap items-baseline gap-3 border-t border-border pt-6">
            <span className="text-sm text-muted-foreground">Expected return</span>
            <span className="font-display text-3xl text-money">$2,900–$4,400</span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={onGo}
            className="rounded-full bg-primary px-9 py-4 text-lg font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Go get it
          </button>
          <button
            onClick={onRestart}
            className="rounded-full border border-border px-7 py-4 text-lg font-medium hover:bg-secondary"
          >
            Back to home
          </button>
        </div>
      </div>
    </section>
  );
}
