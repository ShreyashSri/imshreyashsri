import { awards, type Award } from "@/data/resume"
import { Insignia } from "../ui"

const seal = { gold: "#c9a24a", silver: "#9aa5ae", bronze: "#a8693a" }

const edge = Array.from({ length: 32 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 32
  const rad = i % 2 ? 26 : 29
  return `${(30 + rad * Math.cos(a)).toFixed(1)},${(30 + rad * Math.sin(a)).toFixed(1)}`
}).join(" ")

function Seal({ medal, className = "h-16 w-16" }: { medal: Award["medal"]; className?: string }) {
  return (
    <span className={`relative inline-flex shrink-0 items-center justify-center ${className}`}>
      <svg viewBox="0 0 60 60" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <polygon points={edge} fill={seal[medal]} />
        <circle cx="30" cy="30" r="21" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
      </svg>
      <Insignia className="relative h-1/2 w-1/2 text-black/45" />
    </span>
  )
}

function Card({ award, index }: { award: Award; index: number }) {
  const body = (
    <>
      <Seal medal={award.medal} className="h-14 w-14 transition-transform duration-500 group-hover:rotate-12" />
      <div className="min-w-0">
        <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">
          Honour {String(index + 1).padStart(2, "0")} · <span style={{ color: seal[award.medal] }}>{award.medal}</span>
        </p>
        <p className="mt-1 font-marcellus text-[21px] leading-tight">{award.title}</p>
        <p className="mt-1 font-exo text-[13px] text-(--an-muted)">{award.context}</p>
        {award.href && <p className="an-key mt-2 font-exo text-[10px] font-bold uppercase tracking-[0.3em]">Verify credential ↗</p>}
      </div>
    </>
  )
  const cls = "an-card an-card-hover group flex h-full items-start gap-4 p-5"
  return award.href ? (
    <a href={award.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  )
}

export function HonoursSection() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {awards.map((a, i) => (
        <li key={a.title}>
          <Card award={a} index={i} />
        </li>
      ))}
    </ul>
  )
}
