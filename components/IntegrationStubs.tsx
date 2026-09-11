export function IntegrationStubs({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "" : "mt-10"}>
      {!compact ? (
        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-taupe">
          Books we can read
        </p>
      ) : null}
      <div className="grid gap-3 sm:grid-cols-2">
        <Stub
          name="Jobber"
          note="Connect after the loop. Disabled in this Northgate demo."
        />
        <Stub
          name="ServiceTitan"
          note="Connect after the loop. Disabled in this Northgate demo."
        />
      </div>
    </section>
  );
}

function Stub({ name, note }: { name: string; note: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-cream px-5 py-4 opacity-70">
      <div className="flex items-center justify-between gap-3">
        <p className="font-headline text-lg text-ink">{name}</p>
        <button
          type="button"
          disabled
          className="rounded-full border border-line px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-taupe"
        >
          Connect
        </button>
      </div>
      <p className="mt-1 text-sm text-taupe">{note}</p>
    </div>
  );
}
