"use client"

import { useEffect, useRef } from "react"

import { sequenceNumber, sequences, type SequenceId } from "./sequences"

type Palette = { a: string; b: string; rung: string; hot: string; glow: string }

const light: Palette = { a: "28,42,51", b: "179,18,28", rung: "28,42,51", hot: "179,18,28", glow: "179,18,28" }
const dark: Palette = { a: "214,226,236", b: "242,193,78", rung: "150,180,210", hot: "242,193,78", glow: "242,193,78" }

const TAU = Math.PI * 2

export function DnaMenu({ active, eagle, onHover, onOpen }: { active: SequenceId; eagle: boolean; onHover: (id: SequenceId) => void; onOpen: (id: SequenceId) => void }) {
  const nav = useRef<HTMLElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const rows = useRef<(HTMLLIElement | null)[]>([])
  const state = useRef({ active: sequences.findIndex((s) => s.id === active), eagle, hovering: false })

  useEffect(() => {
    state.current.active = sequences.findIndex((s) => s.id === active)
    state.current.eagle = eagle
  }, [active, eagle])

  useEffect(() => {
    const el = canvas.current
    const box = nav.current
    if (!el || !box) return
    const ctx = el.getContext("2d")
    if (!ctx) return
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches
    let W = 0
    let H = 0
    let ys: number[] = []
    let theta = 0
    let last = performance.now()
    let raf = 0

    const measure = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = el.clientWidth
      H = box.clientHeight
      el.width = W * dpr
      el.height = H * dpr
      el.style.height = `${H}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ys = rows.current.map((r) => (r ? r.offsetTop + r.offsetHeight / 2 : 0))
    }

    const draw = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now
      if (ys.length < 2) return
      const { active: i, eagle: dim } = state.current
      const p = dim ? dark : light
      const row = ys[1] - ys[0]
      const k = Math.PI / 2 / row
      const cx = W / 2
      const R = W / 2 - 12
      const target = -i * (Math.PI / 2)
      let diff = (target - theta) % TAU
      if (diff > Math.PI) diff -= TAU
      if (diff < -Math.PI) diff += TAU
      if (still) theta = target
      else if (state.current.hovering) theta += diff * Math.min(1, dt * 6)
      else theta += dt * 0.5

      ctx.clearRect(0, 0, W, H)
      const angle = (y: number) => theta + k * (y - ys[0])

      const strand = (offset: number, rgb: string, front: boolean) => {
        for (let y = 0; y < H; y += 3) {
          const a1 = angle(y) + offset
          const a2 = angle(y + 3) + offset
          const z = Math.sin((a1 + a2) / 2)
          if (front !== z >= 0) continue
          const d = (z + 1) / 2
          ctx.strokeStyle = `rgba(${rgb},${0.18 + 0.72 * d})`
          ctx.lineWidth = 1 + 2.2 * d
          ctx.beginPath()
          ctx.moveTo(cx + R * Math.cos(a1), y)
          ctx.lineTo(cx + R * Math.cos(a2), y + 3)
          ctx.stroke()
        }
      }

      strand(0, p.a, false)
      strand(Math.PI, p.b, false)

      const step = row / 3
      const first = ys[0] - Math.ceil(ys[0] / step) * step
      for (let y = first, j = -Math.ceil(ys[0] / step); y < H; y += step, j++) {
        const a = angle(y)
        const xa = cx + R * Math.cos(a)
        const xb = cx - R * Math.cos(a)
        const seq = j % 3 === 0 ? j / 3 : -1
        const isSeq = seq >= 0 && seq < sequences.length
        const hot = isSeq && seq === i
        const span = Math.abs(Math.cos(a))
        if (hot) {
          ctx.strokeStyle = `rgba(${p.glow},0.18)`
          ctx.lineWidth = 9
          ctx.beginPath()
          ctx.moveTo(xa, y)
          ctx.lineTo(xb, y)
          ctx.stroke()
        }
        ctx.lineWidth = hot ? 2.6 : isSeq ? 1.8 : 1
        const mid = (xa + xb) / 2
        ctx.strokeStyle = hot ? `rgba(${p.hot},1)` : `rgba(${p.a},${isSeq ? 0.5 : 0.16 + 0.2 * span})`
        ctx.beginPath()
        ctx.moveTo(xa, y)
        ctx.lineTo(mid, y)
        ctx.stroke()
        ctx.strokeStyle = hot ? `rgba(${p.hot},1)` : `rgba(${p.b},${isSeq ? 0.5 : 0.14 + 0.2 * span})`
        ctx.beginPath()
        ctx.moveTo(mid, y)
        ctx.lineTo(xb, y)
        ctx.stroke()
        if (isSeq) {
          for (const x of [xa, xb]) {
            const s = hot ? 5 : 3.2
            ctx.fillStyle = hot ? `rgba(${p.hot},1)` : `rgba(${p.a},0.7)`
            ctx.beginPath()
            ctx.moveTo(x, y - s)
            ctx.lineTo(x + s, y)
            ctx.lineTo(x, y + s)
            ctx.lineTo(x - s, y)
            ctx.fill()
          }
        }
        if (hot && span > 0.92) {
          ctx.setLineDash([3, 4])
          ctx.strokeStyle = `rgba(${p.hot},0.7)`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(Math.max(xa, xb) + 8, y)
          ctx.lineTo(W, y)
          ctx.stroke()
          ctx.setLineDash([])
        }
      }

      strand(0, p.a, true)
      strand(Math.PI, p.b, true)

      if (!still) {
        for (let n = 0; n < 7; n++) {
          const y = (now * 0.03 + (n * H) / 7) % H
          const off = n % 2 ? Math.PI : 0
          const a = angle(y) + off
          const z = (Math.sin(a) + 1) / 2
          ctx.fillStyle = `rgba(${n % 2 ? p.b : p.a},${0.2 + 0.6 * z})`
          ctx.beginPath()
          ctx.arc(cx + R * Math.cos(a), y, 1.2 + 1.8 * z, 0, TAU)
          ctx.fill()
        }
      }
    }

    const loop = (now: number) => {
      draw(now)
      raf = requestAnimationFrame(loop)
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(box)
    raf = requestAnimationFrame(loop)
    return () => {
      ro.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <nav
      ref={nav}
      aria-label="Sequences"
      onPointerEnter={() => (state.current.hovering = true)}
      onPointerLeave={() => (state.current.hovering = false)}
      onFocus={() => (state.current.hovering = true)}
      onBlur={() => (state.current.hovering = false)}
      className="an-dna relative grid grid-cols-[84px_1fr] md:grid-cols-[180px_1fr] xl:grid-cols-[220px_1fr]">
      <span aria-hidden="true" className="an-dna-glow pointer-events-none absolute inset-y-0 left-0 w-[84px] md:w-[180px] xl:w-[220px]" />
      <canvas ref={canvas} aria-hidden="true" className="an-dna-canvas absolute left-0 top-0 w-[84px] md:w-[180px] xl:w-[220px]" />
      <span />
      <ol className="relative py-10">
        {sequences.map((s, i) => {
          const on = s.id === active
          return (
            <li key={s.id} ref={(node) => void (rows.current[i] = node)} className="h-[52px] md:h-[58px]">
              <button
                type="button"
                aria-current={on}
                onMouseEnter={() => onHover(s.id)}
                onFocus={() => onHover(s.id)}
                onClick={() => onOpen(s.id)}
                className="an-seq flex h-full w-full items-center pl-3 text-left md:pl-5"
              >
                <span className="an-seq-label min-w-0">
                  <span className="block font-exo text-[10px] font-semibold uppercase tracking-[0.28em] text-(--an-muted)">
                    Sequence {sequenceNumber(s.id)} · {s.title}
                  </span>
                  <span className="an-glitchy block font-marcellus text-[20px] uppercase leading-tight tracking-[0.06em] md:text-[22px]">{s.label}</span>
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
