<script setup lang="ts">
import { compareDesc } from 'date-fns'
import type { Post } from '../types'

const { type = 'blog' } = defineProps<{
  type: 'blog' | 'notes'
}>()

const router = useRouter()
const posts: Post[] = router.getRoutes()
  .filter(route => route.meta.frontmatter?.date && typeof route.meta.frontmatter.date == 'string' && (route.path.startsWith(`/${type}`)))
  .map(({ path, meta: { frontmatter } }) => ({
    title: frontmatter?.title,
    date: frontmatter?.date,
    duration: frontmatter?.duration,
    tags: frontmatter?.tags,
    description: frontmatter?.description,
    path,
  }))
  .sort((a, b) => compareDesc(a.date, b.date))
</script>

<template>
  <ol mt-4 space-y-4 lg:space-y-6>
    <li v-for="{ path, title, date, duration } in posts" :key="title">
      <Post :path :title :date :duration />
    </li>
  </ol>
</template>
