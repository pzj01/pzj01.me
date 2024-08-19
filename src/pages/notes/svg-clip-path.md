---
title: 在SVG使用裁剪路径
description: 使用clip-path属性进行裁剪
date: 2024-04-17
duration: 5分钟
tags: [SVG]
---

## 定义裁剪区域

使用clipPath标签定义裁剪区域，该标签内部的图形会被保留，其他的图形会被裁剪掉。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="my-clip">
      <polyline points="50 10, 30 45, 70 45, 50 90" />
    </clipPath>
  </defs>
    <rect class="fill-primary" x="25" y="25" width="50" height="50" fill="currentColor" clip-path="url(#my-clip)" />
    <rect slot="tooltip" class="stroke-accent" stroke-dasharray="2" stroke-width="0.5" fill="none" x="25" y="25" width="50" height="50" />
</svg>

虚线表示原来的图形，红线表示裁剪路径。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="my-clip">
      <polyline points="50 10, 30 45, 70 45, 50 90" />
    </clipPath>
  </defs>
  <rect
    x="25" y="25" width="50" height="50" fill="currentColor"
    clip-path="url(#my-clip)"
  />
</svg>
```

## clipPathUnits

`clipPathUnits`属性定义了**clipPath**的坐标系，可以参考[gradientUnits](/notes/zh-cn/svg-gradient#gradientunits%E5%B1%9E%E6%80%A7)，
唯一的区别就是它的默认值为`userSpaceOnUse`。

## 变换

`transform`属性如果应用在图形上，会对图形和裁剪区域进行变换，
如果只想对裁剪区域进行变换，需要将`transform`属性设置在**clipPath**标签上。

### 将裁剪区域变换

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="transform-clip" transform="rotate(45, 50, 50)" >
      <rect x="25" y="25" width="50" height="50" rx="5" />
    </clipPath>
  </defs>
  <image
    href="/images/wallpaper.png" x="0" y="0" width="100" height="100"
    preserveAspectRatio="xMidYMid slice"
    clip-path="url(#transform-clip)"
  />
</svg>

```html /transform="rotate(45, 50, 50)"/
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="transform-clip" transform="rotate(45, 50, 50)" >
      <rect x="25" y="25" width="50" height="50" rx="5" />
    </clipPath>
  </defs>
  <image
    href="/images/wallpaper.png" x="0" y="0" width="100" height="100"
    preserveAspectRatio="xMidYMid slice"
    clip-path="url(#transform-clip)"
  />
</svg>
```

> `transform="rotate(45, 50, 50)"`，
> 后两个参数定义了变换的中心点和`transfrom-origin`属性一样。

### 裁剪区域和图形一起变换

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="clip">
      <rect x="25" y="25" width="50" height="50" rx="5" />
    </clipPath>
  </defs>
  <image
    href="/images/wallpaper.png" x="0" y="0" width="100" height="100"
    preserveAspectRatio="xMidYMid slice"
    clip-path="url(#clip)"
    transform="rotate(45, 50, 50)"
  />
</svg>

<details>
<summary>代码</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <clipPath id="clip">
      <rect x="25" y="25" width="50" height="50" rx="5" />
    </clipPath>
  </defs>
  <image
    href="/images/wallpaper.png" x="0" y="0" width="100" height="100"
    preserveAspectRatio="xMidYMid slice"
    clip-path="url(#clip)"
    transform="rotate(45, 50, 50)"
  />
</svg>
```

</details>

## 裁剪文本

- text-anchor： 用于调整文本锚点的位置。
- dominant-baseline： 用于调整文本基线的位置。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g1" x="0%" y="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a8ff78" />
      <stop offset="100%" stop-color="#78ffd6" />
    </linearGradient>
    <clipPath id="text-clip">
      <text
        x="50" y="50" text-decoration="underline"
        font-size="10" font-family="mono"
        font-weight="bold" text-anchor="middle"
        dominant-baseline="middle" font-style="italic"
      >SVG</text>
    </clipPath>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#g1)" clip-path="url(#text-clip)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g1" x="0%" y="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#a8ff78" />
      <stop offset="100%" stop-color="#78ffd6" />
    </linearGradient>
    <clipPath id="text-clip">
      <text
        x="50" y="50" text-decoration="underline"
        font-size="30" font-family="mono"
        font-weight="bold" text-anchor="middle"
        dominant-baseline="middle" font-style="italic"
      >
        SVG
      </text>
    </clipPath>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#g1)" clip-path="url(#text-clip)" />
</svg>
```
