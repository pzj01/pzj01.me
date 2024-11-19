---
title: 什么是 Response ? 以及 fetch 中的 Response 接口
description: 了解 Fetch 中的 Response。
date: 2024-11-16
duration: 3min
tags: [fetch, Response]
---

[[TOC]]

Response 表示 HTTP 请求的响应，包含状态码、头部信息和主体内容等信息。浏览器中的 Response 继承了 Body，因此可以通过 Body 对象的方法获取响应主体内容。

## 使用方式

fetch API 的返回值是一个 Promise，它的处理成功的结果是 Response 对象，失败的结果是 TypeError。

它的构造参数为：
 1. body：和 fetch API 的 body 参数一致，表示请求主体的数据，默认为 null。
 2. init：ResponseInit 类型的对象，其具有以下属性：
    - status：HTTP 状态码，默认为 200。
    - statusText：HTTP 状态文本，则默认为空。
    - headers：HTTP 头部信息，默认为空。

```ts twoslash
const response = new Response('Hello, world!', {
  status: 200,
  statusText: 'OK',
  headers: {
    'Content-Type': 'text/plain'
  }
})

console.log(await response.text())
```

## 属性介绍

- status：HTTP 状态码，具体细节可以查看[HTTP 状态码](/notes/http-status-code)。
- statusText：HTTP 状态文本。
- headers：HTTP 头部信息，[Request 和 Response 中的 Headers](/notes/headers)。
- bodyUsed：响应主体是否已使用，返回 true 表示已使用，返回 false 表示未使用。
- body：响应主体内容。
- ok：请求是否成功，如果状态码在 200-299 范围内则为 true，否则为 false。
- redirected：响应结果是否为重定向的结果。
- type：响应类型，默认为 "default"。
  - basic：默认值，表示同源响应，暴露除了“Set-Cookie”之外的所有标头。
  - cors：表示跨域响应，某些标头和主体可以被访问。
  - error：网络错误，例如超时、DNS 失败等。
  - opaque：表示跨域请求的响应，但目标服务器不支持跨域，或者请求被限制为 no-cors 模式。
  - opaqueredirect：表示为跨域的重定向响应，且请求使用了 manual 的 redirect 选项，即手动设置重定向。
- url：最终经过重定向后的 URL。
