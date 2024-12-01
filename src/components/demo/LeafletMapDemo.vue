<script setup lang="ts">
let Component: Component

if (window) {
  Component = defineAsyncComponent(() => import('../LeafletMap.vue'))
}
</script>

<template>
  <ClientOnly v-if="Component">
    <component :is="Component" />
  </ClientOnly>
</template>
