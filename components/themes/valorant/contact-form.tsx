"use client"

import { Send } from "lucide-react"

import { profile } from "@/data/resume"
import { button } from "./ui"

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name", autoComplete: "name" },
  { name: "email", label: "Email", type: "email", placeholder: "Your email", autoComplete: "email" },
]

export default function ContactForm() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const get = (key: string) => String(data.get(key) ?? "")
    const body = `${get("message")}\n\n— ${get("name")} (${get("email")})`
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(get("subject"))}&body=${encodeURIComponent(body)}`
  }

  return (
    <form onSubmit={onSubmit} className="tactical-card grid gap-5 p-6">
      <div className="grid gap-5 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.name} className="grid gap-2">
            <span className="hud-label">{f.label}</span>
            <input name={f.name} type={f.type} placeholder={f.placeholder} autoComplete={f.autoComplete} required className="valorant-input px-4 py-3 text-sm" />
          </label>
        ))}
      </div>
      <label className="grid gap-2">
        <span className="hud-label">Subject</span>
        <input name="subject" required className="valorant-input px-4 py-3 text-sm" placeholder="Project, role, or collaboration" />
      </label>
      <label className="grid gap-2">
        <span className="hud-label">Message</span>
        <textarea name="message" required className="valorant-input min-h-36 resize-y px-4 py-3 text-sm" placeholder="Drop the details" />
      </label>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs text-muted-foreground">Opens your email app with the message filled in.</span>
        <button type="submit" className={button({ size: "lg" })}>
          <Send /> Send message
        </button>
      </div>
    </form>
  )
}
