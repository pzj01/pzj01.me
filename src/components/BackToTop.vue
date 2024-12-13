<script lang="ts" setup>
const { distance = 300 } = defineProps<{
  distance?: number
}>()

const backTopVisible = ref(false)
useEventListener('scroll', backTopVisibleHandler)

function backTopVisibleHandler() {
  backTopVisible.value = scrollY > distance
}

function scrollTop() {
  scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}
</script>

<template>
  <div v-show="backTopVisible" s-10 hover:bg-neutral-500:30 rounded-full flex-center transition-colors fixed bottom-2 right-2 cursor-pointer @click="scrollTop">
    <i s-6 i-ri-arrow-up-line />
  </div>
</template>
