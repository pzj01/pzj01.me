<script lang="ts" setup>
const { bg = false } = defineProps<{
  bg?: boolean
}>()
</script>

<template>
  <span :class="bg && 'bg-purple:20'" text-purple-600 dark:text-purple box-decoration-clone px-1 rounded font="mono">
    <slot />
  </span>
</template>
