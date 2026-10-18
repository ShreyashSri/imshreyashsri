import Image from "next/image"

import type { Mood } from "./wind"

const W = 1600

function ridge(seed: number, base: number, amp: number) {
  const points: string[] = []
  for (let x = 0; x <= W; x += 16) {
    const t = x / W
    const y =
      base -
      amp *
        (0.55 * Math.sin(t * 5.1 + seed) +
          0.3 * Math.sin(t * 11.7 + seed * 2.3) +
          0.15 * Math.sin(t * 27.3 + seed * 4.1) +
          0.4 * Math.exp(-((t - ((seed * 0.37) % 1)) ** 2) / 0.012))
    points.push(`${x},${y.toFixed(1)}`)
  }
  return `M0,900 L${points.join(" L")} L${W},900 Z`
}

const ridges = [
  { d: ridge(1.3, 560, 90), top: "#2b2722", opacity: 0.85 },
  { d: ridge(4.7, 650, 70), top: "#1a1815", opacity: 0.95 },
  { d: ridge(8.2, 760, 55), top: "#0c0b0a", opacity: 1 },
]

const pale: Mood[] = ["wind", "snow", "petal", "firefly"]

export const sunColor: Record<Mood, string> = {
  gold: "#d9932b",
  maple: "#c8102e",
  crimson: "#c8102e",
  wind: "#ece6da",
  petal: "#e8c3d0",
  snow: "#e6edf5",
  ember: "#d9452b",
  firefly: "#eae6b0",
}

export function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} 900`} preserveAspectRatio="xMidYMax slice" className={`absolute inset-0 h-full w-full ${className}`} aria-hidden="true">
      <defs>
        {ridges.map((r, i) => (
          <linearGradient key={i} id={`got-ridge-${i}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.45" stopColor={r.top} stopOpacity={r.opacity} />
            <stop offset="0.75" stopColor="#0a0908" stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>
      {ridges.map((r, i) => (
        <path key={i} d={r.d} fill={`url(#got-ridge-${i})`} />
      ))}
    </svg>
  )
}

export function Paper() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
      <filter id="got-washi">
        <feTurbulence type="fractalNoise" baseFrequency="0.55" numOctaves="2" seed="7" />
        <feColorMatrix values="0 0 0 0 0.92  0 0 0 0 0.89  0 0 0 0 0.84  0 0 0 0.9 -0.32" />
      </filter>
      <rect width="100%" height="100%" filter="url(#got-washi)" />
    </svg>
  )
}

export function Scenery({ mood, photo, sun = "high", dim = false }: { mood: Mood; photo?: string; sun?: "low" | "high"; dim?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_70%_75%,#2a2520_0%,#141210_45%,#070706_100%)]" />
      {photo && (
        <div key={photo} className="got-fade absolute inset-0">
          <div className="got-photo absolute inset-0" style={{ opacity: dim ? 0.1 : 0.22 }}>
            <Image src={`/themes/ghost-of-tsushima/backdrops/${photo}.webp`} alt="" fill sizes="100vw" className="object-cover grayscale" />
          </div>
        </div>
      )}
      <span
        className={`got-sun absolute rounded-full ${
          sun === "low"
            ? "right-[8%] top-[10%] h-[24vw] w-[24vw] lg:left-[40%] lg:right-auto lg:top-[30%] lg:h-[min(20vw,290px)] lg:w-[min(20vw,290px)]"
            : "right-[8%] top-[8%] h-[min(22vw,240px)] w-[min(22vw,240px)]"
        }`}
        style={{
          backgroundColor: sunColor[mood],
          opacity: (dim ? 0.32 : 0.95) * (pale.includes(mood) ? 0.55 : 1),
        }}
      />
      <Mountains className={dim ? "opacity-70" : ""} />
      <div className="got-mist absolute inset-x-0 bottom-[30%] h-[14vh]" />
      <div className="got-mist got-mist-slow absolute inset-x-0 bottom-[14%] h-[12vh]" />
      <Paper />
    </div>
  )
}

export function Enso({ className = "h-24 w-24", children, draw = false, color = "currentColor" }: { className?: string; children?: React.ReactNode; draw?: boolean; color?: string }) {
  return (
    <span className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
        <path
          d="M62 9C84 14 95 34 91 55C87 77 66 92 44 90C22 88 7 70 9 48C11 28 27 12 47 10"
          pathLength="1"
          className={draw ? "got-draw" : undefined}
          fill="none"
          stroke={color}
          strokeWidth="5.5"
          strokeLinecap="round"
          opacity="0.9"
        />
        <path d="M47 10C52 9.5 57 9.4 61 10" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.45" />
      </svg>
      {children}
    </span>
  )
}

export function Written({ children, className = "", delay = 0, vertical = false }: { children: React.ReactNode; className?: string; delay?: number; vertical?: boolean }) {
  return (
    <span className={`${vertical ? "got-write-v" : "got-write"} inline-block ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </span>
  )
}
