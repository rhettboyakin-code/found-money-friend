export function money(n: number): string {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function typeLabel(type: string): string {
  switch (type) {
    case "stale_estimate":
      return "Stale estimate";
    case "overdue_tuneup":
      return "Overdue tune-up";
    case "incomplete_quote":
      return "Incomplete quote";
    default:
      return type;
  }
}

export function nowIso(): string {
  return new Date().toISOString();
}

export function phaseIndex(phase: string): number {
  const order = ["FIND", "RECOMMEND", "ACT", "LEARN", "FIND_AGAIN"];
  const i = order.indexOf(phase);
  return i < 0 ? 0 : i;
}
