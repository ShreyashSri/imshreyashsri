import { GamePicker } from "@/components/games/game-picker"

export function GamesSection() {
  return (
    <div className="border border-white/10 bg-black/55 px-5 py-7 backdrop-blur-xs sm:px-8">
      <h3 className="font-rocks text-[28px] uppercase leading-none text-white">Games I love</h3>
      <p className="mt-2 max-w-2xl font-slab text-[15.5px] leading-relaxed text-white/80">
        Pick a game and the whole portfolio changes to match it. Red Dead is the one you’re playing now.
      </p>
      <div className="mt-6">
        <GamePicker tone="rdr2" />
      </div>
    </div>
  )
}
