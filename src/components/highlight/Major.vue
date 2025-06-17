<script lang="ts" setup>
const { bg = false } = defineProps<{
  bg?: boolean
}>()
</script>

<template>
  <span :class="bg && 'bg-blue:20'" text-blue-600 dark:text-blue px-1 rounded box-decoration-clone font="mono">
    <slot />
  </span>
</template>
