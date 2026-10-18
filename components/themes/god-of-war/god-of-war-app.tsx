"use client"

import { useState } from "react"

import { MusicProvider } from "@/components/music/music-provider"
import { useHashSection } from "@/components/shared/use-hash-section"
import { Codex } from "./codex"
import { Home } from "./home"
import { realmIds, realmOf, type RealmId } from "./realms"
import { godOfWarMusic } from "./music"
import { Travel } from "./travel"
import "./god-of-war.css"

const routes = ["home", ...realmIds] as const

type Trip = { id: RealmId; x: number; y: number }

function Realms() {
  const [route, go] = useHashSection<RealmId | "home">(routes, "home")
  const [trip, setTrip] = useState<Trip | null>(null)

  const travel = (id: RealmId, x: number, y: number) => {
    if (trip) return
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      go(id)
      return
    }
    setTrip({ id, x, y })
  }

  const arrive = () => {
    if (!trip) return
    go(trip.id)
    setTrip(null)
  }

  return (
    <div className="theme-gow fixed inset-0">
      {route === "home" ? (
        <Home onOpen={travel} leaving={trip} />
      ) : (
        <Codex
          id={route}
          onTab={(id) => {
            if (id === route) return
            go(id)
          }}
          onBack={() => {
            go("home")
          }}
        />
      )}
      {trip && <Travel x={trip.x} y={trip.y} accent={realmOf(trip.id).accent} label={realmOf(trip.id).realm} onDone={arrive} />}
    </div>
  )
}

export default function GodOfWarApp() {
  return (
    <MusicProvider playlist={godOfWarMusic} accent="#e9c46a">
      <Realms />
    </MusicProvider>
  )
}
