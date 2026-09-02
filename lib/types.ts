export type LoopPhase =
  | "FIND"
  | "RECOMMEND"
  | "ACT"
  | "LEARN"
  | "FIND_AGAIN";

export type OpportunityType =
  | "stale_estimate"
  | "overdue_tuneup"
  | "incomplete_quote";

export type OpportunityStatus = "open" | "acted" | "learned";

export type PreferenceSource = "owner" | "learned";

export type Preference = {
  key: string;
  label: string;
  detail: string;
  active: boolean;
  source: PreferenceSource;
  note: string;
};

export type Outcome = {
  choiceId: string;
  label: string;
  recovered: number;
  note: string;
  at: string;
};

export type Opportunity = {
  id: string;
  type: OpportunityType;
  title: string;
  customer: string;
  site: string;
  value: number;
  ageDays: number;
  ageLabel: string;
  story: string;
  whyNow: string;
  missing: string | null;
  status: OpportunityStatus;
  unlockRound: number;
  actedActionId: string | null;
  actedAt: string | null;
  outcome: Outcome | null;
};

export type DemoCompany = {
  id: string;
  companyName: string;
  city: string;
  trade: string;
  owner: string;
  bookLabel: string;
};

export type LoopEvent = {
  at: string;
  phase: LoopPhase;
  message: string;
  opportunityId?: string;
};

export type AppState = {
  demo: DemoCompany;
  entered: boolean;
  phase: LoopPhase;
  round: number;
  currentOpportunityId: string | null;
  recoveredTotal: number;
  preferences: Preference[];
  opportunities: Opportunity[];
  events: LoopEvent[];
};

export type ActionDef = {
  id: string;
  label: string;
  detail: string;
  blocked?: boolean;
  blockReason?: string;
};

export type LearnChoice = {
  id: string;
  label: string;
  hint: string;
  recoveredMode: "full" | "none";
  learnKey?: string;
};

export type Recommendation = {
  headline: string;
  body: string;
  why: string;
};
