import { rng } from "./ui"

function gear(cx: number, cy: number, r: number, teeth: number) {
  const pts: string[] = []
  for (let i = 0; i < teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2
    const rad = i % 4 < 2 ? r : r * 0.84
    pts.push(`${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`)
  }
  return `M${pts.join("L")}Z`
}

export function Schematic({ seed, script }: { seed: number; script: string }) {
  const r = rng(seed + 11)
  const g1 = { x: 300 + r() * 40, y: 84 + r() * 24, r: 40 + r() * 16, t: 10 + Math.floor(r() * 6) }
  const g2 = { x: g1.x - g1.r - 22 - r() * 8, y: g1.y + g1.r * 0.95, r: 18 + r() * 9, t: 8 + Math.floor(r() * 4) }
  const pivot = { x: 352 + r() * 20, y: 252 + r() * 14 }
  const ribs = Array.from({ length: 6 }, (_, i) => {
    const a = -Math.PI * (0.56 + i * 0.07 + r() * 0.02)
    const len = 130 + r() * 40 - i * 8
    const ex = pivot.x + len * Math.cos(a)
    const ey = pivot.y + len * Math.sin(a)
    const cx = pivot.x + len * 0.55 * Math.cos(a - 0.25)
    const cy = pivot.y + len * 0.55 * Math.sin(a - 0.25)
    return { d: `M${pivot.x},${pivot.y} Q${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)}`, ex, ey }
  })
  const membrane = `M${ribs.map((b) => `${b.ex.toFixed(1)},${b.ey.toFixed(1)}`).join(" L")}`
  const words = script.split(" ").slice(0, 9)
  const lines = [words.slice(0, 3).join(" "), words.slice(3, 6).join(" "), words.slice(6, 9).join(" ")].filter(Boolean)
  const ink = { fill: "none", stroke: "var(--an-paper-ink)", vectorEffect: "non-scaling-stroke" as const }
  const draw = (delay: number) => ({ className: "an-ink-draw", pathLength: 1, style: { animationDelay: `${delay}s` } })

  return (
    <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <g opacity="0.75">
        <circle cx={g1.x} cy={g1.y} r={g1.r * 1.9} {...ink} strokeOpacity="0.25" strokeDasharray="2 5" />
        <line x1="20" y1={g1.y} x2="390" y2={g1.y} {...ink} strokeOpacity="0.18" strokeDasharray="6 4" />
        <line x1={g1.x} y1="10" x2={g1.x} y2="290" {...ink} strokeOpacity="0.18" strokeDasharray="6 4" />
        <path d={gear(g1.x, g1.y, g1.r, g1.t)} {...ink} strokeWidth="1.4" {...draw(0.1)} />
        <circle cx={g1.x} cy={g1.y} r={g1.r * 0.32} {...ink} strokeWidth="1.2" {...draw(0.5)} />
        {Array.from({ length: 4 }, (_, i) => {
          const a = (i / 4) * Math.PI * 2 + r()
          return <line key={i} x1={g1.x + g1.r * 0.32 * Math.cos(a)} y1={g1.y + g1.r * 0.32 * Math.sin(a)} x2={g1.x + g1.r * 0.8 * Math.cos(a)} y2={g1.y + g1.r * 0.8 * Math.sin(a)} {...ink} strokeWidth="1" {...draw(0.6 + i * 0.1)} />
        })}
        <path d={gear(g2.x, g2.y, g2.r, g2.t)} {...ink} strokeWidth="1.2" {...draw(0.4)} />
        <circle cx={g2.x} cy={g2.y} r="3" fill="var(--an-paper-ink)" />
        {ribs.map((b, i) => (
          <path key={i} d={b.d} {...ink} strokeWidth="1.1" {...draw(0.8 + i * 0.12)} />
        ))}
        <path d={membrane} {...ink} strokeWidth="0.9" strokeOpacity="0.7" {...draw(1.4)} />
        <circle cx={pivot.x} cy={pivot.y} r="5" {...ink} strokeWidth="1.2" />
        <g {...ink} strokeOpacity="0.6" strokeWidth="0.9">
          <line x1="236" y1="288" x2="392" y2="288" />
          <line x1="236" y1="282" x2="236" y2="294" />
          <line x1="392" y1="282" x2="392" y2="294" />
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={236 + i * 19.5} y1="288" x2={236 + i * 19.5} y2={i % 4 === 0 ? 280 : 284} />
          ))}
          <line x1="12" y1="70" x2="12" y2="190" />
          {Array.from({ length: 7 }, (_, i) => (
            <line key={i} x1="12" y1={70 + i * 20} x2={i % 3 === 0 ? 20 : 16} y2={70 + i * 20} />
          ))}
        </g>
        <text x="314" y="278" textAnchor="middle" fontSize="11" fontStyle="italic" fill="var(--an-paper-ink)" fillOpacity="0.6" className="font-garamond">
          braccia {(seed % 7) + 3}
        </text>
      </g>
      <g transform="translate(400 0) scale(-1 1)" opacity="0.42">
        {lines.map((l, i) => (
          <text key={i} x="200" y={30 + i * 18} fontSize="15" fontStyle="italic" fill="var(--an-paper-ink)" className="font-garamond">
            {l}
          </text>
        ))}
      </g>
    </svg>
  )
}
