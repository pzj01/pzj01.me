<script setup lang="ts">
const audio = new Audio()

const { playing } = useMediaControls(audio, {
  src: '/audio/ASilentSummer.mp3',
})

onMounted(() => {
  audio.autoplay = true
  audio.loop = true
})
</script>

<template>
  <nav p-2 sm:p-4 flex="~ justify-between">
    <RouterLink to="/">
      pzj01.com
    </RouterLink>
    <span flex="~ gap-2 sm:gap-4 items-center">
      <HeaderLink to="/blog" icon="i-ri-blogger-line">Blog</HeaderLink>
      <HeaderLink to="/archive" icon="i-ri-archive-line">Archive</HeaderLink>
      <HeaderLink to="/tags" icon="i-ri-price-tag-3-line">Tags</HeaderLink>
      <HeaderLink to="/use" icon="i-ri-tools-line">Use</HeaderLink>
      <HeaderLink to="/notes" icon="i-ri-sticky-note-2-line">Notes</HeaderLink>
      <!-- eslint-disable-next-line vue/valid-attribute-name -->
      <button hidden lg:(block text-lg) :class="playing ? 'i-ri-pause-circle-line' : 'i-ri-play-circle-line'" @click="playing ? audio.pause() : audio.play()" />
      <a lg:text-lg link href="https://github.com/pzj01" i-ri-github-fill />
      <span lg:text-lg link cursor-pointer i-ri-moon-line dark:i-ri-sun-line @click="toggleDark" />
    </span>
  </nav>
</template>
