<script lang="ts" setup>
import type { Photo } from '../../../photos'

defineProps<{
  photos: Photo[]
}>()
</script>

<template>
  <div slide-enter-content w-full grid="~ cols-1 md:cols-2 lg:cols-3 xl:cols-4 gap-4">
    <div v-for="{ name, url } in photos" :key="name" rounded-md overflow-hidden>
      <img
        :src="url"
        :alt="name"
        object-cover
      >
    </div>
  </div>
</template>
