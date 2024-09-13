---
title: Vue3 reactivity
description: Vue3的响应式系统
date: 2024-09-11T17:31:00
duration: 5min
tags: [Vue3]
---

响应式系统的是Vue中的核心部分，并且它可以独立使用，它用于管理数据的状态，从而实现数据和视图的关联。在Vue2中响应式系统底层是使用`Object.defineProperty()`的遍历实现的，在Vue3中是使用`Proxy`的实现。

`Proxy`相对于`defineProperty()`方法有以下几个优点：
 1. 可以拦截对象的所有操作，比如删除、新增，遍历，检查操作。
 2. 可以监听数组的变化，比如push、splice方法。
 3. 性能更高。

> 不了解`Proxy`可以看一下这期[JavaScript 中的 Proxy(代理对象)](/blog/js-proxy)。

# 什么是响应式？

当数据改变式触发视图的更新，我们可以把视图更新抽象为一个effect函数，当数据发生变化时调用这个函数。

平常我们使用的方式：

```ts
const text = document.querySelector('.text')
const button = document.querySelector('.btn')

// 定义变量
let count = 0

btn.addEventListener('click', () => {
  // 更新变量
  count++
  // 更新视图
  text.innerHTML = count
})
```

可以将上面代码改写成使用响应式数据的方式。
 1. 定义一个响应式数据。
 2. 我们需要知道数据对应的effect函数，以便在数据变化时执行。

```ts
const text = document.querySelector('.text')
const button = document.querySelector('.btn')

// 假设有一个reactive函数定义响应式数据
const state = reactive({ count: 0 })

function updateText() {
  text.innerHTML = state.count
}

// 收集effect函数，以便在数据变化时执行
effect(updateText)

btn.addEventListener('click', () => {
  // 更新数据触发视图更新
  state.count++
})
```

## 一个简单的响应式系统

试着构建一个简单的响应式系统，用于管理数据的状态，从而实现数据和视图的关联。先从reactive函数开始实现，使用`Proxy`可以劫持对象的操作，可以方便我们收集依赖，以及触发依赖。

```ts
function reactive(target: object) {
  return new Proxy(target, {
    get(target, key) {
      // 收集依赖
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      // 触发依赖
      trigger(target, key)
      target[key] = value
    }
  })
}
```

我们现在完成`effect`函数，它接收一个effect(副作用)函数，它会收集副作用函数中使用到的数据依赖。

```ts
// 表示当前正在执行副作用
let activeEffect: Fn | null = null

function effect(fn: Fn) {
  activeEffect = fn
  fn()
  activeEffect = null
}
```

接着完成`track`函数，它会收集副作用函数中使用到的数据依赖，然后`target`对象中对应的属性的set集合中添加副作用函数。

```ts
const targetMap = new WeakMap()

function track(target: object, key: string) {
  if (!activeEffect)
    return

  // target -> map<key, set>
  const depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()))
  }

  // set<fn>
  const dep = depsMap.get(key)

  if (!dep) {
    depsMap.set(key, (dep = new Set()))
  }
  const deps = activeEffect.deps ?? []
  deps.push(dep)
  activeEffect.deps = deps
  dep.add(activeEffect)
}
```

然后完成`trigger`函数，它会触发副作用函数中使用到的数据依赖，然后依次执行副作用函数。

```ts
function trigger(target: object, key: string) {
  const depsMap = targetMap.get(target)
  if (!depsMap)
    return
  const dep = depsMap.get(key)
  if (!dep)
    return

  // 触发副作用
  dep.forEach(fn => fn())
}
```

但是这样依赖会越来越多，所以我们在收集依赖前需要清空之前的依赖。编写一个`cleanupEffect`函数用于清空依赖。

```ts
function cleanupEffect(effect) {
  const { deps } = effect
  deps.forEach((dep) => {
    if (dep.has(effect)) {
      dep.delete(effect)
    }
  })
}
```
