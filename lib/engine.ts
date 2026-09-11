import type {
  ActionDef,
  AppState,
  LearnChoice,
  LoopEvent,
  LoopPhase,
  Opportunity,
  Preference,
  Recommendation,
} from "./types";
import { nowIso } from "./format";

const PHASES: LoopPhase[] = [
  "FIND",
  "RECOMMEND",
  "ACT",
  "LEARN",
  "FIND_AGAIN",
];

export const LEARN_CHOICES: LearnChoice[] = [
  {
    id: "closed_full",
    label: "Closed at full price",
    hint: "They said yes. No one cut the number.",
    recoveredMode: "full",
    learnKey: "no_discounts",
  },
  {
    id: "scheduled",
    label: "Booked — money is coming",
    hint: "On the calendar at the quoted number.",
    recoveredMode: "full",
    learnKey: "firm_followups",
  },
  {
    id: "asked_discount",
    label: "They asked for a discount. We held.",
    hint: "Preference confirmed. Still sitting — follow up firm.",
    recoveredMode: "none",
    learnKey: "no_discounts",
  },
  {
    id: "no_answer",
    label: "No answer — still sitting",
    hint: "Learn the window. Try before 9am next.",
    recoveredMode: "none",
    learnKey: "morning_calls",
  },
];

function hasPref(prefs: Preference[], key: string): boolean {
  return prefs.some((p) => p.key === key && p.active);
}

function pushEvent(
  state: AppState,
  phase: LoopPhase,
  message: string,
  opportunityId?: string
): LoopEvent[] {
  const event: LoopEvent = {
    at: nowIso(),
    phase,
    message,
    opportunityId,
  };
  return [...state.events, event].slice(-40);
}

export function visibleOpportunities(state: AppState): Opportunity[] {
  return state.opportunities.filter((o) => o.unlockRound <= state.round);
}

export function rankOpportunities(state: AppState): Opportunity[] {
  const morning = hasPref(state.preferences, "morning_calls");
  const firm = hasPref(state.preferences, "firm_followups");

  return visibleOpportunities(state)
    .map((o) => {
      let score = o.value * (1 + o.ageDays / 30);
      if (o.type === "stale_estimate") score *= 1.2;
      if (o.type === "incomplete_quote") score *= 1.1;
      if (o.status !== "open") score *= 0.15;
      if (firm && o.type === "stale_estimate" && o.status === "open") score *= 1.25;
      if (morning && o.type === "overdue_tuneup" && o.status === "open") score *= 1.2;
      if (o.unlockRound > 1 && o.status === "open") score *= 1.15;
      return { o, score };
    })
    .sort((a, b) => {
      if (a.o.status === "open" && b.o.status !== "open") return -1;
      if (a.o.status !== "open" && b.o.status === "open") return 1;
      return b.score - a.score;
    })
    .map((x) => x.o);
}

export function openTotal(state: AppState): number {
  return visibleOpportunities(state)
    .filter((o) => o.status === "open")
    .reduce((sum, o) => sum + o.value, 0);
}

export function recommendationFor(
  opp: Opportunity,
  prefs: Preference[]
): Recommendation {
  const noDisc = hasPref(prefs, "no_discounts");
  const morning = hasPref(prefs, "morning_calls");
  const firm = hasPref(prefs, "firm_followups");
  const when = morning ? "before 9am" : "today";
  const hold = noDisc
    ? "Hold the price. Do not discount."
    : "Keep the number clean.";

  if (opp.type === "stale_estimate") {
    return {
      headline: firm
        ? `Call ${opp.customer.split(" ")[0]} ${when} and hold the number`
        : `Send a price-hold follow-up ${when}`,
      body: noDisc
        ? `${hold} Remind them the ${formatInline(opp.value)} is still good, and offer a specific install slot — not a cheaper quote. ${
            morning
              ? "Morning windows are converting for this shop."
              : "Sell the calendar, not a cut."
          }`
        : `Follow up on the quiet estimate and get a yes or a date.`,
      why: opp.whyNow,
    };
  }

  if (opp.type === "incomplete_quote") {
    return {
      headline: `Finish the missing line and send a firm quote`,
      body: `${
        opp.missing ? `Add: ${opp.missing}. ` : ""
      }${hold} An incomplete number is a no. A complete number, sent ${when}, is the work.`,
      why: opp.whyNow,
    };
  }

  return {
    headline: morning
      ? `Book the PM window before 9am`
      : `Book the overdue tune-up window`,
    body: `${hold} Offer a route day, not a coupon. Last year’s findings plus a specific morning slot closes this without touching price.`,
    why: opp.whyNow,
  };
}

function formatInline(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function actionsFor(opp: Opportunity, prefs: Preference[]): ActionDef[] {
  const noDisc = hasPref(prefs, "no_discounts");
  const morning = hasPref(prefs, "morning_calls");
  const firm = hasPref(prefs, "firm_followups");
  const when = morning ? "before 9am" : "today";

  const blocked: ActionDef = {
    id: "discount",
    label: "Offer 10% off to revive it",
    detail: "Cut the number so they say yes.",
    blocked: true,
    blockReason: noDisc
      ? "Blocked by NO DISCOUNTS"
      : "Revenue Bloom will not lead with a cut",
  };

  if (opp.type === "stale_estimate") {
    return [
      {
        id: "price_hold",
        label: firm ? `Call ${when} · hold the price` : `Send price-hold follow-up`,
        detail: `Keep ${formatInline(opp.value)} firm. Offer a dated install slot.`,
      },
      {
        id: "schedule_visit",
        label: "Offer a morning walkthrough",
        detail: "Not a new quote. A time on the calendar.",
      },
      blocked,
    ];
  }

  if (opp.type === "incomplete_quote") {
    return [
      {
        id: "complete_send",
        label: "Complete the missing line and send",
        detail: opp.missing
          ? `Add “${opp.missing}” and send a firm number.`
          : "Finish the quote and send it.",
      },
      {
        id: "call_scope",
        label: `Call ${when} to confirm scope`,
        detail: "Then send the complete number. Do not reopen price.",
      },
      blocked,
    ];
  }

  return [
    {
      id: "book_pm",
      label: morning ? "Book a morning PM route day" : "Book the PM window",
      detail: "One call. A dated slot. Same price as last year.",
    },
    {
      id: "send_findings",
      label: "Send last year’s findings + a date",
      detail: "Remind them what sitting cost last time.",
    },
    blocked,
  ];
}

export function enterDemo(state: AppState): AppState {
  return {
    ...state,
    entered: true,
    phase: "FIND",
    round: Math.max(1, state.round),
    currentOpportunityId: null,
    events: pushEvent(state, "FIND", "Entered Northgate HVAC. Revenue Bloom is looking."),
  };
}

export function completeFind(state: AppState): AppState {
  const found = visibleOpportunities(state).filter((o) => o.status === "open").length;
  const nextPhase: LoopPhase = "RECOMMEND";
  return {
    ...state,
    phase: nextPhase,
    events: pushEvent(
      state,
      nextPhase,
      `Found ${found} open opportunities · ${formatInline(openTotal(state))} sitting in the book.`
    ),
  };
}

export function startAct(state: AppState, opportunityId: string): AppState {
  return {
    ...state,
    phase: "ACT",
    currentOpportunityId: opportunityId,
    events: pushEvent(state, "ACT", "Opened an opportunity to act.", opportunityId),
  };
}

export function applyAct(
  state: AppState,
  opportunityId: string,
  actionId: string
): AppState {
  const opp = state.opportunities.find((o) => o.id === opportunityId);
  if (!opp) return state;
  if (actionId === "discount") return state;

  const action = actionsFor(opp, state.preferences).find((a) => a.id === actionId);
  if (!action || action.blocked) return state;

  return {
    ...state,
    phase: "LEARN",
    currentOpportunityId: opportunityId,
    opportunities: state.opportunities.map((o) =>
      o.id === opportunityId
        ? {
            ...o,
            status: "acted" as const,
            actedActionId: actionId,
            actedAt: nowIso(),
          }
        : o
    ),
    events: pushEvent(
      state,
      "LEARN",
      `Acted: ${action.label}`,
      opportunityId
    ),
  };
}

function upsertPref(
  prefs: Preference[],
  key: string,
  patch: Omit<Preference, "key">
): Preference[] {
  const existing = prefs.find((p) => p.key === key);
  if (existing) {
    return prefs.map((p) =>
      p.key === key
        ? {
            ...p,
            ...patch,
            active: true,
            note: patch.note || p.note,
          }
        : p
    );
  }
  return [...prefs, { key, ...patch, active: true }];
}

export function applyLearn(
  state: AppState,
  opportunityId: string,
  choiceId: string
): AppState {
  const opp = state.opportunities.find((o) => o.id === opportunityId);
  const choice = LEARN_CHOICES.find((c) => c.id === choiceId);
  if (!opp || !choice) return state;

  const recovered = choice.recoveredMode === "full" ? opp.value : 0;
  let prefs = [...state.preferences];

  if (choice.learnKey === "no_discounts") {
    prefs = upsertPref(prefs, "no_discounts", {
      label: "NO DISCOUNTS",
      detail:
        choiceId === "asked_discount"
          ? "They asked for a cut. Northgate held. Later recommendations stay firm."
          : "Full-price close. Later recommendations will not offer a cut.",
      active: true,
      source: choiceId === "asked_discount" ? "learned" : prefs.find((p) => p.key === "no_discounts")?.source || "owner",
      note:
        choiceId === "asked_discount"
          ? "Confirmed this round: they asked, we held."
          : "Confirmed this round: closed at the quoted number.",
    });
  }

  if (choice.learnKey === "morning_calls") {
    prefs = upsertPref(prefs, "morning_calls", {
      label: "MORNING CALLS",
      detail: "No answer today. Next recommendations lead with a before-9am window.",
      active: true,
      source: "learned",
      note: "Learned this round from a no-answer.",
    });
  }

  if (choice.learnKey === "firm_followups") {
    prefs = upsertPref(prefs, "firm_followups", {
      label: "FIRM FOLLOW-UPS",
      detail: "A dated slot at full price converts. Rank those moves higher.",
      active: true,
      source: "learned",
      note: "Learned this round from a booked job.",
    });
  }

  const nextRound = state.round + 1;
  const unlocked = state.opportunities.filter(
    (o) => o.unlockRound === nextRound && o.unlockRound > state.round
  );

  const learned: AppState = {
    ...state,
    phase: "FIND_AGAIN",
    round: nextRound,
    recoveredTotal: state.recoveredTotal + recovered,
    currentOpportunityId: opportunityId,
    preferences: prefs,
    opportunities: state.opportunities.map((o) =>
      o.id === opportunityId
        ? {
            ...o,
            status: "learned" as const,
            outcome: {
              choiceId: choice.id,
              label: choice.label,
              recovered,
              note: choice.hint,
              at: nowIso(),
            },
          }
        : o
    ),
    events: pushEvent(
      state,
      "FIND_AGAIN",
      recovered
        ? `Learned. Recovered ${formatInline(recovered)}. Finding again.`
        : `Learned. Nothing recovered this turn. Finding again with a sharper rule.`,
      opportunityId
    ),
  };

  if (unlocked.length) {
    learned.events = pushEvent(
      learned,
      "FIND_AGAIN",
      `New money surfaced: ${unlocked.map((u) => u.customer).join(", ")}.`
    );
  }

  return learned;
}

export function beginFindAgain(state: AppState): AppState {
  return {
    ...state,
    phase: "FIND",
    currentOpportunityId: null,
    events: pushEvent(state, "FIND", `Round ${state.round}. Revenue Bloom is looking again.`),
  };
}

export { PHASES };
