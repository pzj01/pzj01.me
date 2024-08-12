<script setup lang="ts">
const { params: { tag } } = useRoute()
const routes = useRouter().getRoutes()
  .filter((route) => {
    const date = route.meta.frontmatter?.date
    const tags: string[] = route.meta.frontmatter?.tags || []
    return date && typeof date === 'string' && tags.length && tags.includes(tag as string)
  })
</script>

<template>
  <WrapperPost>
    <h1 font-bold text-xl flex="~ items-center">
      <i i-ri-hashtag />
      {{ tag }}
    </h1>
    <hr>
    <ul space-y-4>
      <li v-for="{ path, meta: { frontmatter } } of routes" :key="path">
        <Post :path :title="frontmatter!.title" :date="frontmatter!.date" />
      </li>
    </ul>
  </WrapperPost>
</template>
