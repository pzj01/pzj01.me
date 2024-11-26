<script setup lang="ts">
import gsap from 'gsap'
import { MotionPathPlugin } from 'gsap/all'

gsap.registerPlugin(MotionPathPlugin)

const endColor = computed(() => isDark.value ? '#fdeff9' : '#200317')
const timeline = gsap.timeline({
  repeat: -1,
  repeatDelay: 1,
  yoyo: true,
  defaults: {
    ease: 'power2.inOut',
  },
})
const postions = [
  { x: 0.3, y: 0.3 }, // 左上
  { x: 0.7, y: 0.3 }, // 右上
  { x: 0.7, y: 0.7 }, // 右下
  { x: 0.3, y: 0.7 }, // 左下
  { x: 0.5, y: 0.5 }, // 中心
]

onMounted(() => {
  postions.forEach((p, i) => {
    timeline.to('#r', {
      duration: gsap.utils.random(1, 2, 0.1),
      attr: {
        cx: `${p.x * 100}%`,
        cy: `${p.y * 100}%`,
      },
    }, `+=${gsap.utils.random(0, 2, 0.1).toFixed(2)}`).addLabel(`${i + 1}st eyeball`)
  })
})

function turn() {
  if (!timeline.paused()) {
    timeline.pause()
    timeline.tweenTo(timeline.nextLabel(), {
      duration: 1,
      ease: 'power2.inOut',
      onComplete() {
        timeline.resume()
      },
    })
  }
}
</script>

<template>
  <svg s-12 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" @click="turn">
    <defs>
      <radialGradient id="r" fr="10%" fx="50%" fy="50%" cx="30%" cy="30%" r="40%">
        <stop offset="0%" stop-color="#03001e" />
        <stop offset="33%" stop-color="#7303c0" />
        <stop offset="66%" stop-color="#ec38bc" />
        <stop offset="100%" :stop-color="endColor" />
      </radialGradient>
    </defs>
    <circle cx="50" cy="50" r="50" fill="url(#r)" />
  </svg>
</template>
