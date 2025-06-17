import type { MessageType, Position } from '../types'
import { isClient } from '@vueuse/core'
import Toast from '../components/Toast.vue'

interface ToastOptions {
  type: MessageType
  title: string
  message: string
  position?: Position
  duration?: number
}

const positionClassMap: Record<Position, string> = {
  'center': 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
  'top-left': 'fixed top-4 left-4',
  'top-center': 'fixed top-4 left-1/2 -translate-x-1/2',
  'top-right': 'fixed top-4 right-4',
  'bottom-left': 'fixed bottom-4 left-4',
  'bottom-center': 'fixed bottom-4 left-1/2 -translate-x-1/2',
  'bottom-right': 'fixed bottom-4 right-4',
}

isClient && Object.entries(positionClassMap).forEach(([key, value]) => {
  const fragment = document.createDocumentFragment()
  const container = document.createElement('div')
  container.id = `toast-container-${key}`
  container.className = value
  container.style.width = '25rem'
  fragment.appendChild(container)
  document.body.appendChild(fragment)
})

function showToast(options: ToastOptions) {
  const { duration = 1500, position = 'top-right', ...other } = options

  const app = createApp({
    render: () => h(Toast, other),
  })

  app.mount(document.getElementById(`toast-container-${position}`)!)

  function unmount() {
    app.unmount()
  }

  const timer = setTimeout(unmount, duration)

  return () => {
    clearTimeout(timer)
    unmount()
  }
}

const toast = {
  add: showToast,
  success: (options: Omit<ToastOptions, 'type'>) => showToast({
    ...options,
    type: 'success',
  }),
  info: (options: Omit<ToastOptions, 'type'>) => showToast({
    ...options,
    type: 'info',
  }),
  warning: (options: Omit<ToastOptions, 'type'>) => showToast({
    ...options,
    type: 'warning',
  }),
  error: (options: Omit<ToastOptions, 'type'>) => showToast({
    ...options,
    type: 'error',
  }),
}

export type ToastService = typeof toast

export default toast
