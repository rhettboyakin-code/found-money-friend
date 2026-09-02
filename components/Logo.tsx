export function StarMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <polygon points="16,2 18.4,11.2 28,12.2 20.4,18 23,27.5 16,22.2 9,27.5 11.6,18 4,12.2 13.6,11.2" fill="#EB6F25" />
      <polygon points="16,6.5 17.5,13.2 24.5,14 19.1,18.2 21,25 16,21.2 11,25 12.9,18.2 7.5,14 14.5,13.2" fill="#2D853C" />
    </svg>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <a href="/" className="inline-flex items-center gap-2.5 text-ink no-underline">
      <StarMark className={compact ? "h-6 w-6" : "h-7 w-7"} />
      <span
        className={`font-ui font-semibold uppercase tracking-[0.22em] ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        MadeThis
      </span>
    </a>
  );
}
