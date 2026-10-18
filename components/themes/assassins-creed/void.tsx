"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const shapes = [
  "polygon(50% 0, 100% 38%, 72% 100%, 8% 82%)",
  "polygon(0 18%, 64% 0, 100% 70%, 30% 100%)",
  "polygon(20% 0, 100% 24%, 82% 100%, 0 64%)",
  "polygon(40% 0, 100% 55%, 50% 100%, 0 45%)",
]

const shards = [
  { left: "6%", top: "12%", size: 46, rot: 12, dur: 16, delay: -3, depth: 0.6 },
  { left: "18%", top: "68%", size: 84, rot: -24, dur: 19, delay: -8, depth: 1.4 },
  { left: "30%", top: "24%", size: 22, rot: 40, dur: 12, delay: -2, depth: 0.3 },
  { left: "46%", top: "6%", size: 34, rot: 8, dur: 15, delay: -11, depth: 0.8 },
  { left: "54%", top: "80%", size: 60, rot: -12, dur: 18, delay: -6, depth: 1.2 },
  { left: "63%", top: "36%", size: 18, rot: 30, dur: 11, delay: -4, depth: 0.25 },
  { left: "74%", top: "12%", size: 100, rot: -30, dur: 22, delay: -14, depth: 1.8 },
  { left: "84%", top: "62%", size: 40, rot: 18, dur: 14, delay: -9, depth: 0.7 },
  { left: "92%", top: "30%", size: 26, rot: -8, dur: 13, delay: -1, depth: 0.45 },
  { left: "38%", top: "52%", size: 14, rot: 22, dur: 10, delay: -5, depth: 0.2 },
  { left: "88%", top: "88%", size: 66, rot: 36, dur: 20, delay: -12, depth: 1.5 },
  { left: "10%", top: "42%", size: 28, rot: -40, dur: 17, delay: -7, depth: 0.5 },
]

const data = [
  { text: "SEQ 01 · 1485", left: "82%", top: "20%", depth: 0.5 },
  { text: "GO · K8S · AWS", left: "86%", top: "36%", depth: 0.9 },
  { text: "0x4C 0x46 0x54", left: "80%", top: "52%", depth: 1.1 },
  { text: "SYNC 100%", left: "88%", top: "68%", depth: 0.7 },
  { text: "CKAD-2026", left: "34%", top: "5%", depth: 0.35 },
  { text: "GPA 8.75", left: "60%", top: "94%", depth: 0.6 },
  { text: "45.4408 N 12.3155 E", left: "78%", top: "84%", depth: 0.3 },
]

const fragments = [
  { src: "/themes/assassins-creed/backdrops/balcony.webp", left: "-4%", top: "4%", width: "38vw", depth: 0.35, delay: 0 },
  { src: "/themes/assassins-creed/backdrops/rooftops.webp", left: "64%", top: "48%", width: "34vw", depth: 0.55, delay: -6 },
  { src: "/themes/assassins-creed/backdrops/canal.webp", left: "30%", top: "70%", width: "30vw", depth: 0.25, delay: -12 },
]

function depth(d: number): React.CSSProperties {
  return { transform: `translate3d(calc(var(--px, 0) * ${d * 36}px), calc(var(--py, 0) * ${d * 26}px), 0)` }
}

export function AnimusVoid({ data: showData = true }: { data?: boolean }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !matchMedia("(pointer: fine)").matches) return
    const target = { x: 0, y: 0 }
    const now = { x: 0, y: 0 }
    let raf = 0
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5
      target.y = e.clientY / window.innerHeight - 0.5
    }
    const step = () => {
      now.x += (target.x - now.x) * 0.06
      now.y += (target.y - now.y) * 0.06
      root.current?.style.setProperty("--px", now.x.toFixed(4))
      root.current?.style.setProperty("--py", now.y.toFixed(4))
      raf = requestAnimationFrame(step)
    }
    window.addEventListener("pointermove", onMove)
    raf = requestAnimationFrame(step)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div ref={root} aria-hidden="true" className="an-room pointer-events-none fixed inset-0 overflow-hidden">
      {fragments.map((f, i) => (
        <div key={f.src} className={`absolute ${i === 2 ? "hidden md:block" : ""}`} style={{ left: f.left, top: f.top, width: f.width, ...depth(f.depth) }}>
          <div className="an-fragment relative aspect-video" style={{ animationDelay: `${f.delay}s` }}>
            <Image src={f.src} loading="eager" alt="" fill sizes="38vw" className="object-cover" />
          </div>
        </div>
      ))}
      <div className="an-floor" />
      {shards.map((s, i) => (
        <div key={i} className={`absolute ${i % 3 === 2 ? "hidden sm:block" : ""}`} style={{ left: s.left, top: s.top, ...depth(s.depth) }}>
          <span
            className="an-shard block"
            style={
              {
                width: s.size,
                height: s.size * 1.2,
                clipPath: shapes[i % shapes.length],
                "--rot": `${s.rot}deg`,
                "--dur": `${s.dur}s`,
                "--delay": `${s.delay}s`,
                opacity: s.depth > 1 ? 0.6 : 0.9,
              } as React.CSSProperties
            }
          />
        </div>
      ))}
      {showData && data.map((d) => (
        <div key={d.text} className="absolute hidden md:block" style={{ left: d.left, top: d.top, ...depth(d.depth) }}>
          <span className="an-datum">{d.text}</span>
        </div>
      ))}
    </div>
  )
}
