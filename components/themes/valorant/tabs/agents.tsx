"use client"

import { useState } from "react"

import { skillGroups } from "@/data/resume"
import { TechLogo, ratings } from "@/components/shared/tech-logo"
import { Heading, RoleGlyph, type Role } from "../ui"

const roles: Record<string, { role: Role; bio: string }> = {
  languages: { role: "Duelist", bio: "First in, every time. The languages I open every project with." },
  frameworks: { role: "Initiator", bio: "Sets up the play. The frameworks that turn an idea into a service." },
  data: { role: "Sentinel", bio: "Holds the site. Where the data lives and stays consistent." },
  infra: { role: "Controller", bio: "Shapes the map. Containers, clusters and the pipelines that ship them." },
  observability: { role: "Sentinel", bio: "Watches every angle. Metrics, traces and alerts before anyone notices." },
  competitive: { role: "Duelist", bio: "Ranked grind. Contest platforms where the reflexes stay sharp." },
}

const keys = ["C", "Q", "E", "X", "P"]

export function AgentsTab() {
  const [selected, setSelected] = useState(skillGroups[0].id)
  const [locked, setLocked] = useState<string | null>(null)
  const group = skillGroups.find((g) => g.id === selected) ?? skillGroups[0]
  const meta = roles[group.id] ?? { role: "Duelist", bio: "" }
  const isLocked = locked === group.id

  return (
    <div className="val-in">
      <Heading kicker="Agents" title="Skills" right={<p className="font-barlow-condensed text-sm uppercase tracking-[0.25em] text-white/55">Choose your agent</p>} />
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <section key={group.id} className="val-panel val-ticks val-in relative overflow-hidden p-6 sm:p-8" aria-live="polite">
          <RoleGlyph role={meta.role} className="pointer-events-none absolute -right-10 -top-8 h-80 w-80 text-[#ff4655] opacity-[0.07]" />
          {isLocked && <div className="val-flash pointer-events-none absolute inset-0 bg-white" />}
          <div className="relative">
            <p className="flex items-center gap-2 font-barlow-condensed text-xs font-semibold uppercase tracking-[0.3em] text-[#ff4655]">
              <RoleGlyph role={meta.role} className="h-4 w-4" /> {meta.role}
            </p>
            <h3 key={isLocked ? "locked" : "open"} className={`mt-2 font-anton text-[clamp(3rem,7vw,5.5rem)] uppercase leading-[0.9] ${isLocked ? "val-lock text-[#ff4655]" : ""}`}>
              {group.title}
            </h3>
            <p className="mt-3 max-w-md font-barlow text-base leading-relaxed text-white/75">{meta.bio}</p>

            <p className="mt-7 font-barlow-condensed text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Abilities</p>
            <ul className="mt-3 flex flex-wrap gap-3">
              {group.items.map((item, i) => (
                <li key={item} className="group w-[104px]">
                  <div className="relative flex h-[84px] items-center justify-center border border-white/15 bg-[#0f1923]/80 transition-colors group-hover:border-[#ff4655] group-hover:bg-[#ff4655]/10">
                    <TechLogo name={item} className="h-10 w-10 text-white/90 transition-transform duration-300 group-hover:scale-110" />
                    <span className="absolute -bottom-2.5 left-1/2 flex h-5 min-w-5 -translate-x-1/2 items-center justify-center bg-[#ece8e1] px-1 font-barlow-condensed text-[11px] font-bold text-[#0f1923]">
                      {keys[i] ?? "+"}
                    </span>
                  </div>
                  <p className="mt-4 text-center font-barlow-condensed text-xs font-semibold uppercase leading-tight tracking-[0.12em]">
                    {item}
                    {ratings[item] && <span className="block text-[11px] font-normal text-[#f0c35a]">{ratings[item]}</span>}
                  </p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              disabled={isLocked}
              onClick={() => {
                setLocked(group.id)
              }}
              className="val-btn val-btn-primary mt-8 w-full text-lg! disabled:cursor-default disabled:border-[#ece8e1] disabled:bg-[#ece8e1] disabled:text-[#0f1923] sm:w-auto sm:min-w-[260px]"
            >
              {isLocked ? "Locked in" : "Lock in"}
            </button>
          </div>
        </section>

        <ul className="grid grid-cols-3 content-start gap-3" aria-label="Agent select">
          {skillGroups.map((g) => {
            const on = g.id === group.id
            const role = roles[g.id]?.role ?? "Duelist"
            return (
              <li key={g.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    setSelected(g.id)
                  }}
                  className="val-panel val-card relative flex aspect-square w-full flex-col items-center justify-center gap-3 p-3"
                >
                  <RoleGlyph role={role} className="absolute right-2 top-2 h-3.5 w-3.5 text-white/40" />
                  {locked === g.id && <span className="absolute left-2 top-2 bg-[#ff4655] px-1.5 py-0.5 font-barlow-condensed text-[9px] font-bold uppercase tracking-[0.2em]">Locked</span>}
                  <TechLogo name={g.items[0]} className="h-10 w-10 text-white/90" />
                  <span className="text-center font-barlow-condensed text-xs font-semibold uppercase leading-tight tracking-[0.16em]">{g.title}</span>
                  <span className="font-barlow-condensed text-[10px] uppercase tracking-[0.2em] text-white/45">{role}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
