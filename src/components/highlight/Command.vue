<script lang="ts" setup>
const { bg = true } = defineProps<{
  bg?: boolean
}>()
</script>

<template>
  <span :class="bg && 'bg-green:20'" px-1 rounded box-decoration-clone text-green-600 dark:text-green font="mono">
    <slot />
  </span>
</template>

<style>

</style>
