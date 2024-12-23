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
      isShowImg.value = !isShowImg.value
      document.body.style.overflow = isShowImg.value ? 'hidden' : 'auto'
    }
  })

  document.addEventListener('keydown', (e) => {
    // ESC 退出
    if (e.key === 'Escape') {
      isShowImg.value = false
      document.body.style.overflow = 'auto'
    }
  })
})
</script>

<template>
  <div font-sans>
    <TheNav />
    <RouterView />
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isShowImg" z-10 fixed inset-0 backdrop-blur-lg flex="~ justify-center items-center">
        <img object-contain w-full h-full max-w-screen max-h-screen :src="image.src" :alt="image.alt">
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s ease, opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
