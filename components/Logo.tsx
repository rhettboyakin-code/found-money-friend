export function BeehiveMark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/beehive-mark.png"
      alt=""
      aria-hidden="true"
      className={className}
      width={28}
      height={28}
    />
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
