"use client"

import { profile } from "@/data/resume"

export function PlayerCard({ large = false }: { large?: boolean }) {
  return (
    <div
      className={`val-player relative flex h-full flex-col justify-end overflow-hidden border border-[#ff4655] bg-[#ff4655]/10 ${large ? "p-5" : "p-3"}`}
      onPointerMove={(e) => {
        if (!large) return
        const r = e.currentTarget.getBoundingClientRect()
        e.currentTarget.style.setProperty("--rx", `${((e.clientY - r.top) / r.height - 0.5) * -12}deg`)
        e.currentTarget.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`)
      }}
      onPointerLeave={(e) => {
        e.currentTarget.style.setProperty("--rx", "0deg")
        e.currentTarget.style.setProperty("--ry", "0deg")
      }}
    >
      <svg viewBox="0 0 100 160" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <path d="M0 0h100v70L0 120z" fill="#ff4655" opacity="0.85" />
        <path d="M100 40v80L30 160H0v-20z" fill="#0f1923" opacity="0.6" />
        <path d="M18 18l22 52h-10L14 30zM82 18L58 70h10l18-40z" fill="#ece8e1" opacity="0.9" />
        <path d="M0 132h100" stroke="#ece8e1" strokeOpacity="0.25" strokeWidth="0.6" />
      </svg>
      <span className="absolute left-2 top-2 bg-[#0f1923] px-1.5 py-0.5 font-barlow-condensed text-[9px] font-bold uppercase tracking-[0.2em] text-[#f0c35a]">Leader</span>
      {large && <span className="val-player-glint pointer-events-none absolute inset-0" />}
      <div className="relative">
        <p className={`font-anton uppercase leading-none ${large ? "text-3xl" : "text-lg"}`}>{profile.handle}</p>
        <p className={`mt-1 font-barlow-condensed uppercase tracking-[0.2em] text-white/70 ${large ? "text-xs" : "text-[10px]"}`}>{profile.role}</p>
      </div>
    </div>
  )
}
