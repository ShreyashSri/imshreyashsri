"use client"

import { useEffect, useState } from "react"

const phrases = [
  "BACKEND DEVELOPER",
  "OPEN SOURCE OPERATOR",
  "INFRA BUILDER",
  "COMPETITIVE PROGRAMMER",
  "GO + NEXT.JS SPECIALIST",
]

export default function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [text, setText] = useState(phrases[0])
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[currentIndex]
    const isComplete = text === currentPhrase
    const isCleared = text === ""
    const delay = isComplete && !isDeleting ? 1200 : isDeleting ? 38 : 72

    const timeout = window.setTimeout(() => {
      if (isComplete && !isDeleting) {
        setIsDeleting(true)
        return
      }

      if (isCleared && isDeleting) {
        setIsDeleting(false)
        setCurrentIndex((prev) => (prev + 1) % phrases.length)
        return
      }

      setText(isDeleting ? currentPhrase.slice(0, text.length - 1) : currentPhrase.slice(0, text.length + 1))
    }, delay)

    return () => window.clearTimeout(timeout)
  }, [text, isDeleting, currentIndex])

  return (
    <div className="inline-flex min-h-12 items-center border-l-2 border-primary bg-background/45 px-4 py-3 backdrop-blur">
      <span className="mr-3 hidden h-2 w-2 bg-secondary shadow-[0_0_16px_hsl(var(--secondary))] sm:inline-block" />
      <span className="font-display text-xl font-black uppercase text-foreground sm:text-2xl md:text-3xl">
        <span className="text-muted-foreground">ROLE:</span>{" "}
        <span className="glitch-text text-primary" data-text={text || phrases[currentIndex]}>
          {text}
        </span>
        <span className="ml-1 inline-block h-[0.85em] w-2 translate-y-1 bg-primary animate-blink" />
      </span>
    </div>
  )
}
