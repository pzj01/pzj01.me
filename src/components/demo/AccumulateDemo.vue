<script setup lang="ts">
const accumulate = ref<'none' | 'sum'>('none')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x="10" y="35" width="30" height="30" fill="currentColor">
      <animateTransform
        id="accumulate-demo-animate-translate"
        attributeType="XML"
        attributeName="transform"
        type="translate"
        begin="btn_accumulate.click"
        by="25 0"
        dur="1s"
        repeatCount="2"
        fill="freeze"
        :accumulate
        restart="whenNotActive"
      />
    </rect>
  </svg>
  <form class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="accumulate">
      accumulate：
      <select v-model="accumulate" class="pl-2 pr-8 py-1 text-sm text-gray rounded" name="accumulate">
        <option selected value="none">none</option>
        <option value="sum">sum</option>
      </select>
    </label>
    <button id="btn_accumulate" class="btn" type="button">
      开始动画
    </button>
  </form>
</template>
