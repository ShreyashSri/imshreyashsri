import { awards } from "@/data/resume"
import { Heading } from "../ui"
import type { PageProps } from "."

const medal = { gold: "#f2c45a", silver: "#cfd8dc", bronze: "#d08a52" }
const glyph = ["ᛉ", "ᛏ", "ᛊ", "ᚨ", "ᛟ", "ᛞ", "ᚱ"]

export function Awards({ realm }: PageProps) {
  return (
    <div>
      <Heading
        rune={realm.rune}
        realm={realm.realm}
        codex={realm.codex}
        title="Awards"
        right={<p className="font-garamond text-lg italic text-[#e8dfc8]/60">{awards.length} trials won</p>}
      />
      <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {awards.map((a, i) => {
          const stone = (
            <>
              <span className="gow-runestone-glyph font-runic text-[46px] leading-none sm:text-[64px]" style={{ "--medal": medal[a.medal] } as React.CSSProperties}>
                {glyph[i % glyph.length]}
              </span>
              <span className="gow-carve mt-3 block font-cinzel text-[13px] font-bold uppercase leading-tight tracking-[0.04em] sm:mt-4 sm:text-[17px]">{a.title}</span>
              <span className="gow-carve-soft mt-2 block font-garamond text-sm italic sm:text-base">{a.context}</span>
              <span className="mt-4 block font-cinzel text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: medal[a.medal] }}>
                {a.medal}
                {a.href && " · Verify ›"}
              </span>
            </>
          )
          return (
            <li key={a.title} className="gow-tablet-wrap">
              {a.href ? (
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="gow-runestone gow-stone group flex h-full flex-col items-center px-3 pb-6 pt-8 text-center sm:px-5 sm:pb-7 sm:pt-10">
                  {stone}
                </a>
              ) : (
                <div className="gow-runestone gow-stone group flex h-full flex-col items-center px-3 pb-6 pt-8 text-center sm:px-5 sm:pb-7 sm:pt-10">{stone}</div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
