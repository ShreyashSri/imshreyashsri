"use client"

import { useState } from "react"
import { Check } from "lucide-react"

import { chapters } from "@/data/resume"
import { logos, TechLogo } from "@/components/shared/tech-logo"
import { numerals, Rule, Seal } from "../ui"

const tales = [...chapters].reverse()

export function Tales() {
  const [index, setIndex] = useState(0)
  const tale = tales[index]
  const ongoing = tale.period.includes("present")

  return (
    <div className="grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-12">
      <ol className="got-rise space-y-1">
        {tales.map((t, i) => (
          <li key={t.company}>
            <button
              type="button"
              data-on={i === index}
              onClick={() => {
                setIndex(i)
              }}
              className="got-item py-3!"
            >
              <span className="w-7 font-brush text-2xl text-[#c8102e]">{numerals[i]}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-lg font-extrabold uppercase tracking-[0.16em]">{t.company}</span>
                <span className="block text-[11px] font-bold uppercase tracking-[0.24em] opacity-60">{t.period.includes("present") ? "In progress" : "Complete"}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <article key={tale.company} className="got-panel got-rise relative overflow-hidden p-6 sm:p-10" aria-live="polite">
        <span aria-hidden="true" className="got-write-v pointer-events-none absolute -bottom-10 right-4 font-brush text-[14rem] leading-none text-[#ece6da]/[0.05] sm:text-[18rem]">
          {numerals[index]}
        </span>
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c8102e]">{ongoing ? "Tale in progress" : "Tale complete"}</p>
        <h3 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-[0.12em]">{tale.company}</h3>
        <p className="mt-3 text-sm uppercase tracking-[0.24em] text-[#ece6da]/70">
          {tale.role} · {tale.place} · {tale.period}
        </p>
        <Rule className="my-7 max-w-sm" />
        <blockquote className="max-w-2xl text-[19px] leading-[1.75] text-[#f4eee4]">{tale.gold}</blockquote>
        <h4 className="mb-4 mt-9 text-[11px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/55">Objectives</h4>
        <ul className="space-y-4">
          {tale.objectives.map((o) => (
            <li key={o} className="flex gap-4 text-[15.5px] leading-relaxed text-[#ece6da]/85">
              <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center border border-[#ece6da]/40">
                {!ongoing && <Check className="h-3.5 w-3.5 text-[#c8102e]" strokeWidth={3} />}
              </span>
              {o}
            </li>
          ))}
        </ul>
        <div className="mt-9 flex flex-wrap gap-5">
          {tale.stack.map((s) => (
            <span key={s} className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ece6da]/75">
              {logos[s] && <TechLogo name={s} className="h-5 w-5" />}
              {s}
            </span>
          ))}
        </div>
        {!ongoing && <Seal char="済" className="got-stamp absolute right-6 top-6 h-14 w-14 text-3xl sm:right-10 sm:top-10" />}
      </article>
    </div>
  )
}
