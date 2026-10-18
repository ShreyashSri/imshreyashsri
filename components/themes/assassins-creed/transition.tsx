import type { SequenceId } from "./sequences"
import { sequenceNumber, sequences } from "./sequences"

export type Jump = { kind: "sync" | "leap"; to: SequenceId; key: number }

const cols = 6
const rowsCount = 4

const tiles = Array.from({ length: cols * rowsCount * 2 }, (_, n) => {
  const cell = Math.floor(n / 2)
  const c = cell % cols
  const r = Math.floor(cell / cols)
  const upper = n % 2 === 0
  const seed = (n * 37) % 17
  return {
    left: `${(c / cols) * 100}%`,
    top: `${(r / rowsCount) * 100}%`,
    clip: upper ? "polygon(0 0, 100% 0, 0 100%)" : "polygon(100% 0, 100% 100%, 0 100%)",
    dx: `${(seed - 8) * 14}px`,
    dy: `${((n * 53) % 19 - 9) * 12}px`,
    rot: `${(seed - 8) * 6}deg`,
    delay: `${((c + r) % 5) * 26 + (n % 2) * 18}ms`,
  }
})

export function JumpOverlay({ jump }: { jump: Jump }) {
  const seq = sequences.find((s) => s.id === jump.to) ?? sequences[0]
  const caption = (
    <div className="an-jump-caption absolute inset-x-0 top-1/2 mx-auto w-[min(420px,80vw)] -translate-y-1/2 text-center text-(--an-ink)">
      <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.34em] text-(--an-red)">
        Sequence {sequenceNumber(seq.id)} · {seq.place}
      </p>
      <p className="mt-2 font-marcellus text-[clamp(1.8rem,4vw,2.6rem)] uppercase leading-none tracking-[0.06em]">{seq.label}</p>
      <div className="mt-5 h-[3px] w-full bg-(--an-line)">
        <span className="an-jump-bar block h-full bg-(--an-red)" />
      </div>
      <p className="mt-2 font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">{jump.kind === "sync" ? "Synchronising" : "Leap of faith"}</p>
    </div>
  )

  if (jump.kind === "leap") {
    return (
      <div key={jump.key} aria-hidden="true" className="an-leap fixed inset-0 z-50 overflow-hidden">
        <div className="an-leap-streaks absolute inset-x-0 top-0" />
        <div className="an-leap-white absolute inset-0" />
        {caption}
      </div>
    )
  }

  return (
    <div key={jump.key} aria-hidden="true" className="an-sync-jump fixed inset-0 z-50 overflow-hidden">
      {tiles.map((t, i) => (
        <span
          key={i}
          className="an-tile"
          style={
            {
              left: t.left,
              top: t.top,
              width: `calc(${100 / cols}% + 1px)`,
              height: `calc(${100 / rowsCount}% + 1px)`,
              clipPath: t.clip,
              "--dx": t.dx,
              "--dy": t.dy,
              "--rot": t.rot,
              animationDelay: t.delay,
            } as React.CSSProperties
          }
        />
      ))}
      {caption}
    </div>
  )
}
