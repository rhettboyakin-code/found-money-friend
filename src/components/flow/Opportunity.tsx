import { useState } from "react";

const reasons = [
  "They asked for pricing on jobs over $3,000.",
  "Each one opened your estimate more than once.",
  "None of them have hired a competitor yet.",
  "All five are inside your best-performing service area.",
];

export function Opportunity({
  premiumPreference,
  remembered,
  onPreference,
  onBack,
  onGo,
}: {
  premiumPreference: boolean;
  remembered: boolean;
  onPreference: (remember: boolean) => void;
  onBack: () => void;
  onGo: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [note, setNote] = useState("");
  const [acknowledged, setAcknowledged] = useState(premiumPreference);
  const [askRemember, setAskRemember] = useState(false);
  const premium = premiumPreference || acknowledged;

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24">
      <button onClick={onBack} className="text-sm text-muted-foreground hover:text-foreground">
        ← All opportunities
      </button>

      <h1 className="count-in mt-8 text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95]">
        <span className="text-money">$7,200</span> sitting in 11 forgotten estimates.
      </h1>
      <p className="mt-6 text-xl text-muted-foreground">
        These customers asked you for a price — and never heard anything meaningful back.
      </p>

      <div className="surface rise mt-12 p-8">
        <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
          What I recommend
        </p>
        <h2 className="mt-3 text-3xl">Contact the 5 customers most likely to close today.</h2>

        <div className="mt-7 flex flex-wrap items-baseline gap-3 border-t border-border pt-7">
          <span className="text-sm text-muted-foreground">Expected return</span>
          <span className="font-display text-3xl text-money">$2,800–$4,600</span>
        </div>

        <div className="mt-7 border-t border-border pt-7">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Why these five
          </p>
          <ul className="mt-4 space-y-3">
            {reasons.map((r) => (
              <li key={r} className="flex gap-3 text-base text-foreground">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ember" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 rounded-xl bg-secondary p-5">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">The offer</p>
          <p className="mt-2 text-lg">
            {premium
              ? "Complimentary priority scheduling — their job moved to the front of next week's calendar."
              : "10% off if they book their estimate within 7 days."}
          </p>
        </div>
      </div>

      {acknowledged && (
        <div className="rise mt-6 rounded-2xl border border-ember/30 bg-accent/60 p-6">
          <p className="text-lg">Got it. I'll protect premium positioning.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Offer updated from a discount to complimentary priority scheduling.
          </p>
          {askRemember && (
            <div className="mt-5">
              <p className="text-base font-medium">Remember this preference?</p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => {
                    onPreference(true);
                    setAskRemember(false);
                  }}
                  className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    onPreference(false);
                    setAskRemember(false);
                  }}
                  className="rounded-full border border-border px-5 py-2 text-sm font-medium"
                >
                  Just this time
                </button>
              </div>
            </div>
          )}
          {!askRemember && remembered && (
            <p className="mt-3 text-sm font-medium text-ember">Saved to how you like to sell.</p>
          )}
        </div>
      )}

      {editing ? (
        <div className="surface mt-8 p-6">
          <label className="text-sm text-muted-foreground" htmlFor="plan-note">
            Tell me what to change
          </label>
          <textarea
            id="plan-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Don't offer a discount. We're premium and don't compete on price."
            className="mt-3 w-full resize-none rounded-xl border border-input bg-background p-4 text-base outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={() => {
                setAcknowledged(true);
                setAskRemember(true);
                setEditing(false);
              }}
              className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground"
            >
              Update the plan
            </button>
            <button
              onClick={() => setEditing(false)}
              className="rounded-full border border-border px-6 py-2.5 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            onClick={onGo}
            className="rounded-full bg-primary px-9 py-4 text-lg font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Go get it
          </button>
          <button
            onClick={() => setEditing(true)}
            className="rounded-full border border-border px-7 py-4 text-lg font-medium hover:bg-secondary"
          >
            Change plan
          </button>
          <button
            onClick={onBack}
            className="rounded-full px-7 py-4 text-lg text-muted-foreground hover:text-foreground"
          >
            Skip
          </button>
        </div>
      )}
    </section>
  );
}
