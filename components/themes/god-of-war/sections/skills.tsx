"use client"

import { useRef, useState } from "react"

import { chapters, skillGroups } from "@/data/resume"
import { projects } from "@/data/projects"
import { TechLogo, ratings } from "@/components/shared/tech-logo"
import { Frame, Heading, Label } from "../ui"
import type { PageProps } from "."

const branchRunes: Record<string, string> = { languages: "ᚠ", frameworks: "ᚦ", data: "ᛒ", infra: "ᛉ", observability: "ᛟ", competitive: "ᛏ" }

const W = 600
const H = 440
const ROOT = { x: W / 2, y: 385 }

function layout(count: number) {
  const lower = Math.ceil(count / 2)
  const upper = count - lower
  const row = (n: number, y: number, spread: number) => Array.from({ length: n }, (_, i) => ({ x: W / 2 + (n === 1 ? 0 : (i / (n - 1) - 0.5) * spread), y }))
  const tier1 = row(lower, 250, lower > 2 ? 380 : 260)
  const tier2 = row(upper, 105, upper > 2 ? 440 : upper === 1 ? 0 : 300)
  const links = [
    ...tier1.map((p) => ({ from: ROOT, to: p })),
    ...tier2.map((p) => ({ from: tier1.reduce((a, b) => (Math.abs(b.x - p.x) < Math.abs(a.x - p.x) ? b : a)), to: p })),
  ]
  return { nodes: [...tier1, ...tier2], links }
}

const usedIn = (skill: string) => {
  const key = skill.toLowerCase()
  return [
    ...chapters.filter((c) => c.stack.some((s) => s.toLowerCase() === key)).map((c) => c.company),
    ...projects.filter((p) => p.technologies.some((t) => t.toLowerCase() === key)).map((p) => p.title),
  ]
}

export function Skills({ realm }: PageProps) {
  const [groupId, setGroupId] = useState(skillGroups[0].id)
  const group = skillGroups.find((g) => g.id === groupId) ?? skillGroups[0]
  const [focus, setFocus] = useState(0)
  const nodesRef = useRef<(HTMLButtonElement | null)[]>([])
  const { nodes, links } = layout(group.items.length)
  const skill = group.items[Math.min(focus, group.items.length - 1)]
  const uses = usedIn(skill)
  const total = skillGroups.reduce((n, g) => n + g.items.length, 0)

  const pickGroup = (id: string) => {
    if (id === groupId) return
    setGroupId(id)
    setFocus(0)
  }

  const pickNode = (i: number) => {
    if (i === focus) return
    setFocus(i)
  }

  const onKey = (e: React.KeyboardEvent) => {
    const dir = e.key === "ArrowRight" || e.key === "ArrowUp" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowDown" ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (focus + dir + group.items.length) % group.items.length
    pickNode(next)
    nodesRef.current[next]?.focus()
  }

  return (
    <div>
      <Heading
        rune={realm.rune}
        realm={realm.realm}
        codex={realm.codex}
        title="Skills"
        right={<p className="font-garamond text-lg italic text-[#e8dfc8]/60">{total} skills unlocked</p>}
      />

      <div role="tablist" aria-label="Skill trees" className="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
        {skillGroups.map((g) => {
          const on = g.id === groupId
          return (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => pickGroup(g.id)}
              className={`gow-tree-tab flex min-w-0 items-center gap-2.5 px-3 py-2.5 sm:px-4 ${on ? "is-on" : ""}`}
            >
              <span className="font-runic text-lg text-[var(--realm)]">{branchRunes[g.id] ?? "ᛟ"}</span>
              <span className="truncate font-cinzel text-[11px] font-bold uppercase tracking-[0.04em] sm:text-[13px] sm:tracking-[0.12em]">{g.title}</span>
            </button>
          )
        })}
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <Frame className="overflow-hidden px-2 py-4 sm:px-6">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_85%,rgba(233,196,106,0.12),transparent)]" />
          <div key={group.id} className="gow-in relative mx-auto aspect-[600/440] w-full max-w-[680px]" onKeyDown={onKey}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              {links.map((l, i) => {
                const lit = nodes[focus] && l.to.x === nodes[focus].x && l.to.y === nodes[focus].y
                return (
                  <g key={i}>
                    <path d={`M${l.from.x} ${l.from.y} V${(l.from.y + l.to.y) / 2} H${l.to.x} V${l.to.y}`} fill="none" stroke="#071012" strokeWidth="7" />
                    <path
                      d={`M${l.from.x} ${l.from.y} V${(l.from.y + l.to.y) / 2} H${l.to.x} V${l.to.y}`}
                      fill="none"
                      stroke={lit ? "#ffe9a8" : "#c8a24a"}
                      strokeOpacity={lit ? 1 : 0.6}
                      strokeWidth={lit ? 3 : 2}
                      className="gow-draw"
                      pathLength={1}
                      style={{ animationDelay: `${i * 0.08}s`, transition: "stroke .3s" }}
                    />
                  </g>
                )
              })}
            </svg>

            <div className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${(ROOT.x / W) * 100}%`, top: `${(ROOT.y / H) * 100}%` }}>
              <span className="gow-hex flex h-[clamp(52px,10vw,72px)] w-[clamp(46px,9vw,64px)] items-center justify-center">
                <span className="font-runic text-[clamp(1.4rem,3vw,2rem)] text-[#fff3d0]">{branchRunes[group.id] ?? "ᛟ"}</span>
              </span>
            </div>

            {group.items.map((item, i) => {
              const p = nodes[i]
              const on = i === focus
              return (
                <button
                  key={item}
                  ref={(el) => {
                    nodesRef.current[i] = el
                  }}
                  type="button"
                  aria-pressed={on}
                  aria-label={`${item}, unlocked`}
                  tabIndex={on ? 0 : -1}
                  onMouseEnter={() => pickNode(i)}
                  onFocus={() => pickNode(i)}
                  onClick={() => pickNode(i)}
                  className="gow-skill group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${(p.x / W) * 100}%`, top: `${(p.y / H) * 100}%`, animationDelay: `${0.2 + i * 0.08}s` }}
                >
                  <span className="gow-skill-node flex h-[clamp(46px,9vw,68px)] w-[clamp(46px,9vw,68px)] items-center justify-center">
                    <TechLogo name={item} className="h-[clamp(18px,3.4vw,26px)] w-[clamp(18px,3.4vw,26px)] text-[#fff3d0]" />
                  </span>
                  <span className={`mt-1.5 whitespace-nowrap bg-[#081214] px-1.5 py-0.5 font-cinzel text-[clamp(9px,1.6vw,12px)] font-bold uppercase tracking-[0.12em] ${on ? "text-[#ffe9a8]" : "text-[#e8dfc8]/70"}`}>{item}</span>
                </button>
              )
            })}
          </div>
        </Frame>

        <Frame as="section" className="px-6 py-6" >
          <div key={skill} className="gow-in" aria-live="polite">
            <div className="flex items-center gap-4">
              <span className="gow-skill-node is-big flex h-16 w-16 shrink-0 items-center justify-center">
                <TechLogo name={skill} className="h-7 w-7 text-[#fff3d0]" />
              </span>
              <div className="min-w-0">
                <Label>{group.title}</Label>
                <h3 className="gow-title mt-1 break-words text-[clamp(1.4rem,2.4vw,1.9rem)] leading-tight">{skill}</h3>
              </div>
            </div>
            <p className="mt-5 flex items-center gap-2 font-cinzel text-[11px] font-bold uppercase tracking-[0.25em] text-[#8fd3a4]">
              <span className="h-2 w-2 rotate-45 bg-[#8fd3a4] shadow-[0_0_8px_#8fd3a4]" /> Unlocked
            </p>
            {ratings[skill] && (
              <p className="mt-4 font-garamond text-xl text-[#fff3d0]">
                Rating <span className="font-cinzel font-bold text-[#e9c46a]">{ratings[skill]}</span>
              </p>
            )}
            {uses.length > 0 && (
              <div className="mt-5">
                <p className="font-cinzel text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8dfc8]/50">Wielded in</p>
                <ul className="mt-2 grid gap-1.5">
                  {uses.map((u) => (
                    <li key={u} className="flex items-center gap-2.5 font-garamond text-lg text-[#e8dfc8]/85">
                      <span className="h-1.5 w-1.5 rotate-45 bg-[var(--realm)]" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-6 font-garamond text-base italic text-[#e8dfc8]/50">Use the arrow keys to move between nodes.</p>
          </div>
        </Frame>
      </div>
    </div>
  )
}
