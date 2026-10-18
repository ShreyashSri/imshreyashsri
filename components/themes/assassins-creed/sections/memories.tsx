import { chapters } from "@/data/resume"
import { Sync } from "../ui"

function MemoryBlock({ number, live }: { number: string; live: boolean }) {
  return (
    <div className="relative flex h-full min-h-[180px] flex-col justify-between overflow-hidden bg-[#1c2a33] p-5 text-white">
      <svg aria-hidden="true" viewBox="0 0 40 200" preserveAspectRatio="none" className="absolute right-4 top-0 h-full w-8 opacity-50">
        <path d="M10 0 C30 25 30 25 10 50 S-10 75 10 100 30 125 10 150 -10 175 10 200" fill="none" stroke="#fff" strokeWidth="1.2" />
        <path d="M30 0 C10 25 10 25 30 50 S50 75 30 100 10 125 30 150 50 175 30 200" fill="none" stroke="#ff5a63" strokeWidth="1.2" />
      </svg>
      <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-white/60">Memory</p>
      <p className="font-marcellus text-6xl leading-none">{number}</p>
      <div>
        <ul className="flex gap-1" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <li key={i} className={`h-2.5 w-2.5 rotate-45 ${live ? "an-cell" : "bg-white/85"}`} style={live ? { animationDelay: `${i * 0.18}s` } : undefined} />
          ))}
        </ul>
        <p className="mt-3 font-exo text-[10px] font-semibold uppercase tracking-[0.26em] text-white/60">{live ? "Memory in progress" : "Memory complete"}</p>
      </div>
    </div>
  )
}

export function MemoriesSection() {
  const memories = [...chapters].reverse()
  return (
    <ol className="space-y-6">
      {memories.map((c, i) => {
        const live = c.period.includes("present")
        return (
          <li key={c.company} className="an-card an-card-hover group grid overflow-hidden md:grid-cols-[220px_1fr]">
            <MemoryBlock number={String(memories.length - i).padStart(2, "0")} live={live} />
            <div className="p-6 sm:p-7">
              <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-red)">
                {c.period} · {c.place}
              </p>
              <h3 className="an-glitchy mt-2 font-marcellus text-[clamp(1.8rem,3vw,2.4rem)] uppercase leading-none tracking-[0.04em]">{c.company}</h3>
              <p className="mt-2 font-exo text-[12px] font-semibold uppercase tracking-[0.22em] text-(--an-muted)">{c.role}</p>
              <div className="mt-5 max-w-md">
                <Sync live={live} label={live ? "Memory sync" : "Full synchronisation"} />
              </div>
              <div className="mt-5 border-l-2 border-(--an-key) pl-4">
                <p className="an-key font-exo text-[10px] font-bold uppercase tracking-[0.3em]">Full sync objective</p>
                <p className="mt-1 font-exo text-[15px] leading-relaxed">{c.gold}</p>
              </div>
              <ul className="mt-4 space-y-2">
                {c.objectives.map((o) => (
                  <li key={o} className="flex gap-3 font-exo text-[14.5px] leading-relaxed text-(--an-muted)">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-(--an-ink)" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.stack.map((s) => (
                  <span key={s} className="an-chip">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}
