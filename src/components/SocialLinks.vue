<script setup lang="ts">
interface SocialLink {
  provider: string
  icon: string
  url: string
}

defineProps<{
  links: SocialLink[]
}>()
</script>

<template>
  <div flex="~ gap-x-4 gap-y-2 wrap" font-mono>
    <a v-for="{ url, provider, icon } in links" :key="provider" pb-1 border-b border-dashed hover:border-solid border-neutral-500 :style="{ textDecoration: 'none', margin: 0 }" flex="~ items-center gap-x-1" :href="url" target="_blank">
      <i s-6 :class="icon" />
      {{ provider }}
    </a>
  </div>
</template>
