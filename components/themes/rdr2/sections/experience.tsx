import { chapters } from "@/data/resume"

const roman = ["I", "II", "III", "IV"]

function GoldMedal({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true">
      <path d="M8 0h7l3 14h-7zM17 0h7l-3 14h-7z" fill="#8c1a14" />
      <circle cx="16" cy="25" r="12" fill="#c9a24a" stroke="#6e5214" strokeWidth="1.5" />
      <path d="M16 18.5l2 4.1 4.5.6-3.3 3.1.8 4.5-4-2.1-4 2.1.8-4.5-3.3-3.1 4.5-.6z" fill="#6e5214" />
    </svg>
  )
}

export function ExperienceSection() {
  return (
    <ol className="mx-auto max-w-[960px] space-y-6">
      {[...chapters].reverse().map((c, i) => (
        <li key={c.company} className="border border-white/10 bg-black/55 px-6 py-7 backdrop-blur-xs sm:px-8">
          <p className="font-rocks text-[17px] uppercase tracking-wide text-white/55">Chapter {roman[chapters.length - 1 - i]}</p>
          <h3 className="mt-1 font-redemption text-[clamp(2.4rem,5vw,3.6rem)] uppercase leading-[0.9] text-white">{c.company}</h3>
          <p className="mt-3 font-slab text-[16px] text-white/85">
            {c.role} · {c.period} · {c.place}
          </p>

          <ul className="mt-5 space-y-3">
            {c.objectives.map((o) => (
              <li key={o} className="flex gap-3 font-slab text-[15.5px] leading-relaxed text-white/90">
                <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4 shrink-0 text-white/70" aria-hidden="true">
                  <rect x="1" y="1" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M5 10.5l3.2 3.2L15.5 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                {o}
              </li>
            ))}
            <li className="flex gap-3 font-slab text-[15.5px] leading-relaxed text-white">
              <GoldMedal className="mt-0.5 h-6 w-5 shrink-0" />
              <span>
                <span className="mr-2 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-gold">Gold medal</span>
                {c.gold}
              </span>
            </li>
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {c.stack.map((s) => (
              <li key={s} className="border border-white/20 px-2.5 py-1 font-sans text-[12px] font-semibold uppercase tracking-wide text-white/75">
                {s}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  )
}
