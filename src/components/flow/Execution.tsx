import { useEffect, useState } from "react";

const team = [
  { role: "Operations", task: "Selected the 5 highest-value opportunities" },
  { role: "Marketing", task: "Created personalized follow-up" },
  { role: "Creative", task: "Prepared supporting content" },
  { role: "Email", task: "Campaign scheduled" },
];

export function Execution({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (done >= team.length) {
      const t = setTimeout(onDone, 900);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setDone((d) => d + 1), 1100);
    return () => clearTimeout(t);
  }, [done, onDone]);

  return (
    <section className="mx-auto max-w-3xl px-6 pb-24 pt-6">
      <h1 className="count-in text-[clamp(2.2rem,6vw,3.75rem)] leading-tight">
        My team is on it.
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Simulated run — nothing is sent and nothing is spent.
      </p>

      <div className="mt-12 space-y-3">
        {team.map((m, i) => {
          const state = i < done ? "done" : i === done ? "active" : "idle";
          return (
            <div
              key={m.role}
              className={`surface flex items-center gap-5 p-6 transition-all duration-500 ${
                state === "idle" ? "opacity-35" : "opacity-100"
              } ${state === "active" ? "-translate-y-0.5" : ""}`}
            >
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${
                  state === "done"
                    ? "bg-money text-primary-foreground"
                    : state === "active"
                      ? "animate-pulse bg-ember text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                }`}
              >
                {state === "done" ? "✓" : i + 1}
              </span>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  {m.role}
                </p>
                <p className="mt-1 text-lg">{m.task}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
