<script setup lang="ts">
const mode = ref('normal')
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="blend">
      <feImage
        href="/images/wallpaper.png"
        preserveAspectRatio="xMidYMid slice"
        result="image"
      />
      <feBlend in="SourceGraphic" in2="image" :mode />
    </filter>
    <image
      href="/images/figma.png"
      x="0" y="0" width="100" height="100"
      filter="url(#blend)"
    />
  </svg>
  <form id="fe-blend" class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="mode">
      mode：
      <select v-model="mode" class="pl-2 pr-8 py-1 text-gray text-sm bg-base-300 rounded" name="mode">
        <option selected value="normal">normal</option>
        <option value="multiply">multiply</option>
        <option value="screen">screen</option>
        <option value="darken">darken</option>
        <option value="lighten">lighten</option>
        <option value="color-dodge">color-dodge</option>
        <option value="color-burn">color-burn</option>
        <option value="overlay">overlay</option>
        <option value="hard-light">hard-light</option>
        <option value="soft-light">soft-light</option>
        <option value="difference">difference</option>
        <option value="exclusion">exclusion</option>
        <option value="hue">hue</option>
        <option value="saturation">saturation</option>
        <option value="color">color</option>
        <option value="luminosity">luminosity</option>
      </select>
    </label>
  </form>
</template>
