"use client"

import { useState } from "react"

import { profile, socials } from "@/data/resume"
import { useSound } from "@/components/sound/sound-provider"

export function ContactSection() {
  const { play } = useSound()
  const [sent, setSent] = useState(false)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (k: string) => String(data.get(k) ?? "")
    const body = `${get("message")}\n\n— ${get("name")}${get("email") ? ` (${get("email")})` : ""}`
    play("telegraph")
    setSent(true)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`
  }

  const field = "w-full border-0 border-b border-dashed border-pencil/50 bg-transparent px-1 py-1.5 font-type text-[17px] text-pencil placeholder:text-pencil/35 focus:border-solid focus:border-blood focus:outline-hidden"
  const label = "font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-pencil/70"

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <form onSubmit={onSubmit} className="journal-paper relative px-7 pb-9 pt-7 sm:px-10">
        <div className="flex items-end justify-between border-b-2 border-pencil pb-2">
          <div>
            <p className="font-sans text-[10px] font-bold uppercase tracking-[0.2em] text-pencil/70">Western Union Telegraph Co.</p>
            <h2 className="font-kirsty text-[44px] font-bold uppercase leading-none text-pencil">Telegram</h2>
          </div>
          <p className="text-right font-type text-[12px] leading-tight text-pencil/70">
            Bangalore office
            <br />
            Received for delivery
          </p>
        </div>

        <p className="mt-5 font-type text-[16px] text-pencil">
          <span className={label}>To </span>&nbsp;Shreyash Srivastava, {profile.city}
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="grid gap-1">
            <span className={label}>From</span>
            <input name="name" required autoComplete="name" className={field} />
          </label>
          <label className="grid gap-1">
            <span className={label}>Reply to (email)</span>
            <input name="email" type="email" required autoComplete="email" className={field} />
          </label>
        </div>
        <label className="mt-5 grid gap-1">
          <span className={label}>Regarding</span>
          <input name="subject" required className={field} placeholder="A backend role, a project, a collaboration" />
        </label>
        <label className="mt-5 grid gap-1">
          <span className={label}>Message</span>
          <textarea
            name="message"
            required
            rows={6}
            className={`${field} resize-y border-b-0 leading-[2.1rem]`}
            style={{ backgroundImage: "repeating-linear-gradient(transparent 0 calc(2.1rem - 1px), rgba(43,38,32,0.3) calc(2.1rem - 1px) 2.1rem)" }}
          />
        </label>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <p className="font-slab text-[13px] italic text-pencil/70">Opens your email app with the telegram filled in.</p>
          <button type="submit" className="border-2 border-pencil px-5 py-2 font-rocks text-[22px] uppercase leading-none text-pencil hover:bg-[rgba(105,17,8,0.1)]">
            Send telegram
          </button>
        </div>

        {sent && (
          <p role="status" className="pointer-events-none absolute right-8 top-24 -rotate-12 border-[3px] border-[#8c1a14] px-3 py-1 font-rocks text-[26px] uppercase text-[#8c1a14] opacity-80">
            Handed to the clerk
          </p>
        )}
      </form>

      <aside className="border border-white/10 bg-black/55 px-6 py-6 text-bone backdrop-blur-xs sm:px-8">
        <h3 className="font-rocks text-[30px] uppercase leading-none text-white">Other ways to reach me</h3>
        <div className="my-4 h-px bg-linear-to-r from-white/45 to-transparent" />
        <ul className="space-y-3 font-slab text-[16px]">
          <li>
            <a href={`mailto:${profile.email}`} className="hover:text-white hover:underline">
              {profile.email}
            </a>
          </li>
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">
              Resume (PDF)
            </a>
          </li>
        </ul>
      </aside>
    </div>
  )
}
