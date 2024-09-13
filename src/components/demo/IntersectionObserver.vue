<script setup lang="ts">
import { useTemplateRef } from 'vue'

const container = useTemplateRef<HTMLDivElement>('container')
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.textContent = '😈'
      }
      else {
        entry.target.textContent = '😭'
      }
    }
  }, {
    root: container.value,
    threshold: 1,
  })

  for (const child of container.value!.children) {
    observer.observe(child)
  }
})
</script>

<template>
  <div ref="container" space-y-4 border h-96 py-4 overflow-y-scroll>
    <div v-for="v in 9" :key="v" mx-auto text-center class="w-1/2 py-12" text-3xl font-bold hover:bg-emerald-7 bg-emerald dark:bg-emerald-6 />
  </div>
</template>
