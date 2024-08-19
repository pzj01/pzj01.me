<script setup lang="ts">
const additive = ref<'replace' | 'sum'>('replace')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect x="10" y="10" width="10" height="10" fill="currentColor">
      <animateTransform
        id="additive_demo_animate_scale"
        attributeType="XML"
        attributeName="transform"
        type="scale"
        begin="btn_additive.click"
        from="1"
        to="2"
        dur="1s"
        fill="freeze"
        restart="whenNotActive"
      />
      <animateTransform
        id="additive-demo-animate-translate"
        attributeType="XML"
        attributeName="transform"
        type="translate"
        begin="additive_demo_animate_scale.end"
        from="0 0"
        to="20 0"
        dur="1s"
        fill="freeze"
        :additive
        restart="whenNotActive"
      />
    </rect>
  </svg>
  <form class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="additive">
      additive：
      <select v-model="additive" class="pl-2 pr-8 py-1 text-sm text-gray rounded" name="additive">
        <option selected value="replace">replace</option>
        <option value="sum">sum</option>
      </select>
    </label>
    <button id="btn_additive" class="btn" type="button">
      开始动画
    </button>
  </form>
</template>
