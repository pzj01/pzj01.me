<script setup lang="ts">
import gsap from 'gsap'
import TextPlugin from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

const tweenCommonOptions = {
  duration: 2.5,
  ease: 'none',
}
const calculateQuadraticBezier = createBezier(2)

onMounted(() => {
  const tweens: GSAPTween[] = [
  	gsap.to('text[data-p3]', { attr: { x: 45, y: 15 }, ...tweenCommonOptions }),
  	gsap.to('text[data-p5]', { attr: { x: 85, y: 80 }, ...tweenCommonOptions }),
  	gsap.to('circle[data-p3-point]', { attr: { cx: 50, cy: 20 }, ...tweenCommonOptions }),
  	gsap.to('circle[data-p5-point]', { attr: { cx: 80, cy: 80 }, ...tweenCommonOptions }),
  	gsap.to('line[data-p3-to-p5-line]', { attr: { x1: 50, y1: 20, x2: 80, y2: 80 }, ...tweenCommonOptions }),
  ]
  const p6PointSetter = gsap.quickSetter('circle[data-p6-point]', 'attr')
  const p6Setter = gsap.quickSetter('text[data-p6]', 'attr')
  const timeline = gsap.timeline({
    repeat: -1,
    yoyo: true,
    dealy: 1,
    onUpdate(p3) {
  		gsap.set('text[data-t]', {
  			text: `t = ${p3.progress().toFixed(1)}`,
  		})
      const { x, y } = calculateQuadraticBezier(p3.progress(), { x: 20, y: 80 }, { x: 50, y: 20 }, { x: 80, y: 80 })
      p6Setter({ x: x - 2.5, y: y - 5 })
      p6PointSetter({ cx: x, cy: y })
    },
    onUpdateParams: [tweens[2]],
    onStart() {
      gsap.set('path[data-bezier]', {
        attr: {
          'stroke-dashoffset': 0,
        },
      })
    },
  })

  timeline.add(tweens)
})
</script>

<template>
  <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <line x1="20" y1="80" x2="50" y2="20" stroke="currentColor" stroke-width="1" />
    <line x1="50" y1="20" x2="80" y2="80" stroke="currentColor" stroke-width="1" />
    <line data-p3-to-p5-line x1="20" y1="80" x2="50" y2="20" stroke="currentColor" stroke-width="1" />
    <path data-bezier d="M20 80 Q50 20 80 80" class="stroke-current fill-none transition-all duration-[2.5s]" stroke-width="0.5" stroke-dasharray="88" stroke-dashoffset="88" />
    <g>
      <text x="14" y="85" fill="currentColor" font-size="1">p1</text>
      <text x="50" y="15" fill="currentColor" font-size="1">p2</text>
      <text data-p3 x="15" y="75" fill="currentColor" font-size="1">p3</text>
      <text x="82" y="85" fill="currentColor" font-size="1">p4</text>
      <text data-p5 x="55" y="20" fill="currentColor" font-size="1">p5</text>
      <text data-p6 fill="currentColor" font-size="1">p6</text>
      <text data-t x="20" y="20" fill="currentColor" font-size="1">t = 0.5</text>
      <circle data-p3-point cx="20" cy="80" r="1.5" class="fill-green" />
      <circle data-p5-point cx="50" cy="20" r="1.5" class="fill-green" />
      <circle data-p6-point cx="20" cy="80" r="1.5" class="fill-green" />
    </g>
  </svg>
</template>
