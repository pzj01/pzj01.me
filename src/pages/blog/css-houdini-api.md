---
title: CSS Houdini API
description: 了解 CSS Houdini API
date: 2024-12-14T11:14:00
duration: 10min
tags: [CSS]
---

[[TOC]]

Houdini API 是一组底层的 API，它是由浏览器暴露出来的，它公开了CSS引擎的一些功能，使开发人员可以访问 CSSOM（CSS Object Model），它可以**用于增强 CSS 动画和样式能力**，并且当样式改变时 Houdini 相比 JavaScript `HTMLElement.style` 的方式能够更快的解析。{{frontmatter.a}}

# Houdini API 的核心功能

- 自定义 CSS 样式：使用 CSS Typed Object Model (Typed OM)，开发者可以以编程方式操作 CSS 样式，避免传统字符串操作的繁琐。
- 扩展 CSS 解析：借助 CSS Properties and Values API，开发者可以定义自定义 CSS 属性及其类型和默认值。
- 控制布局和绘制：Houdini 提供了 Paint API、Layout API 和 Animation Worklet API，开发者可以插入自己的逻辑来参与 DOM 的绘制、布局甚至动画，Chrome 官方的 [Houdini 示例](https://googlechromelabs.github.io/houdini-samples)。

# CSS Typed Object Model (Typed OM)

<FeatureCheck api="CSS Typed OM" feature="attributeStyleMap" targetPath="document.body" />

使用 CSSOM 将 CSS 属性和值映射为更易于操作的 JavaScript 对象，而且性能更佳。

<CSSOM />

```ts twoslash
const box = document.createElement('.box')
// 当前设置的样式会经过计算才会形成最终的样式
const styleMap = box.attributeStyleMap

// 设置样式
styleMap.set('text-align', 'center')
styleMap.set('margin', '16px auto')
styleMap.set('background-color', 'rgba(74, 222, 128, 0.5)')
styleMap.set('width', CSS.percent(50))
styleMap.set('height', CSS.rem(4))
styleMap.set('line-height', CSS.rem(4))
styleMap.set('border-radius', '10px')

// 获取最终的计算样式（只读）
const computedStyleMap = box.computedStyleMap()

for (const [key, value] of computedStyleMap) {
  console.log(key, value)
}
```

#  CSS Properties and Values API

<FeatureCheck api="CSS Properties and Values API" feature="registerProperty" targetPath="CSS" />

这个API允许开发者自定义CSS属性，以及设置该属性的默认值、值类型、以及属性是否可以继承，而且它由两种使用方式。

- 使用 `@property` 进行定义：
    - syntax：表示属性的类型
    - inherits：表示属性是否可以继承
    - initial-value：表示初始值

`syntax` 书写的格式必须按照以下其中一个。

```go
syntax: "<color>"; /* 接收一个颜色值 */
syntax: "<length> | <percentage>"; /* 接收长度或百分比参数，但是二者之间不进行计算合并 */
syntax: "small | medium | large"; /* 接收这些参数值之一作为自定义标识符 */
syntax: "*"; /* 任何有效字符 */
```

`syntax` 取值类型必须使用以下格式：
  - `<length>`：表示长度值，比如 `10px`。
  - `<percentage>`：表示百分比值，比如 `50%`。
  - `<color>`：表示颜色值，比如 `#277041`、`rgb(255, 0, 255)`、`hsl(0, 100%, 50%)`。
  - `<number>`：表示数字，比如 `3.14`。
  - `<length-percentage>`：表示长度或百分比值，比如 `10px` 或 `50%`。
  - `<image>`：表示图片，比如 `gradient(to right, red, blue)`。
  - `<url>`：表示 URL，比如 `url('https://example.com/image.png')`。
  - `<integer>`：表示整数，比如 `42`。
  - `<angle>`：表示角度，比如 `45deg`。
  - `<time>`：表示时间，比如 `1s`。
  - `<resolution>`：表示分辨率，比如 `1dppx`。
  - `<transform-function>`：表示变换函数，比如 `scale(1.5)`.
  - `<custom-ident>`：表示自定义标识符，比如 `small`、`medium`、`large`。
  - `<transform-list>`：表示变换列表，比如 `scale(1.5) rotate(45deg)`。
  - `*`：表示任何有效字符。

> 更多类型请查看[syntax 类型](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@property/syntax)

<CSSPropertiesAndValuesAPI stage="css" />

```css
/* 声明一个自定义属性 */
@property --pzj01 {
  syntax: "<color>";
  inherits: false;
  initial-value: #277041;
}

.el {
  background-color: var(--pzj01); /* 使用自定义属性 */
}
```

- 使用 `CSS.registerProperty()` 进行定义：

<CSSPropertiesAndValuesAPI stage="js" />

```ts twoslash
// 声明一个自定义属性，之后就可以使用了
CSS.registerProperty({
  name: '--pzj01',
  syntax: '<color>',
  inherits: false,
  initialValue: '#277041',
})
```

## 应用场景

正常情况下我们的渐变背景是无法应用动画的，但是现在可以使用CSS自定义属性来实现渐变动画。

<CSSPropertiesAndValuesAPI stage="gradient animation" />

```css
@property --gradient {
  syntax: "<color>";
  inherits: false;
  initial-value: #4D9375;
}

.g {
  background-image: linear-gradient(to right, #fff, var(--gradient));
  transition: --gradient 1s ease-in-out; /* 设置过渡效果 */
}

.g:hover {
  --gradient: red;
}
```

# Worklet

Worklet 是一种轻量级的 Worker，它允许开发者在浏览器的渲染线程以外的单独线程中执行任务。这种设计使得 Web 应用可以更加高效地进行复杂的任务处理，如动画、绘图等，而不会阻塞主线程，从而提高性能和用户体验。

- Paint Worklet：用于绘制自定义的 CSS 背景或前景，允许开发者创建自定义的样式和背景效果。
- Animation Worklet：允许在浏览器渲染中执行高效的动画计算。
- Layout Worklet：用来执行自定义布局计算，特别是在需要扩展 CSS 布局功能时。
- Audio Worklet：用于在音频处理方面提供低延迟、高效的音频处理功能。

接口如下：

```ts
interface Worklet {
  addModule: (url: string) => Promise<void>
}
```

> [!NOTE]
> 为什么需要 Worklet？<br/>
> 传统的 JavaScript 代码通常在主线程中运行，而浏览器的渲染操作（比如绘制页面内容）也会依赖于这个主线程。如果 JavaScript 中的任务比较繁重，或者涉及到复杂的动画和绘图，可能会导致 UI 卡顿、页面响应变慢或延迟。Worklet 通过将一些任务分配到独立的线程中运行，能够避免主线程被阻塞，从而提升页面的性能和流畅度。

## Worklet 运行环境

与传统的 Web Worker 不同，Worklet 不是完全独立的 JavaScript 线程。每种类型的 Worklet 都有其独立的上下文和 API，并且只能运行在 `https` 和 `localhost` 上。这里只介绍 Houdini Worklet，它们负责在渲染过程中执行不同的任务。

- paint(绘制阶段) → Paint Worklet
- layout(布局阶段) → Layout Worklet
- composite(合成阶段) → Animation Worklet

## Paint API

<FeatureCheck api="Paint API" feature="paintWorklet" targetPath="CSS" />

它允许开发人员编写可以直接绘制的 JavaScript 函数，用于绘制元素的背景、边框、或者内容，绘制方式和canvas一样。

> [!WARNING]
> Paint API 到目前为止只有 Chrome 和 Edge 支持。

1. 添加绘制 worklet 模块：

```js
// main.js
// 检查是否支持 Paint API
if ('paintWorklet' in CSS) {
  CSS.paintWorklet.addModule('paint.worklet.js')
}
```

2. 编写 worklet 绘制脚本：

```js
// paint.worklet.js
/**
 * registerPaint 参数介绍
 * @param name {string} - worklet 的名称
 * @param workletClassRef {object} - worklet 执行的类
 */
globalThis.registerPaint('bezier', class {
  // 上下文选项
  static contextOptions = { alpha: true }

  // 获取输入CSS属性
  static inputProperties = ['--line-color', '--line-width']

  // 绘制方法，在首次绘制时被调用
  paint(ctx, size, properties) {
    const lineColor = properties.get('--line-color').toString() || 'rgba(255, 0, 0, 1)'
    const lineWidth = Number.parseFloat(properties.get('--line-width').toString() || 2)

    // 设置线条样式
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.clearRect(0, 0, size.width, size.height) // 清空背景

    const randomPoint = () => ({
      x: Math.random() * size.width,
      y: Math.random() * size.height,
    })

    const cp1 = randomPoint()
    const cp2 = randomPoint()

    // 使用二次贝塞尔曲线绘制
    ctx.beginPath()
    ctx.moveTo(0, size.height)
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, size.width, 0)
    ctx.stroke()
  }
})
```

3. 使用 `paint()` CSS函数，完成绘制：

```css
.box {
  --line-color: #3094FFFF;
  --line-width: 4;
  background-image: paint(bezier);
}
```

4. 最终的效果：

<PaintAPI />

如果想要动态的绘制，可以使用JS修改CSS变量实现动画效果。

## Layout API

<FeatureCheck api="Layout API" feature="layoutWorklet" targetPath="CSS" />

它用于自定义布局逻辑，可以实现浏览器没有的布局。现在浏览器支持的布局：

- Block Flow Layout(块流布局)
- Flexbox Layout(弹性盒布局)
- Grid Layout(网格布局)

> [!WARNING]
> Layout API 还没有正式开放使用，到目前为止还在实验阶段。
> 如果想使用 Layout API，可以下载 Chrome 的 Canary 版本，如果你的浏览器的渲染引擎是 Blink，可以在网址栏中输入 `chrome://flags/#enable-experimental-web-platform-features`，启用Web平台实验性功能，然后重启浏览器。

使用方式和 Paint API 一样，实现一个随机布局，代码如下：

```js
// main.js
// 检查是否支持 Layout API
if ('layoutWorklet' in CSS) {
  CSS.layoutWorklet.addModule('layout.worklet.js')
}
```

```js
// layout.worklet.js
globalThis.registerLayout('random', class {
  // 布局选项
  static layoutOptions = {
    childDisplay: 'normal', // 布局子元素的显示方式
    sizing: 'block-like', // 布局子元素的尺寸
  }

  // 输入CSS属性
  static inputProperties = []
  // 获取子元素的尺寸方法，必须实现，但是可以不写
  async intrinsicSizes(children, edges, styleMap) {}

  /**
   * 布局方法，返回子元素的布局信息，参数信息如下：
   * @param children {LayoutChild[]} - 子元素
   * @param edges {LayoutEdges} - 父元素的边距
   * @param constraints {LayoutConstraints} - 父元素的约束
   * @param styleMap {StylePropertyMapReadOnly} - 父元素的样式
   * @param breakToken {object} - 父元素的断点
   */
  async layout(children, edges, constraints, styleMap, breakToken) {
    // 获取子元素的内容尺寸
    const childrenSizes = await Promise.all(children.map(child => child.intrinsicSizes()))
    const availableSize = {
      availableInlineSize: constraints.fixedInlineSize - edges.inline,
      availableBlockSize: constraints.fixedBlockSize - edges.block,
    }

    // 获取子元素布局片段
    const childFragments = await Promise.all(children.map(child => child.layoutNextFragment(availableSize)))

    const random = (min, max) => Math.floor((Math.random() * (max - min) + 1) + min)

    childFragments.forEach((child, i) => {
      const x = random(0, availableSize.availableInlineSize)
      const y = random(0, availableSize.availableBlockSize)
      const minContentSize = childrenSizes[i].minContentSize
      // 超出布局区域的子元素进行偏移
      child.inlineOffset = x > availableSize.availableInlineSize ? x - child.inlineSize - minContentSize : x
      child.blockOffset = y > availableSize.availableBlockSize ? y - child.blockSize - minContentSize : y
    })

    // 返回子元素布局片段
    return {
      childFragments,
    }
  }
})
```

```css
.box {
  display: layout(random);
}
```

<LayoutAPI />

详细了解请看[CSS Layout API](https://github.com/w3c/css-houdini-drafts/blob/main/css-layout-api/README_old.md)。另外感谢 {@zhangxinxu}，他的这篇博客给我提供了很多帮助[研究了下Houdini中的CSS Layout API](https://www.zhangxinxu.com/wordpress/?p=9572)，感兴趣的可以看看。

## Animation Worklet

<FeatureCheck api="Animation Worklet" feature="animationWorklet" targetPath="CSS" />

它提供了 Web 动画的可扩展性，并在 Web 上实现了高性能的程序动画，而且不会阻塞主线程。

> 目前该功能正在开发中，开发进度可以查看[status](https://github.com/w3c/css-houdini-drafts/blob/main/css-animation-worklet-1/status.md)，如果想体验还可以使用[polyfill](https://googlechromelabs.github.io/houdini-samples/animation-worklet/anim-worklet.js)。

```ts
// main.js
// 检查是否支持 Animation Worklet
if ('animationWorklet' in CSS) {
  CSS.animationWorklet.addModule('animator.worklet.js')
}
```

创建 Animator：

```js
// animator.worklet.js
registerAnimator('spring', class SpringAnimator extends StatelessAnimator {
  constructor(options = { k: 1, ratio: 0.5 }) {
    super()
    this.timing = createSpring(options.k, options.ratio)
  }

  animate(currentTime, effect) {
    let delta = this.timing(currentTime)
    // scale this by target duration
    delta = delta * (effect.getTimings().duration / 2)
    effect.localTime = delta
    // TODO: Provide a method for animate to mark animation as finished once
    // spring simulation is complete, e.g., this.finish()
    // See issue https://github.com/w3c/css-houdini-drafts/issues/808
  }
})

function createSpring(springConstant, ratio) {
  // Normalize mass and distance to 1 and assume a reasonable init velocit
  // but these can also become options to this animator.
  const velocity = 0.2
  const mass = 1
  const distance = 1

  // Keep ratio < 1 to ensure it is under-damped.
  ratio = Math.min(ratio, 1 - 1e-5)

  const damping = ratio * 2.0 * Math.sqrt(springConstant)
  const w = Math.sqrt(4.0 * springConstant - damping * damping) / (2.0 * mass)
  const r = -(damping / 2.0)
  const c1 = distance
  const c2 = (velocity - r * distance) / w

  // return a value in [0..distance]
  return function springTiming(timeMs) {
    const time = timeMs / 1000 // in seconds
    const result = Math.E ** (r * time)
      * (c1 * Math.cos(w * time) + c2 * Math.sin(w * time))
    return distance - result
  }
}
```

创建动画效果：

```js
// 创建关键帧
const effect = new KeyframeEffect(
  targetEl,
  {
    transform: ['translateX(0)', 'translateX(50vw)']
  },
  {
    duration: 1000
  }
)

// 创建动画
const animation = new WorkletAnimation('spring', effect, document.timeline, { k: 2, ratio: 0.7 })

// 开始动画
animation.play()
```
