import type { SoundKit } from "@/components/sound/sound-engine"

export const rdr2Sounds: SoundKit = {
  volume: 0.6,
  ambience(engine) {
    engine.noiseLoop({ freq: 320, gain: 0.09, wobble: 0.07 })
    for (const pan of [-0.7, 0.6]) {
      engine.every(700, 2700, () => {
        const panner = engine.ctx.createStereoPanner()
        panner.pan.value = pan
        panner.connect(engine.bed)
        const pulses = 3 + Math.floor(Math.random() * 3)
        for (let i = 0; i < pulses; i++) engine.tone({ freq: 4300 + pan * 300, gain: 0.01, decay: 0.04, offset: i * 0.055 }, panner)
      })
    }
    engine.every(14000, 36000, () => {
      ;[0, 0.55, 0.85].forEach((offset, i) =>
        engine.tone({ freq: i === 0 ? 410 : 380, to: i === 0 ? 380 : 350, gain: 0.035, decay: i === 0 ? 0.4 : 0.26, offset, attack: 0.06 }, engine.bed),
      )
    }, 6000)
  },
  sfx: {
    tick: (e) => e.burst({ freq: 3000, q: 5, gain: 0.07, decay: 0.035 }),
    select: (e) => e.burst({ freq: 2200, q: 2, gain: 0.12, decay: 0.07 }),
    paper: (e) => {
      e.burst({ freq: 1200, q: 0.6, gain: 0.16, decay: 0.22, sweep: 4200 })
      e.burst({ freq: 3500, q: 1.2, gain: 0.06, decay: 0.16, offset: 0.09 })
    },
    page: (e) => e.burst({ freq: 800, q: 0.5, gain: 0.2, decay: 0.32, sweep: 3000 }),
    close: (e) => e.burst({ freq: 900, q: 0.6, gain: 0.12, decay: 0.15, sweep: 400 }),
    telegraph: (e) => [0, 0.09, 0.28, 0.37, 0.46, 0.66].forEach((offset) => e.tone({ freq: 760, gain: 0.07, decay: 0.06, type: "square", offset })),
  },
}
