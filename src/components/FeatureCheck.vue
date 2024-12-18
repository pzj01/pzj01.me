<script lang="ts" setup>
const { targetPath, feature } = defineProps<{
  api: string
  feature: string
  targetPath: string
}>()

const target = computed(() => targetPath.split('.').reduce((target, key) => target[key as keyof typeof target] || target, globalThis))

const isSupported = computed(() => feature in target.value)
</script>

<template>
  <div break-words flex="~ items-center gap-x-0.5" bg-neutral-500:30 border border-black dark:border-white p-2 rounded-lg font-mono :class="isSupported ? 'text-green' : 'text-red'">
    <i :class="isSupported ? 'i-ri-check-fill' : 'i-ri-close-line'" />
    你的浏览器{{ isSupported ? '支持' : '不支持' }} {{ api }}
  </div>
</template>
