<script setup lang="ts">
import type { Frontmatter } from 'unplugin-vue-markdown/types'
import type { Post } from '../types'
import '~/styles/prose.css'
import '~/styles/shiki.css'
import '~/styles/rich.css'

const { frontmatter } = defineProps<{
  frontmatter?: Frontmatter & Partial<Post>
}>()
</script>

<template>
  <!-- <AudioWaterArt /> -->
  <div p-4 class="font-chinese">
    <article class="mx-auto md:w-3/4 lg:w-1/2">
      <h1 text-3xl lg:text-4xl font-bold>
        {{ frontmatter?.title }}
      </h1>
      <DateFormat v-if="frontmatter?.date" mt-2 block :date="frontmatter.date" />
      <slot />
    </article>
  </div>
</template>
