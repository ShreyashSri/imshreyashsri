"use client"

import { useRef, useState } from "react"

import { skillGroups } from "@/data/resume"
import { TechLogo, ratings } from "@/components/shared/tech-logo"
import { Enso, Written } from "../ink"
import { numerals, Rule } from "../ui"

const stances: Record<string, { name: string; kanji: string; line: string }> = {
  languages: { name: "Stone", kanji: "石", line: "The ground every project stands on." },
  frameworks: { name: "Water", kanji: "水", line: "Flows into the shape of whatever needs building." },
  data: { name: "Moon", kanji: "月", line: "Where the data rests and keeps its light." },
  infra: { name: "Wind", kanji: "風", line: "Carries services from one machine to a cluster." },
  observability: { name: "Ghost", kanji: "影", line: "Sees everything, and is never seen." },
  competitive: { name: "Standoff", kanji: "闘", line: "One problem, one clock, one clean strike." },
}

function Slash() {
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 z-20 h-full w-full" aria-hidden="true">
      <path className="got-slash" d="M-20 250C80 190 220 110 420 30" pathLength="1" fill="none" stroke="#f4eee4" strokeWidth="5" strokeLinecap="round" />
      <path className="got-slash got-slash-red" d="M-20 262C90 200 230 122 420 44" pathLength="1" fill="none" stroke="#c8102e" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

export function Stances() {
  const [index, setIndex] = useState(0)
  const [cuts, setCuts] = useState(0)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const group = skillGroups[index]
  const stance = stances[group.id]

  const change = (i: number) => {
    if (i === index) return
    setCuts((c) => c + 1)
    setIndex(i)
  }

  const onKey = (e: React.KeyboardEvent) => {
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0
    if (!step) return
    e.preventDefault()
    const next = (index + step + skillGroups.length) % skillGroups.length
    change(next)
    buttons.current[next]?.focus()
  }

  return (
    <div className="relative grid items-center gap-10 lg:grid-cols-[400px_1fr] lg:gap-14">
      {cuts > 0 && <Slash key={cuts} />}

      <div className="got-rise relative mx-auto aspect-square w-full max-w-[340px] sm:max-w-[400px]" role="radiogroup" aria-label="Stances" onKeyDown={onKey}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(236,230,218,0.14)" strokeWidth="0.4" strokeDasharray="0.6 1.6" />
          {skillGroups.map((g, i) => {
            const a = ((i * 360) / skillGroups.length - 90) * (Math.PI / 180)
            return <line key={g.id} x1={50 + Math.cos(a) * 25} y1={50 + Math.sin(a) * 25} x2={50 + Math.cos(a) * 33} y2={50 + Math.sin(a) * 33} stroke={i === index ? "#c8102e" : "rgba(236,230,218,0.08)"} strokeWidth={i === index ? 0.7 : 0.3} />
          })}
        </svg>

        <div className="absolute inset-[27%] flex flex-col items-center justify-center">
          <Enso key={group.id} draw color="#f4eee4" className="h-full w-full">
            <Written key={group.id} className="font-brush text-[clamp(3rem,10vw,4.6rem)] leading-none text-[#c8102e]" delay={0.12} vertical>
              {stance.kanji}
            </Written>
          </Enso>
        </div>

        {skillGroups.map((g, i) => {
          const s = stances[g.id]
          const on = i === index
          const a = ((i * 360) / skillGroups.length - 90) * (Math.PI / 180)
          return (
            <button
              key={g.id}
              ref={(el) => {
                buttons.current[i] = el
              }}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`${s.name} stance, ${g.title}`}
              tabIndex={on ? 0 : -1}
              onClick={() => change(i)}
              className="got-node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
              style={{ left: `${50 + Math.cos(a) * 38}%`, top: `${50 + Math.sin(a) * 38}%` }}
            >
              <span className={`got-seal h-11 w-11 text-xl transition-transform duration-300 sm:h-12 sm:w-12 ${on ? "scale-110" : "opacity-80"}`} style={{ backgroundColor: on ? "#c8102e" : "#1d1b19" }}>
                <span>{s.kanji}</span>
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-[0.24em] ${on ? "text-[#f4eee4]" : "text-[#ece6da]/50"}`}>{s.name}</span>
            </button>
          )
        })}
      </div>

      <section key={group.id} className="got-rise" aria-live="polite">
        <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#c8102e]">{stance.name} stance</p>
        <h3 className="mt-2 text-[clamp(2rem,4vw,3rem)] font-extrabold uppercase leading-none tracking-[0.12em]">{group.title}</h3>
        <p className="mt-3 text-[16px] italic text-[#ece6da]/70">{stance.line}</p>
        <Rule className="my-7 max-w-sm" />
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.32em] text-[#ece6da]/50">{group.items.length} techniques</p>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
          {group.items.map((item, i) => (
            <li key={item} className="got-panel got-rise group relative flex flex-col items-center gap-3 px-3 py-6 text-center transition-colors hover:border-[#c8102e]/70" style={{ animationDelay: `${0.1 + i * 0.06}s` }}>
              <span className="absolute left-2 top-1.5 font-brush text-base text-[#c8102e]/80">{numerals[i]}</span>
              <TechLogo name={item} className="h-10 w-10 text-[#f4eee4] transition-transform duration-500 group-hover:-translate-y-1" />
              <span className="text-[13px] font-bold uppercase tracking-[0.18em]">{item}</span>
              {ratings[item] && <span className="-mt-1.5 text-xs text-[#c8102e]">{ratings[item]}</span>}
            </li>
          ))}
        </ul>
        <p className="mt-6 hidden text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#ece6da]/40 sm:block">← → Change stance</p>
      </section>
    </div>
  )
}
