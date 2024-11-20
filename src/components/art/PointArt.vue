<script setup lang="ts">
import type { Point as _Point } from '../../utils'
import { p5i } from 'p5i'

interface Point extends _Point {
  originX: number
  originY: number
  alpha: number
}

const SIZE = Math.max(Math.random() * 1.2 * Math.PI, 1.5)
// 扩大移动范围
const EXPEND = 1.5
// 平移范围
const PEN = 0.75
// 点间距
const GAP = 30
const MAX_OFFSET = 60
// 灰度
const gray = 255 * 0.451
const SPORT_PERIOD = 8000 // ms
const container = useTemplateRef('p5iContainer')
const points: Point[] = []

onMounted(() => {
  p5i({
    setup({ createCanvas, windowWidth, windowHeight, noFill, noiseSeed }) {
      createCanvas(windowWidth, windowHeight)
      noFill()
      noiseSeed(Date.now())

      addPoints()
    },
    draw({ clear, beginShape, vertex, POINTS, endShape, width, height, strokeWeight, stroke, noise }) {
      clear()

      beginShape(POINTS) // 批量绘制点
      for (const p of points) {
        const xRatio = p.x / width
        const yRatio = p.y / height
        const now = Date.now()

        // 动态噪声影响 x 和 y 的偏移
        const nX = noise(xRatio, yRatio, now / SPORT_PERIOD) * EXPEND - PEN
        const nY = noise(yRatio, xRatio, now / SPORT_PERIOD) * EXPEND - PEN

        p.x = p.originX + nX * MAX_OFFSET
        p.y = p.originY + nY * MAX_OFFSET

        const nA = noise(p.x, p.y, now / SPORT_PERIOD) * EXPEND - PEN

        // 点的灰度和透明度
        stroke(gray, p.alpha + nA)
        strokeWeight(SIZE) // 增加点的权重
        // 绘制点
        vertex(p.x, p.y)
      }
      endShape()
    },
    windowResized({ resizeCanvas, windowHeight, windowWidth }) {
      resizeCanvas(windowWidth, windowHeight)
      points.length = 0
      addPoints()
    },
  }, container.value!)
})

function addPoints() {
  for (let x = -GAP / 2; x < innerWidth + GAP; x += GAP) {
    for (let y = -GAP / 2; y < innerHeight + GAP; y += GAP) {
      points.push({
        x,
        y,
        originX: x,
        originY: y,
        alpha: Math.random() * 255 + 50,
      })
    }
  }
}
</script>

<template>
  <div ref="p5iContainer" pointer-events-none fixed inset-0 z--1 />
</template>
