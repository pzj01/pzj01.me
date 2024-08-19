<script setup lang="ts">
defineProps<{
  path: string
  title: string
  date: string
}>()
</script>

<template>
  <RouterLink class="font-chinese" :to="path">
    <span block lg:inline text="~ lg lg:xl" class="w-full">{{ title }}</span>
    <span hidden lg:inline-block>·</span>
    <DateFormat block lg:inline text="xs lg:base" :date="date" />
  </RouterLink>
</template>
