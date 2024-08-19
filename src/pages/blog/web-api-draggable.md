---
title: Web API - Draggable(可拖拽的)
description: 使用浏览器的拖拽 API
date: 2024-08-19T11:08:00
duration: 5min
tags: [Web API]
---

其实浏览器本身就有拖拽功能，只需要在元素上设置 `draggable` 属性即可。在拖动的时候会产生一个该元素的副本在鼠标上。

<div text-center w-24 h-24 border-2 draggable="true">
  这是一个可拖拽的元素
</div>

```html
<div draggable="true">
  这是一个可拖拽的元素
</div>
```
## 拖拽事件

在拖拽元素时会触发以下的事件：
- `dragstart` - 开始拖拽
- `dragend` - 拖拽结束
- `drag` - 拖拽中

## 可放置区域事件

这些事件是当有可拖拽目标到可放置目标的时候触发的。

- `dragover` - 拖拽目标到可放置的目标
- `dragenter` - 拖拽目标进入可放置的目标
- `dragleave` - 拖拽目标离开可放置的目标
- `drop` - 拖拽目标到可放置到目标中放下

<DraggableDemo />

## dataTransfer（拖拽数据）对象

这个对象用来传递拖拽数据，包括拖拽源和拖拽目标。

它有以下几个常用属性和方法：
- `dropEffect` - 放下效果
- `effectAllowed` - 拖拽效果
- `files` - 拖拽的文件列表
- `items` - 拖拽的数据项列表
- `types` - 拖拽的数据类型
- `setDragImage` - 设置拖拽图片
- `setData` - 设置拖拽数据
- `getData` - 获取拖拽数据
- `clearData` - 清空拖拽数据

<DraggableDemo stage="advanced" />

```html
<div id="draggable" draggable="true">可拖拽的元素</div>
<div id="droppable">可放置区域</div>
```

```ts twoslash
const draggable = document.getElementById('draggable')
const droppable = document.getElementById('droppable')

draggable?.addEventListener('dragstart', (event) => {
  // 设置拖拽数据
  event.dataTransfer!.setData('text/plain', 'hello')
  // 设置拖拽类型
  event.dataTransfer!.dropEffect = 'copy'
  // 设置拖拽效果
  event.dataTransfer!.effectAllowed = 'copy'
})

droppable?.addEventListener('dragover', (event) => {
  event.preventDefault()
})

droppable?.addEventListener('drop', (event) => {
  event.preventDefault()
  const text = event.dataTransfer!.getData('text/plain')
  console.log(text)
})
```
