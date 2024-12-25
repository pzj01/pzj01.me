<script setup lang="ts">
const { audio, playing } = useAudio()

onMounted(() => {
  audio.autoplay = true
  audio.loop = true
  playing.value = true
})
</script>

<template>
  <nav p-2 sm:p-4 h-16 sm:h-20 flex="~ justify-between md:justify-end">
    <RouterLink md:(fixed left-4) to="/">
      <Logo />
    </RouterLink>
    <span font-mono flex="~ gap-2 sm:gap-4 items-center">
      <HeaderLink to="/blog" icon="i-ri-blogger-line">Blog</HeaderLink>
      <HeaderLink to="/archive" icon="i-ri-archive-line">Archive</HeaderLink>
      <HeaderLink to="/tags" icon="i-ri-price-tag-3-line">Tags</HeaderLink>
      <HeaderLink to="/use" icon="i-ri-tools-line">Use</HeaderLink>
      <HeaderLink to="/six" icon="https://api.iconify.design/ph:number-six-bold.svg?color=%23cfcfcf">六年之约</HeaderLink>
      <HeaderLink to="/notes" icon="i-ri-sticky-note-2-line">Notes</HeaderLink>
      <a hidden md:block lg:text-lg link href="/feed.xml" i-ri-rss-line target="_blank" />
      <!-- eslint-disable-next-line vue/valid-attribute-name -->
      <button hidden lg:(block text-lg) :class="playing ? 'i-ri-pause-circle-line' : 'i-ri-play-circle-line'" @click="playing = !playing" />
      <a lg:text-lg link href="https://github.com/pzj01" i-ri-github-fill target="_blank" />
      <span lg:text-lg link cursor-pointer i-ri-moon-line dark:i-ri-sun-line @click="toggleDark" />
    </span>
  </nav>
</template>
