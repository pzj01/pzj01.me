<script setup lang="ts">
import type { Frontmatter } from 'unplugin-vue-markdown/types'
import type { Post } from '../types'
import '~/styles/prose.css'
import '~/styles/shiki.css'
import '~/styles/rich.css'

const { frontmatter } = defineProps<{
  frontmatter?: Frontmatter & Partial<Post>
}>()

const backTopVisible = ref(false)

onMounted(() => {
  window.addEventListener('scroll', backTopVisibleHandler)
})

function backTopVisibleHandler() {
  backTopVisible.value = scrollY > 300
}

function scrollTop() {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <!-- <AudioWaterArt /> -->
  <div p-4 class="font-chinese">
    <article class="mx-auto md:w-3/4 lg:w-1/2">
      <h1 :class="!frontmatter?.date && 'mb-12 lg:mb-16'" text="3xl lg:4xl pretty" font-bold>
        {{ frontmatter?.title }}
      </h1>
      <DateFormat v-if="frontmatter?.date" my-2 overflow-hidden block :date="frontmatter.date" />
      <slot />
    </article>
    <div v-show="backTopVisible" text-2xl bg="gray-5 hover:black dark:hover:white" transition-colors i-ri-arrow-up-line fixed bottom-2 right-2 cursor-pointer @click="scrollTop" />
  </div>
</template>
