---
title: Web API - IndexedDB
description: 了解 IndexedDB
date: 2024-08-24T9:00:00
duration: 6min
tags: [Web API]
---

`IndexedDB` 是浏览器中内置的一个基于事务的数据库，用于存储较大数据量的结构化数据。它提供了一种本地存储机制，可以存储和查询数据，类似于一个NoSQL数据库。IndexedDB 非常适合存储较为复杂的数据，例如对象、数组、二进制数据（如文件、图片）等。

# IndexedDB 的特点

- 持久存储：数据存储在用户的浏览器中，即使页面刷新或浏览器关闭，数据仍然会保留，除非用户**主动清除浏览器数据**。
- 结构化数据：IndexedDB 允许你存储键值对和对象，甚至可以存储复杂的数据结构。与 localStorage 只能存储字符串不同，IndexedDB 可以存储对象。
- 事务处理：IndexedDB 使用事务来确保数据的读写操作是**原子性**的，确保数据一致性。
- 异步操作：IndexedDB 的所有操作都是异步的，不会阻塞主线程。这是为了在处理大量数据时保持UI响应。
- 支持离线应用：IndexedDB 是离线应用的理想选择，因为它允许你在没有网络连接时存储数据，并在恢复连接时同步数据。

# 使用 IndexedDB

1. 连接数据库

```ts twoslash
// 打开一个连接
const request = indexedDB.open('myDatabase', 1)

// 当打开的版本号大于当前版本号时，触发 upgradeneeded 事件
request.addEventListener('upgradeneeded', (event) => {
  console.log('数据库升级')
})

request.addEventListener('error', (event) => {
  console.log('数据库打开失败')
})

request.addEventListener('success', (event) => {
  console.log('数据库打开成功')
})
```

2. 创建事务对象

事务的模式(可选的)有三种：
   1. `readonly`：只读
   2. `readwrite`：读写
   3. `readwriteflush`: 在传递事件之前强制将事务刷新到磁盘complete。这可能用于存储以后无法重新计算的关键数据，**非标准，不推荐使用**。

事务的选项对象（可选的）：
  - `durability`：
    1. `strict`：要求浏览器在返回成功之前，将数据持久化到物理存储设备上。这可以确保数据在事务提交后立即持久化，但可能会影响性能。
    2. `relaxed`：允许浏览器在数据被持久化之前就返回成功，可能会提高性能，但在异常情况下（如断电）有丢失数据的风险。
    3. `default`：使用浏览器的默认持久化策略。具体行为取决于浏览器实现。

> 如何需要访问所有的对象存储，可以使用数据库对象上的 `objectStoreNames`属性。

事务的常用属性和方法：
  - `db`：数据库对象。
  - `durability`：事务的持久性类型。
  - `mode`：事务模式。
  - `error`：事务错误。
  - `objectStoreNames`：可访问对象存储名称。
  - `abort()`：终止事务。
  - `commit()`：提交事务，通常不必调用，因为事务会**自动提交**。
  - `objectStore(name)`：获取对象存储。

事务对象的事件：
  - `complete`：事务成功提交完成时触发。
  - `error`：事务发生错误触发。
  - `abort`：事务终止时触发。

```ts twoslash
const request = indexedDB.open('myDatabase', 1)

request.addEventListener('success', () => {
  const db = request.result
  // 指定事务可访问的对象存储
  const transaction = db.transaction(['myObjectStore'], 'readwrite')
})
```

3. 获取和创建，以及删除对象存储

```ts twoslash
const db = {} as IDBDatabase // 通过 `request.result` 获取，这里只是为了演示，使用的是一个空对象
const transaction = db.transaction('myObjectStore', 'readwrite')

// 获取已存在的对象存储
const objectStore1 = transaction.objectStore('myObjectStore')

// 创建一个新的对象存储
// keyPath 键的路径，为必填项
// autoIncrement 自动增量，为可选，默认为 false
const objectStore2 = db.createObjectStore('myObjectStore', { keyPath: 'id', autoIncrement: true })

// 删除对象存储
db.deleteObjectStore('myObjectStore')

// 关闭数据库
db.close()
```

4. 使用对象存储

```ts twoslash
const objectStore = {} as IDBObjectStore // 通过 `transaction.objectStore` 获取，这里只是为了演示，使用的是一个空对象

// 添加记录
objectStore.add({ id: 1, name: '张三' }, '0x123')

// 更新记录
objectStore.put({ id: 1, name: '张三' })

// 删除记录
objectStore.delete(1)

// 获取一条记录
const getRequest = objectStore.get(1)

getRequest.addEventListener('success', () => {
  const record = getRequest.result
  console.log(record)
})

// 获取所有记录
const keyRange = IDBKeyRange.bound(1, 5) // 了解更多请参考 https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
const getAllRequest = objectStore.getAll(keyRange, 2) // 获取 1 到 5 之间的记录，返回前面 2 条

getAllRequest.addEventListener('success', () => {
  const records = getAllRequest.result
  console.log(records)
})

// 清空对象存储
objectStore.clear()

// 获取记录总数
const countRequest = objectStore.count()

countRequest.addEventListener('success', () => {
  const count = countRequest.result
  console.log(count)
})
```

访问多条记录还有另一种方法，那就是使用游标访问，更推荐使用这种方式，因为使用`getAll`方法在找不到对应记录时会返回全部的记录，而使用`openCursor`方法可以避免这种情况，如果记录存在才会返回游标。

```ts twoslash
const objectStore = {} as IDBObjectStore
const keyRange = IDBKeyRange.bound(1, 5)

// 第二个参数是游标的方向，`next`为正向，`prev`为反向， `unique`为唯一记录，默认为`next`
const cursorRequest = objectStore.openCursor(keyRange, 'next') // 可能会有重复的记录

cursorRequest.addEventListener('success', () => {
  const cursor = cursorRequest.result
  // 如果游标存在，继续往下遍历
  if (cursor) {
    const record = cursor.value
    console.log(record)
    cursor.continue()
  }
  else {
    console.log('没有更多记录了')
  }
})
```

> 其他更多方法请参考 [IDBObjectStore 接口](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore)。

# IndexedDB 的应用场景

1. 离线应用(PWA)
2. 大型数据存储
3. 用户数据的本地持久化
