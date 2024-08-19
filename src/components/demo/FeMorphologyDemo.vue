<script setup lang="ts">
const operator = ref<'erode' | 'dilate'>('erode')
const radius = ref('0')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="morphology">
      <feMorphology :operator :radius />
    </filter>
    <image
      x="0" y="0" width="100" height="100"
      href="/images/流萤.png"
      filter="url(#morphology)"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
  <form id="fe-morphology" class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="morphology-operator">
      operator：
      <select id="morphology-operator" v-model="operator" class="pl-2 pr-8 py-1 text-sm text-gray rounded" name="operator">
        <option selected value="erode">erode</option>
        <option value="dilate">dilate</option>
      </select>
    </label>
    <label for="morphology-radius">
      radius：
      <input
        id="morphology-radius"
        v-model="radius"
        text-gray
        class="input"
        type="number"
        name="radius"
        step="0.01"
        min="0"
      >
    </label>
  </form>
</template>
