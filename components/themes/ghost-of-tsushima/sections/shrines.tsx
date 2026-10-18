"use client"

import { ArrowUpRight } from "lucide-react"

import { contributions } from "@/data/resume"
import { useReveal } from "../reveal"
import { Seal } from "../ui"

function Torii({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 64 56" className="h-12 w-14 overflow-visible sm:h-14 sm:w-16" aria-hidden="true">
      <g className={lit ? "got-draw-all" : "opacity-0"} fill="none" stroke="#c8102e" strokeLinecap="round" strokeLinejoin="round">
        <path pathLength="1" d="M3 9C20 13 44 13 61 9" strokeWidth="4" />
        <path pathLength="1" d="M8 16H56" strokeWidth="3" />
        <path pathLength="1" d="M17 13V54M47 13V54" strokeWidth="3.4" />
        <path pathLength="1" d="M32 12V16" strokeWidth="2.4" />
        <path pathLength="1" d="M11 54H23M41 54H53" strokeWidth="2" />
      </g>
    </svg>
  )
}

function Shrine({ c, i }: { c: (typeof contributions)[number]; i: number }) {
  const [ref, lit] = useReveal<HTMLLIElement>("0px 0px -18% 0px")
  const left = i % 2 === 0
  return (
    <li ref={ref} className={`relative grid grid-cols-[56px_1fr] items-start gap-4 sm:gap-6 md:grid-cols-[1fr_72px_1fr] ${lit ? "got-rise" : "opacity-0"}`}>
      <div className="flex justify-center md:col-start-2 md:row-start-1">
        <span className="relative z-10 flex flex-col items-center gap-2 py-1">
          <Torii lit={lit} />
          {lit && <Seal char="済" className="got-stamp h-7 w-7 text-sm" />}
        </span>
      </div>
      <a
        href={c.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`got-panel group block p-5 transition-colors hover:border-[#c8102e]/70 sm:p-7 md:row-start-1 ${left ? "md:col-start-1 md:text-right" : "md:col-start-3"}`}
      >
        <div className={`flex items-center gap-3 ${left ? "md:flex-row-reverse" : ""}`}>
          <p className="text-[10.5px] font-bold uppercase tracking-[0.36em] text-[#ece6da]/55">
            Shrine {i + 1} · {c.role}
          </p>
          <ArrowUpRight className="h-4 w-4 text-[#ece6da]/40 transition-colors group-hover:text-[#f4eee4]" />
        </div>
        <h3 className="mt-2 text-xl font-extrabold uppercase leading-tight tracking-[0.12em] sm:text-2xl">{c.camp}</h3>
        <ul className="mt-4 space-y-2.5">
          {c.deeds.map((d) => (
            <li key={d} className={`flex gap-3 text-[14.5px] leading-relaxed text-[#ece6da]/80 ${left ? "md:flex-row-reverse" : ""}`}>
              <span className="mt-[0.7em] h-1 w-3 shrink-0 bg-[#c8102e]" />
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </a>
    </li>
  )
}

export function Shrines() {
  const [ref, drawn] = useReveal<HTMLDivElement>("0px")
  return (
    <div ref={ref} className="relative">
      <div className="got-rise mb-12 flex flex-col items-center text-center">
        <Seal char="頂" className="got-stamp h-14 w-14 text-3xl" />
        <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/60">The summit</p>
        <p className="mt-1 font-brush text-2xl text-[#f4eee4]">
          {contributions.length} of {contributions.length} shrines honoured
        </p>
      </div>
      <svg
        className={`pointer-events-none absolute bottom-0 left-[28px] top-28 w-6 -translate-x-1/2 overflow-visible md:left-1/2 ${drawn ? "got-climb" : "opacity-0"}`}
        preserveAspectRatio="none"
        viewBox="0 0 24 100"
        aria-hidden="true"
      >
        <path d="M12 0C2 10 22 20 12 30C2 40 22 50 12 60C2 70 22 80 12 100" vectorEffect="non-scaling-stroke" fill="none" stroke="rgba(236,230,218,0.35)" strokeWidth="1.5" strokeDasharray="0.35 0.7" />
      </svg>
      <ol className="relative space-y-12 sm:space-y-16">
        {contributions.map((c, i) => (
          <Shrine key={c.camp} c={c} i={i} />
        ))}
      </ol>
    </div>
  )
}
