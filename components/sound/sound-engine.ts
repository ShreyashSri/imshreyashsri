export type SoundKit = {
  volume: number
  ambience: (engine: SoundEngine) => void
  sfx: Record<string, (engine: SoundEngine) => void>
}

type Burst = { freq: number; q?: number; type?: BiquadFilterType; gain: number; decay: number; offset?: number; sweep?: number }
type Tone = { freq: number; to?: number; gain: number; decay: number; type?: OscillatorType; offset?: number; attack?: number }

function noiseBuffer(ctx: AudioContext, seconds: number, brown = false) {
  const buffer = ctx.createBuffer(1, ctx.sampleRate * seconds, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    const white = Math.random() * 2 - 1
    last = (last + 0.02 * white) / 1.02
    data[i] = brown ? last * 3.5 : white
  }
  return buffer
}

export class SoundEngine {
  readonly ctx = new AudioContext()
  readonly master = this.ctx.createGain()
  readonly bed = this.ctx.createGain()
  private readonly white = noiseBuffer(this.ctx, 2)
  private readonly timers = new Set<number>()

  constructor(private readonly kit: SoundKit) {
    this.master.gain.value = 0
    this.master.connect(this.ctx.destination)
    this.bed.connect(this.master)
    kit.ambience(this)
  }

  get running() {
    return this.ctx.state === "running"
  }

  fadeIn() {
    this.ctx.resume()
    this.ramp(this.kit.volume, 2.5)
  }

  fadeOut() {
    this.ramp(0, 0.4)
  }

  play(name: string) {
    if (this.running) this.kit.sfx[name]?.(this)
  }

  dispose() {
    this.timers.forEach((id) => window.clearTimeout(id))
    this.timers.clear()
    this.ctx.close()
  }

  every(minMs: number, maxMs: number, fn: () => void, firstDelay = minMs) {
    const schedule = (delay: number) => {
      const id = window.setTimeout(() => {
        this.timers.delete(id)
        if (this.running) fn()
        schedule(minMs + Math.random() * (maxMs - minMs))
      }, delay)
      this.timers.add(id)
    }
    schedule(firstDelay)
  }

  noiseLoop({ brown = true, type = "bandpass", freq, q = 0.5, gain, wobble = 0 }: { brown?: boolean; type?: BiquadFilterType; freq: number; q?: number; gain: number; wobble?: number }) {
    const src = this.ctx.createBufferSource()
    src.buffer = noiseBuffer(this.ctx, 4, brown)
    src.loop = true
    const filter = this.ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.value = freq
    filter.Q.value = q
    const g = this.ctx.createGain()
    g.gain.value = gain
    if (wobble) this.lfo(0.06, wobble, g.gain)
    src.connect(filter).connect(g).connect(this.bed)
    src.start()
  }

  drone({ freq, type = "sawtooth", gain, cutoff, detune = 0 }: { freq: number; type?: OscillatorType; gain: number; cutoff: number; detune?: number }) {
    const osc = this.ctx.createOscillator()
    osc.type = type
    osc.frequency.value = freq
    osc.detune.value = detune
    const filter = this.ctx.createBiquadFilter()
    filter.type = "lowpass"
    filter.frequency.value = cutoff
    this.lfo(0.05, cutoff * 0.4, filter.frequency)
    const g = this.ctx.createGain()
    g.gain.value = gain
    osc.connect(filter).connect(g).connect(this.bed)
    osc.start()
  }

  lfo(rate: number, depth: number, target: AudioParam) {
    const osc = this.ctx.createOscillator()
    osc.frequency.value = rate
    const amount = this.ctx.createGain()
    amount.gain.value = depth
    osc.connect(amount).connect(target)
    osc.start()
  }

  burst({ freq, q = 1, type = "bandpass", gain, decay, offset = 0, sweep }: Burst, out: AudioNode = this.master) {
    const t = this.ctx.currentTime + offset
    const src = this.ctx.createBufferSource()
    src.buffer = this.white
    const filter = this.ctx.createBiquadFilter()
    filter.type = type
    filter.frequency.setValueAtTime(freq, t)
    if (sweep) filter.frequency.exponentialRampToValueAtTime(sweep, t + decay)
    filter.Q.value = q
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + Math.min(0.02, decay / 4))
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
    src.connect(filter).connect(g).connect(out)
    src.start(t, Math.random(), decay + 0.05)
  }

  tone({ freq, to, gain, decay, type = "sine", offset = 0, attack = 0.005 }: Tone, out: AudioNode = this.master) {
    const t = this.ctx.currentTime + offset
    const osc = this.ctx.createOscillator()
    osc.type = type
    osc.frequency.setValueAtTime(freq, t)
    if (to) osc.frequency.exponentialRampToValueAtTime(to, t + decay)
    const g = this.ctx.createGain()
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(gain, t + attack)
    g.gain.exponentialRampToValueAtTime(0.0001, t + decay)
    osc.connect(g).connect(out)
    osc.start(t)
    osc.stop(t + decay + 0.05)
  }

  private ramp(volume: number, seconds: number) {
    const t = this.ctx.currentTime
    this.master.gain.cancelScheduledValues(t)
    this.master.gain.setValueAtTime(this.master.gain.value, t)
    this.master.gain.linearRampToValueAtTime(volume, t + seconds)
  }
}
