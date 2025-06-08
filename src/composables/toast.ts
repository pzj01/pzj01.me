import type { ToastService } from '../utils/toast'

export const toastKey = Symbol('toast')

export function useToast(): ToastService {
  const toast = inject<ToastService>(toastKey)

  if (!toast) {
    throw new Error('useToast() is called without provider.')
  }

  return toast
}
