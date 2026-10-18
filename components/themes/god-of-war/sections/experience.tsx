"use client"

import { useState } from "react"

import { chapters } from "@/data/resume"
import { Runes } from "../runes"
import { Chip, Diamond, Frame, Heading, Label } from "../ui"
import type { PageProps } from "."

const glyphs: Record<string, string[]> = {
  "Ignito Co.": [
    "M14 18h40v30H14z M14 28h40 M14 38h40 M27 18v30 M40 18v30",
    "M62 33h14 m-5 -5l5 5l-5 5",
    "M98 33m-14 0a14 14 0 1 0 28 0a14 14 0 1 0 -28 0 M98 15v6 M98 45v6 M80 33h6 M110 33h6 M86 21l4 4 M106 41l4 4 M86 45l4 -4 M106 25l4 -4",
  ],
  Seeqlo: [
    "M42 33m-20 0a20 20 0 1 0 40 0a20 20 0 1 0 -40 0 M42 33m-13 0a13 13 0 1 0 26 0a13 13 0 1 0 -26 0 M42 25v16 M37 29h8 M37 37h8",
    "M70 26h20 m-5 -5l5 5l-5 5 M90 40h-20 m5 -5l-5 5l5 5",
    "M100 18h20v30h-20z M104 26h12 M104 33h12 M104 40h8",
  ],
  PRED: [
    "M18 50V16 M18 50h96",
    "M30 26v16 M27 30h6v8h-6z M48 20v18 M45 24h6v10h-6z M66 30v14 M63 33h6v7h-6z M84 16v16 M81 20h6v8h-6z M102 22v20 M99 26h6v10h-6z",
    "M26 44 L48 32 L66 38 L84 22 L108 28",
  ],
}

const fallback = ["M64 33m-18 0a18 18 0 1 0 36 0a18 18 0 1 0 -36 0", "M64 15v8 M64 43v8 M46 33h8 M74 33h8"]

function Etching({ company }: { company: string }) {
  const paths = glyphs[company] ?? fallback
  return (
    <svg viewBox="0 0 128 66" className="gow-etch h-20 w-full max-w-[220px]" aria-hidden="true">
      {paths.map((d) => (
        <g key={d} fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={d} transform="translate(0.8 0.8)" stroke="rgba(255,240,210,0.14)" strokeWidth="2.6" />
          <path d={d} stroke="currentColor" strokeWidth="2.2" />
        </g>
      ))}
    </svg>
  )
}

export function Experience({ realm }: PageProps) {
  const [index, setIndex] = useState(chapters.length - 1)
  const job = chapters[index]

  const light = (e: React.PointerEvent<HTMLElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty("--lx", `${e.clientX - box.left}px`)
    e.currentTarget.style.setProperty("--ly", `${e.clientY - box.top}px`)
  }

  return (
    <div>
      <Heading rune={realm.rune} realm={realm.realm} codex={realm.codex} title="Experience" />
      <p className="-mt-3 mb-7 max-w-2xl font-garamond text-lg italic text-[#e8dfc8]/70">
        The giants carved their story into shrines. These three tell mine, oldest on the left. Choose a tablet to read Mímir&apos;s translation.
      </p>

      <ol className="grid gap-5 md:grid-cols-3 md:gap-4 lg:gap-6">
        {chapters.map((c, i) => {
          const on = i === index
          const live = c.period.includes("present")
          return (
            <li key={c.company} className="gow-tablet-wrap" data-on={on ? "" : undefined}>
              <button
                type="button"
                aria-pressed={on}
                onPointerMove={light}
                onClick={() => {
                  if (on) return
                  setIndex(i)
                }}
                className="gow-tablet gow-stone group flex h-full w-full flex-col items-center px-5 pb-6 pt-10 text-center"
              >
                <span className="gow-carve font-runic text-2xl">{["ᛁ", "ᛁᛁ", "ᛁᛁᛁ"][i] ?? "ᛟ"}</span>
                <Etching company={c.company} />
                <span className="gow-carve mt-4 font-cinzel text-[clamp(1.5rem,2.4vw,2rem)] font-bold uppercase leading-none tracking-[0.06em]">{c.company}</span>
                <span className="gow-carve-soft mt-2 font-cinzel text-[11px] font-bold uppercase tracking-[0.2em]">{c.role}</span>
                <span className="gow-carve-soft mt-1 font-garamond text-base italic">{c.period}</span>
                <span className="gow-band mt-5 w-full px-3 py-3">
                  <Runes text={c.gold} speed={18} delay={300 + i * 400} className="font-garamond text-[15px] leading-snug" />
                </span>
                <span className={`mt-4 font-cinzel text-[10px] font-bold uppercase tracking-[0.3em] ${live ? "text-[var(--realm)]" : "text-[#e8dfc8]/40"}`}>{live ? "Being carved" : "Completed"}</span>
              </button>
            </li>
          )
        })}
      </ol>

      <Frame as="article" className="mt-8 px-6 py-6 sm:px-9 sm:py-8">
        <div key={job.company} className="gow-in grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <Label>Mímir&apos;s translation</Label>
            <h3 className="gow-title mt-2 text-4xl leading-none">{job.company}</h3>
            <p className="mt-2 font-garamond text-xl italic text-[#e8dfc8]/80">
              {job.role} · {job.place}
            </p>
            <p className="mt-1 font-cinzel text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--realm)]">{job.period}</p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Diamond className="mr-1 h-1.5 w-1.5" />
              {job.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>
          <div>
            <p className="border-l-2 border-[var(--realm)] bg-[#c8a24a]/8 px-5 py-4 font-garamond text-xl leading-snug text-[#fff3d0]">{job.gold}</p>
            <ul className="mt-5 grid gap-3">
              {job.objectives.map((o) => (
                <li key={o} className="flex gap-3 font-garamond text-lg leading-relaxed text-[#e8dfc8]/85">
                  <span className="mt-1.5 flex h-4 w-4 shrink-0 rotate-45 items-center justify-center border border-[var(--realm)]">
                    <span className="h-1.5 w-1.5 bg-[var(--realm)]" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Frame>
    </div>
  )
}
