import type { App } from 'vue'

type UseMediaControlsOptions = Parameters<typeof useMediaControls>[1]

const audioKey = Symbol('audio')
const audioContextKey = Symbol('audioContext')

export function provideAudio(app: App) {
  const audio = new Audio()
  app.provide(audioKey, audio)
}

export function provideAudioContext(app: App) {
  const audioContext = new AudioContext()
  app.provide(audioContextKey, audioContext)
}

export function useAudio(options?: UseMediaControlsOptions) {
  const audio = inject<HTMLAudioElement>(audioKey)

  if (!audio) {
    throw new Error('audio is not provided')
  }

  const controls = useMediaControls(audio, options)

  return {
    audio,
    ...controls,
  }
}

export function useAudioContext() {
  const context = inject<AudioContext>(audioContextKey)

  if (!context) {
    throw new Error('audioContext is not provided')
  }
}
