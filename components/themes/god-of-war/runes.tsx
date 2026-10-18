"use client"

import { useEffect, useRef, useState } from "react"

const futhark: Record<string, string> = {
  a: "ᚨ", b: "ᛒ", c: "ᚲ", d: "ᛞ", e: "ᛖ", f: "ᚠ", g: "ᚷ", h: "ᚺ", i: "ᛁ", j: "ᛃ", k: "ᚲ", l: "ᛚ", m: "ᛗ",
  n: "ᚾ", o: "ᛟ", p: "ᛈ", q: "ᚲ", r: "ᚱ", s: "ᛊ", t: "ᛏ", u: "ᚢ", v: "ᚹ", w: "ᚹ", x: "ᛉ", y: "ᛃ", z: "ᛉ",
}

export const toRunes = (text: string) => text.replace(/[a-z]/gi, (c) => futhark[c.toLowerCase()] ?? c)

const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches

type Props = {
  text: string
  as?: "span" | "p" | "h1" | "h2" | "h3"
  className?: string
  speed?: number
  delay?: number
  replay?: boolean
}

export function Runes({ text, as: Tag = "span", className = "", speed = 32, delay = 0, replay = false }: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(0)
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (reduced()) {
      setShown(text.length)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      setRun((n) => n + 1)
    })
    io.observe(el)
    return () => io.disconnect()
  }, [text])

  useEffect(() => {
    if (!run) return
    setShown(0)
    let i = 0
    let timer = 0
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i += 1
        setShown(i)
        if (i >= text.length) window.clearInterval(timer)
      }, speed)
    }, run === 1 ? delay : 0)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
  }, [run, text, speed, delay])

  return (
    <Tag ref={ref as never} className={className} onMouseEnter={replay && shown >= text.length && !reduced() ? () => setRun((n) => n + 1) : undefined}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((c, i) => {
          const rune = futhark[c.toLowerCase()]
          return (
            <span key={i} className="gow-rc" data-r={i >= shown && rune ? rune : undefined}>
              {c}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
