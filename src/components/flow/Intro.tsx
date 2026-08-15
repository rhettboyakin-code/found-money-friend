import { useEffect, useRef, useState } from "react";

const reel = [
  "$7,200 MORE.",
  "$9,850 MORE.",
  "$11,350 MORE.",
  "$14,600 MORE.",
  "$16,900 MORE.",
  "$18,420 MORE.",
];

const TARGET = reel.length - 1;
const ROW = 108;
const DURATION = 2600;

export function Intro({ onEnter }: { onEnter: () => void }) {
  const [pos, setPos] = useState(0);
  const [showNext, setShowNext] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    const start = performance.now();
    // easeOutQuint: fast start, long deceleration into the final slot
    const ease = (t: number) => 1 - Math.pow(1 - t, 5);

    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      setPos(ease(t) * TARGET);
      if (t < 1) {
        raf.current = requestAnimationFrame(tick);
      }
    };
    raf.current = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setShowNext(true), DURATION + 700);
    const t2 = setTimeout(() => setShowCta(true), DURATION + 1100);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      clearTimeout(t1);
      clearTimeout(t2);
    };
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
          style={{ transform: `translateY(${ROW - pos * ROW}px)`, willChange: "transform" }}
        >
          {reel.map((value, i) => {
            const d = Math.min(Math.abs(i - pos), 2.4);
            const opacity = Math.max(0.08, 1 - d * 0.62);
            const scale = 1 - d * 0.42;
            return (
              <div
                key={value}
                className="flex items-center justify-center font-display text-money"
                style={{
                  height: ROW,
                  fontSize: "clamp(2.6rem,9vw,5.6rem)",
                  opacity,
                  transform: `scale(${Math.max(scale, 0.35)})`,
                  filter: d < 0.08 ? "none" : `blur(${Math.min(d * 1.6, 3)}px)`,
                  willChange: "transform, opacity",
                }}
              >
                {value}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <p
          className="text-xl uppercase tracking-[0.16em] text-muted-foreground transition-all duration-700 sm:text-2xl"
          style={{
            opacity: showNext ? 1 : 0,
            transform: showNext ? "none" : "translateY(14px)",
          }}
        >
          What should we make next?
        </p>
        <button
          onClick={onEnter}
          aria-hidden={!showCta}
          className="mt-10 rounded-full bg-primary px-10 py-4 text-lg font-medium uppercase tracking-[0.12em] text-primary-foreground transition-all duration-700 hover:scale-[1.03]"
          style={{
            opacity: showCta ? 1 : 0,
            transform: showCta ? "none" : "translateY(14px)",
            pointerEvents: showCta ? "auto" : "none",
          }}
        >
          Show me →
        </button>
      </div>
    </section>
  );
}
