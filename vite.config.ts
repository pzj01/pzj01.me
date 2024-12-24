import type { ResolvedMagicLink } from 'markdown-it-magic-link'
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
import magicLink, { handlerGitHubAt, handlerLink } from 'markdown-it-magic-link'
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
  const isPost = path.includes('/blog') || path.includes('/notes') || path.includes('/six')
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
          .use(githubAlerts, {
            markers: ['TIP', 'NOTE', 'IMPORTANT', 'WARNING', 'CAUTION', 'PREFACE'],
            icons: {
              note: '<svg class="octicon octicon-info mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',
              tip: '<svg class="octicon octicon-light-bulb mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>',
              important: '<svg class="octicon octicon-report mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',
              warning: '<svg class="octicon octicon-alert mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>',
              caution: '<svg class="octicon octicon-stop mr-2" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>',
            },
            titles: {
              preface: '',
            },
          })
          .use(TOC, {
            containerHeaderHtml: '<div class="table-of-contents-anchor"><span /></div>',
          })
          .use(magicLink, {
            handlers: [
              handlerLink({
                linksMap: {
                  'Arc': 'https://arc.net',
                  'Chrome': 'https://www.google.com/chrome',
                  'VS Code': 'https://code.visualstudio.com',
                  'Vitesse Theme': 'https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse',
                  'Postman': 'https://www.postman.com',
                  'Youtube': 'https://www.youtube.com',
                  'Jack要加油': 'https://www.douyin.com/user/MS4wLjABAAAAO-a9F9-OtKEJZjjL_CLIF-QrWBOcuGupqfH6jzu7_XW1w1bP5JVH-MMZ6ZqEjZ9v',
                },
              }),
              handlerGitHubAt(),
              {
                name: 'at',
                handler: () => false,
                postprocess(parsed: ResolvedMagicLink) {
                  if (parsed.text === 'JACK要加油') {
                    parsed.link = 'https://www.douyin.com/user/MS4wLjABAAAAO-a9F9-OtKEJZjjL_CLIF-QrWBOcuGupqfH6jzu7_XW1w1bP5JVH-MMZ6ZqEjZ9v'
                  }

                  return parsed
                },
              },
            ],
            imageOverrides: [
              ['https://arc.net', '/images/arc.svg'],
              ['https://www.google.com/chrome', 'https://api.iconify.design/logos:chrome.svg'],
              ['https://code.visualstudio.com', 'https://api.iconify.design/logos:visual-studio-code.svg'],
              ['https://marketplace.visualstudio.com/items?itemName=antfu.theme-vitesse', '/images/vitesse.svg'],
              ['https://www.postman.com', 'https://api.iconify.design/logos:postman-icon.svg'],
              ['https://www.douyin.com/user/MS4wLjABAAAAO-a9F9-OtKEJZjjL_CLIF-QrWBOcuGupqfH6jzu7_XW1w1bP5JVH-MMZ6ZqEjZ9v', 'https://p3-pc.douyinpic.com/img/aweme-avatar/tos-cn-avt-0015_164195deb27c17684e03410368b314e3~c5_300x300.jpeg'],
              ['https://www.youtube.com', 'https://api.iconify.design/logos:youtube-icon.svg'],
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
