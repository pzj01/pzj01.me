<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router'

defineProps<RouterLinkProps & { icon?: string }>()
</script>

<template>
  <RouterLink v-bind="$props" link flex="~ items-center" active-class="underline text-black dark:text-white">
    <span v-if="icon" sm:hidden :class="icon" />
    <span hidden sm:inline-block text-lg>
      <slot />
    </span>
  </RouterLink>
</template>
