<script setup lang="ts">
import gsap from 'gsap'
import { CustomEase, Draggable, MotionPathPlugin, TextPlugin } from 'gsap/all'

gsap.registerPlugin(Draggable)
gsap.registerPlugin(TextPlugin)
gsap.registerPlugin(MotionPathPlugin)
gsap.registerPlugin(CustomEase)

const ease = reactive({
  cp1: '0.3,0.3',
  cp2: '0.7,0.7',
})
const	toRatio = (v: number, negative: boolean = false) => (negative ? v / -98 : v / 98).toFixed(2)
const idMap: Record<string, (d: string[], x: number, y: number) => void> = {
  1: (d, x, y) => {
    ease.cp1 = `${toRatio(x)},${toRatio(y, true)}`
    d[1] = ` C ${x} ${y}`
  },
  2: (d, x, y) => {
    ease.cp2 = `${toRatio(x)},${toRatio(y, true)}`
    d[2] = ` ${x} ${y}`
  },
}
const easeStr = computed(() => `${ease.cp1},${ease.cp2}`)
const path = ref<SVGPathElement>()
const initD = ref('')
onMounted(() => {
  if (!path.value)
    return

  initD.value = path.value.getAttribute('d')!

  const setEaseString = gsap.quickSetter('#ease-value', 'text')
  const setPathString = gsap.quickSetter('#d-value', 'text')

  Draggable.create('.control-point', {
    bounds: '#draggable-container',
    inertia: false,
    onDrag(e: PointerEvent) {
      const target = e.target as SVGCircleElement
      const cx = target.getAttribute('cx')
      const cy = target.getAttribute('cy')
      if (cx && cy) {
        const x2 = Number.parseInt((+cx) + this.x)
        const y2 = Number.parseInt((+cy) + this.y)
		    const id = target.dataset.line!
        gsap.set(`#control-line-${id}`, {
          attr: {
            x2,
            y2,
          },
        })
        const d = initD.value?.split(',')
        if (!d)
          return

        idMap[id](d, x2, y2)
        gsap.to(path.value!, { attr: { d }, duration: 0.5 })
        setEaseString(easeStr.value)
        setPathString(d.join(''))
      }
    },
  })
})

function onStart() {
  if (!path.value)
    return
  gsap.fromTo('#animate-motion', {
    motionPath: initD.value,
  }, {
    motionPath: path.value.getAttribute('d')!,
    duration: 2,
    ease: CustomEase.create('custom', easeStr.value),
  })
}
</script>

<template>
  <div class="flex  flex-col gap-4">
    <div id="draggable-container" svg class="inline-block mx-auto">
      <svg w-full xmlns="http://www.w3.org/2000/svg" viewBox="0 -100 100 100">
        <g>
          <path
            id="animate-path"
            ref="path"
            d="M2 -2, C 30 -30, 70 -70, 98 -98"
            stroke="currentColor"
          />
          <!-- control line 1 -->
          <line id="control-line-1" x1="2" y1="-2" x2="30" y2="-30" stroke-green />
          <!-- control line 2 -->
          <line id="control-line-2" x1="98" y1="-98" x2="70" y2="-70" stroke-green />
          <!-- start point -->
          <circle fill-green cx="2" cy="-2" r="2" />
          <!-- end point -->
          <circle fill-green cx="98" cy="-98" r="2" />
          <!-- control point 1 -->
          <circle data-line="1" class="control-point fill-green" cx="30" cy="-30" r="2" />
          <!-- control point 2 -->
          <circle data-line="2" class="control-point fill-green" cx="70" cy="-70" r="2" />
        </g>
        <circle id="animate-motion" class="fill-green" cx="2" cy="-2" r="5" />
      </svg>
    </div>
    <div>
      <div class="text-center">
        ease：<span id="ease-value">0.3,0.3,0.7,0.7</span>
      </div>
      <div class="text-center">
        d：<span id="d-value">M2 -2, C 30 -30, 70 -70, 98 -98</span>
      </div>
    </div>
  </div>
  <p class="flex-center">
    <button id="btn-animateMotion" class="btn" @click="onStart">
      开始动画
    </button>
  </p>
</template>
