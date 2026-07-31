"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Target {
  id: number
  x: number
  y: number
  size: number
  speed: number
  spawnTime: number
  fact: string
  hit: boolean
}

type GameState = "ready" | "playing" | "complete"

const AGENT_FACTS = [
  "6 Active Projects",
  "LeetCode Rating: 1441",
  "CodeChef Rating: 1415",
  "Go + Next.js Specialist",
  "5 Open Source Orgs",
  "LiFT Scholarship Recipient",
  "CTF Winner",
  "Backend Developer",
  "Chaos Engineering",
  "Kubernetes Operator",
  "CI/CD Pipeline Builder",
  "Hack-Nocturne Winner",
  "Stripe Integration Expert",
  "7min → 16sec Optimization",
  "Debian Contributor",
  "OpenTelemetry Contributor",
  "Docker + K8s Native",
  "Prometheus & Grafana",
  "MongoDB & PostgreSQL",
  "Flask + Django + Gin",
]

const GAME_DURATION = 30

export default function ShooterGame({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animFrameRef = useRef<number>(0)
  const [gameState, setGameState] = useState<GameState>("ready")
  const [score, setScore] = useState(0)
  const [targetsHit, setTargetsHit] = useState(0)
  const [totalShots, setTotalShots] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [hitFact, setHitFact] = useState<string | null>(null)
  const [screenFlash, setScreenFlash] = useState(false)
  const targetsRef = useRef<Target[]>([])
  const nextIdRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const lastSpawnRef = useRef(0)
  const gameActiveRef = useRef(false)
  const totalShotsRef = useRef(0)
  const targetsHitRef = useRef(0)
  const scoreRef = useRef(0)

  const spawnTarget = useCallback((canvasW: number, canvasH: number) => {
    const margin = 60
    const size = 28 + Math.random() * 24
    const fact = AGENT_FACTS[Math.floor(Math.random() * AGENT_FACTS.length)]
    const target: Target = {
      id: nextIdRef.current++,
      x: margin + Math.random() * (canvasW - margin * 2),
      y: margin + Math.random() * (canvasH - margin * 2),
      size,
      speed: 0.3 + Math.random() * 0.6,
      spawnTime: Date.now(),
      fact,
      hit: false,
    }
    targetsRef.current.push(target)
  }, [])

  const startGame = useCallback(() => {
    setGameState("playing")
    setScore(0)
    setTargetsHit(0)
    setTotalShots(0)
    setTimeLeft(GAME_DURATION)
    targetsRef.current = []
    nextIdRef.current = 0
    lastSpawnRef.current = 0
    gameActiveRef.current = true
    totalShotsRef.current = 0
    targetsHitRef.current = 0
    scoreRef.current = 0
  }, [])

  // Game timer
  useEffect(() => {
    if (gameState !== "playing") return

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          gameActiveRef.current = false
          setGameState("complete")
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [gameState])

  // Canvas game loop
  useEffect(() => {
    if (!isOpen || gameState !== "playing") return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const drawTarget = (target: Target, now: number) => {
      const age = (now - target.spawnTime) / 1000
      const pulse = 1 + Math.sin(age * 4) * 0.08
      const size = target.size * pulse

      // Outer diamond
      ctx.save()
      ctx.translate(target.x, target.y)
      ctx.rotate(Math.PI / 4)

      // Glow
      ctx.shadowColor = "#FF4655"
      ctx.shadowBlur = 12

      // Outer border
      ctx.strokeStyle = "#FF4655"
      ctx.lineWidth = 2
      ctx.strokeRect(-size / 2, -size / 2, size, size)

      // Inner fill
      ctx.fillStyle = "rgba(255, 70, 85, 0.15)"
      ctx.fillRect(-size / 2, -size / 2, size, size)

      // Inner diamond
      ctx.strokeStyle = "rgba(255, 70, 85, 0.6)"
      ctx.lineWidth = 1
      const inner = size * 0.5
      ctx.strokeRect(-inner / 2, -inner / 2, inner, inner)

      // Center dot
      ctx.fillStyle = "#FF4655"
      ctx.shadowBlur = 20
      ctx.fillRect(-3, -3, 6, 6)

      ctx.restore()

      // Expire timer ring
      const maxLife = 3.5
      const lifeRatio = Math.min(age / maxLife, 1)
      ctx.beginPath()
      ctx.arc(target.x, target.y, size * 0.9, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * (1 - lifeRatio))
      ctx.strokeStyle = `rgba(255, 70, 85, ${0.4 * (1 - lifeRatio)})`
      ctx.lineWidth = 1.5
      ctx.stroke()
    }

    const drawCrosshair = (x: number, y: number) => {
      ctx.save()
      ctx.strokeStyle = "#ECE8E1"
      ctx.lineWidth = 1.5
      ctx.shadowColor = "#FF4655"
      ctx.shadowBlur = 6

      const size = 16
      const gap = 5

      // Cross lines
      ctx.beginPath()
      ctx.moveTo(x - size, y)
      ctx.lineTo(x - gap, y)
      ctx.moveTo(x + gap, y)
      ctx.lineTo(x + size, y)
      ctx.moveTo(x, y - size)
      ctx.lineTo(x, y - gap)
      ctx.moveTo(x, y + gap)
      ctx.lineTo(x, y + size)
      ctx.stroke()

      // Center dot
      ctx.fillStyle = "#FF4655"
      ctx.shadowBlur = 12
      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fill()

      // Outer circle
      ctx.strokeStyle = "rgba(236, 232, 225, 0.3)"
      ctx.shadowBlur = 0
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(x, y, size + 4, 0, Math.PI * 2)
      ctx.stroke()

      ctx.restore()
    }

    const drawGrid = (w: number, h: number) => {
      ctx.strokeStyle = "rgba(255, 70, 85, 0.06)"
      ctx.lineWidth = 1

      for (let x = 0; x < w; x += 46) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += 46) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }

    const drawHUD = (w: number, h: number) => {
      // Corner brackets
      ctx.strokeStyle = "rgba(236, 232, 225, 0.3)"
      ctx.lineWidth = 2

      const bLen = 30
      // Top-left
      ctx.beginPath()
      ctx.moveTo(20, 20 + bLen)
      ctx.lineTo(20, 20)
      ctx.lineTo(20 + bLen, 20)
      ctx.stroke()
      // Top-right
      ctx.beginPath()
      ctx.moveTo(w - 20 - bLen, 20)
      ctx.lineTo(w - 20, 20)
      ctx.lineTo(w - 20, 20 + bLen)
      ctx.stroke()
      // Bottom-left
      ctx.beginPath()
      ctx.moveTo(20, h - 20 - bLen)
      ctx.lineTo(20, h - 20)
      ctx.lineTo(20 + bLen, h - 20)
      ctx.stroke()
      // Bottom-right
      ctx.beginPath()
      ctx.moveTo(w - 20 - bLen, h - 20)
      ctx.lineTo(w - 20, h - 20)
      ctx.lineTo(w - 20, h - 20 - bLen)
      ctx.stroke()

      // PRACTICE RANGE label
      ctx.font = "bold 11px 'Inter', sans-serif"
      ctx.fillStyle = "rgba(236, 232, 225, 0.4)"
      ctx.letterSpacing = "2px"
      ctx.textAlign = "left"
      ctx.fillText("PRACTICE RANGE // SHREYASH SRI", 28, 46)
    }

    const gameLoop = () => {
      if (!gameActiveRef.current) return
      const now = Date.now()
      const w = canvas.width
      const h = canvas.height

      // Clear
      ctx.fillStyle = "#0F1923"
      ctx.fillRect(0, 0, w, h)

      // Grid
      drawGrid(w, h)

      // Spawn targets
      if (now - lastSpawnRef.current > 700) {
        spawnTarget(w, h)
        lastSpawnRef.current = now
      }

      // Remove expired targets (older than 3.5s)
      targetsRef.current = targetsRef.current.filter((t) => {
        if (t.hit) return false
        return now - t.spawnTime < 3500
      })

      // Draw targets
      targetsRef.current.forEach((t) => drawTarget(t, now))

      // Draw HUD
      drawHUD(w, h)

      // Draw crosshair
      drawCrosshair(mouseRef.current.x, mouseRef.current.y)

      animFrameRef.current = requestAnimationFrame(gameLoop)
    }

    animFrameRef.current = requestAnimationFrame(gameLoop)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [isOpen, gameState, spawnTarget])

  // Mouse tracking
  useEffect(() => {
    if (!isOpen || gameState !== "playing") return

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleClick = (e: MouseEvent) => {
      if (!gameActiveRef.current) return

      totalShotsRef.current += 1
      setTotalShots(totalShotsRef.current)

      const mx = e.clientX
      const my = e.clientY

      // Check hit on targets (reverse order — top-most first)
      let hitTarget: Target | null = null
      for (let i = targetsRef.current.length - 1; i >= 0; i--) {
        const t = targetsRef.current[i]
        const dx = mx - t.x
        const dy = my - t.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < t.size * 0.85) {
          hitTarget = t
          break
        }
      }

      if (hitTarget) {
        hitTarget.hit = true
        const reactionTime = (Date.now() - hitTarget.spawnTime) / 1000
        const points = Math.max(10, Math.floor(100 - reactionTime * 25))
        scoreRef.current += points
        targetsHitRef.current += 1
        setScore(scoreRef.current)
        setTargetsHit(targetsHitRef.current)
        setHitFact(hitTarget.fact)
        setScreenFlash(true)
        setTimeout(() => setScreenFlash(false), 120)
        setTimeout(() => setHitFact(null), 1200)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("click", handleClick)
    }
  }, [isOpen, gameState])

  if (!isOpen) return null

  const accuracy = totalShots > 0 ? Math.round((targetsHit / totalShots) * 100) : 0

  return (
    <motion.div
      className="shooter-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* === READY SCREEN === */}
      {gameState === "ready" && (
        <div className="shooter-ready">
          <div className="shooter-ready__corner shooter-ready__corner--tl" />
          <div className="shooter-ready__corner shooter-ready__corner--br" />

          <motion.div
            className="shooter-ready__content"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shooter-ready__kicker">
              <span className="shooter-ready__kicker-line" />
              PRACTICE RANGE
            </div>
            <h2 className="shooter-ready__title">TACTICAL<br />TARGET PRACTICE</h2>
            <p className="shooter-ready__desc">
              Destroy diamond targets to reveal facts about Agent ShreyashSri.<br />
              Each target awards points based on reaction speed. You have {GAME_DURATION} seconds.
            </p>

            <div className="shooter-ready__rules">
              <div className="shooter-ready__rule">
                <span className="shooter-ready__rule-num">01</span>
                <span>Click diamond targets to destroy them</span>
              </div>
              <div className="shooter-ready__rule">
                <span className="shooter-ready__rule-num">02</span>
                <span>Faster reactions = higher score</span>
              </div>
              <div className="shooter-ready__rule">
                <span className="shooter-ready__rule-num">03</span>
                <span>Each target reveals an agent fact</span>
              </div>
            </div>

            <motion.button
              className="shooter-ready__start"
              onClick={startGame}
              whileHover={{ scale: 1.04, x: 3, y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              START PRACTICE →
            </motion.button>
          </motion.div>

          <button className="shooter-close" onClick={onClose}>✕</button>
        </div>
      )}

      {/* === PLAYING === */}
      {gameState === "playing" && (
        <>
          <canvas
            ref={canvasRef}
            className="shooter-canvas"
          />

          {/* HUD Overlay */}
          <div className="shooter-hud">
            <div className="shooter-hud__left">
              <div className="shooter-hud__stat">
                <span className="shooter-hud__stat-label">SCORE</span>
                <span className="shooter-hud__stat-value">{score}</span>
              </div>
              <div className="shooter-hud__stat">
                <span className="shooter-hud__stat-label">HITS</span>
                <span className="shooter-hud__stat-value">{targetsHit}</span>
              </div>
              <div className="shooter-hud__stat">
                <span className="shooter-hud__stat-label">ACC</span>
                <span className="shooter-hud__stat-value">{accuracy}%</span>
              </div>
            </div>
            <div className="shooter-hud__center">
              <div className="shooter-hud__timer">{String(timeLeft).padStart(2, "0")}</div>
            </div>
            <div className="shooter-hud__right">
              <button className="shooter-close shooter-close--hud" onClick={() => {
                gameActiveRef.current = false
                setGameState("complete")
              }}>
                END PRACTICE
              </button>
            </div>
          </div>

          {/* Hit fact popup */}
          <AnimatePresence>
            {hitFact && (
              <motion.div
                className="shooter-fact"
                initial={{ y: 20, opacity: 0, scale: 0.9 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="shooter-fact__label">INTEL:</span> {hitFact}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Screen flash on hit */}
          {screenFlash && <div className="shooter-flash" />}
        </>
      )}

      {/* === COMPLETE === */}
      {gameState === "complete" && (
        <div className="shooter-complete">
          <motion.div
            className="shooter-complete__content"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="shooter-complete__header">
              <div className="shooter-complete__kicker">
                <span className="shooter-complete__kicker-line" />
                MISSION REPORT
              </div>
              <h2 className="shooter-complete__title">PRACTICE COMPLETE</h2>
            </div>

            <div className="shooter-complete__stats">
              <div className="shooter-complete__stat-card">
                <div className="shooter-complete__stat-num">{score}</div>
                <div className="shooter-complete__stat-label">TOTAL SCORE</div>
              </div>
              <div className="shooter-complete__stat-card">
                <div className="shooter-complete__stat-num">{targetsHit}</div>
                <div className="shooter-complete__stat-label">TARGETS HIT</div>
              </div>
              <div className="shooter-complete__stat-card">
                <div className="shooter-complete__stat-num">{accuracy}%</div>
                <div className="shooter-complete__stat-label">ACCURACY</div>
              </div>
              <div className="shooter-complete__stat-card">
                <div className="shooter-complete__stat-num">{totalShots}</div>
                <div className="shooter-complete__stat-label">TOTAL SHOTS</div>
              </div>
            </div>

            <div className="shooter-complete__agent">
              <div className="shooter-complete__agent-label">AGENT DOSSIER</div>
              <div className="shooter-complete__agent-name">SHREYASH SRI</div>
              <div className="shooter-complete__agent-rank">
                {score >= 800 ? "RADIANT" : score >= 500 ? "IMMORTAL" : score >= 300 ? "DIAMOND" : score >= 150 ? "PLATINUM" : score >= 50 ? "GOLD" : "IRON"}
              </div>
            </div>

            <div className="shooter-complete__actions">
              <motion.button
                className="shooter-ready__start"
                onClick={startGame}
                whileHover={{ scale: 1.04, x: 3, y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                PLAY AGAIN →
              </motion.button>
              <button className="shooter-complete__exit" onClick={onClose}>
                RETURN TO PORTFOLIO
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}
