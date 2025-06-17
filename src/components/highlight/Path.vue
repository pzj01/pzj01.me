<script lang="ts" setup>
const { bg = true } = defineProps<{
  bg?: boolean
}>()
</script>

<template>
  <span :class="bg && 'bg-amber:20'" px-1 rounded text-amber-600 dark:text-amber box-decoration-clone font="mono">
    <slot />
  </span>
</template>
