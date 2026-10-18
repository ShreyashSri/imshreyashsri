import { realms, type RealmId } from "./realms"
import { Key } from "./ui"

const GAP = 108

export function Compass({ active, onPick, onStep }: { active: RealmId; onPick: (id: RealmId) => void; onStep: (dir: number) => void }) {
  const index = realms.findIndex((r) => r.id === active)

  return (
    <div className="flex w-full items-center gap-2 sm:gap-3">
      <Key label="Q" hint="Previous section" onClick={() => onStep(-1)} />
      <nav aria-label="Sections" className="gow-compass relative h-[58px] min-w-0 flex-1 overflow-hidden">
        <span className="gow-compass-needle" aria-hidden="true" />
        <ol
          className="absolute top-0 left-1/2 h-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
          style={{ transform: `translateX(${-index * GAP}px)` }}
        >
          <li className="gow-compass-ticks absolute top-[9px] h-[9px]" style={{ left: -GAP * 3, width: GAP * (realms.length + 5) }} aria-hidden="true" />
          {realms.map((r, i) => {
            const on = i === index
            return (
              <li key={r.id} className="absolute top-0" style={{ left: i * GAP, transform: "translateX(-50%)" }}>
                <button
                  type="button"
                  aria-current={on ? "page" : undefined}
                  onClick={() => onPick(r.id)}
                  className="group flex w-[100px] flex-col items-center pt-3.5"
                >
                  <span
                    className="flex h-6 w-6 rotate-45 items-center justify-center border transition-all duration-300"
                    style={{
                      borderColor: on ? r.accent : "rgba(200,162,74,0.5)",
                      background: on ? "#1d1a0e" : "#071012",
                      boxShadow: on ? `0 0 14px ${r.accent}` : undefined,
                    }}
                  >
                    <span className="-rotate-45 font-runic text-[13px]" style={{ color: on ? "#fff3d0" : "#c8a24a" }}>
                      {r.rune}
                    </span>
                  </span>
                  <span
                    className={`mt-1.5 whitespace-nowrap font-cinzel text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${on ? "text-[#fff3d0]" : "text-[#e8dfc8]/45 group-hover:text-[#e8dfc8]/85"}`}
                  >
                    {r.title}
                  </span>
                </button>
              </li>
            )
          })}
        </ol>
      </nav>
      <Key label="E" hint="Next section" onClick={() => onStep(1)} />
    </div>
  )
}
