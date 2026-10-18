"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

import { games, type Game } from "@/data/games"
import { useSound } from "@/components/sound/sound-provider"
import { useTheme } from "@/components/theme-root"

type Tone = "rdr2" | "valorant"

const tones = {
  rdr2: {
    card: "border-white/15 hover:border-white/70",
    active: "border-white ring-1 ring-white/60",
    title: "font-rocks text-[22px] uppercase tracking-wide",
    meta: "font-slab text-[13px] text-white/65",
    dialog: "border border-white/20 bg-menu/95 font-slab text-white",
    heading: "font-rocks text-[30px] uppercase leading-none",
    primary: "border border-white bg-white px-5 py-2 font-rocks text-[18px] uppercase text-black hover:bg-white/85",
    secondary: "border border-white/40 px-5 py-2 font-rocks text-[18px] uppercase text-white hover:border-white",
  },
  valorant: {
    card: "border-border hover:border-primary",
    active: "border-primary ring-1 ring-primary/60",
    title: "font-display text-2xl uppercase",
    meta: "text-xs uppercase text-muted-foreground",
    dialog: "tactical-card bg-card text-foreground",
    heading: "font-display text-4xl uppercase leading-none",
    primary: "btn-tactical border border-primary bg-primary px-5 py-2 font-display text-lg uppercase text-primary-foreground hover:bg-primary/90",
    secondary: "btn-tactical border border-primary/55 px-5 py-2 font-display text-lg uppercase text-foreground hover:bg-primary/10",
  },
}

function ConfirmDialog({ game, tone, onConfirm, onCancel }: { game: Game; tone: Tone; onConfirm: () => void; onCancel: () => void }) {
  const t = tones[tone]
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

  return (
    <div className="fixed inset-0 z-950 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs" onClick={onCancel}>
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="switch-title"
        aria-describedby="switch-body"
        className={`grid w-full max-w-md grid-cols-[96px_1fr] gap-5 p-6 ${t.dialog}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-2/3 overflow-hidden">
          <Image src={game.cover} alt="" fill sizes="96px" className="object-cover" />
        </div>
        <div>
          <h2 id="switch-title" className={t.heading}>
            {game.theme ? `Play as ${game.title}?` : game.title}
          </h2>
          <p id="switch-body" className="mt-3 text-[15px] leading-relaxed opacity-85">
            {game.theme
              ? `The whole portfolio will change to match ${game.title}. You can switch back any time from Games.`
              : "This theme is still being built. Check back soon."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {game.theme ? (
              <>
                <button ref={confirmRef} type="button" onClick={onConfirm} className={t.primary}>
                  Switch theme
                </button>
                <button type="button" onClick={onCancel} className={t.secondary}>
                  Stay
                </button>
              </>
            ) : (
              <button ref={confirmRef} type="button" onClick={onCancel} className={t.primary}>
                Got it
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export function GamePicker({ tone }: { tone: Tone }) {
  const { theme, switchTheme } = useTheme()
  const { play } = useSound()
  const [picked, setPicked] = useState<Game | null>(null)
  const t = tones[tone]

  return (
    <>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {games.map((game) => {
          const current = game.theme === theme
          return (
            <li key={game.id}>
              <button
                type="button"
                onClick={() => {
                  if (current) return
                  play("select")
                  setPicked(game)
                }}
                aria-current={current ? "true" : undefined}
                className={`group block w-full border text-left transition-colors ${current ? t.active : t.card}`}
              >
                <div className="relative aspect-2/3 overflow-hidden">
                  <Image
                    src={game.cover}
                    alt={`${game.title} cover art`}
                    fill
                    sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                    className={`object-cover transition-transform duration-500 group-hover:scale-105 ${game.theme ? "" : "grayscale-60"}`}
                  />
                  <span className="absolute left-2 top-2 bg-black/75 px-2 py-1 font-sans text-[10px] font-bold uppercase tracking-wider text-white">
                    {current ? "Playing now" : game.theme ? "Theme ready" : "Coming soon"}
                  </span>
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
          tone={tone}
          onCancel={() => setPicked(null)}
          onConfirm={() => {
            if (picked.theme) switchTheme(picked.theme)
            setPicked(null)
          }}
        />
      )}
    </>
  )
}
