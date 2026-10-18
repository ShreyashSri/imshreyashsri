"use client"

import { useState } from "react"
import { RotateCw } from "lucide-react"

import { contributions } from "@/data/resume"
import { Decode, SubHeading } from "../ui"

const rings = [
  { r: 50, name: "outer", marks: 12 },
  { r: 36, name: "middle", marks: 8 },
  { r: 22, name: "inner", marks: 6 },
]

function start(seed: number) {
  return [(seed * 3) % 4 || 1, (seed * 5 + 2) % 4 || 3, (seed * 7 + 1) % 4 || 2]
}

function Puzzle({ seed, turns, solved, onTurn }: { seed: number; turns: number[]; solved: boolean; onTurn: (ring: number) => void }) {
  return (
    <svg viewBox="0 0 120 120" className={`an-glyph h-32 w-32 sm:h-36 sm:w-36 ${solved ? "an-solved an-solved-flash" : ""}`} aria-hidden="true">
      <line x1="60" y1="2" x2="60" y2="16" stroke="var(--an-red)" strokeWidth="2" />
      {rings.map((ring, k) => (
        <g key={ring.name} className="an-ring" style={{ transform: `rotate(${turns[k] * 90}deg)` }} onClick={() => onTurn(k)}>
          <circle cx="60" cy="60" r={ring.r} fill="transparent" stroke="currentColor" strokeWidth="9" strokeOpacity="0.07" />
          <circle cx="60" cy="60" r={ring.r} fill="none" stroke="currentColor" strokeWidth="1.3" strokeDasharray={`${3 + ((seed + k) % 4)} 3`} />
          {Array.from({ length: ring.marks }, (_, m) => {
            const a = (m / ring.marks) * Math.PI * 2 + (seed % 3) * 0.2
            const x = 60 + ring.r * Math.cos(a)
            const y = 60 + ring.r * Math.sin(a)
            return (m + seed + k) % 3 === 0 ? <rect key={m} x={x - 2} y={y - 2} width="4" height="4" fill="currentColor" transform={`rotate(45 ${x} ${y})`} /> : <circle key={m} cx={x} cy={y} r="1.3" fill="currentColor" />
          })}
          <path d={`M60 ${60 - ring.r - 5} l4 7 h-8z`} fill="var(--an-red)" />
        </g>
      ))}
      <circle cx="60" cy="60" r="6" fill={solved ? "var(--an-key)" : "currentColor"} />
    </svg>
  )
}

function GlyphCard({ index }: { index: number }) {
  const c = contributions[index]
  const [turns, setTurns] = useState(() => start(index + 1))
  const [revealed, setRevealed] = useState(false)
  const solved = revealed || turns.every((t) => t % 4 === 0)

  const turn = (k: number) => {
    if (solved) return
    const next = turns.map((t, i) => (i === k ? t + 1 : t))
    setTurns(next)
  }

  return (
    <li className="an-card group grid gap-5 p-6 sm:grid-cols-[auto_1fr]">
      <div className="flex flex-col items-center gap-3">
        <Puzzle seed={index + 1} turns={turns} solved={solved} onTurn={turn} />
        <div className="flex gap-1.5" role="group" aria-label={`Glyph ${index + 1} rings`}>
          {rings.map((ring, k) => (
            <button key={ring.name} type="button" disabled={solved} onClick={() => turn(k)} aria-label={`Rotate the ${ring.name} ring`} className="an-icon-btn h-8! gap-1! px-2! disabled:opacity-40">
              <RotateCw className="h-3 w-3" />
              <span className="text-[9px]! tracking-[0.12em]!">{ring.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="min-w-0">
        <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">
          Glyph {index + 1} · <span className="text-(--an-red)">{c.role}</span>
        </p>
        <h3 className="an-glitchy mt-1.5 font-marcellus text-[24px] leading-tight">{c.camp}</h3>
        <p className="an-key mt-1 font-exo text-[10px] font-bold uppercase tracking-[0.3em]">{solved ? "Glyph solved" : "Locked · align the markers"}</p>
        <ul className="mt-3 space-y-2" aria-live="polite">
          {c.deeds.map((d) => (
            <li key={d} className="flex gap-3 font-exo text-[14px] leading-relaxed text-(--an-muted)">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-(--an-ink)" />
              <Decode text={d} active={solved} className={solved ? "" : "tracking-[0.12em] opacity-60"} />
            </li>
          ))}
        </ul>
        <div className="mt-4 flex flex-wrap gap-4 font-exo text-[10px] font-bold uppercase tracking-[0.3em]">
          {solved ? (
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="text-(--an-ink) transition-colors hover:text-(--an-red)">
              Examine the wall ↗
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                setRevealed(true)
              }}
              className="text-(--an-muted) underline-offset-4 hover:text-(--an-red) hover:underline"
            >
              Reveal without solving
            </button>
          )}
        </div>
      </div>
    </li>
  )
}

export function GlyphsSection() {
  return (
    <div>
      <SubHeading aside={<span className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">Turn the rings until every red marker points up</span>}>
        Marks on the walls
      </SubHeading>
      <p className="mb-8 max-w-2xl font-exo text-[15px] leading-relaxed text-(--an-muted)">
        Each glyph hides an open-source contribution. Click a ring, or use the buttons, to turn it a quarter. Eagle Vision makes the glyphs glow.
      </p>
      <ul className="grid gap-5 lg:grid-cols-2">
        {contributions.map((c, i) => (
          <GlyphCard key={c.camp} index={i} />
        ))}
      </ul>
    </div>
  )
}
