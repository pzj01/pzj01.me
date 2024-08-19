<script setup lang="ts">
const calcMode = ref<'discrete' | 'linear' | 'paced' | 'spline'>('linear')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect id="animate-keyframes" x="10" y="45" width="10" height="10" fill="currentColor">
      <animate
        id="calcMode-demo-animate"
        attributeType="XML"
        attributeName="x"
        begin="btn_calcMode.click"
        dur="2s"
        fill="freeze"
        :calc-mode="calcMode"
        restart="whenNotActive"
        values="0;80;20;50"
        keyTimes="0;0.1;0.8;1"
        keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
      />
    </rect>
  </svg>
  <!-- 切换 calcMode -->
  <form class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="calcMode">
      calcMode：
      <select v-model="calcMode" class="pl-2 pr-8 py-1 text-sm text-gray rounded" name="calcMode">
        <option value="discrete">discrete</option>
        <option selected value="linear">linear</option>
        <option value="paced">paced</option>
        <option value="spline">spline</option>
      </select>
    </label>
    <button id="btn_calcMode" class="btn" type="button">
      开始动画
    </button>
  </form>
</template>
