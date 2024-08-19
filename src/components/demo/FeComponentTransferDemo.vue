<script setup lang="ts">
type FeFunType = 'identity' | 'linear' | 'gamma' | 'table' | 'discrete'
const fefuns = reactive({
  feFuncR: {
    type: 'identity',
    linear: {
      slope: 1,
      intercept: 0,
    },
    gamma: {
      exponent: 1,
      amplitude: 1,
      offset: 0,
    },
    table: {
      tableValues: '0 1',
    },
    discrete: {
      tableValues: '0 1',
    },
  },
  feFuncG: {
    type: 'identity',
    linear: {
      slope: 1,
      intercept: 0,
    },
    gamma: {
      exponent: 1,
      amplitude: 1,
      offset: 0,
    },
    table: {
      tableValues: '0 1',
    },
    discrete: {
      tableValues: '0 1',
    },
  },
  feFuncB: {
    type: 'identity',
    linear: {
      slope: 1,
      intercept: 0,
    },
    gamma: {
      exponent: 1,
      amplitude: 1,
      offset: 0,
    },
    table: {
      tableValues: '0 1',
    },
    discrete: {
      tableValues: '0 1',
    },
  },
  feFuncA: {
    type: 'identity',
    linear: {
      slope: 1,
      intercept: 0,
    },
    gamma: {
      exponent: 1,
      amplitude: 1,
      offset: 0,
    },
    table: {
      tableValues: '0 1',
    },
    discrete: {
      tableValues: '0 1',
    },
  },
})

function FeFun() {
  return Object.entries(fefuns).map(([key, value]) => h(
    key,
    {
      type: value.type,
      // @ts-expect-error feFuncR.type is FeFunType
      ...value[value.type as FeFunType],
    },
  ))
}
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <filter id="component-transfer">
      <feComponentTransfer>
        <FeFun />
      </feComponentTransfer>
    </filter>
    <image
      href="/images/甘雨.jpeg" filter="url(#component-transfer)"
      x="0" y="0" width="100" height="100"
      preserveAspectRatio="xMidYMid slice"
    />
  </svg>
  <div id="fe-component-transfer" class="grid sm:grid-cols-2 gap-4 mt-4">
    <form v-for="key in Object.keys(fefuns) as (keyof typeof fefuns)[]" :key :name="key" class="space-y-2">
      <h3 class="ml-0!">
        {{ key }}
      </h3>
      <label for="type">
        type：
        <select v-model="fefuns[key].type" class="pl-2 pr-8 py-1 text-gray rounded" name="type">
          <option selected value="identity">identity</option>
          <option value="linear">linear</option>
          <option value="gamma">gamma</option>
          <option value="table">table</option>
          <option value="discrete">discrete</option>
        </select>
      </label>
      <!-- linear -->
      <div v-show="fefuns[key].type === 'linear'" class="space-y-2">
        <label class="flex items-center" for="slope">
          slope：
          <input
            v-model="fefuns[key].linear.slope"
            class="pl-2 py-1  text-gray rounded"
            name="slope"
            type="number"
            step="0.01"
            placeholder="请输入斜率"
          >
        </label>
        <label class="flex items-center" for="intercept">
          intercept：
          <input
            v-model="fefuns[key].linear.intercept"
            class="pl-2 py-1  text-gray rounded"
            name="intercept"
            type="number"
            step="0.01"
            placeholder="请输入截距"
          >
        </label>
      </div>
      <!-- gamma -->
      <div v-show="fefuns[key].type === 'gamma'" class="space-y-2">
        <label class="flex items-center" for="amplitude">
          amplitude：
          <input
            v-model="fefuns[key].gamma.amplitude"
            class="pl-2 py-1  text-gray rounded"
            name="amplitude"
            type="number"
            step="0.01"
            placeholder="请输入振幅"
          >
        </label>
        <label class="flex items-center" for="exponent">
          exponent：
          <input
            v-model="fefuns[key].gamma.exponent"
            class="pl-2 py-1  text-gray rounded"
            name="exponent"
            type="number"
            step="0.01"
            placeholder="请输入指数"
          >
        </label>
        <label class="flex items-center" for="offset">
          offset：
          <input
            v-model="fefuns[key].gamma.offset"
            class="pl-2 py-1  text-gray rounded"
            name="offset"
            type="number"
            step="0.01"
            placeholder="请输入偏移量"
          >
        </label>
      </div>
      <!-- table -->
      <div v-show="fefuns[key].type === 'table'" class="space-y-2">
        <label class="flex items-center" for="tableValues">
          tableValues：
          <textarea
            v-model="fefuns[key].table.tableValues"
            class="pl-2 py-1  text-gray rounded h-8"
            name="tableValues"
            placeholder="请输入表格值，每个值用空格隔开"
          />
        </label>
      </div>
      <!-- discrete -->
      <div v-show="fefuns[key].type === 'discrete'" class="space-y-2">
        <label class="flex items-center" for="tableValues">
          tableValues：
          <textarea
            v-model="fefuns[key].discrete.tableValues"
            class="pl-2 py-1  text-gray rounded h-8"
            name="tableValues"
            placeholder="请输入表格值，每个值用空格隔开"
          />
        </label>
      </div>
    </form>
  </div>
</template>
