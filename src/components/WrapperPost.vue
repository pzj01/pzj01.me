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
const isPost = computed(() => !!frontmatter?.date)

useEventListener('scroll', backTopVisibleHandler)

function backTopVisibleHandler() {
  backTopVisible.value = scrollY > 300
}

function scrollTop() {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const router = useRouter()

function back() {
  router.replace(router.currentRoute.value.matched[0].path)
}
</script>

<template>
  <!-- <AudioWaterArt /> -->
  <div p-4 font-sans>
    <article class="mx-auto md:w-3/4 lg:w-1/2">
      <h1 :class="!isPost && 'mb-12 lg:mb-16'" text="3xl lg:4xl pretty" font-bold>
        {{ frontmatter?.title }}
      </h1>
      <DateFormat v-if="isPost" my-2 overflow-hidden block :date="frontmatter!.date!" />
      <slot />
      <div v-if="isPost" transition-colors mt-4 pl-2>
        <span text="neutral-500 hover:neutral-600 dark:hover:text-neutral-400" font-bold cursor-default @click="back">~ cd ../</span>
      </div>
    </article>
    <div v-show="backTopVisible" s-10 hover:bg-neutral-500:30 rounded-full flex-center transition-colors fixed bottom-2 right-2 cursor-pointer @click="scrollTop">
      <i s-6 i-ri-arrow-up-line />
    </div>
  </div>
</template>
