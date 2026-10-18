import { realms, type RealmId } from "./realms"

const futhark = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ"
const C = 300
const R = 212

const point = (i: number, radius: number) => {
  const angle = (i / realms.length) * Math.PI * 2 - Math.PI / 2
  return { x: C + Math.cos(angle) * radius, y: C + Math.sin(angle) * radius }
}

const bezier = (t: number, a: number, b: number, c: number, d: number) => (1 - t) ** 3 * a + 3 * (1 - t) ** 2 * t * b + 3 * (1 - t) * t ** 2 * c + t ** 3 * d

const branches = realms.map((_, i) => {
  const end = point(i, R - 24)
  const up = end.y < C + 20
  const sy = up ? C - 34 : C + 70
  const c1 = { x: C, y: up ? sy - 50 : sy + 40 }
  const c2 = { x: C + (end.x - C) * 0.55, y: end.y + (up ? 60 : -50) * (1 - Math.abs(end.x - C) / R) }
  const d = `M${C} ${sy} C${c1.x} ${c1.y} ${c2.x.toFixed(1)} ${c2.y.toFixed(1)} ${end.x.toFixed(1)} ${end.y.toFixed(1)}`
  const twigs = [0.45, 0.7].map((t, k) => {
    const x = bezier(t, C, c1.x, c2.x, end.x)
    const y = bezier(t, sy, c1.y, c2.y, end.y)
    const side = (k === 0 ? 1 : -1) * (end.x >= C ? 1 : -1)
    const len = 26 - k * 8
    return `M${x.toFixed(1)} ${y.toFixed(1)} q${(side * len * 0.4).toFixed(1)} ${(-len * 0.5).toFixed(1)} ${(side * len).toFixed(1)} ${(-len * 0.7).toFixed(1)}`
  })
  return { d, twigs }
})

const roots = [
  "M300 370 C300 410 280 440 246 460",
  "M300 370 C302 420 322 446 360 462",
  "M300 380 C296 420 300 450 298 486",
  "M276 432 C262 446 246 452 226 452",
  "M318 438 C334 452 352 456 372 454",
]

export function Yggdrasil({ active, onHover, onOpen }: { active: RealmId; onHover: (id: RealmId) => void; onOpen: (id: RealmId, x: number, y: number) => void }) {
  const index = realms.findIndex((r) => r.id === active)
  const realm = realms[index]

  const open = (id: RealmId, e: React.MouseEvent) => onOpen(id, e.clientX, e.clientY)

  return (
    <svg viewBox="-80 14 760 572" className="h-full w-full overflow-visible" role="group" aria-label="Realm travel" style={{ "--realm": realm.accent } as React.CSSProperties}>
      <defs>
        <radialGradient id="ygg-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={realm.accent} stopOpacity="0.4" />
          <stop offset="55%" stopColor={realm.accent} stopOpacity="0.07" />
          <stop offset="100%" stopColor={realm.accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ygg-lens" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#173033" />
          <stop offset="100%" stopColor="#060d0f" />
        </radialGradient>
        <filter id="ygg-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <circle cx={C} cy={C} r={250} fill="url(#ygg-core)" className="gow-pulse" />
      <circle cx={C} cy={C} r={R + 40} fill="none" stroke="#c8a24a" strokeOpacity="0.22" className="gow-draw" pathLength={1} />
      <circle cx={C} cy={C} r={R + 4} fill="none" stroke="#c8a24a" strokeOpacity="0.35" strokeDasharray="1 7" />
      <circle cx={C} cy={C} r={R - 70} fill="none" stroke="#c8a24a" strokeOpacity="0.14" />

      <g className="gow-spin">
        {futhark.split("").map((rune, i, all) => (
          <text
            key={i}
            x={C}
            y={C - (R + 22)}
            textAnchor="middle"
            dominantBaseline="middle"
            transform={`rotate(${(i / all.length) * 360} ${C} ${C})`}
            className="fill-[#c8a24a] font-runic text-[15px]"
            opacity="0.62"
          >
            {rune}
          </text>
        ))}
      </g>
      <g className="gow-spin-rev" opacity="0.5">
        {Array.from({ length: 36 }, (_, i) => (
          <line key={i} x1={C} y1={C - R + 64} x2={C} y2={C - R + 72} stroke="#c8a24a" strokeOpacity="0.6" transform={`rotate(${i * 10} ${C} ${C})`} />
        ))}
      </g>

      <g fill="none" strokeLinecap="round">
        <path d="M300 470 C296 420 304 360 300 300 C298 250 302 230 300 200" stroke="#c8a24a" strokeWidth="9" strokeOpacity="0.85" className="gow-draw" pathLength={1} />
        <path d="M300 470 C296 420 304 360 300 300 C298 250 302 230 300 200" stroke="#fff3d0" strokeWidth="2" strokeOpacity="0.35" className="gow-draw" pathLength={1} />
        {roots.map((d, i) => (
          <path key={d} d={d} stroke="#c8a24a" strokeWidth={i < 3 ? 4 : 2.2} strokeOpacity="0.7" className="gow-draw" pathLength={1} style={{ animationDelay: `${0.5 + i * 0.08}s` }} />
        ))}
        {branches.map((b, i) => (
          <g key={realms[i].id}>
            <path d={b.d} stroke="#c8a24a" strokeWidth={3.4} strokeOpacity={realms[i].id === active ? 0.95 : 0.55} className="gow-draw" pathLength={1} style={{ animationDelay: `${0.7 + i * 0.07}s`, transition: "stroke-opacity .4s" }} />
            {b.twigs.map((t, k) => (
              <path key={k} d={t} stroke="#c8a24a" strokeWidth={1.4} strokeOpacity={0.45} className="gow-draw" pathLength={1} style={{ animationDelay: `${1.1 + i * 0.07 + k * 0.1}s` }} />
            ))}
          </g>
        ))}
        <path key={active} d={branches[index].d} stroke={realm.accent} strokeWidth="4" pathLength={1} className="gow-flow" filter="url(#ygg-glow)" />
      </g>

      {realms.map((r, i) => {
        const p = point(i, R)
        const on = r.id === active
        const label = point(i, R + 58)
        const dx = label.x - C
        const anchor = Math.abs(dx) < 12 ? "middle" : dx > 0 ? "start" : "end"
        const ly = Math.abs(dx) < 12 ? label.y + Math.sign(label.y - C) * 4 : label.y
        return (
          <g
            key={r.id}
            role="button"
            tabIndex={-1}
            aria-label={`${r.realm}, ${r.title}`}
            className="gow-node-g cursor-pointer"
            style={{ "--node": r.accent, animationDelay: `${1.2 + i * 0.06}s` } as React.CSSProperties}
            onMouseEnter={() => onHover(r.id)}
            onClick={(e) => open(r.id, e)}
          >
            <circle cx={p.x} cy={p.y} r={34} fill="transparent" />
            {on && <circle cx={p.x} cy={p.y} r={30} fill="none" stroke={r.accent} strokeOpacity="0.6" className="gow-ripple" style={{ transformOrigin: `${p.x}px ${p.y}px` }} />}
            <rect
              x={p.x - 19}
              y={p.y - 19}
              width={38}
              height={38}
              transform={`rotate(45 ${p.x} ${p.y})`}
              fill={on ? "#1d1a0e" : "#081113"}
              stroke={on ? r.accent : "#c8a24a"}
              strokeOpacity={on ? 1 : 0.55}
              strokeWidth={on ? 2 : 1.2}
              filter={on ? "url(#ygg-glow)" : undefined}
            />
            <rect x={p.x - 13} y={p.y - 13} width={26} height={26} transform={`rotate(45 ${p.x} ${p.y})`} fill="none" stroke="#c8a24a" strokeOpacity="0.25" />
            <text x={p.x} y={p.y + 1} textAnchor="middle" dominantBaseline="middle" className="font-runic text-[22px]" fill={on ? "#fff3d0" : "#c8a24a"}>
              {r.rune}
            </text>
            <g className="max-sm:hidden">
              <text x={label.x} y={ly - 8} textAnchor={anchor} dominantBaseline="middle" className="font-cinzel text-[11px] font-bold uppercase tracking-[0.22em]" fill={on ? r.accent : "#c8a24a"} fillOpacity={on ? 1 : 0.7}>
                {r.realm}
              </text>
              <text x={label.x} y={ly + 9} textAnchor={anchor} dominantBaseline="middle" className="font-cinzel text-[15px] font-bold uppercase tracking-[0.08em]" fill={on ? "#fff3d0" : "#e8dfc8"} fillOpacity={on ? 1 : 0.6}>
                {r.title}
              </text>
            </g>
          </g>
        )
      })}

      <g role="button" tabIndex={-1} aria-label={`Travel to ${realm.realm}`} className="cursor-pointer" onClick={(e) => open(realm.id, e)}>
        <circle cx={C} cy={C} r={70} fill="url(#ygg-lens)" stroke={realm.accent} strokeOpacity="0.85" strokeWidth="1.6" />
        <circle cx={C} cy={C} r={62} fill="none" stroke="#c8a24a" strokeOpacity="0.3" strokeDasharray="2 4" className="gow-spin-rev" />
        <g key={realm.id} className="gow-lens-in">
          <text x={C} y={C - 12} textAnchor="middle" dominantBaseline="middle" className="font-runic text-[46px]" fill="#fff3d0" filter="url(#ygg-glow)">
            {realm.rune}
          </text>
          <text x={C} y={C + 30} textAnchor="middle" dominantBaseline="middle" className="font-cinzel text-[11px] font-bold uppercase tracking-[0.24em]" fill={realm.accent}>
            {realm.realm}
          </text>
          <text x={C} y={C + 46} textAnchor="middle" dominantBaseline="middle" className="font-cinzel text-[9px] font-bold uppercase tracking-[0.28em]" fill="#e8dfc8" fillOpacity="0.6">
            {realm.title}
          </text>
        </g>
      </g>
    </svg>
  )
}
