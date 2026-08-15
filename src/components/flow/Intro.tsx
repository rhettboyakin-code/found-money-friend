import { useEffect, useState } from "react";

const reel = [
  "$2,140 MORE.",
  "$6,880 MORE.",
  "$11,350 MORE.",
  "$18,420 MORE.",
  "$24,900 MORE.",
  "$31,600 MORE.",
];

const CENTER = 3;
const ROW = 108;

export function Intro({ onEnter }: { onEnter: () => void }) {
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setSettled(true), 2100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 py-20 text-center">
      <p className="count-in text-xs uppercase tracking-[0.34em] text-muted-foreground sm:text-sm">
        MadeThis <span className="text-ember">×</span> Northgate HVAC
      </p>

      <h1
        className="rise mt-12 text-[clamp(2.6rem,9vw,6rem)] uppercase leading-[0.92] tracking-tight text-foreground"
        style={{ animationDelay: "120ms" }}
      >
        We MadeThis
      </h1>

      <div
        className="relative mt-6 w-full overflow-hidden"
        style={{
          height: ROW * 3,
          maskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)",
        }}
        aria-label="$18,420 more"
      >
        <div
          className="absolute left-0 right-0 top-0"
          style={{
            transform: `translateY(${ROW - (settled ? CENTER : 0) * ROW}px)`,
            transition: "transform 1.8s cubic-bezier(0.12, 0.9, 0.16, 1)",
          }}
        >
          {reel.map((value, i) => {
            const distance = Math.abs(i - CENTER);
            const active = settled && distance === 0;
            return (
              <div
                key={value}
                className="flex items-center justify-center font-display text-money"
                style={{
                  height: ROW,
                  fontSize: active ? "clamp(2.6rem,9vw,5.6rem)" : "clamp(1.5rem,5vw,3rem)",
                  opacity: settled ? (distance === 0 ? 1 : distance === 1 ? 0.28 : 0.12) : 0.4,
                  filter: active ? "none" : "blur(1.2px)",
                  transition: "all 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>

      <div
        className="flex flex-col items-center transition-all duration-700"
        style={{
          opacity: settled ? 1 : 0,
          transform: settled ? "none" : "translateY(14px)",
          transitionDelay: "1.5s",
        }}
      >
        <p className="text-xl uppercase tracking-[0.16em] text-muted-foreground sm:text-2xl">
          What should we make next?
        </p>
        <button
          onClick={onEnter}
          className="mt-10 rounded-full bg-primary px-10 py-4 text-lg font-medium uppercase tracking-[0.12em] text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Show me →
        </button>
      </div>
    </section>
  );
}
