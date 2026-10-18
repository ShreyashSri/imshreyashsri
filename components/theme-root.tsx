"use client"

import { createContext, useCallback, useContext, useEffect, useState, type ComponentType } from "react"
import dynamic from "next/dynamic"

import { defaultTheme, isThemeId, type ThemeId } from "@/data/games"
import FrontierApp from "@/components/themes/rdr2/frontier-app"

const apps: Record<ThemeId, ComponentType> = {
  rdr2: FrontierApp,
  valorant: dynamic(() => import("@/components/themes/valorant/valorant-app"), { ssr: false }),
  "god-of-war": dynamic(() => import("@/components/themes/god-of-war/god-of-war-app"), { ssr: false }),
  "ghost-of-tsushima": dynamic(() => import("@/components/themes/ghost-of-tsushima/ghost-app"), { ssr: false }),
  "assassins-creed": dynamic(() => import("@/components/themes/assassins-creed/animus-app"), { ssr: false }),
}

const STORAGE_KEY = "portfolio-theme"

type ThemeApi = { theme: ThemeId; switchTheme: (theme: ThemeId) => void }

const ThemeContext = createContext<ThemeApi>({ theme: defaultTheme, switchTheme: () => {} })

export const useTheme = () => useContext(ThemeContext)

function readStoredTheme(): ThemeId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (isThemeId(stored)) return stored
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

  const App = theme ? apps[theme] : null

  return (
    <ThemeContext.Provider value={{ theme: theme ?? defaultTheme, switchTheme }}>
      <div id="theme-app" className="contents">
        {App && <App />}
      </div>
      <div
        aria-hidden={!curtain}
        className="pointer-events-none fixed inset-0 z-1000 bg-black transition-opacity duration-500"
        style={{ opacity: theme === null || curtain ? 1 : 0 }}
      />
    </ThemeContext.Provider>
  )
}
