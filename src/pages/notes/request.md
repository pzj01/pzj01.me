---
title: 什么是 Request ? 以及 fetch 中的 Request 接口
description: 了解Fetch 中的 Request。
date: 2024-11-14T19:20:00
duration: 10min
tags: [fetch, Request]
---

[[TOC]]

Request 表示客户端（通常是浏览器或应用）向服务器发送的 HTTP 请求，以获取某些资源或服务，它包含了该次请求的所有信息，其本质是一个可读流。

## 使用方式

在使用 fetch 的时候可以直接传入一个 Request 对象，但是我们平常使用都是直接写入 URL。

Request 的构造参数和 fetch API 的参数一样：
  1. input：一个字符串，URL 对象或者 Request 对象。
  2. init：初始化请求的选项，一个 [RequestInit](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit)。

```ts twoslash
const request = new Request('https://example.com', {
  method: 'GET',
})

const response = await fetch(request) // 发送请求
```

# 属性介绍

以下为 request 对象的属性，但是为只读的。

## method

表示请求的方法类型，默认为 GET。

```ts
const request = new Request('https://example.com')
console.log(request.method) // GET
```

|方法类型|描述|使用场景|
|---|---|---|
|**GET**|请求资源数据|获取数据、查看网页、检索资源|
|**POST**|提交新数据或创建资源|用户注册、表单提交、新建数据记录|
|**PUT**|替换或更新整个资源|更新用户信息、替换数据库中的记录|
|**DELETE**|删除指定资源|删除用户、删除记录|
|**PATCH**|更新部分资源|修改资源的部分属性，如更新用户的某个字段**|
|**HEAD**|获取资源的头部信息（无内容体）|检查资源是否存在、验证资源是否已更新（如缓存验证）|
|**OPTIONS**|查询服务器允许的请求方法|检查服务器支持的请求类型，用于跨域请求预检|

## headers

表示请求的头部信息，格式为键值对，关于它的详细介绍请看[Request 和 Response 中的 Headers](/notes/headers)。

```ts
const request = new Request('https://example.com')
console.log(request.headers)
```

## mode

用于控制请求的模式，特别是在涉及跨域资源访问时。它指定了请求的**安全性**级别，影响着请求是否能进行、是否包含跨域资源、以及跨域资源访问的限制，默认值为 `cors`。

|值|描述|
|---|---|
|**same-origin**|请求的 URL 必须与当前页面同源（即协议、域名和端口完全一致），否则请求会被阻止|
|**cors**|允许跨域请求，但要求目标服务器必须显式地允许该请求|
|**no-cors**|仅允许 GET 请求一些简单的跨域资源（如图片、CSS 文件、脚本文件），但不能访问响应内容，并且请求头只能为[简单请求头](https://fetch.spec.whatwg.org/#simple-header)|
|**navigate**|表示这是一个浏览器的页面切换请求。navigate 请求仅在浏览器切换页面时创建，该请求应该返回 HTML|

```ts
const request = new Request('https://example.com')
console.log(request.mode) // same-origin
```

## body

> [!NOTE]
> GET 请求没有 body。

表示请求体，可以是字符串、Blob、 Buffer、SearchParams、FormData、ReadableStream等。

```ts
const request = new Request('https://example.com', {
  method: 'POST',
  body: 'Hello, world!',
})
console.log(request.body)
```

## bodyUse

表示请求体是否被使用过，只要调用过 `json()` 或 `text()` 等方法就会变为 `true`。

> [!NOTE]
> fetch API 专属的属性。

```ts
const request = new Request('https://example.com/data', {
  method: 'POST',
  body: 'Hello, world!',
})

request.bodyUse // false

request.text().then((text) => {
  console.log(request.bodyUsed) // true
})
```

## cache

表示请求的缓存策略，默认为 `default`。

|值|描述|使用场景|
|---|---|---|
|*default*|默认缓存模式，具体行为取决于浏览器实现。通常会尝试从缓存获取，如果缓存失效则发起网络请求|一般的请求，不需严格的缓存控制|
|*no-store*|禁用缓存。每次请求都会绕过缓存，直接从服务器获取最新资源，且请求和响应均不会存储在缓存中|需要始终获取最新数据，避免缓存的请求，例如对频繁更新的数据进行查询|
|*reload*|不使用缓存，强制向服务器发送请求获取数据，但请求的响应仍然会被存储在缓存中|确保获得最新数据，但同时希望缓存响应以备下次请求使用，例如用户手动刷新页面时|
|*no-cache*|首先检查缓存，但在使用缓存内容前会向服务器进行有效性验证（通常是通过 ETag）。如果缓存是最新的，则直接使用，否则从服务器更新|缓存内容可能过期的情况下，希望在节省流量的同时尽可能减少延迟，例如 API 数据通常适合使用这种模式|
|*force-cache*|始终使用缓存，不进行验证。如果缓存有效期已过期，但依然有缓存内容，仍然会直接使用缓存，除非缓存中没有对应数据才发起网络请求|需要最大限度节省网络流量且对数据实时性要求不高的情况，例如静态资源（图标、字体等）的加载|
|*only-if-cached*|仅从缓存中加载数据，若没有缓存则返回失败（会抛出网络错误）。仅在 mode 为 same-origin 时有效|离线环境中加载数据时使用；需要确保缓存中有资源时使用，例如 PWA 离线页面|

```ts
const request = new Request('https://example.com')
console.log(request.cache) // default
```

## credentials

用于**控制跨域请求时是否发送用户凭据**（如 cookies、Authorization headers 或 TLS 客户端证书）。它的值影响浏览器在跨域请求时如何处理凭据，因此在开发需要用户身份验证的 API 或跨域请求时非常重要，默认值为 `same-origin`。

|值|描述|使用场景|
|---|---|---|
|*omit*|不发送凭据|不需要用户身份验证的 API|
|*same-origin*|发送凭据，但只在同源下有效|需要用户身份验证的 API|
|*include*|发送凭据，无论是否在同源下|需要用户身份验证的 API，允许跨域请求，但是服务端需要支持 CORS|

```ts
const request = new Request('https://example.com')
console.log(request.credentials) // same-origin
```

## referrer

用于指定请求的 Referer（referrer 引荐人，注：因为在定义标准的时候少了一个 `r`，所以就将错就错）头属性，也就是请求的来源。通过设置 referrer，默认值为 `about:client`。

> [!NOTE]
> "about:client" 什么意思？
> 1. 如果请求所在的环境设置了 referrerPolicy，浏览器会根据其值确定 Referer 头的内容。
> 2. 如果没有设置 referrerPolicy，浏览器会采用默认的策略。

```ts
const request = new Request('https://example.com')
console.log(request.referrer) // about:client
```

## referrerPolicy

用于指定请求的 Referrer Policy（这个没有延续之前错误），控制请求发送时是否包含来源 URL，或者选择包含多少级别的来源信息，以保护用户的隐私。默认值为 **""**，即采用浏览器默认的策略，大部分浏览器的默认策略是 `no-referrer-when-downgrade`。

|值|描述|使用场景|
|---|---|---|
|*no-referrer*|不会发送 Referer 头，即不暴露任何来源信息|保护用户隐私，不泄露请求的来源信息，特别是在敏感操作或需要完全隐藏请求来源时使用|
|*no-referrer-when-downgrade*|仅在请求目标和来源协议相同或者提升（即都为 HTTP、HTTPS 或者 HTTP → HTTPS）时才发送 Referer 头。 |适用于大多数场景，可以在保证安全的情况下尽量不泄露来源信息，避免在 HTTPS 到 HTTP 的请求中泄漏。|
|*origin*|仅发送请求的源（不包含路径和查询参数），例如 `https://example.com`|用于跨域请求时，确保最小化泄露的来源信息，适用于保护隐私并确保来源验证的场景|
|*origin-when-cross-origin*|同源请求时发送完整的 Referer，跨域请求时仅发送源信息|在跨域请求时，保护用户隐私，仅发送最少的来源信息；同源请求时仍提供完整的来源 URL|
|*same-origin*|仅在同源请求时发送 Referer，跨域请求不发送 Referer|适用于严格的隐私保护，确保仅同源请求提供来源信息，防止跨域请求泄露来源|
|*strict-origin*|只在同等级别（HTTPS → HTTPS）的请求时发送来源信息（主域），HTTPS → HTTP 不发送 Referer|更高安全性要求，防止协议降级时泄露敏感的来源信息，确保 HTTPS 到 HTTPS 请求时的安全性|
|*strict-origin-when-cross-origin*|同源请求时发送完整的 Referer，跨域请求时仅发送主域信息，且仅限 HTTPS → HTTPS 请求|提供跨域请求的最小信息泄漏，同时保持同源请求的完整来源信息，适用于跨域场景中需要更高的安全性要求|
|*unsafe-url*|总是发送完整的 Referer，包括路径和查询参数，无论请求是否跨域|当需要始终提供完整的 Referer 信息，无论请求来源是否安全时使用，通常用于公共内容或第三方分析需求|

```ts
const request = new Request('https://example.com')
console.log(request.referrerPolicy) // ""
```

## redirect

用于指定当请求遇到重定向（3xx 响应状态码）时该如何处理。它允许开发者控制在发生重定向时请求的行为，提供了不同的选项来决定是否跟随重定向以及如何处理重定向的响应，默认值为 'follow'。

|值|描述|
|---|---|
|*manual*|允许请求返回一个重定向响应，但不会自动跟随重定向。此模式下，开发者可以手动检查响应状态，并对重定向进行处理|
|*follow*|遇到重定向时，自动跟随重定向请求到新的 URL，直至获取到最终的响应内容。|
|*error*|遇到重定向时，请求会被中止，并返回一个 TypeError 异常|

```ts
const request = new Request('https://example.com')
console.log(request.redirect) // follow
```

## destination

用于描述请求资源的类型，帮助浏览器优化请求的处理。destination 的值表明了请求的用途（例如脚本、样式、图像等），并且通常和 CORS 相关联——不同类型的资源会触发不同的 CORS 规则。

|值|描述|
|---|---|
|*""*|无特定用途，默认值|
|*document*|顶级文档，如 HTML 页面|
|*frame*|子框架，如 frame 元素|
|*iframe*|子框架，如 iframe 元素|
|*paintworklet*|绘制工作线程脚本，例如通过 `<canvas>` 元素加载的绘制工作线程|
|*json*|一个 JSON 文件|
|*image*|图片资源，例如通过 `<img>` 元素加载的图片|
|*audio*|音频资源，例如通过 `<audio>` 元素加载的音频|
|*audioworklet*|音频工作线程脚本，例如通过 `<audio>` 元素加载的音频工作线程|
|*video*|视频资源，例如通过 `<video>` 元素加载的视频|
|*embed*|嵌入资源，例如通过 `<embed>` 元素加载的插件|
|*font*|字体资源，例如通过 `<link>` 元素加载的字体文件|
|*script*|脚本资源，例如通过 `<script>` 元素加载的脚本|
|*style*|样式资源，例如通过 `<link>` 元素加载的样式表|
|*worker*|Web Worker 资源|
|*serviceworker*|Service Worker 资源|
|*sharedworker*|Shared Worker 资源|
|*manifest*|网页的 manifest 文件|
|*object*|对象资源，例如通过 `<object>` 元素加载的插件|
|*report*|报告或分析数据资源|
|*track*|文本轨道文件，如视频字幕文件|
|*xslt*|XSLT 脚本，例如通过 `<xsl>` 元素加载的 XSLT 文件|

## integrity

用于指定一个**子资源完整性**（Sub resource Integrity，简称 SRI）哈希值。它的作用是确保请求的资源未被篡改，并在资源的内容与提供的哈希值匹配时才允许加载，从而提高安全性。

在实际应用中，integrity 通常用于从第三方加载资源（如 CDN 上的 JavaScript 文件），可以有效防止资源在传输过程中被恶意篡改。

### integrity 的工作原理

当指定了 integrity 属性后，浏览器会在资源下载完成后计算资源内容的哈希值，并与 integrity 中提供的哈希值进行比对。如果两者匹配，资源将继续加载；否则，资源加载会被阻止并抛出错误，提升了加载资源的安全性。

```ts
const request = new Request('https://example.com/script.js')
// 格式为<hash-algorithm>-<hash-value>
console.log(request.integrity) // sha256-1234567890abcdef
```

## signal

用于表示请求的取消信号，可以用于中止请求的执行。

```ts
const controller = new AbortController()

const request = new Request('https://example.com', {
  signal: controller.signal,
})

console.log(request.signal.aborted) // false
controller.abort('请求已中断') // 中止请求
```

## url

用于描述请求的 URL，通常用于构建完整的请求地址。

```ts
const request = new Request('https://example.com')
console.log(request.url) // https://example.com
```

## isHistoryNavigation

用于判断当前请求是否由浏览器的前进或后退按钮触发。这个属性有助于开发者识别用户导航行为是否来自浏览器的历史记录导航。

> [!WARNING]
> 并不是所有浏览器都支持这个属性，目前只有 Chrome、Edge 支持。

```ts
const request = new Request('https://example.com')
console.log(request.isHistoryNavigation) // false
```

## keepalive

用于指示请求是否应该在页面卸载（例如关闭、刷新或导航到其他页面）时仍然保持活动状态。它主要用于发送需要在页面关闭时完成的关键请求（如日志、统计数据或用户行为数据的记录）。

```ts
const request = new Request('https://example.com')
console.log(request.keepalive) // false
```

## targetAddressSpace

用于指定目标请求的地址空间（Address Space）。它帮助浏览器识别请求的安全性，以防止潜在的跨地址空间泄露问题。这个属性是提升网络请求安全性的一部分，主要与**私有网络访问（Private Network Access, PNA）**相关。

> [!WARNING]
> 并不是所有浏览器都支持这个属性，目前只有 Chrome、Edge 支持。

|值|描述|
|---|---|
|*unknown*|未指定地址空间，默认值|
|*public*|公共地址空间，例如互联网|
|*private*|私有地址空间，例如局域网|
|*local*|本地地址空间，例如内部网络|

```ts
const request = new Request('https://example.com')
console.log(request.targetAddressSpace) // unknown
```

# RequestInit 介绍

> 具体的一些属性值和上面出现的一样，就不详细说明了。

这个接口用于描述请求的初始化选项，包括请求方法、请求头、请求体等。它由以下属性组成：
  - method：请求方法，默认为 GET。
  - headers：请求头。
  - body：请求体。
  - mode：请求模式。默认为 cors。
  - credentials：请求凭证。默认为 same-origin。
  - cache：请求缓存策略。默认为 default。
  - redirect:：求重定向策略。默认为 follow。
  - referrer：请求来源。默认为 about:client。
  - referrerPolicy：请求来源策略。默认为 no-referrer-when-downgrade。
  - integrity：请求完整性。默认为 ""。
  - keepalive：是否保持活动状态。默认为 false。
  - signal：请求取消信号。
  - priority：请求优先级，默认为 auto，还可以是 low，high。
  - window：请求窗口。

### 示例

```ts twoslash
const requestInit: RequestInit = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', age: 30 }),
  mode: 'cors',
  credentials: 'same-origin',
  cache: 'default',
  redirect: 'follow',
  referrer: 'about:client',
  referrerPolicy: 'no-referrer-when-downgrade',
  integrity: 'sha256-1234567890abcdef',
  keepalive: false,
  signal: new AbortController().signal,
  priority: 'high',
  window: null,
}
```

`attributionReporting` 和 `browsingTopics` 是相对较新的 RequestInit 属性，它们用于支持浏览器中隐私保护的广告技术，是 隐私沙盒（Privacy Sandbox） 的一部分。这些属性目前仍在发展中，支持范围和具体实现可能随时间和浏览器版本而变化。目前只有 Chrome 和 Edge 支持这两个属性。

## attributionReporting

用于支持隐私保护的广告归因报告（Attribution Reporting API）。其目的是在保护用户隐私的前提下，将广告点击与后续的转化（如购买或注册）进行关联，而无需依赖第三方 Cookie。

### 主要用途

用于广告效果归因分析，例如：
用户点击广告后购买产品。
广告发布商希望知道广告的效果，但不希望直接泄露用户数据。

```ts
fetch('/conversion-endpoint', {
  method: 'POST',
  attributionReporting: {
    sourceEventId: '12345', // 广告点击事件 ID
    destination: 'https://advertiser.com', // 转化目标
  },
})
```

## browsingTopics

用于支持 Topics API。Topics API 是隐私沙盒的一部分，用于基于用户的兴趣进行广告投放，而无需追踪用户的具体行为。

### 主要用途

提供用户的兴趣话题：通过最近访问的站点推断用户的兴趣，广告商可根据这些兴趣投放相关广告。例如：用户可能被识别为对 "科技" 或 "运动" 感兴趣。

```ts
fetch('/ad-delivery-endpoint', {
  method: 'GET',
  browsingTopics: {
    topics: ['technology', 'fitness'], // 用户感兴趣的话题
  },
})
```
