---
title: SVG 动画
description: 使用<animate>标签实现SVG动画
date: 2024-04-26
duration: 10分钟
tags: [SVG]
---

[[TOC]]

# 定义动画

使用`<animate>`标签定义动画，使用`href`属性来给元素应用动画。

`<animate>`标签属性介绍：
  - `attributeType`：可以控制动画的类型，值为`css`，`XML`和`auto`，表示使用什么属性进行动画，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/attributeType)
  - `attributeName`：可以控制动画的属性名，值为对应的属性名，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/attributeName)。
  - `begin`：可以控制动画什么时候开始，值可以为时间和事件，以及一些其他的值，有点像css中的`delay`属性，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/begin)。
  - `end`：可以控制动画什么时候结束，值参考`begin`属性，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/end)。
  - `dur`：可以控制动画的持续时间，值为时间，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/dur)。
  - `from`和`to`，以及`by`：分别控制动画的起始值和结束值，以及相对偏移的值，可以理解为经过了多少偏移，详见MDN，[from](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/from)和[to](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/to)，[by](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/by)。
  - `restart`：可以控制动画的重启方式，值为`always`（随时可以重新开始），`whenNotActive`（在动画没有激活时重新开始）和`never`（永远不会重新开始），详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/restart)。
  - `repeatCount`：可以控制动画的重复次数，值为数字（必须大于0）或者`indefinite`（无限循环），详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/repeatCount)。
  - `repeatDur`：可以控制动画的重复持续时间，值为时间，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/repeatDur)。
  - `fill`：控制动画的填充方式，值为`freeze`（等同css动画中的`forwards`）和`remove`（动画结束后移除），详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/fill)。
  - `calcMode`：控制动画的差值方式，值为`discrete`（离散的）、`linear`（线性的）、`paced`（有节奏的）和`spline`（样条曲线的）详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/calcMode)。
  - `values`：可以控制动画的值，值为一组逗号分隔的数字，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/values)。
  - `keyTimes`：可以控制动画的关键帧，值为一组逗号分隔的数字，详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Attribute/keyTimes)。
  - `keySplines`：可以控制动画的关键帧中的样条曲线，值为一组分号分隔的贝赛尔曲线，只有在`calcMode`为`spline`时才有效，详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/keySplines)。
  - `additive`：可以控制的动画效果的是否叠加，值为`replace`（替换），`sum`（累加），详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/additive)。
  - `accumulate`：可以控制单个动画的状态是否累加，值为`none`（不累加），`sum`（累加），详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/accumulate)。

> 更多详见[MDN](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/animate)

## 示例

点击`<rect>`标签，观察动画

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <animate
      href="#animate"
      attributeType="css"
      attributeName="opacity"
      begin="click"
      dur="2s"
      from="0"
      to="1"
      fill="freeze"
      restart="whenNotActive"
    />
    <animate
      href="#animate"
      attributeType="XML"
      attributeName="x"
      begin="click"
      dur="2s"
      from="0"
      to="80"
      fill="freeze"
      restart="whenNotActive"
    />
  </defs>
  <rect id="animate" x="10" y="45" width="10" height="10" fill="currentColor" />
</svg>

```html ml [++{3-26}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
      <!-- 透明动画，开始时透明，结束时不透明，持续2秒，鼠标点击开始 -->
      <animate
        href="#animate"
        attributeType="css"
        attributeName="opacity"
        begin="click"
        dur="2s"
        from="0"
        to="1"
        fill="freeze"
        restart="whenNotActive"
      />
      <!-- x轴移动动画，开始时x轴位置为0，结束时x轴位置为80，持续2秒，鼠标点击开始 -->
      <animate
        href="#animate"
        attributeType="XML"
        attributeName="x"
        begin="click"
        dur="2s"
        from="0"
        to="80"
        fill="freeze"
        restart="whenNotActive"
      />
  </defs>
  <rect id="animate" x="10" y="10" width="10" height="10" />
</svg>
```

# begin属性使用事件触发动画

`begin`属性能使用事件触发动画，可以使用`id.event`来指定在哪个元素的事件触发时执行动画，如果不使用id，默认为元素本身。

> 如果id中带有连字符`-`，则不会生效，因为js中变量不能包含连字符，
即`btn-1.click`不会生效，因为`btn-1`是带有连字符的id。
对于多个单词的id，推荐使用`_`（下划线）分隔。<br/>
> `end`属性也可以，它和`begin`属性类似。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <animate
      href="#animate-event"
      attributeType="XML"
      attributeName="x"
      begin="btn.click"
      dur="2s"
      from="0"
      to="80"
      fill="freeze"
      restart="whenNotActive"
    />
  </defs>
  <rect id="animate-event" x="10" y="45" width="10" height="10" fill="currentColor" />
</svg>
<p class="flex-center">
  <button id="btn" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html ml [$${7}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <animate
      href="#animate-event"
      attributeType="XML"
      attributeName="x"
      begin="btn.click"
      dur="2s"
      from="0"
      to="80"
      fill="freeze"
      restart="whenNotActive"
    />
  </defs>
  <rect id="animate-event" x="10" y="45" width="10" height="10" />
</svg>
<!-- btn -->
<button id="btn">开始动画</button>
```

</details>

# 在某个动画之后执行另一个动画

原理：第一个动画2s后执行，然后绑定在第二个动画执行完毕之后开始，
第二次动画绑定为第一个动画结束之后开始。两个动画都会等另一个结束后才开始。

> 多个动画的开始条件，使用分号分隔。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <animate
      id="w"
      href="#animate-1"
      attributeType="XML"
      attributeName="width"
      begin="btn1.click;h.end"
      dur="2s"
      from="0"
      to="20"
      fill="freeze"
      restart="whenNotActive"
    />
    <animate
      id="h"
      href="#animate-2"
      attributeType="XML"
      attributeName="height"
      begin="w.end"
      dur="2s"
      from="0"
      to="20"
      fill="freeze"
      restart="whenNotActive"
    />
  </defs>
  <rect id="animate-1" x="10" y="10" width="0" height="10" fill="currentColor" />
  <rect id="animate-2" x="10" y="30" width="10" height="0" fill="currentColor" />
</svg>
<p class="flex-center">
  <button id="btn1" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html ml [$${8, 20}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <animate
      id="w"
      href="#animate-1"
      attributeType="XML"
      attributeName="width"
      begin="btn1.click;h.end"
      dur="2s"
      from="0"
      to="20"
      fill="freeze"
      restart="whenNotActive"
    />
    <animate
      id="h"
      href="#animate-2"
      attributeType="XML"
      attributeName="height"
      begin="w.end"
      dur="2s"
      from="0"
      to="20"
      fill="freeze"
      restart="whenNotActive"
    />
  </defs>
  <rect id="animate-1" x="10" y="10" width="0" height="10" />
  <rect id="animate-2" x="10" y="30" width="10" height="0" />
</svg>
<!-- btn -->
<button id="btn1">开始动画</button>
```

</details>

# 内联动画

内联动画是指在元素内部创建动画。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="45" width="10" height="10" fill="currentColor">
    <animate
      attributeType="XML"
      attributeName="x"
      begin="btn_inline.click"
      dur="2s"
      from="0"
      to="80"
      fill="freeze"
      restart="whenNotActive"
    />
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_inline" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html ml [++{3-11}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="45" width="10" height="10">
    <animate
      attributeType="XML"
      attributeName="x"
      dur="2s"
      from="0"
      to="80"
      fill="freeze"
      restart="whenNotActive"
    />
  </rect>
</svg>
<!-- btn -->
<button id="btn_inline">开始动画</button>
```

</details>

# 使用values和keyTimes属性控制动画过程

使用`values`和`keyTimes`属性，可以控制动画的关键帧，对动画进行拆分。
使用了`values`属性，`from`和`to`，以及`by`属性都会失效。

`values`属性设置了动画的每个关键帧位置，`keyTimes`属性设置了每个关键帧的时间比例。

> 如果只设置`values`属性，则时间会均匀分配每一段关键帧。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect id="animate-keyframes" x="10" y="45" width="10" height="10" fill="currentColor">
    <animate
      attributeType="XML"
      attributeName="x"
      begin="btn_keyframes.click"
      dur="2s"
      fill="freeze"
      restart="whenNotActive"
      values="0;80;20;50"
      keyTimes="0;0.1;0.8;1"
    />
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_keyframes" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html ml [++{10-11}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect id="animate-keyframes" x="10" y="45" width="10" height="10">
    <animate
      attributeType="XML"
      attributeName="x"
      begin="btn_keyframes.click"
      dur="2s"
      fill="freeze"
      restart="whenNotActive"
      values="0;80;20;50"
      keyTimes="0;0.1;0.8;1"
    />
  </rect>
</svg>
<!-- btn -->
<button id="btn_keyframes">开始动画</button>
```

</details>

## 使用calcMode设置缓动曲线

使用`calcMode`属性，可以控制动画的差值方式，值为`discrete`（离散的），`linear`（线性的），`paced`（有节奏的）和`spline`（样条曲线的）。

> - `discrete`：不会进行差值，看起来像直接跳到指定位置，就直接按照`values`属性的值进行分配，会丢失关键帧的时间比例。
> - `paced`：会自动平均分配关键帧，会忽略`keyTimes`和`keySplines`。
> - `spline`：会自动平均分配关键帧，需要设置`keyTimes`和`keySplines`，才会有效。

<CalcModeDemo />

<details>
  <summary>代码</summary>

```html ml [++{11-13}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<rect id="animate-keyframes" x="10" y="45" width="10" height="10">
		<animate
			id="calcMode-demo-animate"
			attributeType="XML"
			attributeName="x"
			begin="btn_calcMode.click"
			dur="2s"
			fill="freeze"
			restart="whenNotActive"
			values="0;80;20;50"
			keyTimes="0;0.1;0.8;1"
			keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
		/>
	</rect>
</svg>
<!-- btn -->
<button id="btn_calcMode">开始动画</button>
```

</details>

# 变换动画

使用`<animateTransfrom>`标签，可以实现变换动画。

> 具体可以有哪些变换效果，可以参考[变换](/notes/zh-cn/svg-clip-path#变换)

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect id="animate-transform" x="10" y="10" width="10" height="10" fill="currentColor">
    <animateTransform
      attributeType="XML"
      attributeName="transform"
      begin="btn_transform.click"
      type="translate"
      values="0 0; 70 0; 70 70; 0 70; 0 0"
      dur="2s"
      restart="whenNotActive"
    />
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_transform" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html ml [++{3-10}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect id="animate-transform" x="10" y="10" width="10" height="10">
    <animateTransform
      attributeType="XML"
      attributeName="transform"
      begin="btn_transform.click"
      type="translate"
      values="0 0; 70 0; 70 70; 0 70; 0 0"
      dur="2s"
      restart="whenNotActive"
    />
  </rect>
</svg>
<!-- btn -->
<button id="btn_transform">开始动画</button>
```

</details>

# 使用additive使动画效果叠加

使用`additive`属性，可以控制多个动画效果的是否叠加，值为`replace`（替换，默认），`sum`（累加）。

<AdditiveDemo />

<details>
  <summary>代码</summary>

```html ml [$${26}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<rect x="10" y="10" width="10" height="10">
		<animateTransform
			id="additive_demo_animate_scale"
			attributeType="XML"
			attributeName="transform"
			type="scale"
			begin="btn_additive.click"
			from="1"
			to="2"
			dur="1s"
			fill="freeze"
			restart="whenNotActive"
		/>
		<animateTransform
			id="additive-demo-animate-translate"
			attributeType="XML"
			attributeName="transform"
			type="translate"
			begin="additive_demo_animate_scale.end"
			from="0 0"
			to="20 0"
			dur="1s"
			fill="freeze"
			restart="whenNotActive"
      additive="replace|sum"
		/>
	</rect>
</svg>
<!-- btn -->
<button id="btn_additive">开始动画</button>
```

</details>

# 使用accumulate使动画状态累加

使用`accumulate`属性，可以控制单个动画的状态是否累加，即下次动画的状态从上次动画的结束状态开始，值为`none`（不累加），`sum`（累加）。

> 只有使用`by`属性时效果才明显。

<AccumulateDemo />

<details>
  <summary>代码</summary>

```html ml [$${14}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<rect x="10" y="35" width="30" height="30">
		<animateTransform
			id="accumulate-demo-animate-translate"
			attributeType="XML"
			attributeName="transform"
			type="translate"
			begin="btn_accumulate.click"
			by="25 0"
			dur="1s"
			repeatCount="2"
			fill="freeze"
			restart="whenNotActive"
      accumulate="none|sum"
		/>
	</rect>
</svg>
<!-- btn -->
<button id="btn_accumulate">开始动画</button>
```

</details>

# 运动动画

运动动画就是跟随路径运动的动画，以下例子演示了运动动画。

<AnimateMotionDemo />

可能会有点卡顿，因为这是使用svg制作的，如果使用canvas制作，会更流畅。

## 使用animateMotion元素完成运动动画

`<animateMotion>`标签属性值介绍：
  - `path`: 指定运动路径。
  - `keyPoints`: 指定关键点，用于分段运动，类似`values`。
  - `keyTimes`: 指定每个关键点之间时间比例。
  - `keySplines`: 指定关键点之间的样条曲线。
  - `calcMode`: 指定样条曲线的计算模式。
  - `rotate`: 指定运动时如何旋转角度，值为`auto`(正向)或者`auto-reverse`(反向)，以及具体角度(number)，详见[MDN](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/rotate)。
  - `origin`: 指定运动时的起始点。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M30 50 A 20 20 0, 1, 1, 70 50 A 20 20 0, 1, 1, 30 50" stroke="currentColor" fill="none" />
  <rect fill="currentColor" rx="2" x="-5" y="-5" width="10" height="10">
    <animateMotion
      path="M30 50 A 20 20 0, 1, 1, 70 50 A 20 20 0, 1, 1, 30 50"
      begin="btn_motion.click"
      dur="2s"
      restart="whenNotActive"
      fill="freeze"
      rotate="auto"
    />
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_motion" class="btn">开始动画</button>
</p>

> 使用`rotate`属性，可以控制运动时的旋转角度，这样看起来更自然。

<details>
  <summary>代码</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect rx="2" x="-5" y="-5" width="10" height="10">
    <animateMotion
      path="M30 50 A 20 20 0, 1, 1, 70 50 A 20 20 0, 1, 1, 30 50"
      begin="btn_motion.click"
      dur="2s"
      fill="freeze"
      restart="whenNotActive"
      rotate="auto"
    />
  </rect>
</svg>
<!-- btn -->
<button id="btn_motion">开始动画</button>
```

</details>

## 使用mpath元素完成运动动画

使用`<mpath>`标签，可以引用svg中的`<path>`标签，完成运动动画。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path id="mpath" d="M0 0 C 50 13 70 70 100 100" stroke="currentColor" fill="none" />
  <rect fill="currentColor" rx="2" x="-5" y="-5" width="10" height="10">
    <animateMotion
      begin="btn_mpath.click"
      dur="2s"
      restart="whenNotActive"
      rotate="auto"
    >
      <mpath href="#mpath" />
    </animateMotion>
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_mpath" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect rx="2" x="-5" y="-5" width="10" height="10">
    <animateMotion
      begin="btn_mpath.click"
      dur="2s"
      fill="freeze"
      restart="whenNotActive"
      rotate="auto"
    >
      <mpath href="#mpath" />
    </animateMotion>
  </rect>
</svg>
<!-- btn -->
<button id="btn_mpath">开始动画</button>
```

</details>

## set标签

`<set>`标签可以用来设定一个属性值，并为该值赋予一个持续时间。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect fill="currentColor" rx="2" x="10" y="10" width="10" height="10">
    <set
      id="set_x"
      attributeName="x"
      to="50"
      begin="btn_set.click"
      dur="2s"
    />
    <set
      attributeName="y"
      to="50"
      begin="set_x.end"
      dur="2s"
    />
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_set" class="btn">开始set</button>
</p>

<details>
  <summary>代码</summary>

```html ml [++{3-14}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect rx="2" x="10" y="10" width="10" height="10">
    <set
      attributeName="x"
      to="50"
      begin="btn_set.click"
      dur="2s"
    />
    <set
      attributeName="y"
      to="50"
      begin="set_x.end"
      dur="2s"
    />
  </rect>
</svg>
<!-- btn -->
<button id="btn_set">开始set</button>
```

</details>

## 分段路径动画

使用`keyPoints`和`keyTimes`属性，可以分段完成动画。

`keyPoints="0;0.25;0.5;0.75;1"`，定义了动画过程中的5个关键点，
分别是0（动画过程开始的时候）、0.25、0.5（动画过程的一半）、0.75、1（动画过程结尾）。

`keyTimes="0;0.15;0.5;0.65;1"`，定义了关键点在动画的时间线中的位置，
分别是时间线的0（动画开始的时候）、0.15、0.5（动画进行到一半）、0.65、1（动画结束的时候）。

> 还可以使用`calcMode`属性配和`keySplines`属性，来控制每段的缓动方式。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path id="square" d="M10 10 H90 V90 H10 Z" stroke="currentColor" stroke-linejoin="round" fill="none" />
  <rect fill="currentColor" rx="2" x="-5" y="-5" width="10" height="10">
    <animateMotion
      begin="btn_key.click"
      dur="2s"
      keyPoints="0;0.25;0.5;0.75;1"
      keyTimes="0;0.15;0.5;0.65;1"
      restart="whenNotActive"
      rotate="auto"
      fill="freeze"
    >
      <mpath href="#square" />
    </animateMotion>
  </rect>
</svg>
<p class="flex-center">
  <button id="btn_key" class="btn">开始动画</button>
</p>

<details>
  <summary>代码</summary>

```html ml [$${6-7}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect rx="2" x="-5" y="-5" width="10" height="10">
    <animateMotion
      begin="btn_key.click"
      dur="2s"
      keyPoints="0;0.25;0.5;0.75;1"
      keyTimes="0;0.15;0.5;0.65;1"
      restart="whenNotActive"
      rotate="auto"
      fill="freeze"
    >
      <mpath href="#square" />
    </animateMotion>
  </rect>
</svg>
<!-- btn -->
<button id="btn_key">开始动画</button>
```

</details>
