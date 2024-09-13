---
title: Web API —— Storage(存储)
description: 了解 localStorage 和 sessionStorage
date: 2024-08-21T10:14:00
duration: 2min
tags: [Web API]
---

作为 Web Storage API 的接口，Storage 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。

> Storage中只能存储字符串。

# Storage API 的常用方法和属性

- `length`：返回当前域名下的存储数据项的数量
- `key(index)`：返回指定索引的存储数据项的 key
- `getItem(key)`：返回指定 key 的存储数据项
- `setItem(key, value)`：设置指定 key 的存储数据项
- `removeItem(key)`：删除指定 key 的存储数据项
- `clear()`：删除所有存储数据项

## localStorage(本地存储)

本地存储是基于当前文档的域名进行存储，并且在页面关闭后不会丢失存储的数据。

```ts twoslash
// 写入
localStorage.setItem('key', 'value')
// 读取
localStorage.getItem('key')
// 删除
localStorage.removeItem('key')
// 清空
localStorage.clear()
```

## sessionStorage(会话存储)

会话存储也是基于当前文档的域名进行存储，当页面被关闭或刷新时，会将存储的数据项全部清空。

```ts twoslash
// 写入
sessionStorage.setItem('key', 'value')
// 读取
sessionStorage.getItem('key')
// 删除
sessionStorage.removeItem('key')
// 清空
sessionStorage.clear()
```
