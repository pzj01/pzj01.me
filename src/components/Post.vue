<script setup lang="ts">
defineProps<{
  path: string
  title: string
  date: string
  duration: string
}>()
</script>

<template>
  <RouterLink class="font-chinese" :to="path">
    <span block lg:inline text="~ lg lg:xl" w-full>{{ title }}</span>
    <span hidden lg:inline-block>·</span>
    <div inline-flex gap-1 text="xs lg:base">
      <DateFormat block lg:inline :date="date" />
      <span flex="~ items-center gap-px" text-neutral-400>
        <i i-ri-time-line />
        {{ duration }}
      </span>
    </div>
  </RouterLink>
</template>
