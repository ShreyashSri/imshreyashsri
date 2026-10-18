"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Image from "next/image"

import { profile, socials } from "@/data/resume"
import { useMusic } from "@/components/music/music-provider"
import { MenuPreview } from "./menu-preview"
import { PauseMenu } from "./pause-menu"
import { isSectionId, sections, type SectionId } from "./sections"


type Entry = { id: string; label: string; blurb: string; backdrop?: string }

const entries: Entry[] = [
  ...sections,
  { id: "resume", label: "Resume", blurb: "Everything on one page, as a PDF." },
  { id: "credits", label: "Credits", blurb: "Who made the fonts and the art." },
]

export function Home({ onCredits, covered }: { onCredits: () => void; covered: boolean }) {
  const { playing, setPlaying } = useMusic()
  const [highlight, setHighlight] = useState<string>("about")
  const [backdrop, setBackdrop] = useState<string>(sections[0].backdrop)
  const [tab, setTab] = useState<SectionId | null>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const index = Math.max(0, entries.findIndex((e) => e.id === highlight))
  const entry = entries[index]

  const hover = useCallback(
    (id: string | null) => {
      if (!id || id === highlight) return
      setHighlight(id)
      const s = sections.find((x) => x.id === id)
      if (s) setBackdrop(s.backdrop)
    },
    [highlight],
  )

  const choose = useCallback(
    (id: string) => {
      if (isSectionId(id)) {
        setTab(id)
        history.replaceState(null, "", `#${id}`)
      } else if (id === "resume") {
        window.open(profile.resume, "_blank", "noopener,noreferrer")
      } else if (id === "credits") {
        onCredits()
      }
    },
    [onCredits],
  )

  const close = () => {
    if (tab) {
      setHighlight(tab)
      buttons.current[entries.findIndex((e) => e.id === tab)]?.focus({ preventScroll: true })
    }
    setTab(null)
    history.replaceState(null, "", window.location.pathname)
  }

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1)
      if (isSectionId(id)) {
        setTab(id)
        setHighlight(id)
        setBackdrop(sections.find((s) => s.id === id)!.backdrop)
      }
    }
    fromHash()
    window.addEventListener("hashchange", fromHash)
    return () => window.removeEventListener("hashchange", fromHash)
  }, [])

  useEffect(() => {
    if (tab || covered) return
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault()
        const next = (index + (e.key === "ArrowDown" ? 1 : -1) + entries.length) % entries.length
        hover(entries[next].id)
        buttons.current[next]?.focus({ preventScroll: true })
      }
      if (e.key === "m" || e.key === "M") setPlaying(!playing)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  return (
    <>
      <div className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-black text-white lg:overflow-hidden" inert={tab !== null || covered}>
        <div className="fixed inset-0" aria-hidden="true">
          {sections.map((s) => (
            <div key={s.id} className="absolute inset-0 transition-opacity duration-1200" style={{ opacity: s.backdrop === backdrop ? 1 : 0 }}>
              <div className="absolute inset-0 motion-safe:animate-[menu-drift_36s_ease-in-out_infinite_alternate]">
                <Image src={`/themes/rdr2/backdrops/${s.backdrop}.webp`} alt="" fill sizes="100vw" preload={s.id === "about"} className="object-cover" />
              </div>
            </div>
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.6)_32%,rgba(0,0,0,0.2)_62%,rgba(0,0,0,0.15)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_70%_45%,transparent_45%,rgba(0,0,0,0.65)_100%)]" />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/80 to-transparent" />
        </div>
        <style>{`@keyframes menu-drift { from { transform: scale(1.12) translate3d(1.5%, -1%, 0) } to { transform: scale(1.02) translate3d(-1%, 0.5%, 0) } }`}</style>

        <div className="relative flex min-h-full flex-col lg:h-full">
          <div className="pointer-events-none absolute inset-y-0 left-[38%] right-0 hidden items-center justify-center pb-16 lg:flex">
            <div className="pointer-events-auto">
              <MenuPreview id={highlight} onOpen={choose} />
            </div>
          </div>

          <div className="relative z-10 select-none px-6 pt-10 sm:px-12 lg:px-14 lg:pt-12 xl:px-20" aria-label="Shreyash Srivastava, portfolio two">
            <p className="pl-0.5 font-rocks text-[13px] uppercase tracking-[0.14em] text-white/75">A portfolio by</p>
            <div className="flex w-fit items-stretch gap-[0.06em] font-redemption leading-[0.82]">
              <div className="flex flex-col">
                <span className="text-[clamp(2.4rem,5.2vw,4.4rem)]">SHREYASH</span>
                <span className="text-[clamp(1.75rem,3.8vw,3.2rem)]">SRIVASTAVA</span>
              </div>
              <span className="text-[clamp(4.5rem,9.8vw,8.3rem)] leading-[0.78] text-[#c8202e]">II</span>
            </div>
            <p className="mt-4 max-w-md font-slab text-[16px] leading-relaxed text-white/85">
              Backend engineer in {profile.city.split(",")[0]}. Pick a section to look around.
            </p>
          </div>

          <nav className="relative z-10 mt-10 max-w-[520px] px-6 pb-8 sm:px-12 lg:mt-auto lg:px-14 lg:pb-24 xl:px-20" aria-label="Main menu">
            <ul>
              {entries.map((e, i) => {
                const on = e.id === highlight
                return (
                  <li key={e.id} className={e.id === "resume" ? "mt-4 border-t border-white/15 pt-4" : ""}>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el
                      }}
                      type="button"
                      onMouseEnter={() => hover(e.id)}
                      onFocus={() => hover(e.id)}
                      onClick={() => choose(e.id)}
                      aria-describedby={on ? "menu-blurb" : undefined}
                      className={`group relative flex w-full items-center py-[3px] text-left font-rocks text-[clamp(1.6rem,3.1vw,2.6rem)] uppercase leading-none tracking-[0.04em] outline-hidden transition-colors ${
                        on ? "text-white" : "text-white/45 hover:text-white/75"
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute -left-4 inset-y-0 right-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05)_60%,transparent)] transition-opacity ${
                          on ? "opacity-100" : "opacity-0"
                        }`}
                      />
                      <span aria-hidden="true" className={`absolute -left-4 inset-y-[6px] w-[3px] bg-white transition-opacity ${on ? "opacity-100" : "opacity-0"}`} />
                      <span className="relative">{e.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
            <p id="menu-blurb" className="mt-6 min-h-[3.2em] max-w-[440px] font-slab text-[16px] leading-relaxed text-white/80" aria-live="polite">
              {entry.blurb}
            </p>
          </nav>

          <div className="relative z-10 mt-auto flex flex-wrap items-center justify-between gap-4 px-6 pb-5 font-sans text-[12px] uppercase tracking-wide sm:px-12 lg:absolute lg:inset-x-0 lg:bottom-0 lg:px-14 xl:px-20">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-white/60">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className="hover:text-white">
                  Email
                </a>
              </li>
            </ul>
            <div className="flex items-center gap-5 text-white/90">
              <span className="hidden items-center gap-2 lg:flex">
                <span className="keycap">↑</span>
                <span className="keycap">↓</span>
                Navigate
              </span>
              <span className="hidden items-center gap-2 lg:flex">
                <span className="keycap">↵</span>
                Select
              </span>
              <button type="button" onClick={() => setPlaying(!playing)} className="flex items-center gap-2 uppercase hover:text-white" aria-pressed={playing}>
                <span className="keycap">M</span>
                Music {playing ? "on" : "off"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {tab && <PauseMenu tab={tab} onTab={setTab} onClose={close} />}
    </>
  )
}
