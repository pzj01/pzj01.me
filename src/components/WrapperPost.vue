<script setup lang="ts">
import type { Frontmatter } from 'unplugin-vue-markdown/types'
import type { Post } from '../types'
import '~/styles/prose.css'
import '~/styles/shiki.css'
import '~/styles/rich.css'

const { frontmatter } = defineProps<{
  frontmatter?: Frontmatter & Partial<Post>
}>()

const isPost = computed(() => !!frontmatter?.date)

const router = useRouter()

function back() {
  router.replace(router.currentRoute.value.matched[0].path)
}

let ArtComponent: Component

if (window) {
  ArtComponent = defineAsyncComponent(() => import('./art/PointArt.vue'))
}
</script>

<template>
  <ClientOnly v-if="!isPost && ArtComponent">
    <component :is="ArtComponent" />
  </ClientOnly>
  <div p-4 font-sans>
    <article class="mx-auto md:w-3/4 lg:w-1/2">
      <h1 font-display :class="!isPost && 'mb-12 lg:mb-16'" text="3xl lg:4xl pretty" font-bold>
        {{ frontmatter?.title }}
      </h1>
      <DateFormat v-if="isPost" my-2 overflow-hidden block :date="frontmatter!.date!" />
      <slot />
      <div v-if="isPost" transition-colors mt-4 pl-2>
        <span text="neutral-500 hover:neutral-600 dark:hover:text-neutral-400" font-input font-mono cursor-default @click="back">~ cd ../</span>
      </div>
    </article>
    <BackToTop />
  </div>
</template>
