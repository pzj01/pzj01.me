import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue'
import { routes } from 'vue-router/auto-routes'
import { setupRouterScroller } from 'vue-router-better-scroller'
import NProgress from 'nprogress'
import App from './App.vue'
// 进度条
import 'nprogress/nprogress.css'

import '@unocss/reset/tailwind.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-media.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import './styles/main.css'

import 'uno.css'

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
  const head = createHead()
  if (isClient) {
    setupRouterScroller(router, {
      selectors: {
        window: true,
      },
      behavior: 'smooth',
    })
    NProgress.configure({
      showSpinner: false,
    })
    router.beforeEach(() => {
      NProgress.start()
    })

    router.afterEach(() => {
      NProgress.done()
    })
  }
  app.use(head)
})
