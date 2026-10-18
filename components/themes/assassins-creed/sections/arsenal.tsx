"use client"

import { useState } from "react"

import { skillGroups } from "@/data/resume"
import { TechLogo, logos, ratings } from "@/components/shared/tech-logo"
import { SubHeading } from "../ui"

const C = 200
const R = 188
const r = 86
const gap = 1.6

function polar(radius: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180
  return [C + radius * Math.cos(a), C + radius * Math.sin(a)]
}

function sector(start: number, end: number) {
  const [x1, y1] = polar(R, start + gap)
  const [x2, y2] = polar(R, end - gap)
  const [x3, y3] = polar(r, end - gap)
  const [x4, y4] = polar(r, start + gap)
  return `M${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}L${x3} ${y3}A${r} ${r} 0 0 0 ${x4} ${y4}Z`
}

export function ArsenalSection() {
  const [selected, setSelected] = useState(0)
  const group = skillGroups[selected]
  const step = 360 / skillGroups.length

  const choose = (i: number) => {
    if (i === selected) return
    setSelected(i)
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,440px)_1fr] lg:gap-14">
      <div className="mx-auto w-full max-w-[440px]">
        <svg viewBox="0 0 400 400" className="an-wheel w-full" role="group" aria-label="Weapon wheel">
          <circle cx={C} cy={C} r={R + 8} fill="none" stroke="var(--an-line)" strokeWidth="1" strokeDasharray="2 5" />
          {skillGroups.map((g, i) => {
            const start = i * step - step / 2
            const [lx, ly] = polar((R + r) / 2, i * step)
            const on = i === selected
            const icon = logos[g.items[0]]
            return (
              <g
                key={g.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={g.title}
                className="an-wheel-seg"
                onClick={() => choose(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault()
                    choose(i)
                  }
                }}
              >
                <path className="an-seg-bg" d={sector(start, start + step)} fill="var(--an-panel)" stroke="var(--an-line)" strokeWidth="1.2" />
                {icon && (
                  <path d={icon.path} transform={`translate(${lx - 13} ${ly - 26}) scale(1.08)`} fill={on ? "#fff" : "var(--an-ink)"} style={{ transition: "fill 0.25s" }} />
                )}
                <text x={lx} y={ly + 22} textAnchor="middle" className="font-exo" fontSize="11" fontWeight="700" letterSpacing="2" fill={on ? "#fff" : "var(--an-muted)"} style={{ textTransform: "uppercase" }}>
                  {g.title.toUpperCase()}
                </text>
              </g>
            )
          })}
          <circle cx={C} cy={C} r={r - 10} fill="var(--an-bg)" stroke="var(--an-line)" />
          <text x={C} y={C - 10} textAnchor="middle" className="font-exo" fontSize="10" fontWeight="700" letterSpacing="3" fill="var(--an-red)">
            EQUIPPED
          </text>
          <text x={C} y={C + 16} textAnchor="middle" className="font-marcellus" fontSize={group.title.length > 10 ? 16 : 21} fill="var(--an-ink)">
            {group.title.toUpperCase()}
          </text>
          <text x={C} y={C + 36} textAnchor="middle" className="font-exo" fontSize="10" letterSpacing="2" fill="var(--an-muted)">
            {group.items.length} TOOLS
          </text>
        </svg>
      </div>

      <section key={group.id} className="an-in" aria-live="polite">
        <SubHeading aside={<span className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">Pick a slot on the wheel</span>}>{group.title}</SubHeading>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {group.items.map((item) => (
            <li key={item} className="an-card an-card-hover group flex flex-col items-center gap-3 px-3 py-6 text-center">
              <TechLogo name={item} className="h-11 w-11 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-exo text-[13px] font-semibold uppercase tracking-[0.16em]">{item}</span>
              {ratings[item] && <span className="an-key -mt-2 font-exo text-[11px] font-semibold">{ratings[item]}</span>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
