"use client"

import { useEffect, useRef } from "react"


const sections: { title: string; lines: { name: string; credit: string; href?: string }[] }[] = [
  {
    title: "Written and built by",
    lines: [{ name: "Shreyash Srivastava", credit: "Bangalore, 2026" }],
  },
  {
    title: "Typefaces",
    lines: [
      { name: "Redemption", credit: "Rockstar North" },
      { name: "Chinese Rocks & Kirsty", credit: "Ray Larabie, Typodermic Fonts", href: "https://typodermicfonts.com" },
      { name: "Arthur Morgan handwriting", credit: "Fan recreation", href: "https://www.cufonfonts.com/font/arthurmorgancursivehandwriting" },
      { name: "Arvo, Open Sans, Special Elite, UnifrakturMaguntia", credit: "Google Fonts" },
    ],
  },
  {
    title: "Pictures",
    lines: [
      { name: "Screenshots and key art", credit: "Rockstar Games, via GTA Base", href: "https://www.gtabase.com/red-dead-redemption-2/screenshots/story-mode/" },
      { name: "Paper scans", credit: "ambientCG, CC0", href: "https://ambientcg.com" },
      { name: "Tool logos", credit: "Simple Icons, CC0", href: "https://simpleicons.org" },
    ],
  },
]

export function Credits({ onClose }: { onClose: () => void }) {
  const scroller = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => window.removeEventListener("keydown", onKey)
    let raf = 0
    let rolling = true
    const stop = () => (rolling = false)
    const el = scroller.current
    el?.addEventListener("wheel", stop, { passive: true })
    el?.addEventListener("touchstart", stop, { passive: true })
    const tick = () => {
      if (rolling && el) el.scrollTop += 0.6
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", onKey)
      el?.removeEventListener("wheel", stop)
      el?.removeEventListener("touchstart", stop)
    }
  }, [onClose])

  return (
    <div data-menu className="fixed inset-0 z-750 bg-black text-white" role="dialog" aria-modal="true" aria-label="Credits">
      <div ref={scroller} className="h-full overflow-y-auto">
        <div className="mx-auto max-w-2xl px-6 pb-[60vh] pt-[45vh] text-center">
          <p className="font-redemption text-[clamp(3rem,8vw,5rem)] leading-none">CREDITS</p>
          {sections.map((section) => (
            <section key={section.title} className="mt-20">
              <h2 className="font-rocks text-[22px] uppercase tracking-[0.14em] text-white/55">{section.title}</h2>
              <ul className="mt-6 space-y-5">
                {section.lines.map((line) => (
                  <li key={line.name}>
                    <p className="font-rocks text-[28px] uppercase leading-none">{line.name}</p>
                    <p className="mt-1.5 font-slab text-[15px] text-white/70">
                      {line.href ? (
                        <a href={line.href} target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:text-white">
                          {line.credit}
                        </a>
                      ) : (
                        line.credit
                      )}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
          <p className="mt-28 font-slab text-[14px] leading-relaxed text-white/55">
            A fan tribute to Red Dead Redemption 2. Not affiliated with or endorsed by Rockstar Games.
          </p>
        </div>
      </div>
      <button type="button" onClick={onClose} className="absolute bottom-5 right-6 flex items-center gap-2 font-sans text-[13px] uppercase tracking-wide text-white/90 hover:text-white" autoFocus>
        Close
      </button>
    </div>
  )
}
