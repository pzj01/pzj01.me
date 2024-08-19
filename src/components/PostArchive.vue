<script setup lang="ts">
import { compareDesc, toDate } from 'date-fns'
import type { Post } from '../types'

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
  <ol mt-4 space-y-4>
    <li v-for="[year, posts] of postsYearEntries" :key="year">
      <h1 text="2xl">
        {{ year }}
      </h1>
      <hr>
      <ol space-y-4>
        <li v-for="{ title, path, date } of posts" :key="path">
          <Post :path :title :date />
        </li>
      </ol>
    </li>
  </ol>
</template>
