---
title: moduleResolution
description: 了解 moduleResolution 有几种方式，以及它们是如何解析的
duration: 5min
date: 2025-05-25
tags: [tsconfig, Node.js]
---

## node

模仿 Node.js 的 CommonJS 模块解析规则，设计与传统 Node.js 环境（使用 require 和 module.exports）兼容。

### 解析流程

1. 路径解析，判断是第三方模块还是本地模块，以及内置模块。

```js
const path = require('node:path') // 内置模块
const path = require('./a') // 本地模块
// 依次查找以下路径
// ./a.{empty,js,mjs,cjs}
// ./a/package.json -> main 字段路径
// ./a/index.{empty,js,mjs,cjs}
const path = require('utils') // 第三方模块
// 依次查找以下路径
// node_modules/utils.{empty,js,mjs,cjs}
// node_modules/utils/package.json -> main 字段路径
// node_modules/utils/index.{empty,js,mjs,cjs}
// ../node_modules/utils.{empty,js,mjs,cjs}
// ......
```

2. 如果是内置模块，直接返回。
3. 如果是本地模块，先在当前目录下查找，如果是文件就执行（如果没有扩展名就尝试补全），如果是目录就在目录中找到 <Major>package.json</Major> 文件中的 <Minor>main</Minor> 字段指向的文件（默认是index.js）。
4. 如果是第三方模块，在 node_modules 中查找（按照本地模块的解析流程），如果最后没有找到就逐级向上级目录的 node_modules 中查找直到根目录。

## node16

是为 Node.js 16+ 设计的模块解析策略，支持 CommonJS 和 ES 模块的混合环境，考虑 package.json 的 type 字段。

### 解析流程

大致和 node 一样，但是会检查 package.json 的 type 字段，如果是 module 就使用 ES 模块解析（需要显示扩展名），如果是 commonjs 就使用 CommonJS 模块解析，并且简单支持 exports 字段。

```json
{
  "type": "module",
  "exports": "./index.js" // ES 模块导出
}
```

## nodenext

是为最新 Node.js 版本（18+）设计的模块解析策略，全面支持 ES 模块、CommonJS 以及 package.json 的高级特性（如 exports 和 imports）。

### 解析流程

和之前一样，只是支持 exports（子路径映射和条件映射） 和 imports，并且优先使用 exports。

```json
{
  "type": "module",
  "exports": {
    ".": {
      "default": "./index.js", // 默认导出
      "import": "./index.js", // ES 模块导出
      "require": "./index.cjs", // CommonJS 模块导出
      "node": "./index.mjs", // node 模块导出
      "types": "./index.d.ts" // 类型声明文件
      },
    "./foo": "./foo.js"
  },
  "imports": { // 内部模块别名
    "#foo": "./foo.js",
    "#bar": {
      "default": "./bar.js",
      "import": "./bar.js",
      "require": "./bar.cjs",
      "node": "./bar.mjs",
      "types": "./bar.d.ts"
    }
  }
}
```

## bundler

是为现代打包工具（如 Webpack、Vite、esbuild、Rollup）设计的模块解析策略，优化 ES 模块解析，假设打包工具会处理最终的模块绑定。

### 解析流程

区别是不强制要求导入包含扩展名和不区分 CommonJS 和 ES 模块，让打包工具处理。