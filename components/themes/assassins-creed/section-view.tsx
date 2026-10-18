"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ChevronLeft, ChevronRight, Map } from "lucide-react"

import { Controls } from "./controls"
import { MapIcon, Minimap } from "./minimap"
import { sectionContent } from "./sections"
import { sequenceNumber, sequences, type SequenceId } from "./sequences"
import { Kicker } from "./ui"

function Ribbon() {
  const a: string[] = []
  const b: string[] = []
  for (let x = 0; x <= 1200; x += 8) {
    const y = 14 * Math.sin(x / 38)
    a.push(`${x},${(20 + y).toFixed(1)}`)
    b.push(`${x},${(20 - y).toFixed(1)}`)
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 1200 40" preserveAspectRatio="none" className="an-ribbon mt-6 h-8 w-full">
      {Array.from({ length: 60 }, (_, i) => (
        <line key={i} x1={i * 20 + 4} x2={i * 20 + 4} y1={20 - 14 * Math.sin((i * 20 + 4) / 38)} y2={20 + 14 * Math.sin((i * 20 + 4) / 38)} stroke="var(--an-ink)" strokeOpacity="0.14" />
      ))}
      <polyline points={a.join(" ")} fill="none" stroke="var(--an-ink)" strokeOpacity="0.5" strokeWidth="1.4" />
      <polyline points={b.join(" ")} fill="none" stroke="var(--an-red)" strokeOpacity="0.6" strokeWidth="1.4" />
    </svg>
  )
}

export function SectionView({ id, onOpen, onBack }: { id: SequenceId; onOpen: (id: SequenceId) => void; onBack: () => void }) {
  const scroller = useRef<HTMLElement>(null)
  const [mapOpen, setMapOpen] = useState(false)
  const index = sequences.findIndex((s) => s.id === id)
  const seq = sequences[index]
  const prev = sequences[index - 1]
  const next = sequences[index + 1]
  const Content = sectionContent[id]

  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 })
    setMapOpen(false)
  }, [id])

  return (
    <div className="relative z-10 flex h-svh flex-col">
      <header className="relative z-30 flex h-14 shrink-0 items-center gap-3 border-b border-(--an-line) bg-(--an-panel) px-3 backdrop-blur-md sm:px-6">
        <button type="button" onClick={onBack} className="an-icon-btn" aria-label="Back to the memory corridor">
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Corridor</span>
        </button>
        <p className="min-w-0 truncate font-exo text-[10px] font-semibold uppercase tracking-[0.28em] text-(--an-muted)">
          <span className="text-(--an-red)">Sequence {sequenceNumber(id)}</span>
          <span className="hidden sm:inline"> · {seq.title}</span>
        </p>
        <div className="ml-auto flex items-center gap-2">
          <button type="button" onClick={() => setMapOpen((o) => !o)} aria-expanded={mapOpen} aria-label="Minimap" className="an-icon-btn md:hidden">
            <Map className="h-4 w-4" />
          </button>
          <Controls />
        </div>
        {mapOpen && (
          <div className="an-in absolute right-3 top-full mt-2 w-[288px] border border-(--an-line) bg-(--an-bg) p-5 shadow-[0_24px_48px_-20px_rgba(28,42,51,0.45)] md:hidden">
            <Minimap current={id} onTravel={onOpen} className="mx-auto w-[176px]" />
            <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-1 border-t border-(--an-line) pt-3">
              {sequences.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    aria-current={s.id === id}
                    onClick={() => s.id !== id && onOpen(s.id)}
                    className="flex w-full items-center gap-2 py-1.5 text-left font-exo text-[11px] font-semibold uppercase tracking-[0.14em] aria-[current=true]:text-(--an-red)"
                  >
                    <MapIcon id={s.id} className="h-3 w-3 shrink-0" />
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main ref={scroller} className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden md:pr-[190px] min-[1560px]:pr-0">
        <div key={id} className="an-land">
          <section className="relative mx-auto max-w-6xl px-5 pb-4 pt-10 sm:px-8 sm:pt-14 lg:px-12">
            <span aria-hidden="true" className="an-outline pointer-events-none absolute -top-2 right-4 font-marcellus text-[clamp(7rem,18vw,15rem)] leading-none sm:right-8">
              {sequenceNumber(id)}
            </span>
            <Kicker>
              Sequence {sequenceNumber(id)} · {seq.place}
            </Kicker>
            <h1 className="an-target an-glitchy relative mt-2 font-marcellus text-[clamp(2.6rem,6.5vw,5rem)] uppercase leading-[0.92] tracking-[0.03em]">{seq.label}</h1>
            <p className="relative mt-2 font-exo text-[12px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">
              {seq.title} · <span className="an-key">{seq.readout}</span>
            </p>
            <Ribbon />
          </section>

          <div className="mx-auto max-w-6xl px-5 pb-40 pt-6 sm:px-8 lg:px-12">
            <Content />

            <nav aria-label="Next and previous" className="mt-16 grid gap-3 border-t border-(--an-line) pt-6 sm:grid-cols-2">
              {prev ? (
                <button type="button" onClick={() => onOpen(prev.id)} className="an-card an-card-hover flex items-center gap-4 p-4 text-left">
                  <ChevronLeft className="h-5 w-5 shrink-0 text-(--an-red)" />
                  <span>
                    <span className="block font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">Previous memory</span>
                    <span className="block font-marcellus text-xl uppercase">{prev.label}</span>
                  </span>
                </button>
              ) : (
                <button type="button" onClick={onBack} className="an-card an-card-hover flex items-center gap-4 p-4 text-left">
                  <ChevronLeft className="h-5 w-5 shrink-0 text-(--an-red)" />
                  <span>
                    <span className="block font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">Leave memory</span>
                    <span className="block font-marcellus text-xl uppercase">Corridor</span>
                  </span>
                </button>
              )}
              {next && (
                <button type="button" onClick={() => onOpen(next.id)} className="an-card an-card-hover flex items-center justify-end gap-4 p-4 text-right sm:col-start-2">
                  <span>
                    <span className="block font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)">Next memory</span>
                    <span className="block font-marcellus text-xl uppercase">{next.label}</span>
                  </span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-(--an-red)" />
                </button>
              )}
            </nav>
          </div>
        </div>
      </main>

      <div className="pointer-events-none fixed bottom-5 right-5 z-20 hidden md:block lg:bottom-7 lg:right-7">
        <div className="pointer-events-auto">
          <Minimap current={id} onTravel={onOpen} className="w-[150px] lg:w-[168px]" />
        </div>
      </div>
    </div>
  )
}
