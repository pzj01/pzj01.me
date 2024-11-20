---
title: SVG之stroke属性
description: 了解SVG的描边和线条相关属性
duration: 10分钟
date: 2024-04-08
tags: [SVG]
---

[[TOC]]

> 以下属性也可以通过css设置。

## stroke属性

`stroke`属性是用于定义线条的颜色。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" stroke="#F44336" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" stroke="#F44336" />
</svg>
```

> stroke系列的属性也适用于描边线条。

## stroke-width属性

`stroke-width`属性用于定义线条的宽度。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" stroke="#F44336" stroke-width="0.5" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" stroke="#F44336" stroke-width="0.5" />
</svg>
```

## stroke-opacity属性

`stroke-opacity`属性定义了线条的透明度。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" stroke="#F44336" stroke-opacity="0.5" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="5" y1="12" x2="19" y2="12" stroke="#F44336" stroke-opacity="0.5" />
</svg>
```

## stroke-linecap属性

`stroke-linecap`属性定义了线条的端点样式。

属性值：
  - `butt`（默认）：直角
  - `round`：圆角
  - `square`：方形
  - `inherit`：继承

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <line x1="6" y1="6" x2="18" y2="6" stroke="#F44336" />
    <line x1="6" y1="12" x2="18" y2="12" stroke="#F44336" stroke-linecap="square" />
    <line x1="6" y1="18" x2="18" y2="18" stroke="#F44336" stroke-linecap="round" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <line x1="6" y1="6" x2="18" y2="6" stroke="#F44336" stroke-linecap="butt" />
    <line x1="6" y1="12" x2="18" y2="12" stroke="#F44336" stroke-linecap="square" />
    <line x1="6" y1="18" x2="18" y2="18" stroke="#F44336" stroke-linecap="round" />
</svg>
```

## stroke-linejoin属性

`stroke-linejoin`属性定义了线条的拐角样式，
这个如果使用在没有拐角的地方，将会被忽略，比如**line标签**。

只在以下标签中生效：
  - *\<path>*
  - *\<polygon>*
  - *\<polyline>*
  - *\<rect>*
  - *\<text>*
  - *\<textPath>*
  - *\<tref>*
  - *\<tspan>*

属性值：
  - `miter`（默认）：斜角。
  - `miter-clip`：斜角剪裁，不推荐。
  - `arcs`：弧形，不推荐。
  - `round`：圆角。
  - `bevel`：斜角。
  - `inherit`：继承。

> 注：miter-clip和arcs尚未被广泛支持，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/stroke-linejoin)。

<div class="grid grid-cols-2 gap-2 sm:gap-4">
  <div v-for="value of ['miter', 'miter-clip', 'arcs', 'round', 'bevel']">
    <h4 text-center>{{value}}</h4>
    <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" :stroke-linejoin="value" transform="scale(4)" transform-origin="25% 40%" />
    </svg>
  </div>
</div>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" stroke-linejoin="miter" />
  <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" stroke-linejoin="miter-clip" />
  <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" stroke-linejoin="arcs" />
  <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" stroke-linejoin="round" />
  <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" stroke-linejoin="bevel" />
</svg>
```

## stroke-miterlimit属性

`stroke-miterlimit`属性定义了线条的最大斜接长度。当stroke-linejoin属性设置为`miter`时，该属性才起作用。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polyline points="50 10, 30 45, 70 45, 50 90" stroke="#F44336" fill="none" stroke-width="4" stroke-linejoin="miter" stroke-miterlimit="1" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <polyline
    points="50 10, 30 45, 70 45, 50 90"
    stroke="#F44336" fill="none" stroke-width="4"
    stroke-linejoin="miter"
    stroke-miterlimit="1"
  />
</svg>
```

## stroke-dasharray属性

`stroke-dasharray`属性定义了虚线的间隔，这个在制作SVG动画中非常有用。
值为虚线长度和间隔长度的数组，如果元素个数为奇数，将会复制一份补齐为偶数，
例如\[1]，变为\[1，1]。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="4" y1="12" x2="19" y2="12" stroke="#F44336" stroke-dasharray="2,1" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="4" y1="12" x2="19" y2="12" stroke="#F44336" stroke-dasharray="2,1" />
</svg>
```

## stroke-dashoffset属性

`stroke-dashoffset`属性定义了虚线的偏移量，偏移方向为向右偏移，
如果需要向左偏移，将该属性设置为负值。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="4" y1="12" x2="19" y2="12" stroke="#F44336" stroke-dasharray="2,1" stroke-dashoffset="2" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <line x1="4" y1="12" x2="19" y2="12" stroke="#F44336" stroke-dasharray="2,1" stroke-dashoffset="2" />
</svg>
```
