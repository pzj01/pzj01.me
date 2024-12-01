---
title: Javascript 文件上传
description: 学习文件上传
duration: 10min
date: 2024-11-03
tags: [JavaScript]
---

在本文中，我们将学习如何在浏览器中上传文件的相关技术。在这之前我们先了解一下 `<input type="file" />` 标签。

它有以下属性需要了解：
- `accept`：指定允许的文件类型，可以是 MIME 类型，也可以是扩展名。
- `multiple`：是否允许同时上传多个文件，默认为 `false`。
- `capture`：用于在移动设备上直接调用摄像头、麦克风等设备采集数据（如拍照、录像或录音）。它可以显式指定用户使用设备采集新数据，而不是从已有文件中选择。这个属性主要用于移动设备上的浏览器，在桌面设备上通常没有效果，它有以下值。
  - `user`：使用前置摄像头（通常适用于自拍）。
  - `environment`：使用后置摄像头（适用于拍摄外部物体）。
  - `空值`：如果没有指定值，但 accept 设置了音频格式（如 audio/*），设备会打开麦克风。
- `webkitdirectory`：它允许用户在文件选择时选择一个文件夹，而不是单个文件。启用 webkitdirectory 后，用户可以选择一个目录（文件夹），并将该目录下的所有文件作为 FileList 上传到服务器或处理。

> [!NOTE]
> 非标准属性：webkitdirectory 是基于 WebKit 内核的扩展属性，因此并非所有浏览器支持

## 上传单个文件

<FileUploadDemo type="single" />

```html
<input type="file" accept="image/*" />
```

```js
const input = document.querySelector('input[type="file"]')
const button = document.querySelector('.upload-btn')

input.addEventListener('change', () => {
  const formData = new FormData()
  formData.append('file', input.files[0])
  fetch('/upload', {
    method: 'POST',
    body: formData,
    // 如果body是 FormData，Content-Type 不需要设置
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
  })
})
```

## 文件预览

使用 `URL.createObjectURL()` 方法创建一个指向内存中 Blob 对象的 URL。

> [!NOTE]
> 在不需要URL之前记得使用 `URL.revokeObjectURL()` 方法清除 URL，防止内存泄露。

```js
const input = document.querySelector('input[type="file"]')
const preview = document.querySelector('.preview')

input.addEventListener('change', () => {
  const file = input.files[0]
  const url = URL.createObjectURL(file)
  preview.src = url
})
```

## 上传多个文件

<FileUploadDemo type="multiple" />

```html
<input type="file" accept="image/*" multiple />
```

```js
const input = document.querySelector('input[type="file"]')
const button = document.querySelector('.upload-btn')

input.addEventListener('change', () => {
  const formData = new FormData()
  for (const file of input.files) {
    // append方法不会覆盖原有的值，而是在原有值的基础上追加，只有set方法才能覆盖
    formData.append('files', file)
  }

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
})
```

## 上传二进制数据

> [!IMPORTANT]
> 只适用于非 GET 请求，并且 body 传入的数据类型必须是 Blob 或 File。

将 `Content-Type` 设置为 `application/octet-stream` 可以上传二进制流数据，不过这个只能一次上传单个文件。

<FileUploadDemo type="binary" />

```html
<input type="file" accept="image/*" />
```

```js
const input = document.querySelector('input[type="file"]')
const button = document.querySelector('.upload-btn')

input.addEventListener('change', () => {
  const file = input.files[0]
  const searchParams = new URLSearchParams({
    filename: file.name,
    type: file.type,
  })
  fetch(`/upload?${searchParams}`, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  })
})
```

## fetch 流式上传

流式上传主要用于上传大文件，例如视频、音频等。

> [!IMPORTANT]
> 使用流式上传时，请务必注意以下几点：
> - 必须使用 HTTP/2 协议，而且服务端必须支持 HTTP/2。
> - 设置 `duplex` 为 `half`。
> - 必须支持 CORS，no-cors 不允许流式传输请求。<br/>
> 具体可以参考：[fetch 流式上传](https://developer.chrome.com/docs/capabilities/web-apis/fetch-streaming-requests?hl=zh-cn#streaming_request_bodies)。

<FileUploadDemo type="stream" />

```html
<input type="file" accept="video/*" />
```

```js
const input = document.querySelector('input[type="file"]')
const button = document.querySelector('.upload-btn')

button.addEventListener('click', () => {
  const stream = input.files[0].stream()
  formData.append('file', input.files[0])
  fetch('/upload', {
    method: 'POST',
    body: stream,
    duplex: 'half' // duplex 为 half 时，服务端必须支持 HTTP/2
  })
})
```

## 上传进度

使用 XMLHttpRequest 上传文件时，支持监听上传进度。fetch API 默认不支持监控上传进度，但是可以使用 stream 上传来实现。

```html
<div class="progress"></div>
<input type="file" accept="image/*" />
```

```js
const input = document.querySelector('input[type="file"]')
const button = document.querySelector('.upload-btn')
const progress = document.querySelector('.progress')

button.addEventListener('click', () => {
  const formData = new FormData()
  formData.append('file', input.files[0])
  axios.post('/upload', formData, {
    onUploadProgress: (progressEvent) => {
      progress.style.width = `${(progressEvent.loaded / progressEvent.total) * 100}%`
    }
  })
})
```

## 分片上传

对于比较大的文件，如果如果一次上传会导致内存溢出，可以使用分片上传。

<FileUploadDemo type="chunked" />

```ts
// chunkUpload.ts

// 定义分片的接口
interface Chunk {
  hash: string
  index: number
  data: Blob
}

const chunkedFileInputRef = document.querySelector('.chunked-file-input')

async function uploadChunkedFile() {
  const files = chunkedFileInputRef?.files
  if (!files)
    return
  const file = files[0]
  const chunks = await sliceChunks(file, {
    chunkSize: 1024 * 1024 * 1, // 1MB
  })

  console.log(chunks)
}

// 切割文件为多个块
async function sliceChunks(file: File, options: {
  chunkSize: number
}) {
  const { chunkSize } = options
  // 最大并发数
  const maxWorker = navigator.hardwareConcurrency || 4
  const chunkTotal = Math.ceil(file.size / chunkSize)
  const workerHandleTotal = Math.ceil(chunkTotal / maxWorker)
  const promises: Promise<Chunk[]>[] = []
  for (let i = 0; i < maxWorker; i++) {
    // 使用 Web Worker 进行分片
    const worker = new Worker('/chunk.worker.js', {
      name: `chunk.worker.${i}`,
    })

    const promise = new Promise<Chunk[]>((resolve, reject) => {
      // 向 worker 发送消息
      worker.postMessage({
        startIndex: i * workerHandleTotal,
        chunkTotal: workerHandleTotal,
        chunkSize,
        file,
      })

      // 接收 worker 返回的切片
      worker.addEventListener('message', (e) => {
        resolve(e.data as Chunk[])
      })

      worker.addEventListener('error', reject)
    })
    promises.push(promise)
    // 执行完毕后，关闭 worker
    promise.finally(() => worker.terminate())
  }

  // 等待所有 worker 完成，将结果排序打平
  return (await Promise.all(promises)).sort((a, b) => a[0].index - b[0].index).flat()
}
```

```js
// chunk.worker.js

// 导入 SparkMD5
globalThis.importScripts('https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js')

const { SparkMD5 } = globalThis

globalThis.addEventListener('message', async (e) => {
  const { startIndex, chunkTotal, file, chunkSize } = e.data
  const total = startIndex + chunkTotal
  const spark = new SparkMD5.ArrayBuffer()

  const chunks = []
  for (let i = startIndex; i < total; i++) {
    // 计算当前切片的起点和终点
    const start = i * chunkSize
    let end = start + chunkSize

    // 为最后一个切片特殊处理
    if (end > file.size) {
      end = file.size
      i = total
    }

    const slice = file.slice(start, end)
    spark.append(await slice.arrayBuffer())
    chunks.push({
      index: i,
      data: slice,
      hash: spark.end(),
    })
  }

  // 向主线程返回切片
  globalThis.postMessage(chunks)
})
```

## 断点续传

## 文件秒传
