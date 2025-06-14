import { presetAttributify, presetIcons, presetWebFonts, transformerDirectives, transformerVariantGroup } from 'unocss'
import { presetWind3 } from 'unocss/preset-wind3'
import { defineConfig } from 'unocss/vite'

export default defineConfig({
  shortcuts: [
    ['text', 'text-zinc-700 dark:text-zinc hover:text-black dark:hover:text-white transition-colors'],
    ['link', 'text-zinc transition-colors underline-offset-2 hover:(underline text-black) dark:hover:text-white'],
    ['svg', 'mx-auto w-1/2 border border-zinc'],
    ['flex-center', 'flex justify-center items-center'],
    ['btn', 'flex items-center border p-2 rounded text'],
    ['github-btn', 'transition-colors flex-center rounded p-2 bg-green-500:60 text-white hover:bg-green-500:70'],
  ],
  rules: [
    [/^s-(\d+)/, ([, d]) => {
      const value = `${Number(d) * 0.25}rem`
      return { width: value, height: value }
    }],
  ],
  presets: [
    presetWind3(),
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
        // 无衬线字体
        sans: 'Geist:200,400,600,800',
        // 跨语言字体
        display: 'Noto:200,400,600,800',
        // 衬线字体
        serif: 'Cormorant Garamond:200,400,600,800',
        // 等宽字体
        mono: 'Geist Mono:200,400,600,800',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
