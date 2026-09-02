import { AppHeader, TagFooter } from "@/components/AppHeader";
import { FindSequence } from "@/components/FindSequence";
import { openTotal, visibleOpportunities } from "@/lib/engine";
import { money } from "@/lib/format";
import { readState } from "@/lib/store";

export const dynamic = "force-dynamic";

export default function FindPage() {
  const state = readState();
  const open = visibleOpportunities(state).filter((o) => o.status === "open");
  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader state={state} />
      <main className="flex-1">
        <FindSequence
          again={state.round > 1}
          foundCount={open.length}
          foundMoney={money(openTotal(state))}
        />
      </main>
      <TagFooter />
    </div>
  );
}
