<script setup lang="ts">
const form = reactive({
  type: 'turbulence',
  baseFrequency: 0.125,
  numOctaves: 2,
  seed: 0,
  stitchTiles: 'noStitch',
  showWave: false,
})
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="turbulence">
      <feTurbulence
        :type="form.type"
        :baseFrequency="form.baseFrequency"
        :numOctaves="form.numOctaves"
        :seed="form.seed"
        :stitchTiles="form.stitchTiles"
      />
      <feDisplacementMap :in="form.showWave ? '' : 'SourceGraphic'" scale="8" xChannelSelector="B" yChannelSelector="B" />
    </filter>
    <image
      x="0" y="0" width="100" height="100"
      href="/images/明末行.png"
      filter="url(#turbulence)"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
  <form id="fe-turbulence" class="flex-center flex-col mt-4 gap-4">
    <label for="type">
      type：
      <select id="type" v-model="form.type" class="pl-2 pr-8 py-1 text-sm text-gray rounded" name="type">
        <option selected value="turbulence">turbulence</option>
        <option value="fractalNoise">fractalNoise</option>
      </select>
    </label>
    <label for="baseFrequency">
      baseFrequency：
      <input
        id="baseFrequency"
        v-model="form.baseFrequency"
        text-gray
        class="input"
        type="number"
        name="baseFrequency"
        step="0.001"
        min="0"
      >
    </label>
    <label for="numOctaves">
      numOctaves：
      <input
        id="numOctaves"
        v-model="form.numOctaves"
        text-gray
        class="input"
        type="number"
        name="numOctaves"
        min="0"
      >
    </label>
    <label for="seed">
      seed：
      <input
        id="seed"
        v-model="form.seed"
        text-gray
        class="input"
        type="number"
        name="seed"
      >
    </label>
    <label for="stitchTiles">
      stitchTiles：
      <select
        id="stitchTiles"
        v-model="form.stitchTiles"
        class="pl-2 pr-8 py-1 text-sm text-gray rounded"
        name="stitchTiles"
      >
        <option selected value="noStitch">noStitch</option>
        <option value="stitch">stitch</option>
      </select>
    </label>
    <label for="feDisplacementMap">
      查看噪声
      <input id="feDisplacementMap" v-model="form.showWave" class="daisy-checkbox" type="checkbox" name="feDisplacementMap">
    </label>
  </form>
</template>
