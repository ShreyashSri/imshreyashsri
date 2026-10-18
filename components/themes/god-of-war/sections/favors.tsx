"use client"

import { useState } from "react"

import { contributions } from "@/data/resume"
import { Frame, Heading, Label } from "../ui"
import type { PageProps } from "."

export function Favors({ realm }: PageProps) {
  const [index, setIndex] = useState(0)
  const favor = contributions[index]

  return (
    <div>
      <Heading
        rune={realm.rune}
        realm={realm.realm}
        codex={realm.codex}
        title="Open source"
        right={<p className="font-garamond text-lg italic text-[#e8dfc8]/60">{contributions.length} favors completed</p>}
      />
      <div className="grid items-start gap-6 lg:grid-cols-[360px_1fr]">
        <Frame as="section" className="p-2">
          <p className="px-4 pb-2 pt-3 font-cinzel text-[10px] font-bold uppercase tracking-[0.3em] text-[#e8dfc8]/45">Favors log</p>
          <ul className="grid gap-1">
            {contributions.map((c, i) => (
              <li key={c.camp}>
                <button
                  type="button"
                  aria-pressed={i === index}
                  onClick={() => {
                    if (i === index) return
                    setIndex(i)
                  }}
                  className="gow-entry flex w-full items-center gap-3 px-4 py-3 text-left"
                >
                  <span className="flex h-6 w-6 shrink-0 rotate-45 items-center justify-center border border-[var(--realm)] bg-[var(--realm)]/15">
                    <svg viewBox="0 0 12 12" className="h-3 w-3 -rotate-45 text-[var(--realm)]" aria-hidden="true">
                      <path d="M2 6.5l2.6 2.5L10 3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-cinzel text-[15px] font-bold uppercase tracking-[0.06em] text-[#fff3d0]">{c.camp}</span>
                    <span className="block font-garamond text-base italic text-[#e8dfc8]/55">{c.role}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </Frame>

        <Frame as="article" className="px-6 py-6 sm:px-9 sm:py-8">
          <div key={favor.camp} className="gow-in" aria-live="polite">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <Label>Favor</Label>
                <h3 className="gow-title mt-2 text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight">{favor.camp}</h3>
                <p className="mt-1 font-garamond text-xl italic text-[#e8dfc8]/75">{favor.role}</p>
              </div>
              <span className="gow-stamp font-cinzel text-xs font-bold uppercase tracking-[0.25em]">Favor complete</span>
            </div>
            <p className="mt-7 font-cinzel text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--realm)]">Objectives</p>
            <ul className="mt-3 grid gap-4">
              {favor.deeds.map((d) => (
                <li key={d} className="flex gap-3 font-garamond text-lg leading-relaxed text-[#e8dfc8]/90">
                  <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center border border-[var(--realm)] text-[10px] text-[var(--realm)]">✓</span>
                  {d}
                </li>
              ))}
            </ul>
            <a href={favor.href} target="_blank" rel="noopener noreferrer" className="gow-btn mt-7">
              View the work
            </a>
          </div>
        </Frame>
      </div>
    </div>
  )
}
