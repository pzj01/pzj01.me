---
title: Javascript 和 Proxy 紧密联系的 Reflect
description: 了解 JS 的 Reflect API
date: 2024-09-09
duration: 7min
tag: [JavaScript, Reflect]
---

[[TOC]]

这个API提供了一组对象的默认静态方法，通过函数的形式可以进行对象的操作。Reflect 对象不能作为构造函数，我们只使用它的静态方法。

# Reflect 对象的静态方法

## Reflect.get()

这个方法劫持对象的获取属性的操作。

参数：
  - `target`：操作的对象
  - `key`：访问的属性名
  - `receiver`：当为`getter`时，receiver 为调用时的 this

```ts
const value = Reflect.get(target, key, receiver)
// 等同于
target[key]
```

## Reflect.set()

这个方法劫持对象的设置属性的操作。

参数：
  - `target`：操作的对象
  - `key`：设置的属性名
  - `value`：设置的属性值
  - `receiver`：当为`setter`时，receiver 为调用时的 this

```ts
// 返回一个布尔值，表示是否设置成功
const value = Reflect.set(target, key, value, receiver)
// 等同于
target[key] = value
```

## Reflect.deleteProperty()

这个方法劫持对象的删除属性的操作。

参数：
  - `target`：操作的对象
  - `key`：删除的属性名

```ts
// 返回一个布尔值，表示是否删除成功
const value = Reflect.deleteProperty(target, key)
// 等同于
delete target[key]
```

## Reflect.has()

这个方法劫持对象的检查属性的操作。

> 但是不会劫持 [Object.hasOwn()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn) 操作。

```ts
// 返回一个布尔值，表示是否存在该属性
const value = Reflect.has(target, key)
// 等同于 in 操作符
key in target
```

## Reflect.isExtensible()

这个方法劫持`Object.isExtensible()`方法的操作。

```ts
// 返回一个布尔值，表示对象是否可扩展
const value = Reflect.isExtensible(target)
// 等同于
Object.isExtensible(target)
```

## Reflect.preventExtensions()

这个方法劫持`Object.preventExtensions()`方法的操作。

```ts
// 返回一个布尔值，表示阻止对象扩展是否成功
const value = Reflect.preventExtensions(target)
// 等同于
Object.preventExtensions(target)
```

## Reflect.ownKeys()

这个方法劫持`for key in object`和`Object.getOwnPropertyNames()`的操作。

```ts
// 返回一个数组，表示对象的所有可枚举属性
const value = Reflect.ownKeys(target)
// 等同于
for (const key in target) {
  // ...
}
```

## Reflect.getOwnPropertyDescriptor()

这个方法劫持`Object.getOwnPropertyDescriptor()`方法的操作。

```ts
// 返回一个对象，表示属性的描述信息
const descriptor = Reflect.getOwnPropertyDescriptor(target, key)
// 等同于
Object.getOwnPropertyDescriptor(target, key)
```

## Reflect.getPrototypeOf()

这个方法劫持`Object.getPrototypeOf()`方法的操作。

```ts
// 返回一个对象，表示对象的原型
const prototype = Reflect.getPrototypeOf(target)
// 等同于
Object.getPrototypeOf(target)
```

## Reflect.setPrototypeOf()

这个方法劫持`Object.setPrototypeOf()`方法的操作。

```ts
// 返回一个布尔值，表示是否设置成功
const prototype = Reflect.setPrototypeOf(target, prototype)
// 等同于
Object.setPrototypeOf(target, prototype)
```

## Reflect.defineProperty()

这个方法劫持`Object.defineProperty()`方法的操作。

```ts
// 返回一个布尔值，表示是否设置成功
const value = Reflect.defineProperty(target, key, descriptor)
// 等同于
Object.defineProperty(target, key, descriptor)
```

## Reflect.apply()

这个方法劫持函数的调用操作。

参数：
  - `target`：操作的函数
  - `thisArg`：调用时的 this
  - `argArray`：调用时的参数数组

```ts
const sum = (...args) => args.reduce((a, b) => a + b, 0)
const sum = Reflect.apply(sum, null, [1, 2, 3])
// 等同于
sum(1, 2, 3)
```

## Reflect.construct()

这个方法劫持函数的`new`构造操作。

参数：
  - `target`：操作的函数
  - `argArray`：构造时的参数数组
  - `newTarget`(可选)：构造时的构造函数，作为原型的`constructor`属性，默认值为`new.target`，即 target 参数。

```ts
function Person(name) {
  this.name = name
}

const person = Reflect.construct(Person, ['张三'])
// 等同于
const p = new Person('张三')
```
