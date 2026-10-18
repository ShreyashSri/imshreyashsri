"use client"

import { sequences, type SequenceId } from "./sequences"

const icons: Record<SequenceId, string> = {
  subject: "M8 2.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 14c0-3 2.2-5 5-5s5 2 5 5z",
  memories: "M4 2h8v1.5L9.2 8 12 12.5V14H4v-1.5L6.8 8 4 3.5z",
  codex: "M2.5 3C4.5 2 6.5 2 8 3.4 9.5 2 11.5 2 13.5 3v10.5c-2-1-4-1-5.5.4-1.5-1.4-3.5-1.4-5.5-.4z",
  arsenal: "M12.8 1.8l1.4 1.4-6.7 6.7.9.9-1.4 1.4-.9-.9-2.4 2.4-1.4-1.4 2.4-2.4-.9-.9 1.4-1.4.9.9z",
  glyphs: "M8 1.5l6.5 11.5h-13zM8 5.6l-3 5.4h6z",
  honours: "M8 1.5l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.3l-3.8 2 .7-4.3-3.1-3 4.3-.6z",
  letters: "M1.5 3.5h13v9h-13zM2.5 4.5L8 8.8l5.5-4.3",
  contact: "M13.5 2c-5 .5-8.5 4-9.5 9l-1.5 3 1.2.4 1.2-2.6c4-.6 7.6-4.2 8.6-9.8z",
  games: "M8 1.5l6.5 6.5L8 14.5 1.5 8zM8 5L5 8l3 3 3-3z",
}

const marks = sequences.map((s, i) => {
  const angle = (i / sequences.length) * Math.PI * 2 - Math.PI / 2 + 0.35
  const radius = i % 2 ? 0.58 : 0.8
  return { ...s, x: 50 + 50 * radius * Math.cos(angle), y: 50 + 50 * radius * Math.sin(angle) }
})

export function MapIcon({ id, className = "h-3.5 w-3.5" }: { id: SequenceId; className?: string }) {
  const stroke = id === "letters"
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d={icons[id]} fill={stroke ? "none" : "currentColor"} stroke={stroke ? "currentColor" : "none"} strokeWidth="1.4" fillRule="evenodd" />
    </svg>
  )
}

export function Minimap({ current, onTravel, className = "" }: { current: SequenceId; onTravel: (id: SequenceId) => void; className?: string }) {
  return (
    <nav aria-label="Minimap" className={`an-minimap relative aspect-square ${className}`}>
      <div aria-hidden="true" className="an-minimap-face absolute inset-0 rounded-full" />
      <div aria-hidden="true" className="an-minimap-sweep absolute inset-0 rounded-full" />
      <span aria-hidden="true" className="absolute left-1/2 top-1 -translate-x-1/2 font-exo text-[9px] font-bold text-(--an-red)">N</span>
      <svg aria-hidden="true" viewBox="0 0 16 16" className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 text-(--an-ink)">
        <path d="M8 1l5 13-5-3-5 3z" fill="currentColor" />
      </svg>
      <ul>
        {marks.map((m) => {
          const on = m.id === current
          return (
            <li key={m.id} className="absolute" style={{ left: `${m.x}%`, top: `${m.y}%` }}>
              <button
                type="button"
                aria-label={m.label}
                aria-current={on}
                onClick={() => !on && onTravel(m.id)}
                className="an-mark group -translate-x-1/2 -translate-y-1/2"
              >
                <MapIcon id={m.id} />
                <span className="an-mark-label">{m.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
