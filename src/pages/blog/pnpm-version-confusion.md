---
title: pnpm 版本混乱的真相
description: 记录了我排查 pnpm 版本问题的过程，发现 package.json 中的 packageManager 字段会自动影响使用的pnpm版本
duration: 5min
date: 2025-03-18
tags: [pnpm]
---

最近我在折腾开发环境，想确保用的是最新版的 pnpm 10.6.4，结果却发现运行<Command>pnpm -v</Command>时总是显示 9.15.9。这让我很困惑：明明用[Homebrew](https://brew.sh/) 装了 10.6.4，为什么老是冒出个旧版本？更诡异的是，每次清理掉<Path>/Users/pzj/Library/pnpm</Path>目录后，它还会自己回来！经过一番排查，我终于找到了罪魁祸首：`package.json` 里的 `"packageManager": "pnpm@9.15.9"`。这篇文章就记录下我的发现过程和解决办法，希望能帮到遇到类似问题的朋友。

## 问题的起点：版本不一致

事情是这样的。我用 Homebrew 更新了 pnpm：

```bash
brew upgrade pnpm
```

安装日志清清楚楚地告诉我，已经装了 `10.6.4`，路径是<Path>/opt/homebrew/Cellar/pnpm/10.6.4</Path>。我信心满满地运行：

```bash
pnpm -v
```

结果却显示 `9.15.9`。这让我懵了，明明<Command>which pnpm</Command>指向<Path>/opt/homebrew/bin/pnpm</Path>，怎么版本不对？

然后我检查了<Path>$PATH</Path>，但是并没有发现问题。

## 排查过程：从 PATH 到 Corepack

我开始怀疑是系统中残留了旧版本的 pnpm，于是清理了下面这个文件夹：

```bash
rm -rf /Users/pzj/Library/pnpm
```

然后我重新安装了pnpm：

```bash
brew uninstall pnpm
brew install pnpm
```

结果运行<Command>pnpm -v</Command>还是 9.15.9。更离谱的是，<Path>/Users/pzj/Library/pnpm</Path>又回来了，里面还有个<Path>.tools/pnpm/9.15.9</Path>文件夹。我彻底懵了——这目录是怎么复活的？

折腾了好一阵，我开始怀疑是项目环境的问题。于是我检查了当前目录下的 <Major>package.json</Major>，发现这行的配置：

```json
"packageManager": "pnpm@9.15.9"
```

我正在思考是不是和这个字段有关，于是我修改了一下，把它改成 `pnpm@10.6.4`，然后查看了一下版本，输出变成了 `10.6.4`，而且<Path>.tools/pnpm/10.6.4</Path>文件夹也出现了。这时候我意识到，问题出在这个 `packageManager` 字段。

## 真相大白：packageManager 和 Corepack 的秘密

经过查资料，我弄明白了这个机制。原来 packageManager 是 Node.js 从 16.9.0 开始支持的一个字段，用来指定项目推荐的包管理器版本。它背后依赖的是 Node.js 内置的 Corepack 工具。Corepack 的作用是：

检查 packageManager，当你在项目目录运行 pnpm 时，Node.js 会读取 package.json 的 packageManager 字段。
下载指定版本：如果本地没有指定的版本（比如 9.15.1），Corepack 会自动从 npm 下载。
重定向命令：之后所有的 pnpm 命令都会调用这个版本，而不是 $PATH 里的版本（比如 Homebrew 的 10.6.4）。

这就解释了为什么：

- <Command>pnpm -v</Command>显示 9.15.9：Corepack 强制用了 packageManager 指定的版本。

### 为什么会这样设计？

查了 Node.js 的文档，我发现 Corepack 是为了解决团队协作中的版本一致性问题。如果每个开发者用的 pnpm 版本不同，可能会导致依赖解析或构建结果不一致。packageManager 让项目强制使用同一版本，挺聪明的设计。但对我这种喜欢用最新版的人来说，简直是个“坑”——我装了 10.6.4，却被项目拽回 9.15.1。

### 解决办法

1. 修改或者删除 `packageManager`（推荐）。
2. 禁用 Corepack，请运行：
```bash
corepack disable
```

## 总结

但是我的电脑禁用 Corepack 之后还是没有用，只有修改 `packageManager` 有用，看来之前就是使用的 Homebrew 安装 pnpm，只是 pnpm 安装的全局包和 store，以及缓存的位置不在 Homebrew 目录下。