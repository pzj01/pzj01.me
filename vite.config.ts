import { resolve } from 'node:path'
import { readFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
// unplugin
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Markdown from 'unplugin-vue-markdown/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
// markdown-it
import Shiki from '@shikijs/markdown-it'
import { rendererRich, transformerTwoslash } from '@shikijs/twoslash'
import anchor from 'markdown-it-anchor'
import linkAttributes from 'markdown-it-link-attributes'
import githubAlerts from 'markdown-it-github-alerts'
import magicLink from 'markdown-it-magic-link'
// @ts-expect-error missing types
import TOC from 'markdown-it-table-of-contents'

import matter from 'gray-matter'

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

        if ((path.includes('/blog') || path.includes('/notes') || path.includes('/archive') || path.includes('/tags')) && path.endsWith('.md')) {
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
      wrapperClasses: path => path.endsWith('blog/index.md') || path.endsWith('notes/index.md') || path.endsWith('archive.md') || path.includes('/tags') ? '' : 'prose slide-enter-content',
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
          .use(magicLink)
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
    noExternal: ['gsap'],
  },

  server: {
    proxy: {
      '/map': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/map/, ''),
      },
    },
  },
})
