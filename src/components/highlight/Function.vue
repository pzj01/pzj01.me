<script lang="ts" setup>
const { bg = false } = defineProps<{
  bg?: boolean
}>()
</script>

<template>
  <span :class="bg && 'bg-lime:20'" text-lime-600 dark:text-lime box-decoration-clone px-1 rounded font="mono">
    <slot />
  </span>
</template>
