<script setup lang="ts">
import type { Post } from '../types'
import { compareDesc, toDate } from 'date-fns'

const router = useRouter()
const postsYearRecord = router.getRoutes()
  .filter(route => !!route.meta.frontmatter?.date)
  .map(({ path, meta: { frontmatter } }) => ({
    title: frontmatter!.title,
    date: toDate(frontmatter!.date),
    duration: frontmatter!.duration,
    tags: frontmatter!.tags,
    description: frontmatter!.description,
    path,
  }))
  .sort((a, b) => compareDesc(a.date, b.date))
  .reduce((pre, post) => {
    const year = post.date.getFullYear()
    const list = pre[year]
    if (list) {
      list.push(post)
    }
    else {
      pre[year] = [post]
    }

    return pre
  }, {} as Record<number, Post[]>)

const postsYearEntries = Object.entries(postsYearRecord)

// onMounted(() => console.log(postsYearEntries))
</script>

<template>
  <ol mt-4 space-y-4 slide-enter-content>
    <li v-for="[year, posts] of postsYearEntries" :key="year">
      <h1 text="2xl">
        {{ year }}
      </h1>
      <hr my-4>
      <ol space-y-4>
        <li v-for="{ title, path, date, duration }, i of posts" :key="path" slide-enter :style="`--enter-stage: ${i};--enter-step: 60ms;`">
          <Post :path :title :date :duration />
        </li>
      </ol>
    </li>
  </ol>
</template>
