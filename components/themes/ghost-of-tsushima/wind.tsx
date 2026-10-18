"use client"

import { useEffect, useRef } from "react"

export type Mood = "gold" | "maple" | "crimson" | "wind" | "petal" | "snow" | "ember" | "firefly"

type Kind = "leaf" | "streak" | "flake" | "glow"

export type Point = { x: number; y: number }

const moods: Record<Mood, { colors: string[]; kind: Kind; speed: number }> = {
  gold: { colors: ["#f2c14e", "#e7a53a", "#f8dc8f"], kind: "leaf", speed: 1 },
  maple: { colors: ["#d9452b", "#b5301d", "#f0803d"], kind: "leaf", speed: 0.9 },
  crimson: { colors: ["#c8102e", "#e23b51", "#8e0b1f"], kind: "leaf", speed: 1.15 },
  petal: { colors: ["#f3d7e0", "#e8c3d0", "#fff4f7"], kind: "leaf", speed: 0.7 },
  wind: { colors: ["#ffffff"], kind: "streak", speed: 1.5 },
  snow: { colors: ["#ffffff", "#e6edf5"], kind: "flake", speed: 0.6 },
  ember: { colors: ["#ffb35c", "#ff7a2f", "#ffd47c"], kind: "glow", speed: 0.8 },
  firefly: { colors: ["#eaf6a2", "#fff1a6"], kind: "glow", speed: 0.35 },
}

type Particle = { x: number; y: number; ang: number; mag: number; size: number; rot: number; spin: number; phase: number; color: string; kind: Kind; life: number }
type Burst = { x: number; y: number; vx: number; vy: number; len: number; life: number }

const angleTo = (from: number, to: number) => Math.atan2(Math.sin(to - from), Math.cos(to - from))

export function Wind({
  mood,
  density = 1,
  paused = false,
  target = null,
  swipe = false,
}: {
  mood: Mood
  density?: number
  paused?: boolean
  target?: Point | null
  swipe?: boolean
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const moodRef = useRef(mood)
  const targetRef = useRef(target)
  const surge = useRef(1)

  useEffect(() => {
    if (moodRef.current !== mood) surge.current = 3.2
    moodRef.current = mood
  }, [mood])

  useEffect(() => {
    targetRef.current = target
    if (target) surge.current = Math.max(surge.current, 1.8)
  }, [target])

  useEffect(() => {
    const el = canvas.current
    if (!el || paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const ctx = el.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let frame = 0
    let last = performance.now()
    const pointer = { x: -999, y: -999, t: 0, vx: 0, vy: 0, cool: 0 }
    const gust = { x: 0, y: 0 }
    const particles: Particle[] = []
    const bursts: Burst[] = []

    const heading = () => {
      const t = targetRef.current
      return t ? (t.x < w / 2 ? Math.PI : 0) : 0.12
    }

    const spawn = (initial: boolean): Particle => {
      const m = moods[moodRef.current]
      const kind = m.kind
      const color = m.colors[Math.floor(Math.random() * m.colors.length)]
      const dir = heading()
      const leftward = Math.cos(dir) < 0
      const base = { rot: Math.random() * Math.PI * 2, spin: (Math.random() - 0.5) * 3, phase: Math.random() * Math.PI * 2, color, kind, life: 0 }
      const edgeX = (pad: number) => (initial ? Math.random() * w : leftward ? w + pad + Math.random() * w * 0.3 : -pad - Math.random() * w * 0.3)
      if (kind === "flake") return { ...base, x: Math.random() * w * 1.2 - w * 0.1, y: initial ? Math.random() * h : -10, ang: leftward ? 2.2 : 0.95, mag: 40 + Math.random() * 35, size: 1 + Math.random() * 2.4 }
      if (kind === "glow") return { ...base, x: Math.random() * w, y: initial ? Math.random() * h : h + 10, ang: leftward ? -2.2 : -1.1, mag: 20 + Math.random() * 30, size: 1 + Math.random() * 1.8 }
      if (kind === "streak") return { ...base, x: edgeX(200), y: Math.random() * h, ang: dir, mag: 260 + Math.random() * 200, size: 80 + Math.random() * 160 }
      return { ...base, x: edgeX(20), y: Math.random() * h * 1.1 - h * 0.1, ang: dir + (Math.random() - 0.5) * 0.3, mag: 70 + Math.random() * 70, size: 3 + Math.random() * 4 }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      w = el.clientWidth
      h = el.clientHeight
      el.width = w * dpr
      el.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(64, Math.max(14, (w * h) / 24000)) * density)
      while (particles.length < count) particles.push(spawn(true))
      particles.length = count
    }

    const out = (p: Particle) => {
      const len = p.kind === "streak" ? p.size : 0
      const cx = Math.cos(p.ang)
      return (cx > 0 && p.x > w + 60 + len) || (cx < 0 && p.x < -60 - len) || p.y > h + 40 || p.y < -60 - len || p.life > 40
    }

    const draw = (p: Particle) => {
      if (p.kind === "streak") {
        const fade = Math.min(1, p.life * 1.5)
        const tx = p.x - Math.cos(p.ang) * p.size
        const ty = p.y - Math.sin(p.ang) * p.size
        const g = ctx.createLinearGradient(tx, ty, p.x, p.y)
        g.addColorStop(0, "rgba(255,255,255,0)")
        g.addColorStop(1, `rgba(255,255,255,${0.32 * fade})`)
        ctx.strokeStyle = g
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(tx, ty + Math.sin(p.phase) * 6)
        ctx.quadraticCurveTo((tx + p.x) / 2, (ty + p.y) / 2 - 6, p.x, p.y)
        ctx.stroke()
        return
      }
      if (p.kind === "glow" || p.kind === "flake") {
        const flicker = p.kind === "glow" ? 0.55 + 0.45 * Math.sin(p.phase * 3) : 0.8
        ctx.globalAlpha = 0.18 * flicker
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 2.2, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = flicker
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
        return
      }
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.scale(1, 0.35 + 0.65 * Math.abs(Math.cos(p.phase)))
      ctx.fillStyle = p.color
      ctx.globalAlpha = 0.9
      ctx.beginPath()
      ctx.moveTo(-p.size, 0)
      ctx.quadraticCurveTo(0, -p.size * 0.7, p.size, 0)
      ctx.quadraticCurveTo(0, p.size * 0.7, -p.size, 0)
      ctx.fill()
      ctx.restore()
    }

    const drawBurst = (b: Burst, dt: number) => {
      b.life -= dt
      b.x += b.vx * dt
      b.y += b.vy * dt
      const speed = Math.hypot(b.vx, b.vy) || 1
      const tx = b.x - (b.vx / speed) * b.len
      const ty = b.y - (b.vy / speed) * b.len
      const g = ctx.createLinearGradient(tx, ty, b.x, b.y)
      g.addColorStop(0, "rgba(255,255,255,0)")
      g.addColorStop(1, `rgba(255,255,255,${0.55 * Math.max(0, b.life)})`)
      ctx.strokeStyle = g
      ctx.lineWidth = 1.2
      ctx.beginPath()
      ctx.moveTo(tx, ty)
      ctx.lineTo(b.x, b.y)
      ctx.stroke()
    }

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      surge.current += (1 - surge.current) * Math.min(1, dt * 0.9)
      const decay = Math.exp(-dt * 1.6)
      gust.x *= decay
      gust.y *= decay
      const m = moods[moodRef.current]
      const speed = m.speed * surge.current
      const t = targetRef.current
      ctx.clearRect(0, 0, w, h)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.life += dt
        p.phase += dt * (1.2 + p.spin * 0.3)
        p.rot += p.spin * dt
        if (t && p.kind !== "glow") {
          const want = Math.atan2(t.y - p.y, t.x - p.x)
          p.ang += angleTo(p.ang, want) * Math.min(1, dt * 1.4)
        } else if (p.kind === "leaf" || p.kind === "streak") {
          p.ang += angleTo(p.ang, 0.12) * Math.min(1, dt * 0.5)
        }
        let ax = gust.x
        let ay = gust.y
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (d2 < 14400 && p.kind !== "streak") {
          const d = Math.sqrt(d2) + 1
          const f = (1 - d / 120) * 260
          ax += (dx / d) * f
          ay += (dy / d) * f
        }
        const v = p.mag * (p.kind === "glow" ? 1 : speed)
        p.x += (Math.cos(p.ang) * v + ax) * dt
        p.y += (Math.sin(p.ang) * v + Math.sin(p.phase) * (p.kind === "leaf" ? 22 : 8) + ay) * dt
        const arrived = t && p.kind !== "glow" && Math.abs(p.x - t.x) < 40 && Math.abs(p.y - t.y) < 40
        const stale = p.kind !== m.kind && Math.random() < dt * 0.6
        if (stale || arrived || out(p) || (p.kind === "glow" && p.life > 14)) particles[i] = spawn(false)
        draw(particles[i])
      }
      for (let i = bursts.length - 1; i >= 0; i--) {
        drawBurst(bursts[i], dt)
        if (bursts[i].life <= 0) bursts.splice(i, 1)
      }
      frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      const ms = e.timeStamp - pointer.t
      if (swipe && pointer.t && ms > 0 && ms < 80) {
        pointer.vx = pointer.vx * 0.6 + ((x - pointer.x) / ms) * 0.4
        pointer.vy = pointer.vy * 0.6 + ((y - pointer.y) / ms) * 0.4
        const fast = Math.hypot(pointer.vx, pointer.vy)
        if (fast > 2.2 && e.timeStamp > pointer.cool) {
          pointer.cool = e.timeStamp + 700
          const nx = pointer.vx / fast
          const ny = pointer.vy / fast
          gust.x = nx * 900
          gust.y = ny * 900
          surge.current = Math.max(surge.current, 2.4)
          for (let k = 0; k < 14; k++) {
            const spread = (Math.random() - 0.5) * 220
            const s = 900 + Math.random() * 700
            bursts.push({ x: x - ny * spread, y: y + nx * spread, vx: nx * s, vy: ny * s, len: 60 + Math.random() * 120, life: 0.8 + Math.random() * 0.5 })
          }
        }
      }
      pointer.x = x
      pointer.y = y
      pointer.t = e.timeStamp
    }
    const onLeave = () => {
      pointer.x = -999
      pointer.y = -999
      pointer.t = 0
    }
    const onUp = (e: PointerEvent) => e.pointerType !== "mouse" && onLeave()

    resize()
    frame = requestAnimationFrame(tick)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    document.addEventListener("pointerleave", onLeave)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointerup", onUp)
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
    }
  }, [density, paused, swipe])

  return <canvas ref={canvas} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />
}
