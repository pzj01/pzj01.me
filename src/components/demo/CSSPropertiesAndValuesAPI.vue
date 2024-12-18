<script lang="ts" setup>
const { stage } = defineProps<{
  stage: 'css' | 'js' | 'gradient animation'
}>()

const map = {
  'css': '@property',
  'js': 'CSS.registerProperty()',
  'gradient animation': '渐变颜色过渡效果',
  'display transition': 'display 切换过渡效果',
}

const enable = computed(() => stage === 'css' || stage === 'js')
</script>

<template>
  <div
    font-mono mx-auto text-wrap break-words
    class="w-1/2 display-transition" :class="!enable ? 'g' : 'transition-all transition-discrete'" rounded p-4 text-center
    :style="{ backgroundColor: enable ? 'var(--pzj01)' : '' }"
  >
    {{ map[stage] }}
  </div>
</template>

<style scoped>
@property --pzj01 {
  syntax: "<color>";
  inherits: false;
  initial-value: #277041;
}

@property --gradient {
  syntax: "<color>";
  inherits: false;
  initial-value: #4D9375;
}

.g {
  background-image: linear-gradient(to right, #fff, var(--gradient));
  transition: --gradient 1s ease-in-out;
}

.g:hover {
  --gradient: red;
}
</style>
