"use client"

import { places } from "@/data/rdr2/places"
import { awards, contributions } from "@/data/resume"

const medal = { gold: "#c9a24a", silver: "#b9b4a8", bronze: "#a8703c" } as const

function Medal({ kind }: { kind: keyof typeof medal }) {
  return (
    <svg viewBox="0 0 32 40" className="h-11 w-9 shrink-0" role="img" aria-label={`${kind} medal`}>
      <path d="M8 0h7l3 14h-7zM17 0h7l-3 14h-7z" fill="#8c1a14" />
      <circle cx="16" cy="25" r="12" fill={medal[kind]} stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
      <circle cx="16" cy="25" r="7.5" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
    </svg>
  )
}

export function OpenSourceSection() {
  const placeFor = (title: string) => places.find((p) => p.title === title)
  return (
    <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start">
      <section className="journal-paper torn px-6 pb-10 pt-8 sm:px-10" aria-labelledby="ledger-title">
        <h2 id="ledger-title" className="text-center font-kirsty text-[34px] font-bold uppercase tracking-wide text-pencil">
          Camp Ledger
        </h2>
        <p className="text-center font-slab text-[15px] italic text-pencil/80">Open-source contributions to the camp</p>

        <div className="relative mt-6">
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-[30%] hidden w-px bg-[#8c1a14]/45 sm:block" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-[24%] hidden w-px bg-[#8c1a14]/45 sm:block" />
          <div className="hidden grid-cols-[30%_1fr_24%] border-b-2 border-pencil/60 pb-1 font-sans text-[12px] font-bold uppercase tracking-[0.14em] text-pencil/75 sm:grid">
            <span>Camp</span>
            <span className="pl-3">Deed</span>
            <span className="pl-3">Hand</span>
          </div>
          <ul>
            {contributions.map((c) => {
              const place = placeFor(c.camp)
              return (
                <li key={c.camp} className="grid gap-1 border-b border-[#4a6a8a]/35 py-3 sm:grid-cols-[30%_1fr_24%] sm:gap-0">
                  <span className="pr-3">
                    <a href={c.href} target="_blank" rel="noopener noreferrer" className="font-slab text-[16px] font-bold leading-snug text-pencil underline decoration-pencil/30 underline-offset-4 hover:decoration-pencil">
                      {c.camp}
                    </a>
                    {place && <span className="mt-0.5 block font-sans text-[11px] font-semibold uppercase text-pencil/60">{place.location}</span>}
                  </span>
                  <span className="space-y-2 font-slab text-[15px] leading-relaxed text-pencil sm:pl-3">
                    {c.deeds.map((d) => (
                      <span key={d} className="block">
                        {d}
                      </span>
                    ))}
                  </span>
                  <span className="font-hand text-[22px] leading-tight text-pencil sm:pl-3">{c.role}</span>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section aria-labelledby="awards-title" className="border border-white/10 bg-black/55 px-6 py-7 backdrop-blur-xs sm:px-8">
        <h2 id="awards-title" className="font-rocks text-[34px] uppercase leading-none text-white">
          Awards
        </h2>
        <div className="my-4 h-px bg-linear-to-r from-white/45 to-transparent" />
        <ul className="divide-y divide-white/10 border-y border-white/10">
          {awards.map((a) => {
            const place = placeFor(a.title)
            return (
              <li key={a.title} className="flex items-center gap-4 py-3.5">
                <Medal kind={a.medal} />
                <div className="min-w-0 flex-1">
                  <p className="font-rocks text-[21px] uppercase leading-none text-white">
                    {a.href ? (
                      <a href={a.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-white">
                        {a.title}
                      </a>
                    ) : (
                      a.title
                    )}
                  </p>
                  <p className="mt-1 font-slab text-[15px] text-bone/80">{a.context}</p>
                </div>
                {place && <span className="shrink-0 font-sans text-[11px] font-semibold uppercase text-bone/45">{place.location}</span>}
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
