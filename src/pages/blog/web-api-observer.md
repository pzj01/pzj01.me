---
title: Web API —— Observer(观察者)
description: 了解 IntersectionObserver、 MutationObserver 和 ResizeObserver API。
date: 2024-09-08T09:28:00
duration: 10min
tags: [Web API]
---

Observer API 是一种观察者模式，允许你监听元素的变化，并在变化时执行一些操作。

# IntersectionObserver(交叉观察者)

IntersectionObserver 是一个用于检测元素是否可见（进入或离开视口）的 JavaScript API。它能有效地**观察目标元素与其父元素或视口的交叉状态**，当交叉状态发生变化时触发回调函数。这使得它特别适用于懒加载图片、无限滚动、统计页面元素的可见性等场景。

## 基本用法

这个API接收一个回调函数和一个选项，当目标元素进入或离开交叉区域时，会触发回调函数，回调函数接收两个参数：
  - `entries`：目标元素的交叉区域信息的数组。
  - `observer`：被调用的观察者实例。

交叉区域信息是一个`IntersectionObserverEntry`对象，它包含以下属性：
  - `target`：目标元素。
  - `isIntersecting`：目标元素是否在交叉区域内。
  - `intersectionRatio`：目标元素与交叉区域的交叉比例。
  - `boundingClientRect`：目标元素的边界矩形。
  - `intersectionRect`：目标元素与根元素的交叉区域。
  - `rootBounds`：根元素的边界矩形。
  - `time`： 交叉区域发生变化的时间。

<IntersectionObserver />

```ts twoslash
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show')
    }
    else {
      entry.target.classList.remove('show')
    }
  })
}, {
  root: document, // 祖先元素
  rootMargin: '0px', // 交叉区域的边距，值和 CSS margin 相同
  threshold: 0.5 // 交叉区域的比例 0-1, 0表示完全不在交叉区域，1表示完全在交叉区域
})

const targetEl = document.querySelector('.target') as HTMLElement

// 监听目标元素
observer.observe(targetEl)

// 取消监听
observer.unobserve(targetEl)

// 清除所有监听
observer.disconnect()

// 手动同步获取交叉区域信息（不会触发回调），但是会清空之前的交叉区域信息队列
observer.takeRecords()
```

# MutationObserver(变更观察者)

MutationObserver 是一个用于监听 DOM 变化的 API，能够检测 DOM 树的更改，例如元素的属性、子元素或文本内容发生变化时触发回调函数。它适用于场景需要实时监控 DOM 的变化，且性能优于传统的 MutationEvent 事件。

## 基本用法

它的用法和 IntersectionObserver 类似，只接收一个回调函数，回调函数接收两个参数：
  - `mutations`：目标元素的变更信息的数组。
  - `observer`：被调用的观察者实例。

mutations 中的每个都是元素一个`MutationRecord`对象，它包含以下属性：
  - `target`：目标元素。
  - `type`：变更类型， 有 `attributes`（属性变更）、`childList`（子节点树变更） 和 `characterData`（节点变更） 三种。
  - `addedNodes`：新增的节点。
  - `removedNodes`：被删除的节点。
  - `previousSibling`：前一个兄弟节点。
  - `nextSibling`：后一个兄弟节点。
  - `attributeName`：变更的属性名。
  - `attributeNamespace`：变更的属性名空间。
  - `oldValue`：变更前的属性值。

<MutationObserver />

```ts twoslash
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    console.log(mutation.type)
  })
})

const targetEl = document.querySelector('.target') as HTMLElement

// 监听目标元素
observer.observe(targetEl, {
  subtree: true, // 监听子树变更
  attributes: true, // 监听属性变更
  attributeFilter: ['class', 'id'], // 指定监听的属性，默认为所有的属性
  attributeOldValue: true, // 记录属性变更的旧值
  childList: true, // 监听子节点变更
  characterData: true, // 监听字符变更
  characterDataOldValue: true // 记录字符变更的旧值
})

// 清除所有监听
observer.disconnect()

// 手动同步获取变更信息（不会触发回调）和清空之前的变更信息队列
observer.takeRecords()
```

# ResizeObserver(尺寸观察者)

ResizeObserver 是一种浏览器提供的 API，用于监听元素的尺寸变化。当元素的大小（宽度或高度）发生变化时，ResizeObserver 会触发回调，允许开发者动态地处理这些变化。

## 基本用法

参数和`MutationObserver`一样，只接收一个回调函数，回调函数接收一个参数：
  - `entries`：目标元素的变更信息的数组。
  - `observer`：被调用的观察者实例。

entries中的元素为`ResizeObserverEntry`对象，它包含以下属性：
  - `target`：目标元素。
  - `borderBoxSize`：目标元素的边框盒尺寸数组。
    - `inlineSize`：目标元素的水平尺寸。
    - `blockSize`：目标元素的垂直尺寸。
  - `contentBoxSize`：目标元素的内容盒尺寸数组。
  - `devicePixelContentBoxSize`：目标元素的内容盒尺寸（以设备像素为单位）。
  - `contentRect`：目标元素的内容区域。

<ResizeObserver />

```ts twoslash
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry.target)
  })
})

const targetEl = document.querySelector('.target') as HTMLElement

// 监听目标元素
observer.observe(targetEl, {
  box: 'border-box', // 需要监听的盒模型，值为 'content-box'(默认) ｜ 'border-box' | 'device-pixel-content-box'
})

// 取消监听
observer.unobserve(targetEl)

// 清除所有监听
observer.disconnect()
```
