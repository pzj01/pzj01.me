<script setup lang="ts">
withDefaults(defineProps<{
  stage?: 'base' | 'advanced'
}>(), {
  stage: 'base',
})

enum DraggableStatus {
  NOT_DRAGGING = '未拖拽',
  DRAGGING = '拖拽中',
  DRAG_OVER = '拖拽到可放置区域中',
  DRAG_OVER_DROP = '拖拽到可放置区域之后放下',
  DRAG_OVER_NOT_DROP = '拖拽到不可放置区域',
}
const statusText = ref<DraggableStatus>(DraggableStatus.NOT_DRAGGING)

function onDragStart() {
  statusText.value = DraggableStatus.DRAGGING
}

function onDragEnd() {
  statusText.value = DraggableStatus.NOT_DRAGGING
}

function onDrop() {
  statusText.value = DraggableStatus.DRAG_OVER_DROP
}

function onDragLeave() {
  statusText.value = DraggableStatus.DRAG_OVER_NOT_DROP
}

function onDragEnter() {
  statusText.value = DraggableStatus.DRAG_OVER
}

const img = ref<HTMLImageElement>()

function onImgDragStart(e: DragEvent) {
  if (e.dataTransfer) {
    e.dataTransfer.setData('text/plain', '金饰')
    e.dataTransfer.setDragImage(img.value!, 0, 0)
  }
}

function onImgDrop(e: DragEvent) {
  e.preventDefault()
  if (e.dataTransfer) {
    const text = e.dataTransfer.getData('text/plain')
    // eslint-disable-next-line no-alert
    alert(`当前传递的数据为 ${text}`)
  }
}
</script>

<template>
  <div v-if="stage === 'base'">
    <div flex="~ gap-x-4">
      <div
        text-center w-24 h-24 border-2 draggable="true"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @drop="onDrop"
      >
        这是一个可拖拽的元素
      </div>
      <div
        text-center flex-1 border-style-dashed border-1
        @dragleave="onDragLeave"
        @dragenter="onDragEnter"
      >
        可放置区域
      </div>
    </div>
    <p>状态：{{ statusText }}</p>
  </div>
  <div v-else flex="~ gap-x-4">
    <img
      ref="img" w-56
      src="/images/金饰.png"
      alt="金饰"
      draggable="true" @dragstart="onImgDragStart"
    >
    <div
      text-center flex-1
      border-style-dashed border-1 @dragover="e => e.preventDefault()" @drop="onImgDrop"
    >
      可放置区域
    </div>
  </div>
</template>
