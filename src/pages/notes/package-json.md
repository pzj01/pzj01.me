---
title: package.json 详解
description: 了解 package.json 的作用和使用
duration: 15min
date: 2024-10-30
tags: [package.json]
---

[[TOC]]

package.json 是一个 JSON 文件，它的作用是描述一个包的元数据和依赖关系，以及一些命令。通常出现在使用 npm 等Node.js包管理器的地方。

> [!TIP]
> 这个文件的使用环境是 [Node.js](https://nodejs.org/en)，使用它内置的 npm 包管理器演示。

一个标准的 package.json 文件如下所示：

```json
{
  "name": "my-package",
  "description": "My package",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest"
  },
  "license": "MIT",
  "dependencies": {
    "vite": "^5.4.5"
  },
  "devDependencies": {
    "vitest": "^0.25.3"
  }
}
```

# package.json 的官方字段

表示一些基本的必要信息。

## name

包的名称，但是有以下几个要求：
- 不能使用大写字母。
- 必须是唯一的，并且最大长度不能超过 214 个字符。
- 不能包含不可以被URL解析字符（除了下划线 `_` 和连字符 `-` ）。

> [!TIP]
> - 不要使用与Node.js核心模块同名的名称。
> - 不要在名称中添加“js”或“node”，如果需要声明包的运行环境可以在`engines`字段中指定。
> - 名称不应该太长。
> - 如果你的包是基于个人或者组织，可以创建[scope](https://docs.npmjs.com/cli/v10/using-npm/scope)包，例如`@my-org/my-package`，这样可以避免与其他包名冲突，而且不怕名称被其他人占用。

## description

包的描述信息，用于描述包的作用，使用`npm search`时将会显示。

```json
{
  "description": "这是一个简单的包"
}
```

## version

包的版本号，采用语义化的版本号格式，即 X.Y.Z。

- `X` 代表主版本号，表示API的重大改变，并且不能够兼容之前的版本。
- `Y` 代表次版本号，表示API变化，但是可以向下兼容。
- `Z` 代表补丁版本号，表示API内部变化或者bug修复的次数，而且向下兼容。

```json
{
  "version": "1.0.0"
}
```

具体信息可以查看[semver](https://semver.org/lang/zh-CN/)。

> [!CAUTION]
> 版本号必须能被 `node-semver` 解析，因为npm内部使用[semver](https://github.com/npm/node-semver)进行版本号的解析。

## keywords

包的关键字，用于描述包的用途，可以在搜索时通过关键字进行过滤。

```json
{
  "keywords": [
    "string",
    "array"
  ]
}
```

## homepage

包的官方链接，通常为官网地址。

```json
{
  "homepage": "https://example.com"
}
```

## bugs

包的 bug 提交地址，通常为一个 URL。

```json
{
  "bugs": "https://example.com/issues"
}
```

也可以附上 `email` 字段，表示修复 bug 的负责人。

```json
{
  "bugs": {
    "url": "https://example.com/issues",
    "email": "example@163.com"
  }
}
```

## license

包的许可证，通常为 MIT 或者 Apache 2.0。

```json
{
  "license": "MIT"
}
```

## author

包的作者，通常为包的拥有者。

> [!TIP]
> `author` 字段可以是字符串，也可以是对象，对象中可以包含 `name`、`email` 和 `url` 字段。

字符串格式：
```plaintext
name <email>
```

```json
{
  "author": "example-name <example@163.com>"
}
```

## repository

包的源码仓库，用于描述包的源码仓库地址。

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/example/example.git"
  }
}
```

## config

包的配置，用于定义包的配置。

```json
{
  "config": {
    "port": 3000,
    "foo": "bar"
  }
}
```

## dependencies

表示项目在**生产环境**中运行所必需的依赖，这些依赖会被包含在最终的打包文件中。

关于依赖的版本约束范围：
- `1.0.0-2.0.0`：表示 1.0.0 到 2.0.0 的之间所有版本，包括 1.0.0 和 2.0.0。
- `>=1.0.2 <2.1.2`：表示大于等于 1.0.2，小于 2.1.2 的所有版本。
- `>1.0.2 <=2.3.4`：表示大于 1.0.2，小于等于 2.3.4的所有版本。
- `2.0.1`：表示固定为 2.0.1 的版本。
- `<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0`：表示小于 1.0.0，或大于等于 2.3.1 小于 2.4.5，或大于等于 2.5.2 小于 3.0.0 的所有版本。
- `http://asdf.com/asdf.tar.gz`：表示从http://asdf.com/asdf.tar.gz下载的依赖。
- `~1.2`：表示主版本号和次版本号都不变的任意版本，即 1.2.x。
- `~1.2.3`：表示主版本号和次版本号都不变的，但是补丁版本必须大于等于3的任意版本。
- `^1.2.3`：表示主版本号不变，次版本号和补丁版本号必须大于等于它们对应的版本，即 `>=1.2.3 <2.0.0`。
- `^0.1.2`：对应 `0.x.x` 的版本则会更严格，因为 0 作为主版本号通常表示不稳定的开发阶段，，表示主版本号和次版本号不变，补丁版本号必须大于等于它们对应的版本，即 `>=0.1.2 <0.2.0`。
- `2.x`：表示主版本号为 2 的所有版本，即 `2.x.x`。
- `3.3.x`：表示主版本号为 3，次版本号为 3 的所有版本。
- `latest`：表示最新版本。
- `file:./path/to/file`：表示从本地文件 path/to/file 中获取依赖。

```json
{
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

将依赖安装为生产环境依赖：

> [!TIP]
> `--save` 是默认的安装参数，所以可以省略，即安装为生产环境依赖，如果需要安装为开发环境依赖，需要使用 `--save-dev`或者 `-D` 参数。

```bash
npm install express
```

## devDependencies

表示项目在**开发环境**中所需要的依赖。通常包括测试库、打包工具、编译器等。这些依赖不会在生产环境中被安装，仅在开发环境中安装。

```json
{
  "devDependencies": {
    "vite": "^4.0.0"
  }
}
```

安装为开发环境依赖：
```bash
npm install -D vite@latest
```

## peerDependencies

表示依赖兼容性要求，通常用于库或插件，它会指定宿主应用所需要的特定版本的依赖。例如，如果你开发的一个依赖于特定 Vue 版本的插件。

> [!NOTE]
> 在 npm v3 到 v6 的版本，`peerDependencies` 中的依赖不会自动安装，而是会打印警告。从 npm v7 开始，`peerDependencies` 中的依赖会自动安装。

```json
{
  "peerDependencies": {
    "vue": "^3.0.0"
  }
}
```

## peerDependenciesMeta

用于配置 peerDependencies 的附加元数据，常用于指定依赖项是否为可选。如果某些依赖项在特定场景下可以不安装，可以通过 peerDependenciesMeta 来避免安装警告。

```json
{
  "peerDependenciesMeta": {
    "vue": {
      "optional": true
    }
  }
}
```

在上述配置中，即使项目没有安装 vue，也不会触发警告。这样可以对可选的 peerDependencies 做出更加灵活的配置。

## bundleDependencies

用于定义在项目发布时强制捆绑的依赖。它适用于需要确保特定依赖版本的项目，例如 CLI 工具，或有可能网络不稳定导致安装失败的依赖。

使用场景：
- 在发布项目时，将指定的依赖一起打包并发布到 npm 上。
- 确保使用项目的用户能够在离线状态下获取这些依赖。

> [!TIP]
> 还可以设置为布尔值，设置为 `true` 表示依赖都需要捆绑，设置为 `false` 表示依赖都不需要捆绑。

```json
{
  "bundleDependencies": [
    "vue",
    "vue-router"
  ]
}
```

> [!CAUTION]
> 在 package-lock.json 中也会强制锁定这些依赖。

## optionalDependencies

用于定义**可选**的依赖，即使安装失败也不会影响项目的整体运行。例如，如果项目在特定功能上依赖某个库，但该库不是核心运行所必需的，就可以将其放入 optionalDependencies。

```json
{
  "optionalDependencies": {
    "chokidar": "^3.5.1"
  }
}
```

## overrides

表示允许开发者指定特定的依赖版本来覆盖依赖树中任何层级的包版本。主要用于解决依赖冲突或修复某些包的特定问题。

举个例子就懂了，假设一个项目依赖于两个库 A 和 B，而 A 和 B 各自依赖于不同版本的库 C：
- A 依赖 C@^1.0.0
- B 依赖 C@^2.0.0

为了避免依赖冲突，项目可以使用 overrides 属性强制所有 C 的版本为 2.0.0：
```json
{
  "dependencies": {
    "A": "^1.0.0",
    "B": "^2.0.0"
  },
  "overrides": {
    "C": "2.0.0"
  }
}
```

也可以分开指定某个依赖的版本：
```json
{
  "dependencies": {
    "A": "^1.0.0",
    "B": "^2.0.0"
  },
  "overrides": {
    "A": {
      "C": "1.5.0" // 指定 A 使用 C 的 1.5.0 版本
    },
    "B": {
      "C": "2.0.0" // 指定 B 使用 C 的 2.0.0 版本
    }
  }
}
```

## main

包的主入口，用于定义包的入口文件，如果没有指定则默认为包根目录下的 `index.js` 文件。

当使用 `require` 或者 `import`导入包的时候，就是导入包的主入口的文件。

## scripts

表示包的脚本命令，用于定义包的脚本命令，包括 `dev`、`build`、`test`。

如何运行自定义脚本：
```json
// package.json
{
  "scripts": {
    "dev": "vite"
  }
}
```

```bash
npm run dev
```

### 内置脚本命令

> [!TIP]
> 使用内置命令可以忽略 `run` 命令。
> `npm run start` 可以简写为 `npm start`。

- `start`：启动项目，通常用于生产环境，默认值为 `node server.js`。
- `stop`：停止项目，没有默认值。
- `test`：测试项目，没有默认值。
<!-- - `build`：打包项目，没有默认值。 -->
- `restart`：重启项目，默认运行 `stop` 和 `start` 命令。

以下命令不建议或者不能自定义，因为它们是常用的内置命令，而且不同的包管理器中也会使用这些命令。：
- `install`：安装项目依赖。
- `uninstall`：卸载项目依赖。
- `version`：显示项目环境的版本号。
- `help`：显示帮助信息。

还有很多其他的内置命令，可以通过 `npm help` 命令查看。

#### 前置和后置脚本命令

用于在脚本命令执行前后做一些事情，只有在命令之前加上 `pre` 或者 `post` 时才会生效。

```json
{
  "scripts": {
    "predev": "node scripts/pre-dev.js",
    "dev": "node scripts/dev.js",
    "postdev": "node scripts/post-dev.js"
  }
}
```

### 自定义脚本命令

自定义脚本命令，可以通过 `npm run` 命令运行。

一些常见的自定义有：
- `build`：打包项目。
- `dev`：开发项目。
- `lint`：检查代码。
- `release`：发布项目。

## bin

指定是包的二进制文件，可以直接在终端执行的，只需要创建一个可执行文件。

> [!NOTE]
> **Shebang**（又称 #!）是一种在类 Unix 操作系统（如 Linux 和 macOS）中用于指定脚本文件解释器的特殊语法。它出现在文件的第一行，用于告诉系统运行该文件时应该使用哪个解释器（例如，Python、Node.js、Bash 等）。

shebang 的格式：
```bash
#![解释器路径或者命令的名称] [参数]
```

`#!/usr/bin/env node`，等同于在终端中执行 `env node`，它会在 `PATH` 环境变量中找到对应的解释器并执行这个文件。

```js
#!/usr/bin/env node

console.log(`Hello ${process.argv[2]}`)
```

```json
{
  "bin": "bin/hello.js"
}
```

运行命令：

```bash
npm link ./ && npx hello world
```

输出：`Hello world`

## type

用于指定项目中 JavaScript 文件的模块类型。在现代 JavaScript 中，有两种主要的模块系统：**CJS** 和 **ESM**。

属性值：
- `commonjs`(默认值)：CJS 模块，这是 Node.js 中的默认模块类型，文件后缀为 `.cjs`。
- `module`：ESM 模块，这是 ECMAScript 制定的模块类型，通常用于浏览器，文件后缀为 `.mjs`。

```js
// ESM 语法
import process from 'node:process'
export const cwd = process.cwd()

// CJS 语法
const fs = require('node:fs')
const packageJSON = JSON.parse(require('./package.json'))
module.exports = {
  package: packageJSON
}
```

> [!NOTE]
> 使用 CJS 模块类型导入 json 文件，值是文本。<br/>
> 使用 ESM 模块类型导入 json 文件，值是对象。

## types

用于指定 TypeScript 类型定义文件的入口，使 TypeScript 能正确地识别项目或库的类型声明文件。而且这对编辑器的代码提示有帮助。

```json
{
  "types": "dist/index.d.ts"
}
```

## exports

> exports 是 main 的代替方案，对于新的项目，推荐使用 exports。

用于定义模块的导出接口，让项目可以控制外部访问的路径。它允许开发者指定每个模块的入口，从而支持不同的模块格式（如 CommonJS 和 ES Module），同时避免内部文件被直接访问。
而且它支持多入口，main 只能支持单入口。

`"."` 是默认的导出口，如果只有一个出口，可以简写为以下格式：
```json
{
  "exports": "./index.js"
}
```

包的子路径导出，可以使用以下格式：
```json
{
  "exports": {
    ".": "./index.js",
    "./utils": "./src/utils/index.js",
    "./utils/*": "./src/utils/*.js",
    "./sub.js": "./src/sub.js"
  }
}
```

> 以上导出默认为文件本身使用的模块类型。

如果需要设置在不同模块类型下，每个模块的导出路径，可以使用以下格式：
- `import`：表示使用 ES Module 模块类型的导出路径。
- `require`：表示使用 CommonJS 模块类型的导出路径。
- `node`：表示使用 Node.js 模块类型的导出路径，可以是 CommonJS 模块，也可以是 ES Module 模块。
- `node-addons`：表示可以使用 C++ 插件的导出路径。
- `default`：表示默认导出路径，可以是 CommonJS 模块，也可以是 ES Module 模块，只有在以上四种情况下没有定义时才使用，此条件应始终放在最后。

> [!TIP]
> 以上条件的顺序是很重要的，因为它们会影响导出路径的选择。

```json
{
  "exports": {
    ".": {
      "import": "./index.js",
      "require": "./index.cjs",
      "node": "./index.mjs",
      "default": "./index.js",
      "types": "./index.d.ts"
    }
  }
}
```

## imports

用于在模块内部配置自定义的别名路径，简化模块的导入路径。

> [!NOTE]
> 导入路径别名必须以 `#` 开头，这是 Node.js 的约定，用于避免与 URL 或模块包名称混淆。<br/>
> 可以使用通配符 * 来匹配路径的后续部分。

假设包目录为以下结构：
```css
my-library/
├── src/
│   ├── utils/
│   │   └── helper.js
│   └── index.js
└── package.json
```

```json
{
  "imports": {
    "#utils/*": "./src/utils/*"
  }
}
```

在模块内部使用时的路径，可以使用以下格式：

```js
import helper from '#utils/helper'
```

> [!IMPORTANT]
> imports 属性只适用于模块内，不会影响模块对外部的导出或引用。

## browser

用于指定模块在浏览器环境下的替代文件或版本，它允许开发者定义在浏览器和 Node.js 环境中使用不同的文件。允许定义在浏览器中替代 Node.js 特有模块（如 fs、path 等）的文件。

假设包目录为以下结构：
```css
my-library/
├── src/
│   ├── path/
│   │   ├── index.js
│   │   └── browser-version.js
│   ├── index.js       /* 主入口文件 */
│   ├── node-version.js /* Node.js 环境特定文件 */
│   └── browser-version.js /* 浏览器环境特定文件 */
└── package.json
```

```json
{
  "browser": {
    "./src/path/index.js": "./src/path/browser-version.js",
    "./src/node-version.js": "./src/browser-version.js",
    "fs": false
  }
}
```

将模块设置为 `false`，表示不会在浏览器环境中使用此模块。
还可以之间使用一个单独的路径表示浏览器环境的入口文件。

```json
{
  "browser": "./src/browser-version.js"
}
```

## engines

指定包适用的工作环境，包括 Node.js 的版本、npm 的版本。

```json
{
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=6.0.0"
  }
}
```

## files

用于定义哪些文件或文件夹会包含在包发布（npm publish）中。它有助于排除不必要的文件（如文档、测试、配置文件等），从而减少包的体积。这个字段通常和 .npmignore 文件一起使用，但 .npmignore 可以排除更多细节。

```json
{
  "files": [
    "dist"
  ]
}
```

> [!TIP]
> package.json 总是会包含在发布的包中，无需手动指定。

## funding

用于指定包的赞助信息，可以通过指定的渠道对开发者进行赞助。

```json
{
  "funding": [
    {
      "type": "patreon",
      "url": "https://www.patreon.com/username"
    },
    {
      "type": "opencollective",
      "url": "https://opencollective.com/username"
    }
  ]
}
```

## os

可选属性，用于指定包可以运行的操作系统。

> [!TIP]
> 操作系统类型由 `process.platform` 决定。
> 如果需要表示不能在某个操作系统上运行，可以使用 `!` 前缀。

```json
{
  "os": [
    "!win32"
  ]
}
```

## cpu

可选属性，用于指定包可以运行的 CPU 架构。

> [!TIP]
> CPU 架构由 `process.arch` 决定。
> 和上面的 `os` 字段一样，可以使用 `!` 前缀。

```json
{
  "cpu": [
    "x64"
  ]
}
```

## private

用于指定包是否是私有的，如果是私有的，则不会发布到 npm 上，并且不会在 `npm search` 中搜索到该包。

```json
{
  "private": true
}
```

## publishConfig

用于定义包在发布到 npm 时的配置选项，主要用于控制发布行为。它允许你覆盖全局的 npm 配置，让特定的包按指定设置发布，适合单独控制特定模块发布的情况。

常见字段：
- `registry`：指定发布的 npm 注册表，默认是 https://registry.npmjs.org/。
- `access`：用于设置包的访问级别，可以是 public（公开）-或 restricted（私有）。私有包需要 npm 付费账户。
- `tag`：指定发布的标签，通常用于版本控制，比如 latest、beta 等。

```json
{
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public",
    "tag": "latest"
  }
}
```

## workspaces

workspaces 是一个管理多包（monorepo）项目的配置，允许在一个项目中包含多个子项目或模块。这在大型项目中很常见，比如在一个 monorepo 中管理前端、后端和公共模块。workspaces 在 npm 和 Yarn 都有支持，通常用于自动化依赖安装和模块间的互相链接。

```json
{
  "workspaces": [
    "packages/*",
    "plugins/*"
  ]
}
```

# 非官方标准的字段

并非 Node.js 官方的 package.json 配置，而是一些打包或者构建工具自定义的配置，以及社区的自定义配置。

## module

> [!TIP]
> 如果使用 module 属性，一般会使用 `main` 字段指定 commonjs 模块的入口文件。

用于指定包 ES 模块的入口文件，大多数包会支持多种模块的类型，一般情况下都是使用打包工具生成对应模块的代码。

# package.json 的自定义字段

自定义字段只有不和以上标准字段冲突就行。

```json
{
  "customKey": "customValue"
}
```

# 总结

关于包的信息都能在 package.json 中找到，了解 package.json 可以更好地帮我们管理项目。这个文件可以被不同的包管理工具读取，比如：bun、yarn、pnpm。
