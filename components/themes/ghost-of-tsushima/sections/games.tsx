import { GamePicker } from "@/components/games/game-picker"

export function Games() {
  return (
    <div className="got-rise">
      <p className="mb-8 max-w-2xl text-[16px] leading-relaxed text-[#ece6da]/75">
        Pick a game and the whole portfolio changes to match it. Ghost of Tsushima is the one you are playing now.
      </p>
      <GamePicker tone="ghost-of-tsushima" />
    </div>
  )
}
