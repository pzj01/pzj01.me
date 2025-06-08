import NProgress from 'nprogress'
import { createPinia } from 'pinia'
import { ViteSSG } from 'vite-ssg'
import { setupRouterScroller } from 'vue-router-better-scroller'
import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import ToastService from './plugins/toast'
// 进度条
import 'nprogress/nprogress.css'

import '@unocss/reset/tailwind.css'
import 'markdown-it-github-alerts/styles/github-colors-light.css'
import 'markdown-it-github-alerts/styles/github-colors-dark-media.css'
import 'markdown-it-github-alerts/styles/github-base.css'
import './styles/main.css'

import 'uno.css'

export const createApp = ViteSSG(App, { routes }, ({ app, router, isClient }) => {
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
    router.beforeEach((to, from) => {
      if (to.path === from.path)
        return
      NProgress.start()
    })

    router.afterEach((to, from) => {
      if (to.path === from.path)
        return
      NProgress.done()
    })

    provideAudio(app)
    provideSession(app)
    app.use(createPinia())
    app.use(ToastService)
  }
})
