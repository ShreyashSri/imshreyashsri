"use client"

import { useEffect, useRef } from "react"
import { ChevronLeft, Volume2, VolumeX } from "lucide-react"

import { useMusic } from "@/components/music/music-provider"
import { Scenery } from "./ink"
import { sections, type SectionId } from "./sections"
import { Heading } from "./ui"
import { Wind } from "./wind"

export function Journal({ id, onTab, onClose }: { id: SectionId; onTab: (id: SectionId) => void; onClose: () => void }) {
  const { playing, setPlaying } = useMusic()
  const index = sections.findIndex((s) => s.id === id)
  const section = sections[index]
  const scroller = useRef<HTMLElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const closeRef = useRef<HTMLButtonElement>(null)

  const step = (dir: number) => onTab(sections[(index + dir + sections.length) % sections.length].id)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea")) {
        if (e.key === "Escape") (e.target as HTMLElement).blur()
        return
      }
      if (e.metaKey || e.ctrlKey || e.altKey || document.querySelector("[role=alertdialog]")) return
      if (e.key === "Escape") onClose()
      if (e.key === "q" || e.key === "Q") step(-1)
      if (e.key === "e" || e.key === "E") step(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    tabs.current[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" })
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
    <div className="got-fade fixed inset-0 z-50 flex flex-col bg-black" role="dialog" aria-modal="true" aria-label={section.label}>
      <Scenery mood={section.mood} photo={section.photo} sun="high" dim />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_30%,rgba(0,0,0,0.35)_30%,rgba(0,0,0,0.85)_100%)]" />
      <Wind mood={section.mood} density={0.4} />

      <header className="relative z-10 border-b border-[#ece6da]/10 bg-black/45 backdrop-blur-sm">
        <div className="flex items-center justify-between px-3 pt-3 sm:px-8 sm:pt-5">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex items-center gap-2 px-2 py-1 text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#ece6da]/70 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-4 w-4" />
            Title
            <kbd className="ml-1 hidden border border-[#ece6da]/30 px-1.5 py-0.5 font-sans text-[10px] tracking-normal sm:inline">Esc</kbd>
          </button>
          <button
            type="button"
            onClick={() => setPlaying(!playing)}
            aria-pressed={playing}
            aria-label={playing ? "Stop music" : "Play music"}
            className="flex h-9 w-9 items-center justify-center text-[#ece6da]/70 transition-colors hover:text-white"
          >
            {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>
        </div>
        <div className="flex items-end gap-2 px-2 sm:justify-center sm:px-8">
          <button type="button" onClick={() => step(-1)} className="mb-3 hidden h-7 w-7 shrink-0 items-center justify-center border border-[#ece6da]/30 font-sans text-[11px] text-[#ece6da]/70 hover:text-white sm:flex" aria-label="Previous section">
            Q
          </button>
          <nav aria-label="Sections" className="no-scrollbar flex min-w-0 gap-1 overflow-x-auto sm:gap-3">
            {sections.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => {
                  tabs.current[i] = el
                }}
                type="button"
                aria-current={s.id === id ? "page" : undefined}
                onClick={() => s.id !== id && onTab(s.id)}
                className="got-tab"
              >
                <span className="font-brush text-xl leading-none text-[#c8102e]">{s.kanji}</span>
                <span className="text-[10.5px] font-bold uppercase tracking-[0.24em]">{s.label}</span>
              </button>
            ))}
          </nav>
          <button type="button" onClick={() => step(1)} className="mb-3 hidden h-7 w-7 shrink-0 items-center justify-center border border-[#ece6da]/30 font-sans text-[11px] text-[#ece6da]/70 hover:text-white sm:flex" aria-label="Next section">
            E
          </button>
        </div>
      </header>

      <main ref={scroller} className="relative z-10 min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div key={section.id} className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-10 sm:pt-14">
          <Heading kanji={section.kanji} epithet={section.epithet} title={section.label} line={section.blurb} />
          <Content />
        </div>
      </main>
    </div>
  )
}
