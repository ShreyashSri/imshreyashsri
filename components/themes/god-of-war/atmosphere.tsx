"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

import { vistaUrl, type Mood } from "./realms"

type Spec = { vy: [number, number]; vx: [number, number]; size: [number, number]; sway: number; twinkle: boolean }

const specs: Record<Mood, Spec> = {
  motes: { vy: [-0.12, -0.04], vx: [-0.05, 0.05], size: [1, 2.4], sway: 0.25, twinkle: true },
  embers: { vy: [-0.9, -0.35], vx: [-0.2, 0.25], size: [1, 2.6], sway: 0.6, twinkle: true },
  snow: { vy: [0.25, 0.7], vx: [-0.2, 0.1], size: [1, 2.8], sway: 0.5, twinkle: false },
  sparks: { vy: [-0.25, -0.05], vx: [-0.08, 0.08], size: [0.8, 2], sway: 0.2, twinkle: true },
  spores: { vy: [-0.2, 0.05], vx: [0.05, 0.3], size: [1.2, 3], sway: 0.8, twinkle: true },
  frost: { vy: [0.08, 0.3], vx: [-0.12, -0.02], size: [0.8, 2.2], sway: 0.3, twinkle: true },
  mist: { vy: [-0.04, 0.04], vx: [0.08, 0.22], size: [18, 46], sway: 0.1, twinkle: false },
}

const rand = ([a, b]: [number, number]) => a + Math.random() * (b - a)

function sprite(color: string) {
  const c = document.createElement("canvas")
  c.width = c.height = 64
  const g = c.getContext("2d")!
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32)
  grad.addColorStop(0, "#ffffff")
  grad.addColorStop(0.18, color)
  grad.addColorStop(0.5, `${color}55`)
  grad.addColorStop(1, `${color}00`)
  g.fillStyle = grad
  g.fillRect(0, 0, 64, 64)
  return c
}

type Part = { x: number; y: number; vx: number; vy: number; s: number; p: number; a: number }

const respec = (q: Part, spec: Spec) => {
  q.vx = rand(spec.vx)
  q.vy = rand(spec.vy)
  q.s = rand(spec.size)
}

function Motes({ mood, accent }: { mood: Mood; accent: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const state = useRef<{ spec: Spec; img: HTMLCanvasElement | null; mood: Mood; parts: Part[] }>({ spec: specs[mood], img: null, mood, parts: [] })

  useEffect(() => {
    const st = state.current
    st.spec = specs[mood]
    st.mood = mood
    st.img = sprite(mood === "snow" || mood === "frost" ? "#dfeefa" : accent)
    st.parts.forEach((q) => respec(q, st.spec))
  }, [mood, accent])

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = canvas.getContext("2d")!
    const st = state.current
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let w = 0
    let h = 0
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const count = w < 640 ? 34 : 64
    st.parts = Array.from({ length: count }, () => {
      const q = { x: Math.random() * w, y: Math.random() * h, vx: 0, vy: 0, s: 1, p: Math.random() * Math.PI * 2, a: 0.35 + Math.random() * 0.55 }
      respec(q, st.spec)
      return q
    })
    let raf = 0
    let last = performance.now()
    const tick = (now: number) => {
      const dt = Math.min(3, (now - last) / 16.7)
      last = now
      ctx.clearRect(0, 0, w, h)
      const { spec, img, mood: m, parts } = st
      if (img) {
        for (const q of parts) {
          q.p += 0.02 * dt
          q.x += (q.vx + Math.sin(q.p) * spec.sway * 0.3) * dt
          q.y += q.vy * dt
          const pad = q.s * 6
          if (q.y < -pad) q.y = h + pad
          if (q.y > h + pad) q.y = -pad
          if (q.x < -pad) q.x = w + pad
          if (q.x > w + pad) q.x = -pad
          const alpha = spec.twinkle ? q.a * (0.55 + 0.45 * Math.sin(q.p * 2.3)) : q.a
          const size = q.s * (m === "mist" ? 6 : 7)
          ctx.globalAlpha = m === "mist" ? alpha * 0.08 : alpha
          ctx.drawImage(img, q.x - size / 2, q.y - size / 2, size, size)
        }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    const onVisibility = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      }
    }
    window.addEventListener("resize", resize)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return <canvas ref={ref} className="gow-in absolute inset-0 h-full w-full" />
}

export function Atmosphere({ mood, accent, vista }: { mood: Mood; accent: string; vista?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {vista && <Image key={vista} src={vistaUrl(vista)} alt="" fill sizes="100vw" className="gow-vista object-cover" />}
      <div className="gow-fog gow-fog-a" />
      <div className="gow-fog gow-fog-b" />
      <div className="gow-fog gow-fog-c" />
      <div className="gow-knot-field absolute inset-0" />
      <Motes mood={mood} accent={accent} />
      <div className="gow-vignette absolute inset-0" />
    </div>
  )
}
