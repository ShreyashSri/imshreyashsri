"use client"

import { useState } from "react"

import { chapters, education, tally } from "@/data/resume"
import { Minimap } from "../minimap"
import { Chip, Heading } from "../ui"

export function CareerTab() {
  const matches = [...chapters].reverse()
  const [open, setOpen] = useState(matches[0].company)

  return (
    <div className="val-in">
      <Heading kicker="Career" title="Match history" />

      <section aria-label="Overview" className="mb-8 grid grid-cols-2 gap-px border border-white/10 bg-white/10 sm:grid-cols-4">
        {tally.map((t) => (
          <div key={t.label} className="bg-[#0f1923]/90 px-4 py-4">
            <p className="font-anton text-3xl leading-none">{t.value}</p>
            <p className="mt-2 font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.25em] text-white/55">{t.label}</p>
          </div>
        ))}
      </section>

      <div className="mb-2 hidden grid-cols-[6px_120px_1fr_auto_auto] gap-4 px-0 pr-4 font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.3em] text-white/45 sm:grid">
        <span />
        <span className="pl-2">Map</span>
        <span>Team · Role</span>
        <span className="hidden w-[270px] text-right md:block">Season</span>
        <span className="w-[88px] text-right">Result</span>
      </div>
      <ol className="space-y-2">
        {matches.map((job, i) => {
          const current = job.period.includes("present")
          const expanded = open === job.company
          return (
            <li key={job.company} className="val-panel overflow-hidden">
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => {
                  setOpen(expanded ? "" : job.company)
                }}
                className="grid w-full grid-cols-[6px_72px_1fr] items-center gap-4 pr-4 text-left transition-colors hover:bg-white/5 sm:grid-cols-[6px_120px_1fr_auto_auto]"
              >
                <span className="h-full min-h-[76px]" style={{ background: current ? "#f0c35a" : "#2fd3b2" }} />
                <span className="relative h-full min-h-[76px] overflow-hidden border-r border-white/10">
                  <Minimap index={i} live={current} />
                </span>
                <span className="py-3">
                  <span className="block font-anton text-2xl uppercase leading-none sm:text-3xl">{job.company}</span>
                  <span className="mt-1 block font-barlow-condensed text-xs uppercase tracking-[0.22em] text-white/60">
                    {job.role} · {job.place}
                  </span>
                </span>
                <span className="hidden w-[270px] text-right font-barlow-condensed text-sm uppercase tracking-[0.18em] text-white/60 md:block">{job.period}</span>
                <span
                  className="hidden w-[88px] text-right font-anton text-2xl uppercase tracking-wide sm:block"
                  style={{ color: current ? "#f0c35a" : "#2fd3b2" }}
                >
                  {current ? "Live" : "Victory"}
                </span>
              </button>
              {expanded && (
                <div className="val-in grid gap-6 border-t border-white/10 px-5 py-5 sm:pl-[150px] lg:grid-cols-[1fr_auto]">
                  <div>
                    <p className="font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f0c35a]">MVP play</p>
                    <p className="mt-1 font-barlow text-base leading-relaxed text-white">{job.gold}</p>
                    <ul className="mt-4 space-y-2">
                      {job.objectives.map((o) => (
                        <li key={o} className="flex gap-3 font-barlow text-sm leading-relaxed text-white/75">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#ff4655]" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap content-start gap-2 lg:max-w-[220px]">
                    {job.stack.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                  <p className="font-barlow-condensed text-xs uppercase tracking-[0.2em] text-white/50 md:hidden">{job.period}</p>
                </div>
              )}
            </li>
          )
        })}
      </ol>

      <h3 className="mb-3 mt-10 font-barlow-condensed text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Academy</h3>
      <ul className="grid gap-2 md:grid-cols-2">
        {education.map((e) => (
          <li key={e.school} className="val-panel flex items-center gap-4 px-5 py-4">
            <span className="h-10 w-1 bg-[#5a9fe2]" />
            <div>
              <p className="font-anton text-xl uppercase leading-tight">{e.school}</p>
              <p className="mt-1 font-barlow text-sm text-white/65">
                {e.detail} · {e.period}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
