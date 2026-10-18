import type { SoundKit } from "@/components/sound/sound-engine"

export const valorantSounds: SoundKit = {
  volume: 0.5,
  ambience(engine) {
    engine.drone({ freq: 55, gain: 0.05, cutoff: 260 })
    engine.drone({ freq: 82.4, gain: 0.03, cutoff: 420, detune: 7 })
    engine.noiseLoop({ brown: false, type: "highpass", freq: 6000, q: 0.3, gain: 0.006, wobble: 0.004 })
    engine.every(9000, 20000, () => {
      engine.tone({ freq: 1320, gain: 0.03, decay: 0.08, type: "square" }, engine.bed)
      engine.tone({ freq: 1760, gain: 0.03, decay: 0.08, type: "square", offset: 0.12 }, engine.bed)
    }, 5000)
  },
  sfx: {
    tick: (e) => e.tone({ freq: 2400, gain: 0.05, decay: 0.03, type: "triangle" }),
    select: (e) => {
      e.tone({ freq: 880, gain: 0.08, decay: 0.08, type: "square" })
      e.tone({ freq: 1320, gain: 0.08, decay: 0.12, type: "square", offset: 0.06 })
    },
    open: (e) => e.burst({ freq: 400, type: "highpass", gain: 0.12, decay: 0.3, sweep: 6000 }),
    close: (e) => e.burst({ freq: 5000, type: "highpass", gain: 0.1, decay: 0.25, sweep: 500 }),
    shot: (e) => {
      e.burst({ freq: 7000, type: "lowpass", gain: 0.6, decay: 0.15 })
      e.tone({ freq: 160, to: 45, gain: 0.5, decay: 0.2 })
    },
    hit: (e) => [0, 0.05].forEach((offset, i) => e.tone({ freq: i ? 1760 : 1320, gain: 0.07, decay: 0.07, type: "triangle", offset })),
  },
}
