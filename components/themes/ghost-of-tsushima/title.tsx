"use client"

import { useEffect, useRef, useState } from "react"
import { FileText, Volume2, VolumeX } from "lucide-react"

import { chapters, profile } from "@/data/resume"
import { useMusic } from "@/components/music/music-provider"
import { Enso, Scenery, Written } from "./ink"
import { sections, type SectionId } from "./sections"
import { Seal } from "./ui"
import { Wind, type Point } from "./wind"

const current = chapters[chapters.length - 1]

export function Title({ onOpen, covered }: { onOpen: (id: SectionId) => void; covered: boolean }) {
  const { playing, setPlaying } = useMusic()
  const [hover, setHover] = useState(-1)
  const [target, setTarget] = useState<Point | null>(null)
  const layer = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const active = hover >= 0 ? sections[hover] : null

  const intent = useRef(0)

  const pick = (i: number) => {
    window.clearTimeout(intent.current)
    if (i === hover) return
    intent.current = window.setTimeout(() => {
      const r = buttons.current[i]?.getBoundingClientRect()
      if (r) setTarget({ x: r.left + 24, y: r.top + r.height / 2 })
      setHover(i)
    }, 90)
  }

  const leave = () => {
    window.clearTimeout(intent.current)
    if (buttons.current.some((b) => b === document.activeElement)) return
    setHover(-1)
    setTarget(null)
  }

  useEffect(() => () => window.clearTimeout(intent.current), [])

  useEffect(() => {
    const el = layer.current
    if (!el || covered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const aim = { x: 0, y: 0 }
    const now = { x: 0, y: 0 }
    let frame = 0
    const onMove = (e: PointerEvent) => {
      aim.x = e.clientX / window.innerWidth - 0.5
      aim.y = e.clientY / window.innerHeight - 0.5
    }
    const tick = () => {
      now.x += (aim.x - now.x) * 0.05
      now.y += (aim.y - now.y) * 0.05
      el.style.transform = `translate3d(${now.x * -18}px, ${now.y * -10}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
    }
  }, [covered])

  useEffect(() => {
    if (covered) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
      e.preventDefault()
      const step = e.key === "ArrowDown" ? 1 : -1
      const next = hover < 0 ? 0 : (hover + step + sections.length) % sections.length
      buttons.current[next]?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [covered, hover])

  return (
    <div className="fixed inset-0 touch-none overflow-hidden bg-black" aria-hidden={covered} inert={covered}>
      <div ref={layer} className="absolute -inset-[2%] will-change-transform">
        <Scenery mood={active?.mood ?? "gold"} photo="golden-tree" sun="low" />
      </div>
      <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/35 to-transparent" />
      <Wind mood={active?.mood ?? "gold"} paused={covered} target={target} swipe />

      <div className="relative z-10 flex h-full flex-col px-5 pb-5 pt-6 sm:px-12 sm:pb-8 sm:pt-10 lg:px-16">
        <header className="got-fade flex items-center gap-4">
          <Seal className="got-stamp h-11 w-11 text-2xl" />
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.42em]">{profile.name}</p>
            <p className="mt-1 text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#ece6da]/55">
              {current.role} · {current.company}
            </p>
          </div>
        </header>

        <div className="flex flex-1 items-center py-6">
          <div className="w-full max-w-[460px]">
            <h1>
              <Written className="font-brush text-[clamp(3.4rem,8vw,6.6rem)] leading-[0.95] text-[#f4eee4]" delay={0.2}>
                Shreyash
              </Written>
              <span className="got-fade mt-3 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#ece6da]/65">
                <span className="got-ink-in h-px w-10 bg-[#c8102e]" />
                {profile.role}
              </span>
            </h1>
            <nav aria-label="Main menu" className="mt-8 sm:mt-11" onMouseLeave={leave}>
              <ul className="space-y-0.5">
                {sections.map((s, i) => (
                  <li key={s.id} className="got-rise" style={{ animationDelay: `${0.35 + i * 0.05}s` }}>
                    <button
                      ref={(el) => {
                        buttons.current[i] = el
                      }}
                      type="button"
                      data-on={i === hover}
                      onMouseEnter={() => pick(i)}
                      onFocus={() => pick(i)}
                      onClick={() => onOpen(s.id)}
                      className="got-item"
                    >
                      <span className="w-7 text-center font-brush text-xl text-[#c8102e]">{s.kanji}</span>
                      <span className="text-[clamp(0.95rem,1.3vw,1.12rem)] font-bold uppercase tracking-[0.26em]">{s.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <aside className="pointer-events-none absolute right-10 top-1/2 hidden w-[440px] -translate-y-[46%] flex-col items-center lg:flex xl:right-20" aria-live="polite">
          <Enso key={`enso-${active?.id ?? "idle"}`} draw color="#f4eee4" className="h-[300px] w-[300px] xl:h-[340px] xl:w-[340px]">
            <Written key={active?.id ?? "idle"} className="font-brush text-[9.5rem] leading-none text-[#c8102e] xl:text-[11rem]" delay={0.25} vertical>
              {active?.kanji ?? "風"}
            </Written>
          </Enso>
          {active ? (
            <div key={`info-${active.id}`} className="got-rise mt-6 text-center" style={{ animationDelay: "0.35s" }}>
              <p className="text-[10.5px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/60">{active.epithet}</p>
              <p className="mt-2 text-3xl font-extrabold uppercase leading-none tracking-[0.14em]">{active.label}</p>
              <p className="mt-4 text-[16px] italic leading-relaxed text-[#ece6da]/85">{active.blurb}</p>
              <p className="mt-4 flex items-center justify-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em] text-[#ece6da]/60">
                <span className="h-px w-6 bg-[#c8102e]" />
                {active.fact}
                <span className="h-px w-6 bg-[#c8102e]" />
              </p>
            </div>
          ) : (
            <div className="got-fade mt-6 text-center" style={{ animationDelay: "0.6s" }}>
              <p className="font-brush text-[1.7rem] leading-relaxed text-[#f4eee4]/90">
                <span className="block">Follow the wind.</span>
                <span className="block">It knows the way.</span>
              </p>
              <p className="mt-3 text-[10.5px] font-bold uppercase tracking-[0.4em] text-[#ece6da]/50">Swipe to summon it</p>
            </div>
          )}
        </aside>

        <footer className="got-fade flex items-center justify-between gap-4 text-[10.5px] font-bold uppercase tracking-[0.3em] text-[#ece6da]/65">
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => setPlaying(!playing)} aria-pressed={playing} className="flex items-center gap-2 uppercase transition-colors hover:text-white">
              {playing ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
              Music {playing ? "on" : "off"}
            </button>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 transition-colors hover:text-white">
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>
          <p className="hidden sm:block">Swipe · Wind &nbsp; ↑ ↓ · Choose &nbsp; Enter · Open</p>
        </footer>
      </div>
    </div>
  )
}
