<script setup lang="ts">
const type = ref<'saturate' | 'hueRotate' | 'luminanceToAlpha' | 'matrix'>('saturate')
const values = ref<string>('3')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="matrix">
      <feColorMatrix id="feColorMatrix" :type :values />
    </filter>
    <image class="transition-all" href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#matrix)" />
  </svg>
  <form id="fe-color-matrix" class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="type">
      type：
      <select v-model="type" class="pl-2 pr-8 py-1 text-gray text-sm rounded" name="type">
        <option selected value="saturate">saturate</option>
        <option value="hueRotate">hueRotate</option>
        <option value="luminanceToAlpha">luminanceToAlpha</option>
        <option value="matrix">matrix</option>
      </select>
    </label>
    <label class="flex items-center" for="values">
      values：
      <textarea
        v-model="values"
        class="pl-2 py-1 text-gray text-sm rounded h-8"
        name="values"
      />
    </label>
  </form>
</template>
