import { ArrowUpRight } from "lucide-react"

import { awards } from "@/data/resume"
import { Seal } from "../ui"

const seals = {
  gold: { char: "金", color: "#c8102e" },
  silver: { char: "銀", color: "#5f6670" },
  bronze: { char: "銅", color: "#8a4f2c" },
}

export function Records() {
  const count = (m: keyof typeof seals) => awards.filter((a) => a.medal === m).length
  return (
    <div>
      <ul className="got-rise mb-10 flex flex-wrap gap-6 sm:gap-10" aria-label="Seals earned">
        {(Object.keys(seals) as (keyof typeof seals)[]).map((m) => (
          <li key={m} className="flex items-center gap-3">
            <Seal char={seals[m].char} color={seals[m].color} className="got-stamp h-10 w-10 text-xl" />
            <span className="font-brush text-3xl text-[#f4eee4]">{count(m)}</span>
            <span className="text-[10.5px] font-bold uppercase tracking-[0.32em] text-[#ece6da]/55">{m}</span>
          </li>
        ))}
      </ul>
      <ol className="divide-y divide-[#ece6da]/10 border-y border-[#ece6da]/10">
        {awards.map((a, i) => {
          const seal = seals[a.medal]
          return (
            <li key={a.title} className="got-rise group flex items-center gap-5 py-6 sm:gap-8" style={{ animationDelay: `${i * 0.06}s` }}>
              <Seal char={seal.char} color={seal.color} className="h-12 w-12 text-2xl transition-transform duration-500 group-hover:-rotate-6 sm:h-14 sm:w-14 sm:text-3xl" />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-extrabold uppercase leading-snug tracking-[0.1em] sm:text-xl">{a.title}</h3>
                <p className="mt-1 text-sm text-[#ece6da]/65">{a.context}</p>
              </div>
              {a.href && (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="got-btn shrink-0 px-3! sm:px-5!" aria-label={`View ${a.title} credential`}>
                  <span className="hidden sm:inline">Credential</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
