---
title: SVG 滤镜
description: 学习SVG的滤镜
duration: 20分钟
date: 2024-05-06
tags: [SVG]
---

[[TOC]]

# 什么是滤镜?

SVG中的滤镜是一种特殊的图形，它能够在图形上进行模糊，边缘模糊，锐化等操作。在SVG中，滤镜是通过\<filter/>来定义的。

## filter标签属性

- id：滤镜的id，用于引用滤镜。
- x：x坐标，默认值为0。
- y：y坐标，默认值为0。
- width：宽度，默认值为100%。
- height：高度，默认值为100%，和前三个一起使用可以控制滤镜的效果范围。
- filterUnits：滤镜坐标系的单位，默认值为`objectBoundingBox`，可以参考[filterUnits](/notes/zh-cn/svg-gradient#gradientunits属性)。
- primitiveUnits：滤镜图形坐标系的单位，默认值为`userSpaceOnUse`。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="b1" x="0" y="0" width="100" height="100">
    <feGaussianBlur stdDeviation="0.75" />
  </filter>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="0" y="0" width="100" height="100" filter="url(#b1)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="b1" x="0" y="0" width="100" height="100">
    <feGaussianBlur stdDeviation="0.75" />
  </filter>
  <image href="https://avatars.githubusercontent.com/u/84616782?v=4" x="0" y="0" width="100" height="100" filter="url(#b1)" />
</svg>
```

# 阴影滤镜

阴影滤镜是一种特殊的滤镜，它能够在图形上进行模糊，边缘模糊，等操作。在SVG中，阴影滤镜是通过\<feDropShadow/>来定义的。

它有以下属性：
  - dx：阴影水平偏移。
  - dy：阴影垂直偏移。
  - stdDeviation：标准差，控制阴影模糊程度，默认值为1。
  - flood-color：阴影颜色。
  - flood-opacity：阴影透明度。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="shadow">
    <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#d97706" flood-opacity="0.9" />
  </filter>
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#shadow)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="shadow">
    <!-- 阴影滤镜 -->
    <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#d97706" flood-opacity="0.9" /> <!-- [!code focus] -->
  </filter>
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#shadow)" />
</svg>
```

# 高斯模糊滤镜

高斯模糊滤镜是一种特殊的滤镜，它能够在图形上进行高斯模糊等操作。在SVG中，高斯模糊滤镜是通过\<feGaussianBlur/>来定义的。

它有以下属性：
  - stdDeviation：标准差，控制高斯模糊程度，默认值为1。
  - x：x坐标，默认值为0。
  - y：y坐标，默认值为0。
  - width：宽度，默认值为100%。
  - height：高度，默认值为100%，和前三个一起使用可以控制高斯模糊的效果范围。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="blur">
    <feGaussianBlur x="25" y="25" width="50" height="50" stdDeviation="0.5" />
  </filter>
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" />
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#blur)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="blur">
    <!-- 高斯模糊滤镜 -->
    <feGaussianBlur x="25" y="25" width="50" height="50" stdDeviation="0.5" /> <!-- [!code focus] -->
  </filter>
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" />
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#blur)" />
</svg>
```

# 色彩矩阵滤镜

色彩矩阵滤镜是一种特殊的滤镜，它能够在图形上基于转换矩阵进行色彩变换。
在SVG中，色彩矩阵滤镜是通过\<feColorMatrix/>来定义的。

它有以下属性：
  - type：色彩矩阵类型，有`saturate`（饱和度），`hueRotate`（色相旋转），`luminanceToAlpha`（亮度转透明度），还有`matrix`（矩阵）。
  - values：具体值。

它的矩阵转换是一个4*5的矩阵，它可以用来控制图形的色彩变换，矩阵的值的范围是[0-1]，1代表255，0代表0，-1代表-255，也就是不需要这个颜色通道。
转换原理为：4列分别代表图形的R（红），G（绿），B（蓝），A（透明度）通道的权重，5行分别该通道的颜色受某个值的影响。
|输出颜色|计算公式|
|---|---|
|R'| *r1 * R + r2 * G + r3 * B + r4 * A + r5* |
|G'| *r1 * R + r2 * G + r3 * B + r4 * A + r5* |
|B'| *r1 * R + r2 * G + r3 * B + r4 * A + r5* |
|A'| *r1 * R + r2 * G + r3 * B + r4 * A + r5* |

<FeColorMatrixDemo />

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="matrix">
		<feColorMatrix id="feColorMatrix" type="类型" values="值" />
	</filter>
	<image class="transition-all" href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#matrix)" />
</svg>
```

# 偏移滤镜和合并滤镜

偏移滤镜是一种特殊的滤镜，它能够在图形上进行偏移。
在SVG中，偏移滤镜是通过\<feOffset/>来定义的，
合并滤镜是通过\<feMerge/>来定义的，
通过\<feMergeNode/>来合成，它可以将两个或多个滤镜进行合并，可以让多个滤镜引用同一个滤镜。

> 使用`in`属性控制输入源，默认值为`SourceGraphic`，即原图层，
如果没有指定`in`属性，则默认装载上一个滤镜的处理结果。
`result`属性将为某次滤镜结果缓存为一个变量，以便之后的滤镜引用。

利用偏移和模糊滤镜加上合成滤镜可以实现阴影效果。

<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="offset">
    <feGaussianBlur stdDeviation="1" />
    <feOffset dx="3" dy="3" result="offsetBlur" />
    <feMerge>
      <feMergeNode in="offsetBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#offset)" />
</svg>

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <filter id="offset">
    <feGaussianBlur stdDeviation="1" />
    <feOffset dx="3" dy="3" result="offsetBlur" />
    <feMerge>
      <feMergeNode in="offsetBlur" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
  <image href="/images/pornhub.png" x="10" y="10" width="80" height="80" filter="url(#offset)" />
</svg>
```

# 混合滤镜

混合模式滤镜是一种特殊的滤镜，它能够在图形上进行混合。
在SVG中，混合模式滤镜是通过\<feBlend/>来定义的。

它有以下属性：
  - in：输入源。
  - in2：输入源2。
  - mode：混合模式。
    - normal：普通模式。
    - multiply：乘法模式，颜色值相乘。
    - screen：屏幕模式，颜色值反相相乘再反相。
    - darken：变暗模式，选择较暗的颜色。
    - lighten：变亮模式，选择较亮的颜色。
    - color-dodge：颜色浮雕模式。
    - color-burn：颜色烘焙模式。
    - overlay：叠加模式，颜色值相加。
    - soft-light：柔光模式。
    - hard-light：硬光模式。
    - difference：差异模式。
    - exclusion：排除模式。
    - hue：色相模式。
    - saturation：饱和度模式。
    - color：颜色模式。
    - luminosity：亮度模式。

> \<feImage>可以从外部获取输入图像，在滤镜中使用。

<FeBelndDemo />

```html ml [@@{3-8}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="blend">
		<feImage
			href="/images/wallpaper.png"
			preserveAspectRatio="xMidYMid slice"
			result="image"
		/>
		<feBlend in="SourceGraphic" in2="image" mode="混合模式" />
	</filter>
	<image
		href="/images/figma.png"
		x="0" y="0" width="100" height="100"
		filter="url(#blend)"
	/>
</svg>
```

# 合成滤镜

合成滤镜\<feComposite/>，用于将两个图像进行合成，
它提供了多种操作模式，可以对输入图像执行不同类型的像素级操作。

它有以下属性：
  - in：输入源。
  - in2：输入源2。
  - operator：合成操作模式。
    - over：覆盖，前景图像在背景图像之上，类似于Photoshop中的“正常”模式。。
    - in：输入，仅显示前景图像在背景图像范围内的部分，其他部分透明。
    - out：输出，仅显示前景图像在背景图像范围外的部分，其他部分透明。
    - atop：上下叠加，前景图像在背景图像之上，并且只在背景图像范围内显示，其他部分透明。
    - xor：异或，仅显示前景图像和背景图像互斥的部分，即它们不重叠的部分。
    - arithmetic：算术运算，通过像素级算术运算进行合成，
      使用 k1, k2, k3, k4 这四个系数，使用这个可以完成上面任意模式的合成，
      公式为`result = k1 * in * in2 + k2 * in + k3 * in2 + k4`。

<FeCompositeDemo />

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="composite">
		<feImage href="/images/wallpaper.png" preserveAspectRatio="xMidYMid slice" result="image" />
		<feComposite in="SourceGraphic" in2="image" operator="操作符" />
	</filter>
	<image
		href="/images/figma.png"
		x="0" y="0" width="100" height="100"
		filter="url(#composite)"
	/>
</svg>
```

# 颜色通道转换滤镜

颜色通道转换滤镜\<feComponentTransfer/>，
用于对图像进行颜色分量转换。

该元素有以下专属子元素：
  - \<feFuncR/>：定义红色分量的转移函数。
  - \<feFuncG/>：定义绿色分量的转移函数。
  - \<feFuncB/>：定义蓝色分量的转移函数。
  - \<feFuncA/>：定义透明度分量的转移函数。

每个分量的转移函数有以下属性：
  - type：转移函数类型，值在表格中列出的。
    |值|说明|
    |----|---|
    |identity|保持原样，不进行任何变换|
    |linear|进行线性变换|
    |gamma|进行伽马校正|
    |table|区间映射，使用查找表进行离散变换|
    |discrete|将输入值映射到离散的输出值|

线性变换的类型使用以下的属性进行调整：
  - slope：线性变换的斜率。
  - intercept：线性变换的截距。

伽马校正的类型使用以下的属性进行调整：
  - amplitude：伽马校正的振幅。
  - exponent：伽马校正的指数。
  - offset：伽马校正的偏移值。

区间映射的类型使用以下的属性进行调整：
  - tableValues：区间映射的查找表，原理为分段映射。

离散变换的类型使用以下的属性进行调整：
  - tableValues：离散变换的查找表。

<FeComponentTransferDemo />

```html ml [@@{3-8}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="component-transfer">
		<feComponentTransfer>
			<feFuncR type="linear" slope="斜率" intercept="截距" />
			<feFuncG type="gamma" amplitude="振幅" exponent="指数" offset="偏移值" />
			<feFuncB type="table" tableValues="查找表" />
			<feFuncA type="discrete" tableValues="查找表" />
		</feComponentTransfer>
	</filter>
	<image
		href="/images/流萤.png" filter="url(#component-transfer)"
		x="0" y="0" width="100" height="100"
		preserveAspectRatio="xMidYMid slice"
	/>
</svg>
```

# 形态滤镜

形态滤镜\<feMorphology> ，用于执行形态学操作，即对图像应用腐蚀或膨胀效果。
这些操作在图像处理中非常常见，用于修改图像的结构或形状，例如去除噪点或扩展对象边界。

> 它在增肥或瘦身效果方面特别有用。

它具有以下属性：
  - in：输入源。
  - operator：形态学操作类型，值在表格中列出的。
    |值|说明|
    |----|---|
    |erode|腐蚀，侵蚀图像源区域的大小，通过减小亮区域的大小，使物体变小|
    |dilate|膨胀，增肥图像源区域的大小，通过增加亮区域的大小，使物体变大|
  - radius：指定操作的半径，可以是一个数值或一对数值（分别表示 x 和 y 方向的半径）。

<FeMorphologyDemo />

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="morphology">
		<feMorphology operator="形态学操作类型" radius="半径" /> <!-- [!code focus] -->
	</filter>
	<image
		x="0" y="0" width="100" height="100"
		href="/images/流萤.png"
		filter="url(#morphology)"
		preserveAspectRatio="xMidYMid slice"
	/>
</svg>
```

# 映射置换滤镜

\<feDisplacementMap />，用于对图像进行位移操作，通过将图像中的像素按照另一个图像的颜色值进行位移，从而产生扭曲或变形的效果。
这种滤镜效果常用于创建水波、凹凸不平的表面以及其他视觉变形效果。

它具有以下属性：
  - in：指定要进行位移操作的输入图像。常见值包括 SourceGraphic（原始图像）和其他滤镜的输出。
  - in2：指定用作位移源的图像，即用于确定位移方向和幅度的图像。常见值包括 SourceGraphic（原始图像）和其他滤镜的输出。
  - scale：指定位移的强度（缩放因子），决定位移效果的强度。
  - xChannelSelector：指定`in2`中用作x轴方向位移的颜色通道，可能的值有 R、G、B 和 A，默认值为 A。
  - yChannelSelector：指定`in2`中用作y轴方向位移的颜色通道，可能的值有 R、G、B 和 A；默认值为 A。

操作原理：
  - 位移操作是基于`in2`图像中像素的颜色值进行的。
  - `xChannelSelector`和`yChannelSelector`指定的颜色通道决定了位移的方向和距离。
  - `scale`控制位移的幅度。较大的`scale`值会产生更显著的位移效果。

<p>
  <span>计算公式为：</span>
  <math xmlns="http://www.w3.org/1998/Math/MathML">
    <semantics>
      <mrow>
        <mo>(</mo>
        <msup><mi>x</mi><mi>′</mi></msup>
        <mo>,</mo>
        <msup><mi>y</mi><mi>′</mi></msup>
        <mo>)</mo>
        <mo>=</mo>
        <mo>(</mo>
        <mi>x</mi>
        <mo>+</mo>
        <mi>scale</mi>
        <mo>⋅</mo>
        <mi>Δx</mi>
        <mo>,</mo>
        <mi>y</mi>
        <mo>+</mo>
        <mi>scale</mi>
        <mo>⋅</mo>
        <mi>Δy</mi>
        <mo>)</mo>
      </mrow>
    </semantics>
  </math>
</p>

x,y 是原图像中像素的初始位置，Δx 是位移图中用于 x 方向的值。
Δy 是位移图中用于 y 方向的值，它们俩个由 in2 对应的通道像素值决定，scale 是用于调整位移幅度的比例因子。

<FeDisplacementMapDemo />

```html ml [@@{8-14}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="displacement-map">
		<feImage
			href="/images/wallpaper.png"
			preserveAspectRatio="xMidYMid slice"
			result="image"
		/>
		<feDisplacementMap
			in="SourceGraphic"
			in2="image"
			scale="比例因子"
			xChannelSelector="x轴通道"
			yChannelSelector="y轴通道"
		/>
	</filter>
	<image
		x="0" y="0" width="100" height="100"
		href="/images/阮梅.png"
		filter="url(#displacement-map)"
		preserveAspectRatio="xMidYMid slice"
	/>
</svg>
```

# 湍流滤镜

湍流滤镜\<feTurbulence/>是一种在图像中产生噪声的滤镜，
用于生成基于噪声的图案，如云状、漩涡状或其他随机纹理

它具有以下属性：
  - type：指定滤镜的类型。

   |值|说明|
   |---|---|
   |turbulence|湍流滤镜，生成一种更为复杂的噪声，适合模拟湍流或水波效果|
   |fractalNoise|分形噪声滤镜，生成一种平滑的噪声，适合模拟云或烟雾效果|
  - baseFrequency：指定基础频率，默认值为0，可以使用一个值或两个值（x，y）来定义基础频率，但是不能是负数。
  - numOctaves：指定叠加在一起的噪声层数。较高的值会增加噪声的复杂度和细节，默认值为1，必须是整数。
  - seed：用于生成伪随机噪声的种子值。更改这个值会产生不同的噪声图案，默认值为0。
  - stitchTiles：指定是否在图案边界处平滑拼接。可以是 stitch（平滑拼接）或 noStitch（不拼接）。在需要平铺图案时，使用 stitch 选项可以避免明显的接缝，默认值为noStitch。

<FeTurbulenceDemo />

```html ml [@@{3-8}]
<svg svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="turbulence">
		<feTurbulence
			type="turbulence"
			baseFrequency="0.125"
			numOctaves="2"
			result="turbulence"
		/>
		<feDisplacementMap in="SourceGraphic" scale="8" xChannelSelector="B" yChannelSelector="B"/>
	</filter>
	<image
		x="0" y="0" width="100" height="100"
		href="/images/明末行.png"
		filter="url(#turbulence)"
		preserveAspectRatio="xMidYMid slice"
	/>
</svg>
```

# 卷积滤镜

卷积滤镜\<feConvolveMatrix/>是将输入图像中的像素与相邻像素组合以生成结果图像，是通过对图像的每个像素及其周围的像素进行加权平均来实现的。
这种滤镜可以用来实现各种效果，如包括模糊、边缘检测、锐化、浮雕和斜角。

它具有以下属性：

  - order：定义卷积核（一个矩阵）的维度，可以是一个值或者两个值（列，行），默认为3，建议只使用较小的值，使用较大的值会CPU增加开销。
  - kernelMatrix： 定义卷积核的权重矩阵，是一个以空格分隔的数值列表，**列表长度必须等于卷积核的行数与列数的乘积**。
  - kernelUnitLength：卷积滤镜的单元长度，它表示核矩阵中连续列和行之间的预期距离，但是不推荐使用，详见[MDN:kernelUnitLength](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/kernelUnitLength#browser_compatibility)。
  - divisor：卷积核结果的除数，用于归一化。默认值是 1。
  - bias：添加到卷积结果中的偏移量，用于控制卷积结果。默认值是 0。
  - targetX：定义卷积核相对输入图像中的像素X轴参考点（通常是卷积核的中心点），必须满足0 ≤ targetX < orderX，默认值为`floor(orderX / 2)`。
  - targetY：定义卷积核相对输入图像中的像素Y轴参考点（通常是卷积核的中心点），必须满足0 ≤ targetY < orderY，默认值为`floor(orderY / 2)`。
  - edgeMode：定义如何处理边缘。默认值为`duplicate`（复制边缘颜色），可以是`wrap`（循环边缘）或者`none`（填充为0）。
  - preserveAlpha：是否保留alpha通道。默认值为`false`（包含alpha通道）。

<FeConvolveMatrixDemo />

```html ml [@@{3-8}]
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<filter id="convolve-matrix">
		<feConvolveMatrix
          order="维度" targetX="X轴位置" targetY="Y轴位置"
          kernelMatrix="卷积核矩阵"
          edgeMode="边缘模式" preserveAlpha="保留alpha通道"
          bias="偏移" divisor="除数"
        />
	</filter>
	<image
		x="0" y="0" width="100" height="100"
		href="/images/缠流子.png"
		filter="url(#convolve-matrix)"
		preserveAspectRatio="xMidYMid slice"
	/>
</svg>
```

> 具体原理请参考[MDN:feConvolveMatrix](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element/feConvolveMatrix)
