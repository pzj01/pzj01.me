import { ViteSSG } from 'vite-ssg'
import { createHead } from '@unhead/vue'
import { routes } from 'vue-router/auto-routes'
import { setupRouterScroller } from 'vue-router-better-scroller'
import App from './App.vue'

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
  }
  app.use(head)
})
