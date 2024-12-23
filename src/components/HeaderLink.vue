<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { RouterLinkProps } from 'vue-router'

const { icon } = defineProps<RouterLinkProps & { icon?: string }>()

const isExternal = computed(() => icon && icon.startsWith('http'))

const style = computed<StyleValue>(() => isExternal.value
  ? {
      mask: `url(${icon}) no-repeat center`,
      maskSize: '100% 100%',
      backgroundColor: 'currentcolor',
      width: '1.2em',
      height: '1.2em',
    }
  : null)
</script>

<template>
  <RouterLink v-bind="$props" link flex="~ items-center" active-class="underline text-black dark:text-white">
    <span v-if="icon" :style sm:hidden :class="!isExternal && icon" />
    <span hidden sm:inline-block text-lg>
      <slot />
    </span>
  </RouterLink>
</template>
