"use client"

import { useEffect, useState } from "react"

export function Kicker({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`font-exo text-[11px] font-semibold uppercase tracking-[0.32em] text-(--an-red) ${className}`}>{children}</p>
}

export function SubHeading({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-(--an-line) pb-3">
      <h3 className="font-marcellus text-2xl uppercase tracking-[0.08em]">{children}</h3>
      {aside}
    </div>
  )
}

export function Sync({ value = 1, live = false, label }: { value?: number; live?: boolean; label?: string }) {
  return (
    <div>
      {label && (
        <p className="mb-1.5 flex justify-between font-exo text-[10px] font-semibold uppercase tracking-[0.26em] text-(--an-muted)">
          <span>{label}</span>
          <span className="an-key">{live ? "Synchronising" : `${Math.round(value * 100)}%`}</span>
        </p>
      )}
      <div className={`an-sync ${live ? "an-sync-live" : ""}`}>
        <span style={{ width: `${value * 100}%` }} />
      </div>
    </div>
  )
}

export function Glyph({ seed, className = "h-12 w-12" }: { seed: number; className?: string }) {
  const rot = (seed * 47) % 360
  const sides = 3 + (seed % 4)
  const points = Array.from({ length: sides }, (_, i) => {
    const a = (Math.PI * 2 * i) / sides - Math.PI / 2
    return `${(24 + 15 * Math.cos(a)).toFixed(1)},${(24 + 15 * Math.sin(a)).toFixed(1)}`
  }).join(" ")
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray={`${2 + (seed % 3)} 3`} />
      <g transform={`rotate(${rot} 24 24)`}>
        <polygon points={points} fill="none" stroke="currentColor" strokeWidth="1.6" />
        <line x1="24" y1="6" x2="24" y2="42" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        <circle cx="24" cy="24" r={3 + (seed % 3)} fill="currentColor" />
      </g>
    </svg>
  )
}

export function Insignia({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path d="M16 2c-4 6-9 14-13 26l5 2c2-6 5-11 8-15 3 4 6 9 8 15l5-2C25 16 20 8 16 2z" fill="currentColor" />
      <path d="M16 19l-3 6h6z" fill="currentColor" />
    </svg>
  )
}

export function rng(seed: number) {
  let t = seed * 2654435761
  return () => {
    t += 0x6d2b79f5
    let r = Math.imul(t ^ (t >>> 15), 1 | t)
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r)
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296
  }
}

const cipher = "ΔΣΦΨΩΞΛΠ◊⌬⟁∆∇≡≠∴"

function scramble(text: string, keep = 0) {
  return Array.from(text, (ch, i) => (i < keep || ch === " " ? ch : cipher[(ch.charCodeAt(0) + i * 7) % cipher.length])).join("")
}

export function Decode({ text, active, className = "" }: { text: string; active: boolean; className?: string }) {
  const [shown, setShown] = useState(active ? text.length : 0)

  useEffect(() => {
    if (!active) return setShown(0)
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(text.length)
    let raf = 0
    const start = performance.now()
    const tick = (now: number) => {
      const n = Math.min(text.length, Math.floor(((now - start) / 700) * text.length))
      setShown(n)
      if (n < text.length) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, text])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{shown >= text.length ? text : shown === 0 && text.length > 70 ? `${scramble(text.slice(0, 64))} …` : scramble(text, shown)}</span>
    </span>
  )
}
