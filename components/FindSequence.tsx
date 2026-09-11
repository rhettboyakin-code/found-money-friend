"use client";

import { useEffect, useState } from "react";
import { completeFindAction } from "@/app/actions";

const lines = [
  "Reading Northgate’s local book…",
  "Estimates sitting quiet.",
  "Quotes missing a line.",
  "Tune-ups past the window.",
  "Honoring NO DISCOUNTS.",
];

export function FindSequence({
  again,
  foundCount,
  foundMoney,
}: {
  again: boolean;
  foundCount: number;
  foundMoney: string;
}) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((n) => Math.min(n + 1, lines.length));
    }, 700);
    return () => clearInterval(t);
  }, []);

  const done = i >= lines.length;

  return (
    <div className="mx-auto max-w-xl px-5 py-16 text-center">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange">
        Revenue Bloom · {again ? "Find again" : "Find"}
      </p>
      <h1 className="mt-4 font-headline text-4xl text-ink sm:text-5xl">
        {done
          ? `${foundCount} places money is sitting`
          : again
          ? "Looking again."
          : "Looking."}
      </h1>
      <ul className="mx-auto mt-8 max-w-sm space-y-2 text-left text-taupe">
        {lines.slice(0, i).map((line) => (
          <li key={line} className="text-sm">
            {line}
          </li>
        ))}
      </ul>
      {done ? (
        <div className="mt-10">
          <p className="mb-6 font-headline text-2xl text-green">{foundMoney}</p>
          <form action={completeFindAction}>
            <button type="submit" className="btn-ink">
              Show me
            </button>
          </form>
        </div>
      ) : (
        <p className="mt-10 text-sm text-taupe">This is not a dashboard. It is a loop.</p>
      )}
    </div>
  );
}
