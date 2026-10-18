"use client"

import { useState } from "react"

import { awards, chapters, contributions, education, profile } from "@/data/resume"
import { Seal } from "../ui"

const pred = chapters.find((c) => c.company === "PRED")
const ignito = chapters.find((c) => c.company === "Ignito Co.")
const ckad = awards.find((a) => a.title.includes("Kubernetes"))
const debian = contributions.find((c) => c.camp.startsWith("Debian"))
const gpa = education[0].detail.split("GPA ")[1]

const verses = [
  {
    prompt: "Where does it begin?",
    options: [
      { line: `${profile.city.split(",")[0]} morning`, source: profile.city },
      { line: "A goroutine wakes", source: "Go · Languages" },
      { line: "Eight point seven five", source: `GPA ${gpa}` },
    ],
  },
  {
    prompt: "What is the work?",
    options: [
      { line: "Trades cross the order book", source: pred ? `${pred.company} · ${pred.role}` : "" },
      { line: "Minutes fold into seconds", source: ignito ? `${ignito.company} · 7 minutes to 16 seconds` : "" },
      { line: "Kubernetes holds the line", source: ckad ? ckad.title : "" },
    ],
  },
  {
    prompt: "How does it end?",
    options: [
      { line: "Grafana keeps watch", source: "Observability" },
      { line: "Debian builds clean", source: debian ? debian.camp : "" },
      { line: "Pull requests merging", source: `${contributions.length} open-source projects` },
    ],
  },
]

export function Haiku() {
  const [picked, setPicked] = useState<number[]>([])
  const step = picked.length
  const done = step === verses.length

  const choose = (i: number) => {
    const next = [...picked, i]
    setPicked(next)
  }

  return (
    <section aria-label="Compose a haiku" className="got-rise relative">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#c8102e]">Compose a haiku</p>
        <p className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#ece6da]/45">{done ? "Complete" : `Line ${step + 1} of 3`}</p>
      </div>

      <figure className="relative mt-6 min-h-[7.5rem] pr-14 sm:min-h-[11rem]">
        {verses.map((v, i) => {
          const choice = picked[i]
          return (
            <p key={v.prompt} className="font-brush text-[clamp(1.35rem,3vw,2.2rem)] leading-snug text-[#f4eee4]" style={{ paddingLeft: `${i * 1.2}em` }}>
              {choice === undefined ? (
                <span className="text-[#ece6da]/18">{i === step ? "…" : " "}</span>
              ) : (
                <span key={choice} className="got-write inline-block">
                  {v.options[choice].line}
                </span>
              )}
            </p>
          )
        })}
        {done && <Seal char="詠" className="got-stamp absolute right-0 top-1 h-12 w-12 text-2xl" />}
      </figure>

      {done ? (
        <div className="got-rise mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[11px] font-bold uppercase tracking-[0.22em] text-[#ece6da]/50">
            {picked.map((c, i) => (
              <li key={i}>{verses[i].options[c].source}</li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => {
              setPicked([])
            }}
            className="got-btn ml-auto"
          >
            Compose again
          </button>
        </div>
      ) : (
        <div key={step} className="got-rise mt-6">
          <p className="text-sm italic text-[#ece6da]/65">{verses[step].prompt}</p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-3">
            {verses[step].options.map((o, i) => (
              <li key={o.line}>
                <button type="button" onClick={() => choose(i)} className="got-verse">
                  <span className="font-brush text-lg leading-snug">{o.line}</span>
                  <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] opacity-55">{o.source}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
