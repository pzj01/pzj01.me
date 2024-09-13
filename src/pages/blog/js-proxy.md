---
title: JavaScript 中的 Proxy(代理对象)
description: 了解JS的代理对象 Proxy
date: 2024-09-10
duration: 3min
tag: [JavaScript, Proxy]
---

`Proxy` 是 JavaScript 中的内置对象，它是一种用来创建对象的代理对象。`Proxy` 用于实现对对象的拦截，以及对对象的属性的读取和设置。

# 什么是代理对象？

代理对象就像是明星和经纪人之间的关系，假设你需要一个明星来代言你的产品，通常你不能和明星之间商量，而是要和他的经纪人商量。如果商量好了，经纪人就会通知明星。代理对象就像是在中间夹了一层，可以拦截一些行为，添加一些其他的东西。

# 基本使用

代理对象需要配合`handler`(拦截处理器)使用，他可以拦截以下的行为：
  - `get`：读取
  - `set`：设置
  - `getOwnPropertyDescriptor`：获取属性描述符
  - `defineProperty`：定义属性
  - `deleteProperty`：删除属性
  - `getPrototypeOf`：获取原型
  - `setPrototypeOf`：设置原型
  - `preventExtensions`：阻止扩展
  - `isExtensible`：是否可扩展
  - `ownKeys`：获取拥有的属性
  - `has`：in 运算符，是否拥有某个属性
  - `apply`：函数调用，这个一般针对函数
  - `construct`： new 运算符，这个一般针对类和函数

## 创建代理对象

> 使用 Reflect 调用对象操作，[Javascript 和 Proxy 紧密联系的 Reflect](/blog/js-reflect)。

```ts
// 原始对象
const original = {
  name: 'pzj',
  age: 18,
  hobby: ['game', 'music'],
  say() {
    console.log(`hello${this.name}`)
  }
}

type Original = typeof original

// 拦截处理器
const handler: ProxyHandler<Original> = {
  get(target, key, receiver) {
    console.log('get 读取的property', key)
    return Reflect.get(target, key, receiver)
  },
  // ...
}

// 代理对象
const proxy = new Proxy<Original>(original, handler)

// 使用代理对象
proxy.name
```

## 代理数组

```ts
const proxyArray = new Proxy([1, 2, 3], {
  set(target, key, value, receiver) {
    console.log('set 读取的property', key)
    return Reflect.set(target, key, receiver)
  }
})

proxyArray.push(4)
```
