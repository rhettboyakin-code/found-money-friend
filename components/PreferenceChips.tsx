import type { Preference } from "@/lib/types";

export function PreferenceChips({ preferences }: { preferences: Preference[] }) {
  const active = preferences.filter((p) => p.active);
  if (!active.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {active.map((p) => (
        <li
          key={p.key}
          className={`chip ${
            p.key === "no_discounts" ? "border-orange text-orange" : ""
          }`}
          title={p.detail}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              p.source === "learned" ? "bg-green" : "bg-orange"
            }`}
          />
          {p.label}
        </li>
      ))}
    </ul>
  );
}
