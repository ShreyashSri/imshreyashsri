"use client"

import { useEffect, useRef } from "react"

export const TRAVEL_MS = 1050

export function Travel({ x, y, accent, label, onDone }: { x: number; y: number; accent: string; label: string; onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const done = useRef(onDone)

  useEffect(() => {
    done.current = onDone
  })

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext("2d")!
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const w = window.innerWidth
    const h = window.innerHeight
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const far = Math.hypot(Math.max(x, w - x), Math.max(y, h - y))
    const streaks = Array.from({ length: w < 640 ? 90 : 160 }, () => ({
      a: Math.random() * Math.PI * 2,
      r: Math.random() * 60,
      v: 0.4 + Math.random() * 1.2,
      l: 0.06 + Math.random() * 0.18,
      gold: Math.random() < 0.35,
    }))
    let raf = 0
    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      done.current()
    }
    const t0 = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - t0) / TRAVEL_MS)
      const ease = t * t * (3 - 2 * t)
      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = `rgba(4, 9, 10, ${0.25 + ease * 0.5})`
      ctx.fillRect(0, 0, w, h)
      ctx.globalCompositeOperation = "lighter"
      ctx.lineCap = "round"
      for (const s of streaks) {
        const head = s.r + far * ease * ease * s.v * 1.4
        const tail = Math.max(s.r, head - far * s.l * (0.4 + ease * 2))
        const cos = Math.cos(s.a)
        const sin = Math.sin(s.a)
        ctx.strokeStyle = s.gold ? "rgba(255, 233, 168, 0.55)" : `${accent}aa`
        ctx.lineWidth = 0.6 + ease * 2.2
        ctx.beginPath()
        ctx.moveTo(x + cos * tail, y + sin * tail)
        ctx.lineTo(x + cos * head, y + sin * head)
        ctx.stroke()
      }
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 40 + ease * far)
      glow.addColorStop(0, `rgba(255, 243, 208, ${0.15 + ease * 0.7})`)
      glow.addColorStop(0.3, `${accent}44`)
      glow.addColorStop(1, `${accent}00`)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)
      if (t < 1) raf = requestAnimationFrame(tick)
      else finish()
    }
    raf = requestAnimationFrame(tick)
    const skip = () => finish()
    window.addEventListener("keydown", skip)
    window.addEventListener("pointerdown", skip)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("keydown", skip)
      window.removeEventListener("pointerdown", skip)
    }
  }, [x, y, accent])

  return (
    <div className="fixed inset-0 z-50" role="status" aria-live="polite">
      <canvas ref={ref} className="absolute inset-0 h-full w-full" />
      <p className="gow-travel-label absolute inset-x-0 bottom-[12vh] text-center font-cinzel text-sm font-bold uppercase tracking-[0.5em] text-[#fff3d0]">
        Travelling to {label}
      </p>
    </div>
  )
}
