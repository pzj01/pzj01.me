---
title: Web API - Worker
description: 使用 Worker 处理异步的任务
date: 2024-09-04
duration: 5min
tags: [Web API]
---

Worker API 是一种允许在 Web 应用程序中创建多线程环境的技术。通过 Worker API，你可以在浏览器中创建一个独立的 JavaScript 线程（称为 Worker），用于执行与主线程（UI 线程）隔离的任务。这种并行执行的能力非常适合处理计算密集型任务或后台任务，而不会阻塞主线程，从而保持用户界面的流畅性和响应性。

# Worker 的类型

1. `Web Worker`：这是最常用的 Worker 类型。它运行在主线程之外，并且无法直接访问 DOM（Document Object Model）。Web Worker 可以处理繁重的计算任务，如图像处理、数据分析等。
2. `Service Worker`：这是专门用于控制页面或站点的 Worker，独立于特定的网页生命周期。Service Worker 主要用于拦截和处理网络请求（用于缓存和离线功能），使得 PWA（Progressive Web App）能够提供离线体验。
3. `Shared Worker`：与普通的 Web Worker 不同，Shared Worker 可以被多个浏览器上下文（如不同的浏览器标签页）共享。它适合那些需要在多个页面之间共享数据的场景。

## 创建 Web Worker 并通信

> 传递给 Worker 的URL，必须支持同源策略（CORS）。

options：
  - `type`：用于指定 Worker 的类型，默认值为 `classic`。
  - `name`：用于指定 Worker 的名称。
  - `credentials`：用于指定 Worker 的安全凭据，默认值为 `omit`（不传递凭据），或者 `include`（传递凭据）和 `same-origin`（传递同源凭据）。

```ts twoslash
// main.js
const worker = new Worker('./worker.js', {
  name: 'worker',
  type: 'module', // 支持ESM
  credentials: 'same-origin', // 传递同源凭据
})

// 向 worker 发送消息
worker.postMessage(10000)

// 接收 worker 发送的消息
worker.addEventListener('message', (event) => {
  console.log(event.data)

  // 关闭 worker
  worker.terminate()
})
```

```ts twoslash
// worker.js
// 接收主线程发送的消息
addEventListener('message', (event) => {
  // 处理消息
  let sum = 0
  for (let i = 0; i < event.data; i++) {
    sum += i
  }
  // 向主线程发送消息
  postMessage(sum)
})
```

> 使用`navigator.hardwareConcurrency`来获取浏览器当前可以同时开启的线程数。

## 创建 Service Worker 并通信

```ts twoslash
// main.js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js', {
      scope: './', // 指定 service worker 注册范围的 URL
    })
      .then((registration) => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed: ', error)
      })
  })
}
```

```ts twoslash
// service-worker.js
// 缓存的名称
const CACHE_NAME = 'my-site-cache-v1'
// 要缓存的文件列表
const urlsToCache = [
  '/styles/main.css',
  '/script/main.js'
]

// 在安装阶段缓存文件
addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
})

// 拦截网络请求并提供缓存的资源
addEventListener('fetch', (event: any) => {
  // 拦截请求
  event.respondWith(
    // 从缓存中获取请求
    caches.match(event.request)
      .then((response) => {
        // 检查是否缓存了该请求
        if (response) {
          return response
        }
        return fetch(event.request)
      })
  )
})
```

## 创建 Shared Worker 并通信

```ts twoslash
// main.js
const worker = new SharedWorker('shared-worker.js')

// 接收来自 Shared Worker 的消息
worker.port.addEventListener('message', (event: any) => {
  console.log('Message from Shared Worker:', event.data)
})

// 向 Shared Worker 发送消息
worker.port.postMessage('Hello from the main script!')
```

```ts twoslash
// shared-worker.js
// 连接的端口数
let connections = 0

// 监听连接
addEventListener('connect', (event: any) => {
  // 获取连接的端口
  const port = event.ports[0] as MessagePort
  connections++
  // 向连接的端口发送消息
  port.postMessage(`Connected clients: ${connections}`)

  // 接收端口发送的消息
  port.addEventListener('message', (event: any) => {
    console.log('Shared Worker received:', event.data)
    port.postMessage(`Shared Worker echo: ${event.data}`)
  })

  // 当端口关闭时，减少连接数
  port.addEventListener('close', () => {
    connections--
    port.postMessage(`Connected clients: ${connections}`)
  })
})
```

## 总结
Worker API 提供了一种在浏览器中实现并行处理的方法，使得 Web 应用可以更好地利用现代多核处理器的性能。通过将计算密集型或长时间运行的任务移到 Worker 中执行，可以保持用户界面的流畅性和响应性。
