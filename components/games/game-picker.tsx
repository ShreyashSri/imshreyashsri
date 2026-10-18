"use client"

import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import Image from "next/image"

import { games, type Game, type ThemeId } from "@/data/games"
import { useTheme } from "@/components/theme-root"

type Tone = {
  card: string
  active: string
  title: string
  meta: string
  badge: string
  dialog: string
  heading: string
  body: string
  primary: string
  secondary: string
}

const tones: Record<ThemeId, Tone> = {
  rdr2: {
    card: "border-white/15 hover:border-white/70",
    active: "border-white ring-1 ring-white/60",
    title: "font-rocks text-[22px] uppercase tracking-wide",
    meta: "font-slab text-[13px] text-white/65",
    badge: "bg-black/75 font-sans text-white",
    dialog: "border border-white/20 bg-[#0b0a09]/95 text-white",
    heading: "font-rocks text-[30px] uppercase leading-none",
    body: "font-slab",
    primary: "border border-white bg-white px-5 py-2 font-rocks text-[18px] uppercase text-black hover:bg-white/85",
    secondary: "border border-white/40 px-5 py-2 font-rocks text-[18px] uppercase text-white hover:border-white",
  },
  valorant: {
    card: "border-white/10 hover:border-[#ff4655]",
    active: "border-[#ff4655] ring-1 ring-[#ff4655]/60",
    title: "font-anton text-2xl uppercase tracking-wide",
    meta: "font-barlow text-xs uppercase tracking-[0.2em] text-[#ece8e1]/55",
    badge: "bg-[#0f1923]/90 font-barlow tracking-[0.2em] text-[#ece8e1]",
    dialog: "val-panel text-[#ece8e1]",
    heading: "font-anton text-4xl uppercase leading-none",
    body: "font-barlow",
    primary: "val-btn val-btn-primary",
    secondary: "val-btn",
  },
  "god-of-war": {
    card: "border-[#c8a24a]/25 hover:border-[#e9c46a]",
    active: "border-[#e9c46a] ring-1 ring-[#e9c46a]/60",
    title: "font-cinzel text-[19px] font-bold uppercase tracking-wide",
    meta: "font-garamond text-[15px] italic text-[#d8cdb4]/70",
    badge: "bg-[#0b1214]/85 font-cinzel tracking-widest text-[#e9c46a]",
    dialog: "gow-frame text-[#e8dfc8]",
    heading: "font-cinzel text-3xl font-bold uppercase leading-tight text-[#e9c46a]",
    body: "font-garamond text-[17px]",
    primary: "gow-btn gow-btn-primary",
    secondary: "gow-btn",
  },
  "ghost-of-tsushima": {
    card: "border-white/10 hover:border-white/60",
    active: "border-[#c8102e] ring-1 ring-[#c8102e]/60",
    title: "font-mincho text-lg tracking-[0.12em]",
    meta: "font-mincho text-xs tracking-[0.2em] text-white/55",
    badge: "bg-black/70 font-mincho tracking-[0.2em] text-white",
    dialog: "border border-white/15 bg-[#0c0c0d]/95 text-white",
    heading: "font-mincho text-3xl tracking-[0.12em]",
    body: "font-mincho",
    primary: "got-btn got-btn-primary",
    secondary: "got-btn",
  },
  "assassins-creed": {
    card: "border-[#1c2a33]/15 hover:border-[#1c2a33]/60",
    active: "border-[#b3121c] ring-1 ring-[#b3121c]/50",
    title: "font-marcellus text-xl uppercase tracking-wide text-[#1c2a33]",
    meta: "font-exo text-xs uppercase tracking-[0.2em] text-[#1c2a33]/55",
    badge: "bg-white/85 font-exo tracking-[0.2em] text-[#1c2a33]",
    dialog: "animus-panel text-[#1c2a33]",
    heading: "font-marcellus text-3xl uppercase leading-tight",
    body: "font-exo",
    primary: "animus-btn animus-btn-primary",
    secondary: "animus-btn",
  },
}

function ConfirmDialog({ game, tone, onConfirm, onCancel }: { game: Game; tone: Tone; onConfirm: () => void; onCancel: () => void }) {
  const confirmRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    confirmRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return
      e.stopPropagation()
      onCancel()
    }
    window.addEventListener("keydown", onKey, true)
    return () => window.removeEventListener("keydown", onKey, true)
  }, [onCancel])

  return createPortal(
    <div className="fixed inset-0 z-950 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" onClick={onCancel}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="switch-title"
        aria-describedby="switch-body"
        className={`grid w-full max-w-md grid-cols-[96px_1fr] gap-5 p-6 ${tone.dialog}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-2/3 overflow-hidden">
          <Image src={game.cover} alt="" fill sizes="96px" className="object-cover" />
        </div>
        <div>
          <h2 id="switch-title" className={tone.heading}>
            Play as {game.title}?
          </h2>
          <p id="switch-body" className={`mt-3 text-[15px] leading-relaxed opacity-85 ${tone.body}`}>
            The whole portfolio will change to match {game.title}. You can switch back any time from Games.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button ref={confirmRef} type="button" onClick={onConfirm} className={tone.primary}>
              Switch theme
            </button>
            <button type="button" onClick={onCancel} className={tone.secondary}>
              Stay
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("theme-app")?.firstElementChild ?? document.body,
  )
}

export function GamePicker({ tone }: { tone: ThemeId }) {
  const { theme, switchTheme } = useTheme()
  const [picked, setPicked] = useState<Game | null>(null)
  const t = tones[tone]

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {games.map((game) => {
          const current = game.id === theme
          return (
            <li key={game.id} className="h-full">
              <button
                type="button"
                onClick={() => {
                  if (current) return
                  setPicked(game)
                }}
                aria-current={current ? "true" : undefined}
                className={`group flex h-full w-full flex-col border text-left transition-colors ${current ? t.active : t.card}`}
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <Image
                    src={game.cover}
                    alt={`${game.title} cover art`}
                    fill
                    loading="eager"
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className={`absolute left-2 top-2 px-2 py-1 text-[10px] font-bold uppercase ${t.badge}`}>{current ? "Playing now" : "Play"}</span>
                </div>
                <div className="px-3 py-3">
                  <p className={`${t.title} leading-none`}>{game.title}</p>
                  <p className={`mt-1 ${t.meta}`}>{game.studio}</p>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {picked && (
        <ConfirmDialog
          game={picked}
          tone={t}
          onCancel={() => setPicked(null)}
          onConfirm={() => {
            switchTheme(picked.id)
            setPicked(null)
          }}
        />
      )}
    </>
  )
}
