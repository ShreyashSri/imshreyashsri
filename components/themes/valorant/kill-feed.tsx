"use client"

import { useEffect, useState } from "react"

import { awards, chapters, contributions, profile } from "@/data/resume"
import { WeaponIcon, type Weapon } from "./ui"

type Event = { weapon: Weapon; target: string; headshot?: boolean }

const events: Event[] = [
  ...[...chapters].reverse().map((c) => ({ weapon: "rifle" as const, target: c.company })),
  ...awards.map((a) => ({ weapon: "pistol" as const, target: a.title, headshot: a.medal === "gold" })),
  ...contributions.map((c) => ({ weapon: "spike" as const, target: c.camp })),
]

const VISIBLE = 5

export function KillFeed() {
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = window.setInterval(() => setTick((t) => t + 1), 2200)
    return () => window.clearInterval(id)
  }, [])

  const rows = Array.from({ length: VISIBLE }, (_, i) => {
    const n = tick - i
    return { n, event: events[((n % events.length) + events.length) % events.length] }
  })

  return (
    <ol aria-label="Highlights" className="flex flex-col items-end gap-1.5">
      {rows.map(({ n, event }, i) => (
        <li
          key={n}
          className="val-feed-row flex max-w-full items-center gap-3 border-r-2 bg-[#0f1923]/75 py-1.5 pl-3 pr-3 font-barlow-condensed text-sm font-semibold uppercase tracking-[0.08em] backdrop-blur-sm"
          style={{ borderColor: i === 0 ? "#ff4655" : "rgba(236,232,225,0.25)", opacity: 1 - i * 0.14 }}
        >
          <span className="text-[#2fd3b2]">{profile.handle}</span>
          <span className="flex items-center gap-1 text-white/85">
            <WeaponIcon kind={event.weapon} className={event.weapon === "rifle" ? "h-3.5 w-7" : "h-3.5 w-3.5"} />
            {event.headshot && <WeaponIcon kind="headshot" className="h-3.5 w-3.5 text-[#f0c35a]" />}
          </span>
          <span className="max-w-[220px] truncate text-[#ff4655]">{event.target}</span>
        </li>
      ))}
    </ol>
  )
}
