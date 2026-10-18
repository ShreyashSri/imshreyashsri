"use client"

import { useEffect, useRef, useState } from "react"

import { profile, socials } from "@/data/resume"
import { BrandIcon } from "@/components/brand-icon"
import { composeMail } from "@/components/shared/compose-mail"
import { Seal } from "../ui"
import { Standoff, type Phase } from "./standoff"

export function Letter() {
  const [sealed, setSealed] = useState(false)
  const [phase, setPhase] = useState<Phase>("idle")
  const form = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (phase !== "struck") return
    const t = window.setTimeout(() => setPhase("idle"), 2600)
    return () => window.clearTimeout(t)
  }, [phase])

  const send = () => {
    if (!form.current) return
    setSealed(true)
    composeMail(form.current)
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-14">
      <form
        ref={form}
        data-standoff={phase}
        className="got-letter got-washi got-rise relative grid gap-6 overflow-hidden p-6 text-[#1b1714] sm:p-10"
        onSubmit={(e) => {
          e.preventDefault()
          send()
        }}
      >
        <p className="font-brush text-2xl text-[#1b1714] sm:text-3xl">To {profile.name.split(" ")[0]},</p>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#1b1714]/55">Your name</span>
            <input name="name" required autoComplete="name" className="got-field got-field-ink" placeholder="Who sends word" />
          </label>
          <label className="grid gap-1">
            <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#1b1714]/55">Your email</span>
            <input name="email" type="email" required autoComplete="email" className="got-field got-field-ink" placeholder="you@example.com" />
          </label>
        </div>
        <label className="grid gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#1b1714]/55">Subject</span>
          <input name="subject" required className="got-field got-field-ink" placeholder="A role, a project, a collaboration" />
        </label>
        <label className="grid gap-1">
          <span className="text-[11px] font-bold uppercase tracking-[0.32em] text-[#1b1714]/55">Message</span>
          <textarea name="message" required rows={6} className="got-field got-field-ink resize-y" placeholder="Write your letter" />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
          <p className="max-w-[16rem] text-sm text-[#1b1714]/55">{sealed ? "Sealed. Your email app has the letter ready." : "Opens your email app with the letter written out."}</p>
          <Standoff ready={() => form.current?.reportValidity() ?? false} onStrike={send} phase={phase} setPhase={setPhase} />
        </div>
        {phase === "struck" && (
          <svg viewBox="0 0 400 300" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true">
            <path className="got-slash" d="M-20 280C100 200 240 110 420 10" pathLength="1" fill="none" stroke="#1b1714" strokeWidth="4" strokeLinecap="round" />
            <path className="got-slash got-slash-red" d="M-20 292C110 212 250 124 420 24" pathLength="1" fill="none" stroke="#c8102e" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {sealed && <Seal char="封" className="got-stamp absolute right-6 top-6 h-14 w-14 text-3xl" />}
      </form>

      <aside className="got-rise" style={{ animationDelay: "0.12s" }}>
        <h3 className="text-[11px] font-bold uppercase tracking-[0.42em] text-[#ece6da]/55">Allies</h3>
        <ul className="mt-5 divide-y divide-[#ece6da]/10 border-y border-[#ece6da]/10">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-4 transition-colors hover:text-white">
                <BrandIcon name={s.label} className="h-5 w-5 text-[#ece6da]/70 transition-colors group-hover:text-[#c8102e]" />
                <span className="flex-1 text-sm font-bold uppercase tracking-[0.24em]">{s.label}</span>
                <span className="text-xs text-[#ece6da]/45">{profile.handle}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 py-4 transition-colors hover:text-white">
              <span className="flex h-5 w-5 items-center justify-center font-brush text-lg leading-none text-[#ece6da]/70 group-hover:text-[#c8102e]">文</span>
              <span className="flex-1 text-sm font-bold uppercase tracking-[0.24em]">Email</span>
              <span className="truncate text-xs text-[#ece6da]/45">{profile.email}</span>
            </a>
          </li>
        </ul>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="got-btn mt-8 w-full">
          Read the resume
        </a>
      </aside>
    </div>
  )
}
