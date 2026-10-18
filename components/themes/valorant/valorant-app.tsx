"use client"

import { useCallback, useState } from "react"
import dynamic from "next/dynamic"

import { SoundProvider } from "@/components/sound/sound-provider"
import GameTrigger from "./game-trigger"
import Header from "./header"
import MatchFoundIntro from "./match-found-intro"
import { About, Achievements, Contact, Experience, Footer, Games, OpenSource, ProfileHero, Projects, Skills, Writing } from "./sections"
import { valorantSounds } from "./sounds"
import "./valorant.css"

const FaultyTerminal = dynamic(() => import("./FaultyTerminal"), { ssr: false })

function TerminalHero() {
  return (
    <section id="top" className="relative flex h-svh w-full items-center justify-center overflow-hidden border-b border-primary/20">
      <div className="absolute inset-0">
        <FaultyTerminal
          scale={2.2}
          gridMul={[2, 1]}
          digitSize={1.2}
          timeScale={0.5}
          scanlineIntensity={0.2}
          glitchAmount={0.2}
          flickerAmount={0.2}
          noiseAmp={0.2}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#FF4655"
          tint2="#ECE8E1"
          mouseReact
          mouseStrength={0.5}
          pageLoadAnimation
          brightness={0.8}
        />
      </div>
      <div className="relative mt-[-10vh] w-full max-w-4xl px-4">
        <h1 className="text-center text-4xl font-bold leading-tight text-white drop-shadow-2xl sm:text-5xl md:text-6xl">
          What I cannot create, <br className="hidden sm:block" /> I do not understand.
        </h1>
        <p className="mt-6 pr-4 text-right text-lg font-medium tracking-wide text-white/80 drop-shadow-lg sm:pr-8 md:text-xl">~ Richard Feynman</p>
      </div>
    </section>
  )
}

export default function ValorantApp() {
  const [ready, setReady] = useState(false)
  const onIntroComplete = useCallback(() => setReady(true), [])

  return (
    <SoundProvider kit={valorantSounds}>
      <div className="theme-valorant valorant-shell">
        <MatchFoundIntro onComplete={onIntroComplete} />
        <div className="transition-opacity delay-100 duration-500" style={{ opacity: ready ? 1 : 0, pointerEvents: ready ? "auto" : "none" }}>
          <Header />
          <main>
            <TerminalHero />
            <ProfileHero />
            <About />
            <Skills />
            <Experience />
            <OpenSource />
            <Projects />
            <Achievements />
            <Writing />
            <Games />
            <Contact />
          </main>
          <Footer />
        </div>
        {ready && <GameTrigger />}
      </div>
    </SoundProvider>
  )
}
