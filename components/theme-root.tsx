"use client"

import { createContext, useCallback, useContext, useEffect, useState } from "react"

import { defaultTheme, type ThemeId } from "@/data/games"
import FrontierApp from "@/components/themes/rdr2/frontier-app"
import ValorantApp from "@/components/themes/valorant/valorant-app"

const STORAGE_KEY = "portfolio-theme"

type ThemeApi = { theme: ThemeId; switchTheme: (theme: ThemeId) => void }

const ThemeContext = createContext<ThemeApi>({ theme: defaultTheme, switchTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)

function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === "rdr2" || stored === "valorant") return stored
  } catch {}
  return defaultTheme
}

export default function ThemeRoot() {
  const [theme, setTheme] = useState<ThemeId | null>(null)
  const [curtain, setCurtain] = useState(false)

  useEffect(() => setTheme(readStoredTheme()), [])

  useEffect(() => {
    if (!theme) return
    document.querySelectorAll<HTMLLinkElement>('link[rel~="icon"]').forEach((link) => {
      link.href = `/icons/${theme}.svg`
      link.type = "image/svg+xml"
    })
  }, [theme])

  const switchTheme = useCallback((next: ThemeId) => {
    setCurtain(true)
    window.setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {}
      history.replaceState(null, "", window.location.pathname)
      setTheme(next)
      window.scrollTo({ top: 0 })
      window.setTimeout(() => setCurtain(false), 400)
    }, 600)
  }, [])

  return (
    <ThemeContext.Provider value={{ theme: theme ?? defaultTheme, switchTheme }}>
      {theme === "rdr2" && <FrontierApp />}
      {theme === "valorant" && <ValorantApp />}
      <div
        aria-hidden={!curtain}
        className="pointer-events-none fixed inset-0 z-1000 bg-black transition-opacity duration-500"
        style={{ opacity: theme === null || curtain ? 1 : 0 }}
      />
    </ThemeContext.Provider>
  )
}
