"use client"

import { useState } from "react"

import { profile, socials } from "@/data/resume"
import { BrandIcon } from "@/components/brand-icon"
import { composeMail } from "@/components/shared/compose-mail"
import { Frame, Heading, Label } from "../ui"
import type { PageProps } from "."

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="font-cinzel text-[11px] font-bold uppercase tracking-[0.25em] text-[var(--realm)]">{label}</span>
      {children}
    </label>
  )
}

const motes = Array.from({ length: 16 }, (_, i) => ({ dx: Math.cos(i * 2.4) * (40 + (i % 4) * 22), dy: Math.sin(i * 2.4) * (30 + (i % 3) * 20) - 30, d: 0.6 + (i % 5) * 0.12 }))

function Raven() {
  return (
    <div className="gow-raven pointer-events-none fixed left-0 top-0 z-40" aria-hidden="true">
      <svg viewBox="0 0 120 70" className="gow-raven-body h-[70px] w-[120px]">
        <g fill="#0a0f10" stroke="#8ff0c0" strokeOpacity="0.6" strokeWidth="0.8">
          <path className="gow-wing-up" d="M58 38 C46 18 26 8 4 6 C20 16 30 26 40 38 Z" />
          <path className="gow-wing-down" d="M62 38 C74 18 92 10 116 8 C100 18 90 28 80 38 Z" />
          <path d="M40 40 C48 32 70 30 84 34 L100 30 L92 38 C86 46 66 50 50 48 L30 54 L36 46 Z" />
        </g>
        <circle cx="88" cy="34" r="1.4" fill="#8ff0c0" />
      </svg>
      <span className="gow-raven-burst">
        {motes.map((m, i) => (
          <span key={i} style={{ "--dx": `${m.dx}px`, "--dy": `${m.dy}px`, "--d": `${m.d}s` } as React.CSSProperties} />
        ))}
      </span>
    </div>
  )
}

export function Contact({ realm }: PageProps) {
  const [sent, setSent] = useState(0)

  return (
    <div>
      <Heading rune={realm.rune} realm={realm.realm} codex={realm.codex} title="Contact" />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Frame as="form" className="grid gap-5 px-6 py-6 sm:px-8">
          <p className="font-garamond text-xl italic leading-snug text-[#e8dfc8]/80">Tie a message to Odin&apos;s raven. It flies straight to my inbox.</p>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Name">
              <input name="name" required autoComplete="name" className="gow-field" placeholder="Your name" />
            </Field>
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" className="gow-field" placeholder="you@example.com" />
            </Field>
          </div>
          <Field label="Subject">
            <input name="subject" required className="gow-field" placeholder="A role, a project, a quest" />
          </Field>
          <Field label="Message">
            <textarea name="message" required rows={6} className="gow-field resize-y" placeholder="Speak freely" />
          </Field>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-garamond text-base italic text-[#e8dfc8]/55">{sent ? "The raven is away. Your email app has the message." : "Opens your email app with the message filled in."}</p>
            <button
              type="submit"
              className="gow-btn gow-btn-primary"
              onClick={(e) => {
                const form = e.currentTarget.form
                if (!form || !form.reportValidity()) return
                e.preventDefault()
                setSent((n) => n + 1)
                composeMail(form)
              }}
            >
              Send the raven
            </button>
          </div>
        </Frame>

        <div className="grid content-start gap-5">
          <Frame className="px-6 py-5">
            <a href={`mailto:${profile.email}`} className="group block">
              <Label>Direct</Label>
              <p className="mt-2 break-all font-garamond text-2xl text-[#fff3d0] group-hover:text-[#ffe9a8]">{profile.email}</p>
              <p className="font-garamond text-base italic text-[#e8dfc8]/60">{profile.city}</p>
            </a>
          </Frame>
          <Frame as="section" className="p-2">
            <ul className="grid gap-1">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="gow-entry flex items-center gap-4 px-4 py-3">
                    <span className="flex h-9 w-9 rotate-45 items-center justify-center border border-[var(--realm)]/60 bg-[#071012]">
                      <BrandIcon name={s.label} className="h-4 w-4 -rotate-45 text-[#e9c46a]" />
                    </span>
                    <span className="font-cinzel text-sm font-bold uppercase tracking-[0.15em] text-[#fff3d0]">{s.label}</span>
                    <span className="ml-auto font-garamond text-base italic text-[#e8dfc8]/50">@{profile.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Frame>
        </div>
      </div>
      {sent > 0 && <Raven key={sent} />}
    </div>
  )
}
