"use client"

import { useState } from "react"

import { profile } from "@/data/resume"
import { Atmosphere } from "./atmosphere"
import { realmOf, realms, type RealmId } from "./realms"
import { Runes } from "./runes"
import { TopBar } from "./top-bar"
import { KnotBand } from "./ui"
import { Yggdrasil } from "./yggdrasil"

export function Home({ onOpen, leaving }: { onOpen: (id: RealmId, x: number, y: number) => void; leaving: { x: number; y: number } | null }) {
  const [hovered, setHovered] = useState<RealmId>("about")
  const realm = realmOf(hovered)

  const hover = (id: RealmId) => {
    if (id === hovered) return
    setHovered(id)
  }

  const fromEvent = (id: RealmId, e: React.MouseEvent<HTMLElement>) => {
    const box = e.currentTarget.getBoundingClientRect()
    const keyboard = e.clientX === 0 && e.clientY === 0
    onOpen(id, keyboard ? box.left + box.width / 2 : e.clientX, keyboard ? box.top + box.height / 2 : e.clientY)
  }

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ "--realm": realm.accent } as React.CSSProperties}>
      <Atmosphere mood={realm.mood} accent={realm.accent} vista={realm.vista} />

      <TopBar />

      <main
        className="gow-home relative z-10 mx-auto grid min-h-0 w-full grid-cols-[minmax(0,1fr)] max-w-[1560px] flex-1 content-start gap-6 overflow-y-auto overflow-x-hidden px-5 pb-10 pt-2 sm:px-10 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] lg:grid-rows-[auto_auto] lg:content-center lg:items-center lg:gap-x-4 lg:gap-y-0 lg:overflow-hidden lg:px-14 lg:pb-4"
        style={leaving ? { transformOrigin: `${leaving.x}px ${leaving.y}px` } : undefined}
        data-leaving={leaving ? "" : undefined}
      >
        <div className="gow-in flex flex-col lg:col-start-1 lg:row-start-1 lg:self-end">
          <Runes as="p" text="Realm travel" className="font-cinzel text-xs font-bold uppercase tracking-[0.45em] text-[var(--realm)] transition-colors duration-700" speed={45} />
          <h1 className="gow-title mt-3 text-[clamp(2.2rem,4.4vw,3.8rem)] leading-[0.95]">
            <span className="gow-gold block">Shreyash</span>
            <span className="block">Srivastava</span>
          </h1>
          <p className="mt-3 max-w-md font-garamond text-lg italic leading-snug text-[#e8dfc8]/80 sm:text-xl">
            {profile.role} in {profile.city.split(",")[0]}. Choose a realm on the World Tree to travel there.
          </p>
          <KnotBand className="mt-5 max-w-sm" rune={realm.rune} />
        </div>

        <div className="flex flex-col items-center lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <div className="aspect-[760/572] w-full max-w-[min(100%,calc((100svh-210px)*1.33))] lg:max-w-[min(100%,calc((100svh-190px)*1.33))]">
            <Yggdrasil active={hovered} onHover={hover} onOpen={(id, x, y) => onOpen(id, x, y)} />
          </div>
          <div key={realm.id} className="gow-in -mt-1 flex w-full max-w-2xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-5 sm:text-left">
            <p className="font-garamond text-lg italic leading-snug text-[#e8dfc8]/80">
              <span className="not-italic font-cinzel text-xs font-bold uppercase tracking-[0.25em]" style={{ color: realm.accent }}>
                {realm.codex}
              </span>
              <span className="mx-2 text-[#c8a24a]/50">·</span>
              {realm.blurb}
            </p>
            <button type="button" onClick={(e) => fromEvent(realm.id, e)} className="gow-btn gow-btn-primary shrink-0">
              Travel
            </button>
          </div>
        </div>

        <nav aria-label="Realms" className="gow-in lg:col-start-1 lg:row-start-2 lg:mt-5 lg:self-start">
          <ul className="grid gap-0.5 sm:grid-cols-2 lg:grid-cols-1">
            {realms.map((r) => {
              const on = r.id === hovered
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onMouseEnter={() => hover(r.id)}
                    onFocus={() => hover(r.id)}
                    onClick={(e) => fromEvent(r.id, e)}
                    className="gow-entry group flex w-full items-center gap-3 px-3 py-[7px] text-left"
                    style={{ "--node": r.accent } as React.CSSProperties}
                  >
                    <span className="w-7 shrink-0 text-center font-runic text-lg transition-colors" style={{ color: on ? r.accent : "rgba(200,162,74,0.7)" }}>
                      {r.rune}
                    </span>
                    <span className={`flex-1 font-cinzel text-[17px] font-bold uppercase tracking-[0.1em] transition-colors ${on ? "text-[#fff3d0]" : "text-[#e8dfc8]/70"}`}>{r.title}</span>
                    <span className="font-cinzel text-[10px] font-bold uppercase tracking-[0.22em] transition-colors" style={{ color: on ? r.accent : "rgba(232,223,200,0.35)" }}>
                      {r.realm}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </main>
    </div>
  )
}
