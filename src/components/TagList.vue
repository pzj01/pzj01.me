<script setup lang="ts">
const routes = useRouter().getRoutes()
const tags = new Set<string>(
  routes.filter((route) => {
    const tags: string[] | undefined = route.meta.frontmatter?.tags
    return tags && tags.length
  })
    .map(route => route.meta.frontmatter?.tags)
    .flat(),
)
</script>

<template>
  <ul mt-4 flex="~ wrap gap-2" text="sm">
    <li v-for="tag, i in tags" :key="tag" slide-enter :style="`--enter-stage: ${i};--enter-step: 60ms;`">
      <RouterLink rounded-full transition-colors hover:bg-gray-2 dark:hover:bg-gray-7 border-1 py-1 px-2 flex="~ items-center" :to="`/tags/${tag}`">
        <i i-ri-hashtag />
        {{ tag }}
      </RouterLink>
    </li>
  </ul>
</template>
