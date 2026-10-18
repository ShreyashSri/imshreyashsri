import { GamePicker } from "@/components/games/game-picker"
import { Heading } from "../ui"
import type { PageProps } from "."

export function Games({ realm }: PageProps) {
  return (
    <div>
      <Heading rune={realm.rune} realm={realm.realm} codex={realm.codex} title="Games I love" />
      <p className="mb-7 max-w-2xl font-garamond text-xl italic leading-snug text-[#e8dfc8]/80">
        Open the Bifröst to another world and the whole portfolio changes to match it. God of War is the realm you stand in now.
      </p>
      <GamePicker tone="god-of-war" />
    </div>
  )
}
