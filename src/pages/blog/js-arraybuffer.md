---
title: JavaScript 中的 ArrayBuffer 是什么？
description: 了解 JavaScript 中的 ArrayBuffer。
date: 2024-08-19T19:10:00
duration: 3min
tags: [JavaScript]
---

`ArrayBuffer` 是 JavaScript 中的通用的原始二进制数据缓冲区，它是一种二进制数据的集合，可以理解为一块固定的内存区域，就是其他语言中的`byte[]`（字节数组）。但是它不能直接操作里面的数据，而是需要使用视图对象来操作数据，因为它是作为基础缓冲区给其他对象使用的，比如TypedArray（类型化数组）。

# 为什么要使用 ArrayBuffer？

因为它是原始的二进制数据，可以处理多种文件格式，比如：视频，文本，音频，图片等。而且在多线程中，可以共享数据。

## 创建一个 ArrayBuffer

```ts twoslash
// 创建一个 8 字节的 ArrayBuffer
const buffer = new ArrayBuffer(8)

// 获取字节大小
console.log(buffer.byteLength)
```

## 分割 ArrayBuffer

`slice`方法可以用来分割 ArrayBuffer，它返回的是一个新的 ArrayBuffer，并且其中的数据也是原始数据的副本，原始的 ArrayBuffer 不会被改变。

```ts twoslash
const buffer = new ArrayBuffer(8)

// 分割 为 4字节的 ArrayBuffer
const buf = buffer.slice(0, 4)
```

## 重新设置 ArrayBuffer的大小

`resize`方法可以调整 ArrayBuffer的大小，如果缩小了，剩余的数据会被丢弃，扩大则会填充0， 但是需要在创建的时候指定`maxByteLength`才能生效。

> 注意：`resize`方法会改变原始的 ArrayBuffer。
> `resizable`属性会返回一个布尔值，表示是否可以调整大小。

```ts
const buffer = new ArrayBuffer(2, { maxByteLength: 8 })

// 重新设置 为 16字节的 ArrayBuffer
buffer.resize(4)
```

## 转移 ArrayBuffer的数据到另一个 ArrayBuffer

`transfer`方法可以把 ArrayBuffer的数据转移到另一个新的 ArrayBuffer中，并使原来的 ArrayBuffer（分离）失效，它这个新的 ArrayBuffer，这个新的ArrayBuffer的选项和原始的ArrayBuffer相同。

```ts
const buffer = new ArrayBuffer(8)

// 转移 为 4字节的 ArrayBuffer
const buf = buffer.transfer(4)
```

## 使用 DataView 操作 ArrayBuffer

`DataView`类可以使用不同类型的方式来操作 ArrayBuffer，但是这样的操作会比较混乱，推荐使用`TypedArray`。

```ts twoslash
const buffer = new ArrayBuffer(8)

// 创建 DataView
const dv = new DataView(buffer)

// 修改 DataView
dv.setUint8(0, 100) // 修改第一个字节
dv.setUint16(1, 200) // 修改第二个字节到第三个字节

// 获取 DataView
console.log(dv.getUint8(0))
```

## 使用 TypedArray 操作 ArrayBuffer

类型化数组是使用单一类型来操作`ArrayBuffer`的视图，并且它拥有和普通数组相同的方法，它的内部使用`ArrayBuffer`保存数据。

```ts twoslash
const buffer = new ArrayBuffer(8)

// 创建 TypedArray
const dv = new Uint8Array(buffer) // Uint8 表示以 8 位无符号整数格式操作，即操作一个字节，一个字节表示一个数
const dv16 = new Uint16Array(buffer) // Uint16 表示以 16 位无符号整数格式操作，即操作两个字节，二个字节表示一个数

// 修改 TypedArray
dv[0] = 100 // 修改第一个字节

// 获取 TypedArray
console.log(dv[0])

// 使用of方法创建 TypedArray
const dv2 = Int8Array.of(1, 2, 3)

// 使用from方法创建 TypedArray
const dv3 = Uint8Array.from([1, 2, 3])
```

总结：使用`ArrayBuffer`可以节省内存。
