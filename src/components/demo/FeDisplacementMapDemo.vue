<script setup lang="ts">
type ChannelSelector = 'R' | 'G' | 'B' | 'A'
const scale = ref(0)
const xChannelSelector = ref<ChannelSelector>('R')
const yChannelSelector = ref<ChannelSelector>('R')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="displacement-map">
      <feImage
        href="/images/wallpaper.png"
        preserveAspectRatio="xMidYMid slice"
        result="image"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="image"
        :scale
        :xChannelSelector
        :yChannelSelector
      />
    </filter>
    <image
      x="0" y="0" width="100" height="100"
      href="/images/阮梅.png"
      filter="url(#displacement-map)"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
  <form id="fe-displacement-map" class="flex-center flex-col mt-4 gap-4">
    <label for="displacement-map-scale">
      scale：
      <input
        id="displacement-map-scale"
        v-model="scale"
        text-gray
        class="input"
        type="number"
        name="scale"
        step="0.1"
        min="0"
      >
    </label>
    <label for="displacement-map-x-channel-selector">
      xChannelSelector：
      <select
        id="displacement-map-x-channel-selector"
        v-model="xChannelSelector"
        class="pl-2 pr-8 py-1 text-sm text-gray
 rounded"
        name="xChannelSelector"
      >
        <option selected value="R">R</option>
        <option value="G">G</option>
        <option value="B">B</option>
        <option selected value="A">A</option>
      </select>
    </label>
    <label for="displacement-map-y-channel-selector">
      yChannelSelector：
      <select
        id="displacement-map-y-channel-selector"
        v-model="yChannelSelector"
        class="pl-2 pr-8 py-1 text-sm text-gray
 rounded"
        name="yChannelSelector"
      >
        <option value="R">R</option>
        <option value="G">G</option>
        <option value="B">B</option>
        <option selected value="A">A</option>
      </select>
    </label>
  </form>
</template>
