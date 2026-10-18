import { awards, contributions } from "@/data/resume"
import { Bar, Heading } from "../ui"

const medal = { gold: "#f0c35a", silver: "#c8ccd2", bronze: "#c98a55" }

export function BattlepassTab() {
  return (
    <div className="val-in">
      <Heading
        kicker="Battlepass · Act 2026"
        title="Achievements"
        right={
          <div className="w-56">
            <p className="mb-2 flex justify-between font-barlow-condensed text-xs font-semibold uppercase tracking-[0.2em]">
              <span>Tier {awards.length}</span>
              <span className="text-white/50">Completed</span>
            </p>
            <Bar value={1} />
          </div>
        }
      />

      <ol className="no-scrollbar -mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-3">
        {awards.map((a, i) => {
          const card = (
            <>
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.25em]">
                <span className="text-white/55">Tier {String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: medal[a.medal] }}>✓</span>
              </div>
              <div className="flex h-36 items-center justify-center val-hatch">
                <svg viewBox="0 0 40 48" className="h-20 w-16 transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                  <path d="M10 0h8l4 16h-8zM22 0h8l-4 16h-8z" fill="#ff4655" />
                  <circle cx="20" cy="30" r="15" fill={medal[a.medal]} />
                  <path d="M20 21l3 6 6.5.9-4.7 4.6 1.1 6.5L20 36l-5.9 3 1.1-6.5-4.7-4.6 6.5-.9z" fill="#0f1923" opacity="0.55" />
                </svg>
              </div>
              <div className="px-3 py-3">
                <p className="font-anton text-lg uppercase leading-tight">{a.title}</p>
                <p className="mt-1 font-barlow text-xs text-white/60">{a.context}</p>
              </div>
            </>
          )
          return (
            <li key={a.title} className="w-56 shrink-0 snap-start">
              {a.href ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="val-panel val-card group block h-full">
                  {card}
                </a>
              ) : (
                <div className="val-panel val-card group h-full">{card}</div>
              )}
            </li>
          )
        })}
      </ol>

      <h3 className="mb-3 mt-10 font-barlow-condensed text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Contracts · Open source</h3>
      <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {contributions.map((c) => (
          <li key={c.camp}>
            <a href={c.href} target="_blank" rel="noopener noreferrer" className="val-panel val-card block h-full p-5">
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-anton text-xl uppercase leading-tight">{c.camp}</p>
                <span className="shrink-0 font-barlow-condensed text-[11px] uppercase tracking-[0.2em] text-[#2fd3b2]">{c.role}</span>
              </div>
              <div className="my-3">
                <Bar value={1} color="#2fd3b2" />
              </div>
              <ul className="space-y-2">
                {c.deeds.map((d) => (
                  <li key={d} className="flex gap-2.5 font-barlow text-sm leading-relaxed text-white/75">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[#2fd3b2]" />
                    {d}
                  </li>
                ))}
              </ul>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
