import { GamePicker } from "@/components/games/game-picker"

export function GamesSection() {
  return (
    <div>
      <p className="mb-6 max-w-2xl font-exo text-[15px] leading-relaxed text-(--an-muted)">
        Load another game&apos;s memories and the whole portfolio changes to match it. Assassin&apos;s Creed II is the one running now.
      </p>
      <div className="an-light border border-(--an-line) p-4 shadow-[0_30px_60px_-30px_rgba(28,42,51,0.45)] sm:p-7">
        <GamePicker tone="assassins-creed" />
      </div>
    </div>
  )
}
