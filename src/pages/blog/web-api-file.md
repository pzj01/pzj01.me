---
title: Web API - File(文件)
description: 了解 Blob 和 File，以及如何读取文件内容
date: 2024-08-20T10:56:00
duration: 5min
tags: [Web API]
---

在了解文件对象之前，我们需要了解`Blob`（Binary Large Object），它表示一个不可变的、原始数据的类文件对象。它主要用来处理文件、图片、视频等二进制数据，以及创建 URL 对象，或者上传文件等。

# Blob的特点

1. 不可变：一旦创建了 Blob 对象，其内容是不可变的，无法直接修改。你可以创建新的 Blob 来进行更新。
2. 二进制数据：Blob 可以存储文本、二进制数据（如文件内容、图像、音频等），并可以设置 MIME 类型，以便数据能被正确地解析和使用。
3. 分块存储：Blob 可以包含多个不同类型的数据片段（Blob、ArrayBuffer、字符串等），这使得它非常灵活。

## 创建一个 Blob

```ts twoslash
const blob = new Blob(['hello world'], { type: 'text/plain' })

const uInt8Data = new Uint8Array([1, 2, 3, 4, 5])
const binary = new Blob([uInt8Data], {
  type: 'application/octet-stream',
})
```

## Blob 的常用方法和属性

- `size`：返回 Blob 对象的大小（以字节为单位）。
- `type`：返回 Blob 对象的 MIME 类型。
- `slice()`：创建一个新的 Blob 对象，表示原始 Blob 的子集。
- `text()`：异步读取 Blob 对象的内容，并将其作为文本字符串返回。
- `arrayBuffer()`：异步读取 Blob 对象的内容，并返回包含数据的 ArrayBuffer。
- `stream()`：返回一个 ReadableStream 对象，用于逐块读取 Blob 的内容。

```ts twoslash
const blob = new Blob(['hello world'], { type: 'text/plain' })

// 读取 Blob 的文本内容
blob.text().then(text => console.log(text))

// 读取 Blob 的 ArrayBuffer
blob.arrayBuffer().then(arrayBuffer => console.log(arrayBuffer))

// 读取 Blob 的二进制数据
blob.stream().getReader().read().then(result => console.log(result))
```

## Blob 的常见用途

- 上传文件
- 下载文件
- 处理二进制数据
- 处理文本数据

# File 对象

File 对象是 Blob 的子类，用于表示文件，它可以在 Blob 的使用场景中使用。

## 创建一个 File 对象

```ts twoslash
const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' })

console.log(file.name)
```

# FileReader 对象

FileReader 对象是用于读取文件的对象，它可以用于异步读取文件的内容，但是它不能按照文件系统的路径名读取文件，如果需要按照文件系统的路径名读取文件，可以使用 FileSystem Access API。

FileReader 对象的常用方法和属性：
- `readAsText()`：读取文件内容并将其作为文本字符串返回。
- `readAsBinaryString()`：读取文件内容并将其作为二进制字符串返回。
- `readAsArrayBuffer()`：读取文件内容并返回包含数据的 ArrayBuffer。
- `readAsDataURL()`：读取文件内容并返回包含数据的 Data URL。
- `result`：返回读取的文件内容。
- `error`：返回读取过程中的错误信息。
- `readyState`：返回当前读取状态，包括 0：未开始，1：正在读取，2：读取完成。

事件：
- abort：当读取过程被中止时触发。
- error：当读取过程中出现错误时触发。
- load：当成功读取完成时触发。
- loadend：当读取完成时触发，无论读取成功还是失败。
- loadstart：当读取开始时触发。
- progess：当读取进度发生变化时触发。

## 读取文件内容

> 如果需要同步读取文件内容，可以使用 `FileReaderSync` 对象。

```ts twoslash
const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' })

const reader = new FileReader()

// 读取文件内容
reader.readAsText(file)

// 读取文件内容完成打印
reader.addEventListener('load', () => {
  console.log(reader.result)
})
```

## 读取文件内容（同步）

> 此特性仅在 Web Worker（不包括 Service Worker）中可用。

```ts
const file = new File(['hello world'], 'hello.txt', { type: 'text/plain' })

const reader = new FileReaderSync()

// 读取文件内容
const text = reader.readAsText(file)

console.log(text)
```
