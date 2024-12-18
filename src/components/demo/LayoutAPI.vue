<script lang="ts" setup>
type CSS = typeof CSS & {
  layoutWorklet: Worklet
}

onMounted(() => {
  if ('paintWorklet' in CSS) {
    (CSS as CSS).layoutWorklet.addModule('/layout.worklet.js')
  }
})

const colors = [
  'text-green',
  'text-blue',
  'text-red',
  'text-yellow',
  'text-purple',
  'text-cyan',
  'text-pink',
  'text-gray',
  'text-amber',
  'text-lime',
  'text-teal',
  'text-indigo',
  'text-orange',
  'text-emerald',
]
</script>

<template>
  <div
    h-48 mx-auto text-center border
    rounded-lg class="w-1/2" overflow-hidden
    style="
      display: layout(random);
    "
  >
    <span v-for="i in colors.length" :key="i" :class="colors[i % colors.length]">{{ i }}</span>
  </div>
</template>
