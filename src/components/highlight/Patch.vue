<script lang="ts" setup>
const { bg = false } = defineProps<{
  bg?: boolean
}>()
</script>

<template>
  <span :class="bg && 'bg-yellow:20'" text-yellow-600 dark:text-yellow box-decoration-clone px-1 rounded font="mono">
    <slot />
  </span>
</template>

<style>

</style>
