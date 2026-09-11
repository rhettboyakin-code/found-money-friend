export function BeehiveMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <ellipse cx="16" cy="22" rx="10" ry="6" fill="#C45C26" opacity="0.9" />
      <ellipse cx="16" cy="17" rx="8.5" ry="5" fill="#1A1612" />
      <ellipse cx="16" cy="12.5" rx="7" ry="4.2" fill="#C45C26" />
      <ellipse cx="16" cy="8.5" rx="5" ry="3.2" fill="#1A1612" />
      <circle cx="16" cy="5.5" r="2.2" fill="#C45C26" />
    </svg>
  );
}

/** Product mark — Revenue Bloom. Company (Beehive & Branch) lives in the footer. */
export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/" className="inline-flex items-center gap-2.5 text-ink no-underline">
      <BeehiveMark className={compact ? "h-6 w-6" : "h-7 w-7"} />
      <span
        className={`font-ui font-semibold tracking-[0.04em] ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        Revenue Bloom
      </span>
    </a>
  );
}
