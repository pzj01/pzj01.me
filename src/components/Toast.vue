<script setup lang="ts">
import type { MessageType } from '../types'

const { type, title, message, duration = 3000 } = defineProps<{
  type: MessageType
  title: string
  message: string
  duration?: number
}>()

defineEmits<{
  close: []
}>()

const [isVisible, toggle] = useToggle()

const typeClassMap: Record<MessageType, string> = {
  success: 'bg-green-100 dark:bg-green-900 border-green',
  error: 'bg-red-100 dark:bg-red-900 border-red',
  warning: 'bg-yellow-100 dark:bg-yellow-900 border-yellow',
  info: 'bg-sky-100 dark:bg-sky-900 border-sky',
}

const typeClass = computed(() => typeClassMap[type])

onMounted(() => {
  toggle(true)
  setTimeout(() => toggle(false), duration)
})
</script>

<template>
  <Transition name="slide">
    <div v-if="isVisible" border rounded p-2 :class="typeClass">
      <button absolute top-2 right-2 i-ri-close-fill @click="$emit('close')" />
      <h3 font-bold mb-1>
        {{ title }}
      </h3>
      <p text-sm>
        {{ message }}
      </p>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
