<script lang="ts" setup>
type CSS = typeof CSS & {
  paintWorklet: Worklet
}

onMounted(() => {
  if ('paintWorklet' in CSS) {
    (CSS as CSS).paintWorklet.addModule('/paint.worklet.js')
  }
})
</script>

<template>
  <div
    h-48 mx-auto text-center border
    rounded-lg class="w-1/2"
    style="
      --line-color: #3094FFFF;
      --line-width: 4;
      background-image:
      paint(bezier);
      line-height: 12rem;
    "
  >
    Paint API
  </div>
</template>
