---
title: 什么是 BFC ？
description: 了解什么 BFC（Block Formatting Context）有助于解决一些开发中常见的问题。
date: 2024-12-13T11:18:00
duration: 5min
tags: [CSS]
---

BFC（Block Formatting Context，**块级格式化上下文**）是CSS中的一种布局概念，用于决定元素如何布局及其与其他元素的关系。理解BFC对于解决许多常见的 CSS 布局问题（如浮动清除、边距折叠等）非常重要。

## BFC的定义

BFC 是一个独立的渲染区域，具有特定的布局规则，内部的元素布局不会影响外部元素，外部元素的布局也不会影响 BFC 内部的元素。

## BFC 的特点

- 清除浮动： BFC 可以包含浮动元素，防止浮动元素影响外部布局。
- 防止边距折叠： BFC 内部的子元素边距不会与外部的元素发生折叠。
- 隔离影响： BFC 内部元素的布局不会影响外部元素，反之亦然。

## 如何创建BFC？

以下的情况会自动创建BFC：
  - float 的值不为 `none`。
  - position 的值为 `absolute` 或 `fixed`。
  - display 的值为 `inline-block、table-cell、table-caption、flex、grid、flow-root` 等。
  - overflow 的值不为 `visible` 或 `clip`。

> [!NOTE]
> hidden 和 clip 的区别是 clip 裁剪无法设置滚动。

## 应用场景

BFC可以解决由于子元素浮动，导致父元素高度塌陷的问题。

<section>
  <div border p-4 bg-blue:50 style="display: flow-root">
    <div h-24 p-4 bg-green:50 border float-left>浮动元素内容</div>
    父元素的内容
  </div>
</section>

可以按下<kbd>F12</kbd>，并选中上面的元素查看效果。

还可以解决子元素垂直外边距和父元素垂直外边距的重叠的问题。

<section>
  <div my-2 border h-14 bg-blue:50>父元素的兄弟</div>
  <div my-6 bg-green:50 style="display: flow-root">
    <div my-4 border h-14 bg-red:50>子元素</div>
    父元素
  </div>
</section>

可以看的到子元素的外边距和父元素的外边距并没有重叠了。

```css
.parent {
  display: flow-root;
}
```
