import { Enso, Written } from "./ink"

export function Seal({ char = "影", className = "h-12 w-12 text-2xl", color = "#c8102e" }: { char?: string; className?: string; color?: string }) {
  return (
    <span className={`got-seal ${className}`} style={{ backgroundColor: color }} aria-hidden="true">
      <span>{char}</span>
    </span>
  )
}

export function Heading({ kanji, epithet, title, line }: { kanji: string; epithet: string; title: string; line?: string }) {
  return (
    <header className="got-rise mb-10 flex items-center gap-5 sm:mb-14 sm:gap-7">
      <Enso draw color="#f4eee4" className="h-24 w-24 shrink-0 sm:h-36 sm:w-36">
        <Written className="font-brush text-[3.4rem] leading-none text-[#c8102e] sm:text-[5.2rem]" delay={0.2} vertical>
          {kanji}
        </Written>
      </Enso>
      <div className="min-w-0 pb-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/55">{epithet}</p>
        <h2 className="mt-2 text-[clamp(1.8rem,4.4vw,3.4rem)] font-extrabold uppercase leading-none tracking-[0.08em] sm:tracking-[0.14em]">{title}</h2>
        {line && <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[#ece6da]/70">{line}</p>}
      </div>
    </header>
  )
}

export function Rule({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`got-stroke got-reveal block h-2 bg-[#ece6da]/25 ${className}`} />
}

export const numerals = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
