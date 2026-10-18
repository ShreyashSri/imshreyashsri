"use client"

import { useEffect, useState } from "react"
import { Code, Crosshair, FileText, Gamepad2, Home, Mail, User, Volume2, VolumeX } from "lucide-react"

import { profile } from "@/data/resume"
import { useSound } from "@/components/sound/sound-provider"
import { button } from "./ui"

const navLinks = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Loadout" },
  { href: "#experience", label: "Operations" },
  { href: "#projects", label: "Missions" },
  { href: "#games", label: "Games" },
  { href: "#contact", label: "Comms" },
]

const mobileLinks = [
  { href: "#top", label: "Home", icon: Home },
  { href: "#about", label: "About", icon: User },
  { href: "#projects", label: "Missions", icon: Code },
  { href: "#games", label: "Games", icon: Gamepad2 },
  { href: "#contact", label: "Comms", icon: Mail },
]

export default function Header() {
  const { enabled, setEnabled, play } = useSound()
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("top")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
      let current = "top"
      document.querySelectorAll<HTMLElement>("section[id]").forEach((section) => {
        if (window.scrollY >= section.offsetTop - 120) current = section.id
      })
      setActive(current)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed left-1/2 top-4 z-50 w-[98%] max-w-7xl -translate-x-1/2 rounded-full border transition-all duration-300 ${
          scrolled ? "border-primary/30 bg-black/60 shadow-[0_0_32px_hsl(var(--primary)/0.12)] backdrop-blur-xl" : "border-white/10 bg-black/40 backdrop-blur-md"
        }`}
      >
        <div className="flex h-14 items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border border-primary bg-primary/15 text-primary shadow-[0_0_18px_hsl(var(--primary)/0.24)]">
              <Crosshair className="h-5 w-5" />
            </span>
            <span className="font-display text-xl uppercase leading-none tracking-wider">
              <span className="text-white">SHREYASH</span>
              <span className="text-primary">SRI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Sections">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                aria-current={active === link.href.slice(1) ? "true" : undefined}
                onMouseEnter={() => play("tick")}
                onClick={() => play("select")}
                className={`px-3 py-2 font-display text-sm font-bold uppercase transition-colors ${
                  active === link.href.slice(1) ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              aria-pressed={enabled}
              aria-label={enabled ? "Turn sound off" : "Turn sound on"}
              className={button({ variant: "ghost", size: "sm" })}
            >
              {enabled ? <Volume2 /> : <VolumeX />}
            </button>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={`${button({ variant: "outline", size: "sm" })} ml-2`}>
              <FileText /> Resume
            </a>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              aria-pressed={enabled}
              aria-label={enabled ? "Turn sound off" : "Turn sound on"}
              className={button({ variant: "ghost", size: "sm" })}
            >
              {enabled ? <Volume2 /> : <VolumeX />}
            </button>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className={button({ variant: "outline", size: "sm" })}>
              <FileText /> Resume
            </a>
          </div>
        </div>
      </header>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-primary/25 bg-background/95 backdrop-blur-xl lg:hidden" aria-label="Sections">
        <div className="grid h-16 grid-cols-5">
          {mobileLinks.map(({ href, label, icon: Icon }) => (
            <a
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center gap-1 font-display text-xs font-bold uppercase transition-colors ${
                active === href.slice(1) ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </a>
          ))}
        </div>
      </nav>
    </>
  )
}
