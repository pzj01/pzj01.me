import { presetAttributify, presetIcons, presetUno, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'
import { defineConfig } from 'unocss/vite'

export default defineConfig({
  shortcuts: [
    ['text', 'text-neutral-500 hover:text-black dark:hover:text-white transition-colors'],
    ['link', 'text-neutral dark:text-neutral transition-colors underline-offset-2 hover:(underline text-black) dark:hover:text-white'],
    ['svg', 'mx-auto w-1/2 border border-neutral'],
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'flex items-center border p-2 rounded text'],
  ],
  rules: [
    [/s-(\d+)/, ([, d]) => {
      const value = `${Number(d) * 0.25}rem`
      return { width: value, height: value }
    }],
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
        // 衬线字体
        sans: 'Roboto:400,600,800',
        // 无衬线字体
        serif: 'Cormorant Garamond:400,600',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
