import Image from "next/image"

import type { ValorantTab } from "./valorant-app"

const words: Record<ValorantTab, string> = {
  home: "Shreyash",
  career: "Career",
  collection: "Arsenal",
  agents: "Agents",
  battlepass: "Battlepass",
  news: "News",
  games: "Library",
  social: "Party",
}

const art: Partial<Record<ValorantTab, string>> = { home: "phoenix", career: "ascent", agents: "squad" }

const layouts = [
  { slab: "translate(58vw, -8vh) rotate(-12deg)", frame: "translate(66vw, 46vh) rotate(18deg)", band: "translate(-10vw, 70vh) rotate(-8deg)", line: "translate(44vw, 0) rotate(24deg)" },
  { slab: "translate(78vw, 40vh) rotate(8deg)", frame: "translate(4vw, 58vh) rotate(-22deg)", band: "translate(30vw, -6vh) rotate(6deg)", line: "translate(70vw, 0) rotate(-18deg)" },
  { slab: "translate(-14vw, 52vh) rotate(16deg)", frame: "translate(74vw, 8vh) rotate(-8deg)", band: "translate(44vw, 78vh) rotate(-4deg)", line: "translate(20vw, 0) rotate(30deg)" },
]

export function Backdrop({ tab, index }: { tab: ValorantTab; index: number }) {
  const l = layouts[index % layouts.length]
  return (
    <div aria-hidden="true" className="val-stage pointer-events-none absolute inset-0 overflow-hidden">
      {art[tab] && (
        <Image key={art[tab]} src={`/themes/valorant/art/${art[tab]}.webp`} alt="" fill preload={tab === "home"} sizes="100vw" className="val-art object-cover" />
      )}
      <div className="val-grid absolute inset-0" />
      <div className="val-shard val-shard-slab" style={{ transform: l.slab }} />
      <div className="val-shard val-shard-frame" style={{ transform: l.frame }} />
      <div className="val-shard val-shard-band val-hatch" style={{ transform: l.band }} />
      <div className="val-shard val-shard-line" style={{ transform: l.line }} />
      <p key={tab} className="val-word">{words[tab]}</p>
      <div className="val-sweep absolute inset-0" />
      <div className="absolute inset-0 bg-linear-to-t from-[#0f1923] via-transparent to-[#0f1923]/40" />
    </div>
  )
}

export function RoundBanner({ tab, index }: { tab: ValorantTab; index: number }) {
  return (
    <div key={tab} aria-hidden="true" className="val-banner pointer-events-none fixed inset-x-0 top-1/2 z-40 -translate-y-1/2">
      <div className="val-banner-band">
        <span className="font-barlow-condensed text-xs font-semibold uppercase tracking-[0.4em] text-white/80">Round {String(index + 1).padStart(2, "0")}</span>
        <span className="font-anton text-[clamp(2.6rem,7vw,5.5rem)] uppercase leading-none tracking-wide">{words[tab]}</span>
      </div>
    </div>
  )
}
