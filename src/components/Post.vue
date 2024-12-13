<script setup lang="ts">
defineProps<{
  path: string
  title: string
  date: number | string | Date
  duration: string
}>()
</script>

<template>
  <RouterLink font-display lg:text-nowrap flex="~ col gap-x-2 xl:row xl:items-center" :to="path">
    <div text="~ lg lg:xl">
      <span>{{ title }}</span>
    </div>
    <span hidden xl:block>·</span>
    <div flex="~ gap-x-1 lg:gap-x-2 items-center" text="xs lg:sm xl:base">
      <DateFormat :date="date" />
      <span>·</span>
      <span flex="~ items-center gap-px" text-neutral-400>
        <i i-ri-time-line />
        {{ duration }}
      </span>
    </div>
  </RouterLink>
</template>
