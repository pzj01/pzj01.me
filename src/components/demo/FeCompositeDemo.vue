<script setup lang="ts">
const operator = ref<'over' | 'in' | 'out' | 'atop' | 'xor' | 'arithmetic'>('over')
const k = reactive({
  k1: 0.5,
  k2: 0.5,
  k3: 0.5,
  k4: 0.5,
})
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="composite">
      <feImage href="/images/wallpaper.png" preserveAspectRatio="xMidYMid slice" result="image" />
      <feComposite in="SourceGraphic" in2="image" :operator :k1="k.k1" :k2="k.k2" :k3="k.k3" :k4="k.k4" />
    </filter>
    <image
      href="/images/figma.png"
      x="0" y="0" width="100" height="100"
      filter="url(#composite)"
    />
  </svg>
  <form id="fe-composite" class="flex-center flex-col sm:flex-row mt-4 gap-4">
    <label for="operator">
      operator：
      <select v-model="operator" class="pl-2 pr-8 py-1 text-gray text-sm bg-base-300 rounded" name="operator">
        <option selected value="over">over</option>
        <option value="in">in</option>
        <option value="out">out</option>
        <option value="atop">atop</option>
        <option value="xor">xor</option>
        <option value="arithmetic">arithmetic</option>
      </select>
    </label>
    <div class="grid grid-cols-2 gap-4">
      <label v-for="key in Object.keys(k)" :key class="flex items-center" :for="key">
        {{ key }}：
        <input
          v-model="k[key as keyof typeof k]"
          class="pl-2 py-1 text-sm bg-base-300 rounded text-gray disabled:opacity-50 disabled:cursor-not-allowed"
          :name="key"
          type="number"
          step="0.01"
          min="0"
          max="1"
          :disabled="operator !== 'arithmetic'"
        >
      </label>
    </div>
  </form>
</template>
