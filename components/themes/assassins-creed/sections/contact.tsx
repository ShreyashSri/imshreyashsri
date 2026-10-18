"use client"

import { useState } from "react"

import { profile, socials } from "@/data/resume"
import { BrandIcon } from "@/components/brand-icon"
import { composeMail } from "@/components/shared/compose-mail"
import { SubHeading } from "../ui"

const label = "font-exo text-[10px] font-semibold uppercase tracking-[0.3em] text-(--an-muted)"

export function ContactSection() {
  const [sent, setSent] = useState(false)

  return (
    <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
      <form
        className="an-card an-brackets grid gap-6 p-6 sm:p-8"
        onSubmit={(e) => {
          e.preventDefault()
          setSent(true)
          composeMail(e.currentTarget)
        }}
      >
        <SubHeading>Courier dispatch</SubHeading>
        <div className="grid gap-6 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className={label}>Your name</span>
            <input name="name" required autoComplete="name" className="an-field" placeholder="Ezio, perhaps" />
          </label>
          <label className="grid gap-1">
            <span className={label}>Reply to</span>
            <input name="email" type="email" required autoComplete="email" className="an-field" placeholder="you@example.com" />
          </label>
        </div>
        <label className="grid gap-1">
          <span className={label}>Regarding</span>
          <input name="subject" required className="an-field" placeholder="A backend role, a project, a collaboration" />
        </label>
        <label className="grid gap-1">
          <span className={label}>Message</span>
          <textarea name="message" required rows={5} className="an-field resize-y" placeholder="Write the message" />
        </label>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="font-exo text-[12px] text-(--an-muted)">{sent ? "Your email app has the message ready." : "Opens your email app with everything filled in."}</p>
          <button type="submit" className="animus-btn animus-btn-primary">
            Send courier
          </button>
        </div>
      </form>

      <aside className="an-card h-fit p-6 sm:p-8">
        <SubHeading>Contacts</SubHeading>
        <ul className="space-y-1">
          <li>
            <a href={`mailto:${profile.email}`} className="group flex items-center gap-4 py-2.5">
              <span className="flex h-10 w-10 items-center justify-center bg-(--an-red) font-marcellus text-lg text-white">@</span>
              <span className="min-w-0">
                <span className="block font-exo text-[12px] font-semibold uppercase tracking-[0.2em]">Email</span>
                <span className="block truncate font-exo text-[13px] text-(--an-muted) group-hover:text-(--an-red)">{profile.email}</span>
              </span>
            </a>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 py-2.5">
                <span className="flex h-10 w-10 items-center justify-center border border-(--an-line) transition-colors group-hover:border-(--an-red) group-hover:text-(--an-red)">
                  <BrandIcon name={s.label} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block font-exo text-[12px] font-semibold uppercase tracking-[0.2em]">{s.label}</span>
                  <span className="block truncate font-exo text-[13px] text-(--an-muted)">{s.href.replace(/^https:\/\/(www\.)?/, "")}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="animus-btn mt-6 w-full">
          Download resume
        </a>
      </aside>
    </div>
  )
}
