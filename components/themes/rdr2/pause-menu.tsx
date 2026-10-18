"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

import { sections, type SectionId } from "./sections"

export function PauseMenu({ tab, onTab, onClose }: { tab: SectionId; onTab: (tab: SectionId) => void; onClose: () => void }) {
  const index = sections.findIndex((s) => s.id === tab)
  const section = sections[index]
  const scroller = useRef<HTMLDivElement>(null)
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)

  const step = (dir: number) => {
    onTab(sections[(index + dir + sections.length) % sections.length].id)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea")) {
        if (e.key === "Escape") (e.target as HTMLElement).blur()
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "Escape") onClose()
      if (e.key === "q" || e.key === "Q") step(-1)
      if (e.key === "e" || e.key === "E") step(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    tabButtons.current[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
  }, [index])

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true })
    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = overflow
    }
  }, [])

  const { Content } = section

  return (
    <div
      data-menu
      className="fixed inset-0 z-700 flex flex-col bg-black text-bone motion-safe:animate-[menu-open_0.35s_ease-out]"
      role="dialog"
      aria-modal="true"
      aria-label={section.label}
    >
      <style>{`@keyframes menu-open { from { opacity: 0 } to { opacity: 1 } }
@keyframes tab-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }`}</style>

      {sections.map((s) => (
        <div key={s.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: s.id === tab ? 1 : 0 }} aria-hidden="true">
          <Image src={`/themes/rdr2/backdrops/${s.backdrop}.webp`} alt="" fill sizes="100vw" className="scale-105 object-cover filter-[blur(5px)_brightness(.42)_saturate(.75)]" />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,transparent_35%,rgba(0,0,0,0.75)_100%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-black/80 to-transparent" />

      <header className="relative z-10 pt-4 sm:pt-7">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute left-3 top-4 flex items-center gap-1 px-2 py-1 font-sans text-[12px] font-semibold uppercase tracking-wide text-bone/75 hover:text-white sm:left-6 sm:top-8"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Main menu</span>
        </button>

        <div className="flex items-center justify-center gap-3 pl-12 pr-3 sm:gap-5 sm:px-32">
          <button type="button" onClick={() => step(-1)} className="keycap hidden shrink-0 md:inline-flex" aria-label="Previous tab">
            Q
          </button>
          <nav className="no-scrollbar flex max-w-full items-center gap-5 overflow-x-auto scroll-px-6 sm:gap-7" aria-label="Sections">
            {sections.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabButtons.current[i] = el
                }}
                type="button"
                onClick={() => {
                  onTab(s.id)
                }}
                aria-current={s.id === tab ? "page" : undefined}
                className={`relative shrink-0 pb-1.5 font-rocks text-[21px] uppercase leading-none tracking-wide transition-colors sm:text-[26px] ${
                  s.id === tab ? "text-white" : "text-bone/45 hover:text-bone/80"
                }`}
              >
                {s.label}
                {s.id === tab && <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white" />}
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => step(1)} className="keycap hidden shrink-0 md:inline-flex" aria-label="Next tab">
            E
          </button>
        </div>
        <div className="mx-auto mt-3 h-px w-[min(1100px,92vw)] bg-linear-to-r from-transparent via-white/40 to-transparent" />
      </header>

      <div ref={scroller} className="relative z-10 flex-1 overflow-y-auto overscroll-contain px-4 pb-28 pt-6 sm:px-8">
        <div key={tab} className="mx-auto max-w-[1180px] motion-safe:animate-[tab-in_0.4s_ease-out]">
          <Content />
        </div>
      </div>

      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-center justify-between gap-6 bg-linear-to-t from-black/90 to-transparent px-4 pb-4 pt-10 font-sans text-[13px] uppercase tracking-wide text-bone sm:justify-end sm:px-6 sm:pb-5">
        <div className="pointer-events-auto flex w-full items-center justify-between gap-3 sm:hidden">
          <button type="button" onClick={() => step(-1)} className="border border-bone/40 px-3 py-2 font-rocks text-[16px] uppercase leading-none">
            ‹ {sections[(index - 1 + sections.length) % sections.length].label}
          </button>
          <button type="button" onClick={() => step(1)} className="border border-bone/40 px-3 py-2 font-rocks text-[16px] uppercase leading-none">
            {sections[(index + 1) % sections.length].label} ›
          </button>
        </div>
        <span className="hidden items-center gap-2 md:flex">
          <span className="keycap">Q</span>
          <span className="keycap">E</span>
          Switch tab
        </span>
        <button type="button" onClick={onClose} className="pointer-events-auto hidden items-center gap-2 hover:text-white sm:flex">
          <span className="keycap">Esc</span>
          Main menu
        </button>
      </footer>
    </div>
  )
}
