---
title: SVG之fill属性
description: 了解SVG的填充属性
duration: 5分钟
date: 2024-04-08
tags: [SVG]
---

[[TOC]]

# 什么是fill属性？

`fill`属性是SVG中用来指定填充颜色的属性。它可以用来指定矩形，圆形，多边形，路径，文本等等。

# fill属性

 `fill`表示填充颜色，`currentColor`表示使用当前的颜色。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="50" height="50" fill="#4f46e5" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="50" height="50" fill="#4f46e5" />
</svg>
```

> 可以使用css中`fill`属性指定。

# fill-opacity属性

`fill-opacity`表示填充颜色的透明度，`0`表示完全透明，`1`表示完全不透明。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="50" height="50" fill="#4f46e5" fill-opacity="0.5" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="50" height="50" fill="#4f46e5" fill-opacity="0.5" />
</svg>
```

> 可以使用css中的`fill-opacity`属性指定。

# fill-rule属性

这个属性可以用来指定填充规则，即如何判断在一片区域是属于内部还是外部，它只对以下元素生效：
  - *\<path>*
  - *\<polygon>*
  - *\<polyline>*
  - *\<text>*
  - *\<textPath>*
  - *\<tref>*
  - *\<tspan>*

属性值：
  - `nonzero`（默认值）：表示如果绘制路径为顺时针（从左到右）则+1，如果为逆时针（从右到左）则-1，如果结果为0则属于外部，如果结果不为0则属于内部。
  - `evenodd`：表示绘制的顺序是奇数为内部，偶数为外部，从1开始。

## nonzero

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      class="fill-primary"
      d="M20 20, H60, V60, H20, M30 30, V50, H50, V30"
      fill="#4f46e5" fill-rule="nonzero"
    />
    <g>
      <text fill="#837DF5" x="26" y="18" font-size="1">外部的路径使用顺时针(+1)</text>
      <text fill="#837DF5" x="36" y="36" font-size="1">内部的路径使用逆时针(-1)</text>
      <text fill="#837DF5" x="2" y="65" font-size="1">最终判断为 +1-1 = 0 ，所以里面的路径填充属于外部</text>
      <symbol viewBox="0 0 32 32" id="carbon-rotate-clockwise-filled">
        <path fill="#4f46e5" d="M28 30H16a2.002 2.002 0 0 1-2-2V16a2.002 2.002 0 0 1 2-2h12a2.002 2.002 0 0 1 2 2v12a2.002 2.002 0 0 1-2 2M15 2l-1.41 1.41L16.17 6H11a7.008 7.008 0 0 0-7 7v5h2v-5a5.006 5.006 0 0 1 5-5h5.17l-2.58 2.59L15 12l5-5z" />
      </symbol>
      <symbol viewBox="0 0 32 32" id="carbon-rotate-counterclockwise-filled">
        <path fill="#4f46e5" d="M2 28V16a2.002 2.002 0 0 1 2-2h12a2.002 2.002 0 0 1 2 2v12a2.002 2.002 0 0 1-2 2H4a2.002 2.002 0 0 1-2-2M17 2l1.41 1.41L15.83 6H21a7.008 7.008 0 0 1 7 7v5h-2v-5a5.006 5.006 0 0 0-5-5h-5.17l2.58 2.59L17 12l-5-5z" />
      </symbol>
      <use x="20" y="12" width="6" height="6" xlink:href="#carbon-rotate-clockwise-filled" />
      <use x="30" y="30" width="6" height="6" xlink:href="#carbon-rotate-counterclockwise-filled" />
    </g>
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path
    d="M20 20, H60, V60, H20, M30 30, V50, H50, V30"
    fill="#4f46e5" fill-rule="nonzero"
  />
</svg>
```

## evenodd

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      d="M20 20, H60, V60, H20, M30 30, V50, H50, V30, M35 35, H45, V45, H35"
      fill="#4f46e5" fill-rule="evenodd"
    />
    <g slot="tooltip">
      <text fill="#837DF5" x="26" y="28" font-size="1">1，在填充范围内</text>
      <text fill="#837DF5" x="36" y="34" font-size="1">2，在填充范围外</text>
      <text fill="#837DF5" x="38.5" y="38.5" font-size="1">3，填充范围内</text>
    </g>
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path
    d="M20 20, H60, V60, H20, M30 30, V50, H50, V30, M35 35, H45, V45, H35"
    fill="#4f46e5" fill-rule="evenodd"
  />
</svg>
```

[MDN参考](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill-rule)
