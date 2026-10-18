import { GamePicker } from "@/components/games/game-picker"
import { Heading } from "../ui"

export function GamesTab() {
  return (
    <div className="val-in">
      <Heading kicker="Library" title="Games I love" />
      <p className="mb-6 max-w-2xl font-barlow text-base leading-relaxed text-white/75">
        Pick a game and the whole portfolio reskins to match it. Valorant is the one loaded right now.
      </p>
      <GamePicker tone="valorant" />
    </div>
  )
}
