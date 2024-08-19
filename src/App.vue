<script setup lang="ts">
const isShowImg = ref(false)
const image = reactive<Pick<HTMLImageElement, 'src' | 'alt'>>({
  src: '',
  alt: '',
})

onMounted(() => {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    if (target.tagName === 'IMG' && target instanceof HTMLImageElement) {
      image.src = target.src
      image.alt = target.alt
      isShowImg.value = true
    }
    else {
      isShowImg.value = false
    }
  })

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape')
      isShowImg.value = false
  })
})
</script>

<template>
  <div font-sans>
    <TheNav />
    <RouterView />
  </div>
  <Transition name="fade">
    <div v-if="isShowImg" z-10 fixed inset-0 backdrop-blur-lg flex="~ justify-center items-center">
      <img object-cover h-full min-h-screen :src="image.src" :alt="image.alt">
    </div>
  </Transition>
</template>
