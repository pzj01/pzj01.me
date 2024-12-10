<script setup lang="ts">
const { params: { tag } } = useRoute()
const routes = useRouter().getRoutes().filter((route) => {
  const date = route.meta.frontmatter?.date
  const tags: string[] = route.meta.frontmatter?.tags || []
  return date && typeof date === 'string' && tags.length && tags.includes(tag as string)
})
</script>

<template>
  <WrapperPost>
    <div>
      <h1 font-bold text-xl flex="~ items-center">
        <i i-ri-hashtag />
        {{ tag }}
      </h1>
      <hr my-4>
      <ul space-y-4 slide-enter-content>
        <li v-for="{ path, meta: { frontmatter } } of routes" :key="path">
          <Post
            :path="path"
            :title="frontmatter?.title"
            :date="frontmatter?.date"
            :duration="frontmatter?.duration"
          />
        </li>
      </ul>
    </div>
  </WrapperPost>
</template>
