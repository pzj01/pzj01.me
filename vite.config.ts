import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
// markdown-it
import Shiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import Vue from '@vitejs/plugin-vue'
import matter from 'gray-matter'
import anchor from 'markdown-it-anchor'
import githubAlerts from 'markdown-it-github-alerts'
import linkAttributes from 'markdown-it-link-attributes'
import magicLink from 'markdown-it-magic-link'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
// unplugin
import Components from 'unplugin-vue-components/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'

import { defineConfig } from 'vite'

function isProse(path: string) {
  const isPost = path.includes('/blog') || path.includes('/notes')
  // 排除index.md
  if (isPost)
    return !path.endsWith('index.md')

  // 其他的包含index.md和use.md
  return path.endsWith('index.md') || path.endsWith('use.md')
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
  plugins: [
    // https://github.com/posva/unplugin-vue-router
    VueRouter({
      logs: true,
      extensions: ['.vue', '.md'],
      dts: true,
      extendRoute: (route) => {
        // 路由对应的文件路径
        const path = route.component

        if (!path)
          return

        if (path.endsWith('.md')) {
          const { data } = matter(readFileSync(path, 'utf-8'))

          route.addToMeta({
            frontmatter: data,
          })
        }
      },
    }),

    Vue({
      // 运行解析md文件
      include: [/\.vue$/, /\.md$/],
      script: {
        propsDestructure: true,
      },
    }),

    // https://unocss.dev/guide/config-file
    UnoCSS(),

    // https://github.com/unplugin/unplugin-vue-markdown
    Markdown({
      wrapperClasses: path => isProse(path) ? 'prose slide-enter-content' : '',
      wrapperComponent: 'WrapperPost',
      headEnabled: true,
      async markdownItSetup(md) {
        // 代码块语法高亮
        md.use(await Shiki({
          themes: {
            light: 'vitesse-light',
            dark: 'vitesse-dark',
          },
          transformers: [
            transformerTwoslash({
              explicitTrigger: true,
              renderer: rendererRich(),
            }),
          ],
        }))
        // 锚点
          .use(anchor, {
            level: [1, 2, 3, 4],
            slugify: slug => decodeURIComponent(slug),
            permalink: anchor.permalink.linkInsideHeader({
              class: 'anchor',
              symbol: '#',
              renderAttrs: () => ({ 'aria-hidden': 'true' }),
              placement: 'before',
            }),
          })
        // 链接属性
          .use(linkAttributes, {
            matcher: (href: string) => href.startsWith('http'),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
          .use(githubAlerts)
          .use(TOC, {
            containerHeaderHtml: '<div class="table-of-contents-anchor"><span /></div>',
          })
          .use(magicLink, {
            linksMap: {
              'Arc': 'https://arc.net',
              'Chrome': 'https://www.google.com/chrome',
              'VS Code': 'https://code.visualstudio.com',
              'Vitesse Theme': 'https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse',
              'Postman': 'https://www.postman.com',
            },
            imageOverrides: [
              ['https://arc.net', '/images/arc.svg'],
              ['https://www.google.com/chrome', 'https://api.iconify.design/logos:chrome.svg'],
              ['https://code.visualstudio.com', 'https://api.iconify.design/logos:visual-studio-code.svg'],
              ['https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse', '/images/vitesse.svg'],
              ['https://www.postman.com', 'https://api.iconify.design/logos:postman-icon.svg'],
            ],
          })
      },
    }),

    // https://github.com/antfu/unplugin-vue-components
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: true,
      deep: true,
    }),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        '@vueuse/core',
        VueRouterAutoImports,
      ],
      dirs: [
        './src/composables',
        './src/utils',
      ],
      dts: true,
      vueTemplate: true,
    }),
  ],

  ssr: {
    noExternal: ['gsap', 'p5i', 'leaflet'],
  },
  server: {
    // https: {
    //   key: readFileSync('./.examples/api-server/localhost-key.pem'),
    //   cert: readFileSync('./.examples/api-server/localhost.pem'),
    // },
    proxy: {
      '/map': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/map/, ''),
      },
    },
  },
})
