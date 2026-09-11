# Revenue Bloom · Beehive & Branch

There's money hiding in your business. Go get it.

Revenue Bloom finds the next opportunity. You make it more.

This is not a dashboard. It is a loop: FIND, RECOMMEND, ACT, LEARN, FIND AGAIN.

**Beehive & Branch LLC** · rhett@beehivebranch.com

Local Next.js App Router, TypeScript, Tailwind. Seeded JSON. Zero API keys.

## How to run

```bash
npm install
npm run seed    # or: npm run reset
npm run dev     # http://localhost:3000
npm run build   # production build
```

Seed and reset scripts copy the Northgate JSON into the live store. `postinstall` seeds automatically.

## Pitch demo click-path

1. Landing. Cream, Georgia headline, GO GET IT. Beehive & Branch in the footer.
2. Click **Enter demo as Northgate HVAC** (or GO GET IT). No OAuth. Header shows Northgate HVAC prominently.
3. FIND reads the local book: stale estimates, overdue tune-ups, incomplete quotes.
4. SHOW ME opens the ranked feed. About $17,670 sitting in round 1 (range $7k to $25k). Round 2 can surface Lakeshore Inn for $21,570 found.
5. Open the top card, usually Elena Rivera, $6,850 stale heat-pump estimate.
6. Owner preference **NO DISCOUNTS**. The 10 percent off action is blocked.
7. ACT: send a price-hold follow-up or offer a morning slot.
8. LEARN: Closed at full price recovers $6,850. They asked for a discount, we held, confirms the preference with $0 this turn.
9. Loop page shows the new rule. FIND AGAIN re-ranks remaining work. Lakeshore Inn $3,900 can appear. Recs still honor NO DISCOUNTS and may add MORNING CALLS or FIRM FOLLOW-UPS.
10. **/outcomes** shows recovered dollars.

Reset demo from the header, or run `npm run reset`.

## Screens and routes

- `/` landing, Revenue Bloom pitch, Northgate demo entry, disabled Jobber and ServiceTitan
- `/find` FIND and FIND AGAIN sequence
- `/opportunities` ranked opportunity feed (RECOMMEND)
- `/opportunities/[id]` detail plus ACT, blocked discount
- `/learn/[id]` LEARN, outcome that changes later recs
- `/loop` visible loop state, preferences, event log
- `/outcomes` recovered dollars

## Northgate HVAC seed

Arvada, Colorado. Dale's rule on the whiteboard: NO DISCOUNTS.

- Rivera 4-ton heat pump, stale estimate, $6,850
- Brookside Cafe cooler plus RTU, incomplete quote, $4,280
- 8 commercial fall PMs, overdue tune-up, $2,640
- Patel attic furnace, stale estimate, $3,480
- Harper duplex, overdue tune-up, $420
- Lakeshore Inn RTUs (round 2), incomplete quote, $3,900

Jobber and ServiceTitan are visible stubs only. The demo reads `data/db.json`.

## Stack

Next.js 14 App Router, React 18, TypeScript. Tailwind tokens: cream F4EFE6, ink 1A1612, taupe 776C62, amber/orange C45C26, green 2D853C, sage BED2BC, line E0D8CC. Headlines Georgia. UI system-ui / Arial. Engine `lib/engine.ts`. Store `lib/store.ts`.
