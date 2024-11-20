import type { App } from 'vue'

const audioKey = Symbol('audio')
const audioContextKey = Symbol('audioContext')

export function provideAudio(app: App, src?: string) {
  const audio = new Audio(src)
  const audioContext = new AudioContext()

  app.provide(audioKey, audio)
  app.provide(audioContextKey, audioContext)
}

export function useAudio() {
  const audio = inject<HTMLAudioElement>(audioKey)
  const context = inject<AudioContext>(audioContextKey)

  if (!audio) {
    throw new Error('audio is not provided')
  }

  if (!context) {
    throw new Error('audioContext is not provided')
  }

  const source = context.createMediaElementSource(audio)
  const analyser = context.createAnalyser()

  return {
    audio,
    context,
    source,
    analyser,
  }
}
