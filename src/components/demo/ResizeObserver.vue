<script setup lang="ts">
import { useTemplateRef } from 'vue'

const size = reactive({
  width: 0,
  height: 0,
})
const target = useTemplateRef<HTMLElement>('target')

onMounted(() => {
  if (!target.value)
    return

  const observer = new ResizeObserver(([entry]) => {
    size.width = entry.borderBoxSize[0].inlineSize
    size.height = entry.borderBoxSize[0].blockSize
  })
  observer.observe(target.value, {
    box: 'border-box',
  })
})
</script>

<template>
  <div space-y-4>
    <span>width: {{ size.width }}px，height: {{ size.height }}px</span>
    <div ref="target" border p-4>
      被监听的元素，你可以通过
      <kbd>f12</kbd>
      修改
    </div>
  </div>
</template>
