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
      document.body.style.overflow = 'hidden'
      isShowImg.value = true
    }
    else {
      document.body.style.overflow = 'auto'
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
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isShowImg" z-10 fixed inset-0 backdrop-blur-lg flex="~ justify-center items-center">
        <img object-cover class="w-2/3" :src="image.src" :alt="image.alt">
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
