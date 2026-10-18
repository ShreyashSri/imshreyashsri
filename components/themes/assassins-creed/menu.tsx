"use client"

import { useEffect, useState } from "react"
import { ChevronRight } from "lucide-react"

import { awards, chapters, profile, tally } from "@/data/resume"
import { Controls } from "./controls"
import { DnaMenu } from "./dna"
import { useEagle } from "./eagle"
import { MapIcon } from "./minimap"
import { sequenceNumber, sequences, type SequenceId } from "./sequences"
import { Insignia, Kicker, Sync } from "./ui"

const current = chapters[chapters.length - 1]

const tips = [
  `The subject currently works as a ${current.role.toLowerCase()} at ${current.company}.`,
  `Certified Kubernetes Application Developer since ${awards[0].context.replace("CKAD, ", "")}.`,
  ...tally.slice(0, 3).map((t) => `${t.label}: ${t.value}.`),
  "Eagle Vision highlights what matters. Toggle it from the top bar.",
  "Press Escape inside any memory to return to the corridor.",
]

function Tips() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % tips.length), 4800)
    return () => window.clearInterval(id)
  }, [])
  return (
    <p className="flex gap-3 font-exo text-[12px] leading-relaxed text-(--an-muted)" aria-live="off">
      <span className="shrink-0 font-bold uppercase tracking-[0.28em] text-(--an-red)">Animus tip</span>
      <span key={i} className="an-tip">{tips[i]}</span>
    </p>
  )
}

function Preview({ id, onOpen }: { id: SequenceId; onOpen: (id: SequenceId) => void }) {
  const seq = sequences.find((s) => s.id === id) ?? sequences[0]
  return (
    <section key={seq.id} aria-label="Memory preview" className="an-preview an-card an-brackets relative hidden p-6 md:block">
      <span aria-hidden="true" className="an-outline pointer-events-none absolute -bottom-5 right-4 font-marcellus text-[110px] leading-none">
        {sequenceNumber(seq.id)}
      </span>
      <p className="font-exo text-[10px] font-semibold uppercase tracking-[0.32em] text-(--an-red)">
        Sequence {sequenceNumber(seq.id)} · {seq.place}
      </p>
      <h2 className="mt-2 flex items-center gap-3 font-marcellus text-[30px] uppercase leading-none tracking-[0.04em]">
        <MapIcon id={seq.id} className="h-5 w-5 text-(--an-red)" />
        {seq.title}
      </h2>
      <p className="mt-3 font-exo text-[14.5px] leading-relaxed text-(--an-muted)">{seq.blurb}</p>
      <p className="an-key mt-4 font-exo text-[10px] font-bold uppercase tracking-[0.3em]">{seq.readout}</p>
      <button type="button" onClick={() => onOpen(seq.id)} className="animus-btn animus-btn-primary mt-5">
        Enter memory <ChevronRight className="h-4 w-4" />
      </button>
    </section>
  )
}

export function Menu({ onOpen }: { onOpen: (id: SequenceId) => void }) {
  const { eagle } = useEagle()
  const [hover, setHover] = useState<SequenceId>("subject")

  const focus = (id: SequenceId) => {
    if (id === hover) return
    setHover(id)
  }

  return (
    <div className="an-in relative z-10 flex h-svh flex-col overflow-y-auto px-5 py-5 sm:px-10 lg:px-14 lg:py-7">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Insignia className="h-8 w-8 text-(--an-red)" />
          <div className="leading-tight">
            <p className="font-exo text-[12px] font-bold uppercase tracking-[0.36em]">Animus 2.0</p>
            <p className="font-exo text-[10px] uppercase tracking-[0.3em] text-(--an-muted)">Memory corridor</p>
          </div>
        </div>
        <Controls />
      </header>

      <div className="mt-8 grid flex-1 gap-6 md:grid-cols-[minmax(280px,1fr)_minmax(0,1.1fr)] md:items-center lg:min-h-0 lg:grid-cols-[minmax(340px,440px)_1fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <div>
            <Kicker>Genetic memory · Subject</Kicker>
            <h1 className="an-target an-glitchy mt-3 font-marcellus text-[clamp(2.6rem,5vw,4.1rem)] uppercase leading-[0.95] tracking-[0.03em] text-(--an-ink)">
              Shreyash
              <br />
              Srivastava
            </h1>
            <p className="mt-3 font-exo text-[12px] font-medium uppercase tracking-[0.24em] text-(--an-muted)">
              {profile.role} · {profile.city}
            </p>
            <div className="mt-5 max-w-xs">
              <Sync label="Synchronisation" />
            </div>
          </div>
          <Preview id={hover} onOpen={onOpen} />
        </div>

        <div className="relative flex justify-center lg:justify-start">
          <div className="w-full max-w-[560px]">
            <DnaMenu active={hover} eagle={eagle} onHover={focus} onOpen={onOpen} />
          </div>
        </div>
      </div>

      <footer className="mt-6 hidden lg:block">
        <Tips />
      </footer>
    </div>
  )
}
