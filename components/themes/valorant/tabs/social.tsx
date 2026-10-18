"use client"

import { useState } from "react"

import { profile, socials } from "@/data/resume"
import { BrandIcon } from "@/components/brand-icon"
import { composeMail } from "@/components/shared/compose-mail"
import { PlayerCard } from "../player-card"
import { Heading } from "../ui"

export function FriendsList() {
  return (
    <ul className="space-y-1">
      {socials.map((s) => (
        <li key={s.label}>
          <a href={s.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-white/5">
            <span className="relative flex h-9 w-9 items-center justify-center bg-[#1f2b36]">
              <BrandIcon name={s.label} className="h-4 w-4" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 border-2 border-[#0f1923] bg-[#2fd3b2]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-barlow-condensed text-sm font-semibold uppercase tracking-[0.12em]">{s.label}</span>
              <span className="block font-barlow text-[11px] text-[#2fd3b2]">Online · {profile.handle}</span>
            </span>
          </a>
        </li>
      ))}
      <li>
        <a href={`mailto:${profile.email}`} className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-white/5">
          <span className="relative flex h-9 w-9 items-center justify-center bg-[#ff4655] font-anton text-sm">@</span>
          <span className="min-w-0">
            <span className="block truncate font-barlow-condensed text-sm font-semibold uppercase tracking-[0.12em]">Email</span>
            <span className="block truncate font-barlow text-[11px] text-white/55">{profile.email}</span>
          </span>
        </a>
      </li>
    </ul>
  )
}

function PartyLobby() {
  return (
    <ul aria-label="Party" className="mb-6 grid grid-cols-5 gap-2 sm:gap-3">
      <li className="aspect-[5/8] sm:aspect-auto sm:h-64">
        <PlayerCard />
      </li>
      {[1, 2, 3, 4].map((n) => (
        <li key={n} className="aspect-[5/8] sm:aspect-auto sm:h-64">
          <button
            type="button"
            onClick={() => {
              document.getElementById("val-invite-name")?.focus()
            }}
            className="group flex h-full w-full flex-col items-center justify-center gap-2 border border-dashed border-white/20 bg-[#0f1923]/60 transition-colors hover:border-[#ff4655] hover:bg-[#ff4655]/10"
          >
            <span className="flex h-9 w-9 items-center justify-center border border-white/30 font-anton text-xl text-white/70 transition-colors group-hover:border-[#ff4655] group-hover:text-[#ff4655]">+</span>
            <span className="hidden font-barlow-condensed text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50 sm:block">{n === 1 ? "You?" : "Invite"}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

export function SocialTab() {
  const [sent, setSent] = useState(false)
  return (
    <div className="val-in">
      <Heading kicker="Social · Party 1/5" title="Send an invite" />
      <PartyLobby />
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <form
          className="val-panel val-ticks grid gap-4 p-6"
          onSubmit={(e) => {
            e.preventDefault()
            setSent(true)
            composeMail(e.currentTarget)
          }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2">
              <span className="font-barlow-condensed text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Riot ID / name</span>
              <input id="val-invite-name" name="name" required autoComplete="name" className="val-field" placeholder="Your name" />
            </label>
            <label className="grid gap-2">
              <span className="font-barlow-condensed text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Email</span>
              <input name="email" type="email" required autoComplete="email" className="val-field" placeholder="you@example.com" />
            </label>
          </div>
          <label className="grid gap-2">
            <span className="font-barlow-condensed text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Queue</span>
            <input name="subject" required className="val-field" placeholder="Backend role, project, collaboration" />
          </label>
          <label className="grid gap-2">
            <span className="font-barlow-condensed text-xs font-semibold uppercase tracking-[0.25em] text-white/60">Message</span>
            <textarea name="message" required rows={6} className="val-field resize-y" placeholder="Drop the details" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-barlow text-xs text-white/50">{sent ? "Invite ready in your email app." : "Opens your email app with the message filled in."}</p>
            <button type="submit" className="val-btn val-btn-primary">
              Send invite
            </button>
          </div>
        </form>
        <div className="val-panel h-fit">
          <p className="border-b border-white/10 px-4 py-3 font-barlow-condensed text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Friends · {socials.length + 1} online
          </p>
          <FriendsList />
        </div>
      </div>
    </div>
  )
}
