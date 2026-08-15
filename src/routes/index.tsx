import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Intro } from "@/components/flow/Intro";
import { Home } from "@/components/flow/Home";
import { Opportunity } from "@/components/flow/Opportunity";
import { Execution } from "@/components/flow/Execution";
import { Results } from "@/components/flow/Results";
import type { Step } from "@/components/flow/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MadeThis — Find the money your business is leaving behind" },
      {
        name: "description",
        content:
          "MadeThis finds revenue hiding inside your business, recommends the next best action, and learns from every outcome.",
      },
      {
        property: "og:title",
        content: "MadeThis — Find the money your business is leaving behind",
      },
      {
        property: "og:description",
        content:
          "$18,420 of recoverable revenue found inside Northgate Home Co. See how MadeThis captures it.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [step, setStep] = useState<Step>("intro");
  const [premiumPreference, setPremiumPreference] = useState(false);
  const [remembered, setRemembered] = useState(false);

  if (step === "intro") {
    return (
      <main className="min-h-screen">
        <Intro onEnter={() => setStep("home")} />
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-7">
        <button
          onClick={() => setStep("home")}
          className="font-display text-lg tracking-tight text-foreground"
        >
          MadeThis<span className="text-ember">.</span>
        </button>
        <p className="text-sm text-muted-foreground">Northgate Home Co.</p>
      </header>

      {step === "home" && <Home onStart={() => setStep("opportunity")} />}
      {step === "opportunity" && (
        <Opportunity
          premiumPreference={premiumPreference}
          remembered={remembered}
          onPreference={(remember) => {
            setPremiumPreference(true);
            if (remember) setRemembered(true);
          }}
          onBack={() => setStep("home")}
          onGo={() => setStep("execution")}
        />
      )}
      {step === "execution" && <Execution onDone={() => setStep("results")} />}
      {step === "results" && (
        <Results
          remembered={remembered}
          onRestart={() => {
            setStep("home");
          }}
        />
      )}
    </main>
  );
}
