<script setup lang="ts">
const form = reactive({
  enableDouble: false,
  row: 3,
  column: 3,
  kernelMatrix: '1 0 0 0 1 0 0 0 1',
  divisor: 1,
  bias: 0,
  targetX: 1.5,
  targetY: 1.5,
  edgeMode: 'duplicate',
  preserveAlpha: false,
})

const targetX = computed(() => (form.targetX >= 0 && form.targetX <= form.row) ? form.targetX : form.row / 2)
const targetY = computed(() => (form.targetY >= 0 && form.targetY <= form.column) ? form.targetY : form.column / 2)
const order = computed(() => form.enableDouble ? `${form.row} ${form.column}` : form.row)
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="convolve-matrix">
      <feConvolveMatrix
        :order
        :kernelMatrix="form.kernelMatrix"
        :divisor="form.divisor"
        :bias="form.bias"
        :targetX
        :targetY
        :edgeMode="form.edgeMode"
        :preserveAlpha="Number(form.preserveAlpha)"
      />
    </filter>
    <image
      x="0" y="0" width="100" height="100"
      href="/images/缠流子.jpeg"
      filter="url(#convolve-matrix)"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
  <form id="fe-convolve-matrix" class="sm:w-2/3 mx-auto flex flex-col mt-4 gap-4">
    <!-- order -->
    <div class="flex flex-col gap-2">
      <label class="flex items-center cursor-pointer" for="double-mode">
        <span>（启用row和column模式）</span>
        <input id="double-mode" v-model="form.enableDouble" class="daisy-checkbox" type="checkbox" name="double-mode">
      </label>
      <label v-if="!form.enableDouble" class="flex items-center" for="order">
        <span>order：</span>
        <input id="order" v-model="form.row" class="input" min="0" max="5" type="number" name="order">
      </label>
      <div v-else class="double">
        <label class="inline-flex items-center" for="order-column">
          orderColumn：
          <input id="order-column" v-model="form.column" class="input" min="0" max="5" type="number" name="order-column">
        </label>
        <label class="inline-flex items-center" for="order-row">
          orderRow：
          <input id="order-row" v-model="form.row" class="input" min="0" max="5" type="number" name="order-row">
        </label>
      </div>
    </div>
    <!-- target -->
    <div class="space-y-2">
      <!-- targetX -->
      <label class="inline-flex items-center" for="target-x">
        targetX：
        <input id="target-x" v-model="form.targetX" text-gray class="input" min="0" type="number" name="targetX">
      </label>
      <!-- targetY -->
      <label class="inline-flex items-center" for="target-y">
        targetY：
        <input id="target-y" v-model="form.targetY" text-gray class="input" min="0" type="number" name="targetY">
      </label>
    </div>
    <!-- kernelMatrix -->
    <label for="kernel-matrix">
      kernelMatrix：
      <textarea
        id="kernel-matrix"
        v-model="form.kernelMatrix"
        class="pl-2 py-1 text-sm text-gray rounded h-8"
        name="kernelMatrix"
        placeholder="请输入表格值，每个值用空格隔开"
      />
    </label>
    <!-- divisor -->
    <label class="flex items-center" for="divisor">
      divisor：
      <input id="divisor" v-model="form.divisor" text-gray class="input" type="number" name="divisor">
    </label>
    <!-- bias -->
    <label class="flex items-center" for="bias">
      bias：
      <input id="bias" v-model="form.bias" text-gray class="input" step="0.01" type="number" name="bias">
    </label>
    <!-- edgeMode -->
    <label class="flex items-center" for="edgeMode">
      edgeMode：
      <select id="edgeMode" v-model="form.edgeMode" class="pl-2 pr-8 py-1 text-sm text-gray rounded" name="edgeMode">
        <option selected value="duplicate">duplicate</option>
        <option value="wrap">wrap</option>
        <option value="none">none</option>
      </select>
    </label>
    <!-- preserveAlpha -->
    <label class="flex items-center" for="preserveAlpha">
      preserveAlpha：
      <input id="preserveAlpha" v-model="form.preserveAlpha" class="daisy-checkbox" type="checkbox" name="preserveAlpha">
    </label>
  </form>
</template>
