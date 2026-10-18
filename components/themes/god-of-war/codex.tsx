"use client"

import { useEffect, useRef } from "react"

import { Atmosphere } from "./atmosphere"
import { Compass } from "./compass"
import { realms, type RealmId } from "./realms"
import { pages } from "./sections"
import { TopBar } from "./top-bar"

export function Codex({ id, onTab, onBack }: { id: RealmId; onTab: (id: RealmId) => void; onBack: () => void }) {
  const index = realms.findIndex((r) => r.id === id)
  const realm = realms[index]
  const scroller = useRef<HTMLDivElement>(null)
  const Page = pages[id]

  const step = (dir: number) => onTab(realms[(index + dir + realms.length) % realms.length].id)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return
      if (document.querySelector('[role="alertdialog"]')) return
      if (e.key === "Escape") onBack()
      if (e.key === "q" || e.key === "Q") step(-1)
      if (e.key === "e" || e.key === "E") step(1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  })

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
  }, [index])

  return (
    <div className="gow-realm fixed inset-0 flex flex-col overflow-hidden" role="dialog" aria-modal="true" aria-label={realm.title} style={{ "--realm": realm.accent } as React.CSSProperties}>
      <Atmosphere mood={realm.mood} accent={realm.accent} vista={realm.vista} />

      <TopBar onBack={onBack}>
        <div className="w-full max-w-[680px]">
          <Compass active={id} onPick={onTab} onStep={step} />
        </div>
      </TopBar>

      <div ref={scroller} className="relative z-10 min-h-0 flex-1 overflow-y-auto overflow-x-hidden">
        <div key={id} className="gow-arrive mx-auto w-full max-w-[1280px] px-5 pb-16 pt-6 sm:px-10 sm:pt-8">
          <Page realm={realm} />
        </div>
      </div>
    </div>
  )
}
