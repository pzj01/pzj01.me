---
title: Response 中的 Headers
description: 了解响应头
date: 2024-11-10T13:56:00
duration: 5min
tags: [Response, Headers]
---

这是服务器返回的响应头，用于控制客户端的行为，例如缓存策略，内容类型等。

## 可修改的响应头

这些标头可以由服务器通过代码配置或修改，用于控制响应行为

### 缓存相关标头

> [!NOTE]
> 如果响应中有指令为 max-age 或 s-maxage 的 Cache-Control 标头，则 Expires 标头会被忽略。

> [!NOTE]
> Pragma 标头在现代 HTTP 中已被 Cache-Control 替代，但为了兼容旧的 HTTP/1.0，仍可能会看到它的使用。

| 标头 | 作用 | 可选值 |
| --- | --- | --- |
| Cache-Control | 控制缓存策略 | `no-cache, max-age=<seconds>` |
| Expires | 指定缓存资源到期的固定日期/时间。 | 日期格式， 例如：`Tue, 15 Nov 2024 12:45:26 GMT` |
| Pragma | HTTP/1.0 的兼容性标头，主要用于禁用缓存，类似于 Cache-Control: no-cache。 | `no-cache` |
| ETag | 用于验证缓存的资源是否与服务器上的资源一致，配合 If-None-Match 标头使用 | `W/"<etag>" \| "<etag>"` |
| Last-Modified | 资源的最后修改时间，客户端可以根据该时间判断缓存是否需要更新。 | 日期格式，例如：`Tue, 15 Nov 2024 12:45:26 GMT` |

### 内容相关标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Content-Type | 指定响应体的类型 | MIME类型，如 `image/*` |
| Content-Length | 指定响应体的字节长度，默认会自动设置 | 字节数 |
| Content-Encoding | 指定响应体的压缩格式 | `gzip` |
| Content-Language | 指定响应体的语言 | 语言，如 `zh-CN` |
| Content-Disposition | 指定响应体的下载方式 | `attachment \| inline` |

### 跨域相关标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Access-Control-Allow-Origin | 指定允许的跨域请求源 | `* | origin` |
| Access-Control-Allow-Methods | 指定允许的跨域请求方法 | 请求类型 |
| Access-Control-Allow-Headers | 指定允许的跨域请求头 | `* | 请求头` |
| Access-Control-Allow-Credentials | 指定是否允许跨域请求携带凭证 | 布尔值 |
| Access-Control-Max-Age | 指定预检请求的有效期，单位为秒 | 秒数 |

### 重定向相关标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Location | 指定重定向的 URL | URL |

### 其他标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Server | 指定服务器的名称 | 服务器名称 |
| Set-Cookie | 指定响应中的 Cookie | Cookie |
| Vary | 指定请求标头在缓存中的变化规则。 | 请求标头 |
| X-Powered-By | 自定义标头，指定服务器的技术栈 | 服务器技术栈 |

## 不可修改的响应头

这些标头由浏览器或协议自动生成，开发者无法通过代码更改或覆盖。

### 协议强制的标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Connection | 指定请求的连接类型，用于控制请求的持续时间。 | 连接类型，例如：`keep-alive` |
| Date | 响应发送的时间，服务器或代理自动设置。 | 日期格式，例如：`Tue, 15 Nov 2024 12:45:26 GMT` |
| Transfer-Encoding | 指定响应体的传输编码，用于解析响应体。 | `chunked` |
| Upgrade | 指定升级的协议。 | 升级协议 |
| Trailer | 指定响应体的尾部信息，用于在响应中包含额外的标头。 | 标头名称，例如：`Transfer-Encoding` |

### 安全相关的标头

| 标头 | 描述 | 值类型 |
| --- | --- | --- |
| Strict-Transport-Security | 指定是否启用严格传输安全，用于防止中间人攻击。 | 布尔值 |
| Content-Security-Policy | 指定响应体的内容安全策略，用于防止跨站脚本攻击。 | 策略，例如：`default-src` |
