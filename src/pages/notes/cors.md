---
title: 什么是 CORS ？
description: 了解 CORS
date: 2024-11-10T13:56:00
duration: 5min
tags: [CORS]
---

CORS（全称：Cross-Origin Resource Sharing，跨域资源共享）是一个浏览器的安全机制，用于**控制跨域请求的行为**。它通过在 HTTP 响应中使用**特定的标头来允许或限制来自不同来源的资源访问**。

现代浏览器遵循同源策略（Same-Origin Policy），默认情况下，脚本只能访问与其来源相同的资源（同源定义如下）：
  1. 协议相同（如 https 和 http 是不同源）。
  2. 域名相同（如 example.com 和 api.example.com 是不同源）。
  3. 端口相同（如 example.com:80 和 example.com:8080 是不同源）。

可以通过 `Access-Control-Allow-Origin` 设置响应标头来允许或限制来自不同来源的资源访问，这可以用于实现跨域资源共享（CORS）。

> 这需要在服务器端设置响应标头，以便浏览器允许跨域请求。

### 示例

使用 Node.js 创建一个 HTTP 服务器，设置 `Access-Control-Allow-Origin` 标头以允许跨域请求。

```js
// server.js
import { createServer } from 'node:http'

const server = createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // 允许跨域请求
  res.setHeader('Access-Control-Allow-Methods', '*') // 允许所有请求方法
  res.setHeader('Access-Control-Allow-Headers', '*') // 允许所有请求头
  res.end('Hello World!')
})

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000')
})
```

> 执行 `node server.js` 启动服务器。

浏览器访问 http://localhost:3000，应该可以看到 `Hello World!`

## 使用反向代理实现 CORS

可以使用反向代理（Reverse Proxy）来实现跨域资源共享，例如 `nginx` 或 `apache`。

### 示例

利用 Vite 的服务器，它支持反向代理，可以直接在 Vite 配置中设置反向代理，不需要额外的配置。

```ts
// vite.config.ts
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 代理目标服务器地址
        changeOrigin: true, // 更改请求头中的 origin
        rewrite: path => path.replace(/^\/api/, ''), // 将请求路径中的 '/api' 替换为 ''
      }
    }
  }
})
```

> 执行 `vite dev` 启动 Vite 开发服务器

访问 http://localhost:5173/api/ 将会被代理到 http://localhost:3000/。

## 使用 JSONP 实现 CORS

JSONP（JSON with Padding）是一种早期的跨域方案，利用 \<script> 标签可以跨域加载资源的特性，通过执行返回的 JavaScript 代码实现数据共享， 而且只支持 GET 请求，并且存在安全隐患（容易被恶意注入代码），现在已经不推荐使用了。

### 示例

客户端通过 \<script> 标签发起请求：

```html
<script>
function myCallback(data) {
  // 处理数据
}
</script>
<script src="https://api.example.com/data?callback=myCallback"></script>
```

服务器返回 JavaScript 代码：

```js
myCallback({
  data: [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Mary Smith' }
  ]
})
```

## 使用 img 标签实现 CORS

动态生成 img 标签，利用其加载资源的特性实现跨域。

### 示例

使用 img 发送跨域请求：

```html
<img src="https://api.example.com/track?data=someData" />
```

只能发送 GET 请求，可用于跨域的统计或跟踪， 并且数据交互受限，无法灵活传递复杂信息。
