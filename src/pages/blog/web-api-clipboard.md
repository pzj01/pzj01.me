---
title: Web API - Clipboard(剪切板)
description: 使用浏览器的剪切板 API
date: 2024-09-07T09:55:00
duration: 5min
tags: [Web API]
---

这个 API 可以通过编程方式访问剪切板，也可以将内容复制到剪切板。

## 读取剪切板内容

有两个方法可以读取剪切板内容，这两个方法分别是 `readText()` 和 `read()`。一个是读取文本内容，一个是各个类型的数据。

> [!NOTE]
> 剪切板所有的方法都是异步的。
> 以下MIME类型始终支持：
> text/plain、text/html、image/png。

`read(formats)`返回的是一个`ClipboardItem`对象，它包含了剪切板中的数据，使用`formats`参数可以指定读取的[MIME类型](https://developer.mozilla.org/zh-CN/docs/Glossary/MIME_type)。

ClipboardItem 对象有一个 `types` 属性，它是一个数组，包含了剪切板中的数据的类型。使用`getTypes(type)`方法可以获取剪切板中对应类型的数据，另外它还有一个`presentationStyle`属性，用来控制展示方式，默认为`unspecified`（由浏览器决定）、 `inline`（内联，可以插入到文本中） 和 `attachment`（附件，可能作为文件）。

<ClipboardDemo text-mode />

```ts twoslash
if (navigator.clipboard) {
  navigator.clipboard.readText().then((text) => {
    console.log(text)
  })
}
```

## 读取剪切板的图片

<ClipboardDemo />

```ts twoslash
if (navigator.clipboard) {
  navigator.clipboard.read().then(async ([item]) => {
    const blob = await item.getType('image/png')
    console.log(blob)
  })
}
```

## 将文本写入剪切板

使用`write(data)`和`writeText(text)`方法可以将数据写入剪切板。

<ClipboardDemo type="write" text-mode />

```ts twoslash
if (navigator.clipboard) {
  navigator.clipboard.writeText('hello world').then(() => {
    console.log('写入成功')
  }).catch((error) => {
    console.error(error)
  })
}
```

## 将图片数据写入剪切板

默认只支持`image/png`类型的图片数据，如果需要其他类型的图片可以通过`FileReader`对象来读取arrayBuffer，然后转换为`image/png`类型的Blob写入剪切板。

<ClipboardDemo type="write" />

```ts twoslash
const response = await fetch('https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.png?auto=compress&cs=tinysrgb&dpr=1&w=500')
const blob = await response.blob()

if (navigator.clipboard) {
  // 创建剪切板项目
  const clipboardItem = new ClipboardItem({
    [blob.type]: blob,
  }, {
    presentationStyle: 'inline'
  })

  navigator.clipboard.write([clipboardItem]).then(() => {
    console.log('写入成功')
  }).catch((error) => {
    console.error(error)
  })
}
```
