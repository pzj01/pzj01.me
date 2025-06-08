import type { App } from 'vue'
import { toastKey } from '../composables/toast'
import toast from '../utils/toast'

export default {
  install(app: App) {
    app.config.globalProperties.$toast = toast
    app.provide(toastKey, toast)
  },
}
