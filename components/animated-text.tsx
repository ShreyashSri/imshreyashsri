"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const phrases = [
  "Shreyash Srivastava.",
  "a Web Developer.", 
  "a Python Enthusiast.", 
  "an Open Source Contributor.", 
  "a Competitive Programmer."
]

export default function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  
  // Initialize typing on component mount
  useEffect(() => {
    setText("")
  }, [])
  
  useEffect(() => {
    const currentPhrase = phrases[currentIndex]
    
    if (!isDeleting && text === currentPhrase) {
      setIsComplete(true)
      setTimeout(() => {
        setIsDeleting(true)
        setIsComplete(false)
      }, 1500)
    } else if (isDeleting && text === "") {
      setIsDeleting(false)
      setCurrentIndex((prev) => (prev + 1) % phrases.length)
    } else {
      const timeout = setTimeout(() => {
        setText(
          isDeleting 
            ? currentPhrase.substring(0, text.length - 1)
            : currentPhrase.substring(0, text.length + 1)
        )
      }, isDeleting ? 75 : 150)
      
      return () => clearTimeout(timeout)
    }
  }, [text, isDeleting, currentIndex])

  return (
    <div className="flex items-center justify-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
        I am{" "}
        <span className="text-primary-foreground">
          {text}
          <span className="inline-block w-2 ml-1 h-[0.8em] align-middle bg-primary-foreground animate-blink">&nbsp;</span>
        </span>
      </h1>
    </div>
  )
}
