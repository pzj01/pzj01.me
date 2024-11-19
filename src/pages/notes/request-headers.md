---
title: Request 中的 Headers
description: 了解请求头
date: 2024-11-10T13:56:00
duration: 5min
tags: [Request, Headers]
---

[[TOC]]

这篇帖子将介绍 Request 中的 Headers。

# 什么是 Headers ？

在 HTTP 协议中，Headers（头部信息） 是请求和响应中的一个重要组成部分，提供了关于请求或响应的元数据。Headers 包含键值对的形式，用来描述请求/响应的特性、资源信息、认证状态等内容。

## 作用

- 传递元数据：如内容类型、编码方式、权限信息等。
- 控制缓存：通过缓存策略优化性能。
- 身份认证：携带认证信息（如令牌）。
- 跨域控制：通过 CORS 配置允许或限制跨域访问。

### 基本使用

传入一个 HeadersInit 类型的对象，可以创建一个 Headers 对象，用于设置请求或响应的头部信息。

```ts twoslash
const headersInit: HeadersInit = {
  'Content-Type': 'application/json',
}

const headers = new Headers(headersInit)

fetch('https://example.com', {
  headers
})
```

> [!CAUTION]
> 有些标头是不能通过代码设置的，它们由用户代理决定，具体是哪些标头不能修改的可以查看[Forbidden header name](https://developer.mozilla.org/zh-CN/docs/Glossary/Forbidden_header_name)。

## 简单请求标头

在 HTTP 请求中，简单的请求标头（Simple Request Headers） 是指满足特定条件且安全的标头集合。这些标头被浏览器认为是安全的，特别是在执行跨域资源共享（[CORS](/notes/cors)）请求时，它们不会触发浏览器的 预检请求（Preflight Request）。

> [!NOTE]
> 预检请求（Preflight Request）是浏览器在执行某些跨域 HTTP 请求之前发出的一个额外的 OPTIONS 请求，用于确认目标服务器是否允许该实际请求。这是跨域资源共享（CORS，Cross-Origin Resource Sharing）的一部分，用于保护服务器资源和确保跨域请求的安全。

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Accept | 指定客户端支持的媒体类型。 | MIME 类型，例如：`application/json` |
| Content-Type | 指定请求体的媒体类型，只有 `text/plain`、`application/x-www-form-urlencoded`、`multipart/form-data`，才能不发送预检请求，其他都需要发送预检请求 | MIME 类型，例如：`application/json` |
| Range | 指定请求的数据范围，用于分片下载大型文件。 | `<类型>=<起始位置>-<结束位置>`，例如：`bytes=0-499` |

> [!TIP]
> Accept 和 Content-Type（值必须为以上三种） 不需要服务器设置 Access-Control-Allow-Headers。

## 可修改标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Content-Language | 指定请求的语言环境，用于选择适当的语言版本。 | 语言标签，例如：`zh-CN` |
| Content-Length | 指定请求体的长度，用于限制请求体的大小。 | 长度，单位为字节，例如：`1000` |
| Accept-Language | 指定客户端的语言环境，用于选择适当的语言版本。 | 语言标签，例如：`zh-CN` |
| Authorization | 指定客户端的身份信息，用于身份验证。 | 身份信息，例如：`Bearer <token>` |
| Cache-Control | 指定客户端的缓存策略，用于控制缓存行为。 | 缓存策略，例如：`no-cache` |

### 自定义标头

任意自定义标头（以 X- 或任意名称开头，如 X-Custom-Header）。

```ts
const headers = new Headers({
  'X-Custom-Header': 'value',
})
```

## 不可修改标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Host | 指定请求的主机名，用于区分不同的请求。 | 服务器域名，例如：`example.com` |
| Origin | 指定请求的来源，用于跟踪请求的来源。 | URL，例如：`https://example.com` |
| User-Agent | 指定客户端的用户代理字符串，用于标识客户端的类型。 | 用户代理字符串，例如：`Chrome/89.0.142.86` |
| Connection | 指定请求的连接类型，用于控制请求的持续时间。 | 连接类型，例如：`keep-alive` |
| Referer | 指定请求的来源 URL，用于跟踪请求的来源。 | URL，例如：`https://example.com/api` |
| Cookie | 指定客户端的 Cookie，用于身份验证。 | Cookie，例如：`session_id=abc123` |

以及包括以 Proxy- 和 Sec- 开头的标头，更多请看[禁止修改的标头](https://developer.mozilla.org/zh-CN/docs/Glossary/Forbidden_header_name)
