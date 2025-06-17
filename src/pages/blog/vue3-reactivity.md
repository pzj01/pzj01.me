---
title: Vue3 reactivity 源码解读 —— 大纲
description: 了解 Vue3 的响应式系统
duration: 2min
date: 2024-10-07T21:36:00
tags: [Vue3]
---

> 使用的源码版本为的是 @vue/reactivity@3.5.16

src目录下文件大概功能说明：
- `reactive.ts`（[第一部分](/blog/vue3-reactivity-part1)）：这是 Vue 3 响应式系统的**核心文件**。它定义了创建响应式对象的主要函数，如 `reactive`、`readonly` 等，以及一些用于检查对象是否是响应式的工具函数。
- `baseHandlers.ts`（[第二部分](/blog/vue3-reactivity-part2)）：它定义了**如何拦截和处理对响应式对象的各种操作**，包括属性访问、设置、删除等。它是实现 Vue 3 响应式系统的关键部分，确保了数据变化可以被正确地追踪和触发更新。
- `dep.ts`（第三部分）：它是定义了存储依赖的数据结构和收集依赖，以及如何触发依赖更新。
- `effect.ts`（第四部分）：它定义了如何创建，管理副作用，以及如何将副作用与依赖关联起来。
- `ref.ts`（第五部分）：它定义 ref 的核心文件。它定义了 ref 的创建、操作和类型处理。
- `computed.ts`（第六部分）：它定义了计算属性的核心逻辑。
- `collectionHandlers.ts`（第七部分）：它定义了如何拦截和处理集合类型的操作。
- `watch.ts`（第八部分）：它定义了 watch 的核心逻辑。
- `effectScope.ts`（第九部分）：它定义了 effectScope 的核心逻辑。
- `arrayInstrumentations.ts`（可选）：这个文件重写了数组的方法，用于处理数组的特殊情况，
- `constant.ts`（穿插在前面的部分中）：这个文件定义的响应式系统的常量，如 `ReactiveFlags` 和 `TrackOpType` 等。
