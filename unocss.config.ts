import { defineConfig } from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'

export default defineConfig({
  shortcuts: [
    ['text', 'text-neutral-500 hover:text-black dark:hover:text-white transition-colors'],
    ['link', 'text-neutral dark:text-neutral transition-colors underline-offset-2 hover:(underline text-black) dark:hover:text-white'],
    ['svg', 'mx-auto w-1/2 border border-neutral'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Roboto:400,600,800'],
        serif: 'Cormorant Garamond:400,600',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
