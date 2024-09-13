---
title: SVG Path标签
description: 在SVG中绘制路径
date: 2024-03-13
duration: 20分钟
tags: [SVG]
---

[[TOC]]

# Path标签的作用

[上期](/notes/zh-cn/svg-base-graphics)我们了解SVG中的基本图形，但是可以发现这些图形不能完成一些特殊的图标，
比如水滴，爱心等。所以就有了[path标签](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/path)，
按照[MDN](https://developer.mozilla.org/zh-CN/)中所说，path标签用来完成所有基本形状。

# path标签的用法

path标签有一个属性，它是`d`属性。它和`points`属性类似，需要填写一些描述路径的点的坐标，但是可以在坐标前添加修饰符，比如`M`，`L`等。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    class="stroke-primary"
    d="M10 10, L20 20"
    stroke-width="0.5"
    stroke="currentColor"
  />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M10 10, L20 20" stroke-width="0.5" stroke="currentColor" />
</svg>
```

## 修饰符

修饰符可以用来控制绘制路径的样式，比如`M`，`L`等，但是它们是不可选的，所以你需要自己添加。

- `M`：移动到指定的坐标位置
- `L`：绘制直线到指定的坐标位置
- `C`：绘制三次贝塞尔曲线。
- `S`：绘制平滑连续的三次贝塞尔曲线。
- `Q`：绘制二次贝塞尔曲线。
- `T`：绘制平滑连续的二次贝塞尔曲线。
- `A`：绘制弧线。
- `H`：绘制水平线到指定的 x 坐标位置。
- `V`：绘制垂直线到指定的 y 坐标位置。
- `Z`：闭合路径，将路径重置为起点。

> 大写的修饰符是使用的是绝对坐标（相对于SVG坐标系），小写的修饰符是使用的是相对坐标（相对于当前位置）。

## 绘制直线

绘制一条直线需要指定两个坐标点，所以你需要分别指定两个坐标点的坐标，并且在坐标前添加修饰符。

直线的命令格式：
```plaintext
x1 y1, x2 y2
```

*使用M+L修饰符画一个选项图标：*

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M4 6, L20 6, M4 12, L20 12, M4 18, L16 18" stroke-width="0.5"
      stroke-linecap="round"
      class="stroke-primary" stroke="currentColor"
    />
</svg>

`M`表示可以理解为把画笔的笔触移动到指定的坐标点，`L`表示画笔从当前位置画一条直线到指定的坐标点。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <!-- M4 6, L20 6 是第一条线 -->
  <!-- M4 12, L20 12 是第二条线 -->
  <!-- M4 18, L16 18 是第三条线 -->
  <path
    d="M4 6, L20 6, M4 12, L20 12, M4 18, L16 18"
    stroke-width="0.5" stroke-linecap="round" stroke="currentColor"
  />
</svg>
```

*M和m的区别：*

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    d="M4 4, L8 8"
    stroke-width="0.5"
    stroke-linecap="round"
    class="stroke-primary" stroke="currentColor"
  />
  <path
    d="M8 8, m4 4, L16 16"
    stroke-width="0.5"
    stroke-linecap="round"
    class="stroke-secondary" stroke="currentColor"
  />
  <g>
    <text fill="currentColor" x="5" y="4" font-size="0.25">
      `<tspan font-weight="bold">m4 4</tspan>`
      表示相对于(8,8)为原点进行计算
    </text>
  </g>
</svg>

`M`表示以SVG坐标系（0，0）为原点进行计算，`m`表示当前位置为以原点进行计算。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <!-- m4 4表示以L8 8为原点 -->
  <path
    d="M4 4, L8 8, m4 4, L16 16"
    stroke-width="0.5"
    stroke-linecap="round"
    class="stroke-primary" stroke="currentColor"
  />
</svg>
```

*L和l的区别：*

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M4 4, L8 4"
      stroke-width="0.5"
      stroke-linecap="round"
      class="stroke-primary" stroke="currentColor"
    />
    <path
      d="M4 4, l8 4"
      stroke-width="0.5"
      stroke-linecap="round"
      class="stroke-secondary" stroke="currentColor"
    />
    <g>
      <text fill="currentColor" x="4.4" y="9.5" font-size="0.25">
        `<tspan font-weight="bold">l8 4</tspan>`
        表示相对于(4,4)
      </text>
    </g>
</svg>

`L`修饰符和`l`修饰符的区别在于，`L`修饰符的点坐标点计算是相对于原点（0，0），`l`修饰符的点坐标计算是把当前坐标当原点。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    d="M4 4, L8 4" stroke-width="0.5"
    stroke-linecap="round" stroke="currentColor"
  />
  <path
    d="M4 4, l8 4" stroke-width="0.5"
    stroke-linecap="round" stroke="currentColor"
  />
</svg>
```

*使用H+V修饰符画一个十字准星：*

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M0 12, H24, M12 0, V24"
      class="stroke-primary" stroke-width="0.5" stroke="currentColor"
    />
</svg>

`H`表示从当前坐标水平移动到指定的坐标（即指改动`x`），`V`表示从当前坐标垂直移动到指定的坐标（即指改动`y`）。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    d="M0 12, H24, M12 0, V24"
    stroke-width="0.5" stroke="currentColor"
  />
</svg>
```

*使用Z修饰符画一个三角形：*

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      d="M4 4, H16, V12, Z"
      class="stroke-primary fill-base-100" stroke-width="0.5" stroke="currentColor" fill="currentColor"
    />
</svg>

`Z`可以理解为自动闭合。

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path
    d="M4 4, H16, V12, Z"
    stroke-width="0.5" stroke="currentColor" fill="currentColor"
  />
</svg>
```

## 绘制弧线

绘制一条弧线需要指定两个坐标点，因为弧线需要穿过这两个坐标点。第一个点默认采用当前坐标点，第二个点需要指定。弧线的绘制原理是：先根据两个点绘制一条直线，然后根据半径绘制一个圆，然后根据旋转角度旋转这个圆，将圆慢慢移动，直到于两个点重合，最后根据大小选择弧线，最后根据方向绘制一个弧线。

绘制弧线的要求：
- 指定两个坐标点的坐标。
- 指定圆的x轴半径和y轴半径，因为可能是椭圆，所以需要指定两个半径，正圆只需要这两个相同即可。
- 指定圆的旋转角度。
- 指定弧线的大小（大弧1或者小弧0）。
- 指定弧线的方向（顺时针1或者逆时针0）。

绘制弧线的命令格式：
```plaintext
A rx ry rotation(旋转角度) large-arc-flag(大弧标志) sweep-flag(扫描标志) x2 y2
```

*绘制弧线的示例：*

<h4 class="text-center">内部绘制图</h4>
<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <line
      x1="35" y1="50" x2="65" y2="50"
      class="stroke-primary"
      stroke-width="2" stroke="currentColor"
    />
    <circle
      cx="50" cy="36.8" r="20"
    class="stroke-primary" fill="none"
    stroke-width="2" stroke="currentColor"
    />
    <circle
      cx="50" cy="63" r="20"
    class="stroke-primary" fill="none"
    stroke-width="2" stroke="currentColor"
    />
</svg>

<div class="grid grid-cols-2 gap-2 sm:gap-4">
  <div class="w-full">
    <h4 class="text-center">大弧线，顺时针</h4>
    <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path
          d="M35 50, A 20 20, 0, 1, 1, 65 50"
          class="stroke-secondary" stroke-width="2" stroke="currentColor" fill="none"
          stroke-linecap="round"
        />
    </svg>
  </div>
  <div class="w-full">
    <h4 class="text-center">大弧线，逆时针</h4>
    <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        d="M35 50, A 20 20, 0, 1, 0, 65 50"
        class="stroke-accent" stroke-width="2" stroke="currentColor" fill="none"
        stroke-linecap="round"
      />
    </svg>
  </div>
  <div class="w-full">
    <h4 class="text-center">小弧线，顺时针</h4>
    <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <path
        d="M35 50, A 20 20, 0, 0, 1, 65 50"
        class="stroke-error" stroke-width="2"     stroke="currentColor" fill="none"
        stroke-linecap="round"
      />
    </svg>
  </div>
  <div class="w-full">
    <h4 class="text-center">小弧线，逆时针</h4>
    <svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path
          d="M35 50, A 20 20, 0, 0, 0, 65 50"
          class="stroke-warning" stroke-width="2"    stroke="currentColor" fill="none"
          stroke-linecap="round"
        />
    </svg>
  </div>
</div>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- 蓝，大弧线，顺时针 -->
  <path
    d="M35 50, A 20 20, 0, 1, 1, 65 50"
    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
  />
  <!-- 绿，大弧线，逆时针 -->
  <path
    d="M35 50, A 20 20, 0, 1, 0, 65 50"
    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
  />
  <!-- 红，小弧线，顺时针 -->
  <path
    d="M35 50, A 20 20, 0, 0, 1, 65 50"
    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
  />
  <!-- 黄，小弧线，逆时针 -->
  <path
    d="M35 50, A 20 20, 0, 0, 0, 65 50"
    stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
  />
</svg>
```

绘制椭圆旋转的弧线：

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <path
      d="M30 50, A 20 30, 45, 1, 1, 70 50"
      class="stroke-primary"
      stroke-width="2" stroke="currentColor" fill="none"
    />
    <path
      d="M30 50, A 20 30, 45, 1, 0, 70 50"
      class="stroke-accent"
      stroke-width="2" stroke="currentColor" fill="none"
    />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path
    d="M30 50, A 20 30, 45, 1, 1, 70 50"
    stroke-width="2" stroke="currentColor" fill="none"
  />
  <path
    d="M30 50, A 20 30, 45, 1, 0, 70 50"
    stroke-width="2" stroke="currentColor" fill="none"
  />
</svg>
```

## 了解贝塞尔曲线

首先应该了解一下贝塞尔曲线，什么是贝塞尔曲线。
我们只要理解二次贝塞尔曲线就可以理解更高级的贝塞尔曲线，
二次贝塞尔曲线的有一个控制点和两个端点。

首先，有一条直线，在这条直线上有两个端点（p1, p2），这条线之间有一个点（p3），它的位置由参数`t`决定，
它的取值范围是[0, 1]，如果`t`为0，那么p3和p1重合，如果`t`为1，那么这个p3和p2重合，
**你可以把它理解为一个比例**，由p1到p3的距离比上整条直线的长度，假设这条线长度为10，p1到p3的距离为5，那么5:10 = 1/2，t=0.5。

二次贝塞尔曲线的计算公式：

B(t) = (1-t)^2 p1 + 2(1-t)t p2 + t^2 p3

<BezierCurveOneDemo />

其次，又有另外一个点(p4)，它连接p2，p2此时作为控制点，
p2和p4连成一条直线，p2和p4和上面讲的一样，
它们之间也有一个点（p5），它的位置也是由参数`t`决定。

此时，再p3和p5之间还有一个点（p6），它的位置同样由参数`t`决定。

最后，按照p6的运动轨迹绘制曲线，这就是二次贝塞尔曲线的绘制原理。

## 绘制二次贝塞尔曲线

二次贝塞尔曲线的有一个控制点和两个端点，第一个端点是以上一次绘制的点作为端点，
`Q`之后的是控制点和第二个端点。

这是绘制一条二次贝塞尔曲线

```plaintext
Q x1 y1 x2 y2
```

连续绘制：

```plaintext
Q x1 y1 x2 y2 T x y
```

`T`后面表示新贝赛尔曲线的结束点，
新的贝塞尔曲线的起点是上一条贝塞尔曲线的结束点，
控制点是上一条贝塞尔曲线的控制点的对称点。

<svg svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <path
    stroke="currentColor"
    d="M0 50, Q 30 10, 60 50, T 100 50, T 180 50, T 240 50"
  />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <path
    stroke="currentColor"
    d="M0 50, Q 30 10, 60 50, T 100 50, T 180 50, T 240 50"
  />
</svg>
```

## 绘制三次贝塞尔曲线

它和二次贝赛尔曲线的区别是多一个控制点。N次贝塞尔曲线的控制点是N-1个。

```plaintext
C x1 y1 x2 y2 x3 y3
```

连续绘制：

```plaintext
C x1 y1 x2 y2 x3 y3 S x1 y1 x2 y2
```

`S`后面表示新贝赛尔曲线的第二个控制点和结束点，
新的贝塞尔曲线的起点是上一条贝塞尔曲线的结束点，第一个控制点是上一条贝塞尔曲线的最后一个控制点的对称点。

<svg svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <path
    stroke="currentColor"
    d="M0 50, C 10 10, 40 90, 50 50, S 80 80, 100 50, S 130 10, 150 50, S 180 80, 200 50"
  />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">
  <path
    stroke="currentColor"
    d="M0 50, C 10 10, 40 90, 50 50, S 80 80, 100 50, S 130 10, 150 50, S 180 80, 200 50"
  />
</svg>
```
