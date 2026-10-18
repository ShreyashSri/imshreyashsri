export function Heading({ kicker, title, right }: { kicker: string; title: string; right?: React.ReactNode }) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
      <div>
        <p className="font-barlow-condensed text-xs font-semibold uppercase tracking-[0.3em] text-[#ff4655]">{kicker}</p>
        <h2 className="mt-1 font-anton text-[clamp(2.4rem,5vw,4rem)] uppercase leading-[0.95] tracking-wide">{title}</h2>
      </div>
      {right}
    </header>
  )
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="border border-white/15 bg-white/5 px-2 py-1 font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80">{children}</span>
}

export const tiers = [
  { name: "Select", color: "#5a9fe2" },
  { name: "Deluxe", color: "#2fd3b2" },
  { name: "Premium", color: "#d1548d" },
  { name: "Ultra", color: "#f0c35a" },
  { name: "Exclusive", color: "#f5955b" },
]

export function Gem({ color, className = "h-4 w-4" }: { color: string; className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      <path d="M8 1l6 4v6l-6 4-6-4V5z" fill={color} />
      <path d="M8 1v14M2 5l12 6M14 5L2 11" stroke="rgba(15,25,35,0.45)" strokeWidth="0.8" />
    </svg>
  )
}

export function Bar({ value, color = "#ff4655" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full bg-white/10">
      <div className="h-full transition-[width] duration-700" style={{ width: `${Math.round(value * 100)}%`, background: color }} />
    </div>
  )
}

const weapons = {
  rifle: "M1 7h3l1-2h13l1 1h4v2h-4l-1 1h-3l-1 3h-3l1-3H9l-1 2H5l1-2H1z",
  pistol: "M2 5h14v3h-6l-1 1v4H5l1-4H2z",
  knife: "M1 8l12-4h9l-2 3H11l-2 2H5z",
  spike: "M8 1l6 4v7l-6 4-6-4V5zM8 4L5 6v4l3 2 3-2V6z",
  headshot: "M8 1a5 5 0 0 1 5 5v2l-1 1v3H4V9L3 8V6a5 5 0 0 1 5-5zM6 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm4 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z",
}

export type Weapon = keyof typeof weapons

export function WeaponIcon({ kind, className = "h-4 w-8" }: { kind: Weapon; className?: string }) {
  const wide = kind === "rifle" || kind === "knife"
  return (
    <svg viewBox={wide ? "0 0 24 14" : "0 0 16 16"} className={className} aria-hidden="true">
      <path d={weapons[kind]} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}

const roleGlyphs = {
  Duelist: "M30 4L10 56h12l8-22 8 22h12zM30 40l-4 12h8z",
  Initiator: "M30 4l5 19 19-5-14 14 14 14-19-5-5 19-5-19-19 5 14-14L6 18l19 5z",
  Sentinel: "M30 4l22 8v16c0 14-9 24-22 28C17 52 8 42 8 28V12zm0 10l-12 4v10c0 8 5 14 12 17 7-3 12-9 12-17V18z",
  Controller: "M30 6a24 24 0 1 1 0 48 24 24 0 0 1 0-48zm0 8a16 16 0 1 0 0 32 16 16 0 0 0 0-32zm0 8a8 8 0 1 1 0 16 8 8 0 0 1 0-16z",
}

export type Role = keyof typeof roleGlyphs

export function RoleGlyph({ role, className = "h-6 w-6" }: { role: Role; className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <path d={roleGlyphs[role]} fill="currentColor" fillRule="evenodd" />
    </svg>
  )
}
