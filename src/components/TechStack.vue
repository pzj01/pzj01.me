<script setup lang="ts">
interface Tech {
  name: string
  icon: string
  color?: string
}

defineProps<{
  stack: Tech[]
}>()
</script>

<template>
  <div flex="~ wrap" gap-4>
    <div v-for="{ name, icon, color }, i in stack" :key="name" slide-enter :style="{ 'backgroundColor': color, '--enter-stage': i, '--enter-step': '60ms' }" rounded overflow-hidden text="center" :title="name">
      <i block :class="icon" s-12 />
    </div>
  </div>
</template>
