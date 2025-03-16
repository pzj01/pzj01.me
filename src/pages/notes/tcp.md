---
title: 传输层 —— TCP 协议
description: 了解 TCP 协议
date: 2025-02-14
duration: 10min
tags: [Network, TCP]
---

TCP 是一种**面向连接的传输层协议**，为应用层提供**可靠的数据传输服务**。它是**因特网协议栈（TCP/IP 协议族）** 的核心协议之一，广泛应用于需要数据完整性和顺序性保障的场景，如网页浏览（HTTP/HTTPS）、电子邮件（SMTP/IMAP）等

### 特点

- 面向连接
  - 在通信前，必须通过**三次握手**建立连接。
  - 在数据传输完成后，通过**四次挥手**释放连接。
- 可靠传输
  - 数据分段：将数据分成适合传输的小段。
  - 序列号：每个数据段都有序列号，保证数据按顺序组装。
  - 确认机制：接收方通过 ACK（Acknowledgment）确认接收到的数据。
  - 重传机制：若超时未收到确认，自动重发丢失的数据。
- 流量控制
  - 使用滑动窗口机制，调节发送方的速度，防止接收方因负载过高而丢包。
- 拥塞控制
  - 根据网络状况动态调整发送速度，避免因网络过载而导致通信质量下降。

> [!NOTE]
> 全双工表示：可以同时在两端传输，比如：电话。<br>
> 半双工表示：同一时间只能有一个端口传输，比如：对讲机，只能有一个人说话，另一个人只能听。

- 全双工通信
  - 数据可以同时在两端传输，发送方和接收方均可独立发送和接收数据。

### 报文格式

TCP 数据报文由**头部**和**数据部分**组成。TCP 头部长度通常为 20 字节（不含可选字段），主要包含以下字段：

| 字段 | 长度（位/bits） | 说明 |
| --- | --- | --- |
| 源端口（Source Port）| 16 | 表示发送端的端口号，用于标识发送方的应用程序。 |
| 目的端口（Destination Port） | 16 | 表示接收端的端口号，用于标识接收方的应用程序。 |
| 序列号（Sequence Number）| 32 | 表示本报文段数据的序号，确保数据按序组装。 |
| 确认号（Acknowledgment Number）| 32 | 确认接收到的数据序号，表示接收方期望的下一个序号。 |
| 数据偏移（Data Offset）| 4 | 指示 TCP 头部的长度（以 4 字节为单位），用于定位数据部分的起始位置。 |
| 保留字段（Reserved）| 6 | 保留未用，置 0。 |
| 标志位（Flags）| 6 | 用于控制连接状态的标志位，包括 SYN、ACK、FIN 等。 |
| 窗口大小（Window Size）| 16 | 表示接收方当前的缓冲区大小，用于流量控制。 |
| 校验和（Checksum）| 16 | 计算 TCP 头部的校验和，用于检测数据的完整性。 |
| 紧急指针（Urgent Pointer）| 16 | 表示紧急数据的位置，用于处理拥塞情况。 |
| 可选字段（Options）| 可变长度 | 可选字段，用于扩展 TCP 头部，包括 TCP 拥塞控制、流量控制等。 |

```ts
// TCP.ts，模拟 TCP 头部

enum TCPFlags {
  SYN, // 同步请求建立连接，用于 三次握手的第一步。
  ACK, // 确认已接收到的数据，用于响应对方的报文。
  FIN, // 结束请求断开连接，用于 四次挥手的第一步。
  RST, // 重置连接，用于异常终止连接或拒绝连接请求。
  PSH, // 立即推送数据到接收方应用层，而不必等待缓冲区填满。
  URG, // 紧急数据，需要接收方优先处理（紧急数据结束位置由紧急指针 Urgent Pointer 标识）。
  ECE, // 拥塞控制，用于控制数据传输速度和流量。
  CWR, // 拥塞窗口缩小，用于避免拥塞时的数据丢失。
  NS, // 不分流，用于避免拥塞时的数据丢失。
}

interface TCPHeader {
  sourcePort: number
  destinationPort: number
  sequenceNumber: number
  acknowledgementNumber: number
  dataOffset: number
  reserved: number
  flags: number
  windowSize: number
  checksum: number
  urgentPointer: number
  options?: number[]
}

const tcpHeader: TCPHeader = {
  sourcePort: 433,
  destinationPort: 80,
  sequenceNumber: 0, // 指示本报文段数据的序号，确保数据按序组装。
  acknowledgementNumber: 0, // 确认接收到的数据序号，表示接收方期望的下一个序号。
  dataOffset: 5, // 指示 TCP 头部的长度（以 4 字节为单位），用于定位数据部分的起始位置。
  reserved: 0, // 保留未用，置 0。
  flags: TCPFlags.SYN, // 用于控制连接状态的标志位，包括 SYN、ACK、FIN 等。
  windowSize: 0, // 表示接收方当前的缓冲区大小，用于流量控制。
  checksum: 0, // 计算 TCP 头部的校验和，用于检测数据的完整性。
  urgentPointer: 0, // 表示紧急数据的位置，用于处理拥塞情况。
  options: [], // 可选字段，用于扩展 TCP 头部，包括 TCP 拥塞控制、流量控制等。
}
```

### 工作流程

三次握手确保了连接双方都能互相确认彼此的存在并准备好通信，而四次挥手用于保证双方都能完全关闭连接。

三次握手（建立连接）：
  1. 第一次握手：
      - 客户端发送一个 SYN（同步序号）报文，表示希望建立连接。
      - SYN 报文包含客户端的初始序列号。
  2. 第二次握手：
      - 服务端接收 SYN 后，发送一个带有 SYN 和 ACK 的报文，表示接受请求并同步序号。
      - ACK 用于确认接收到客户端的 SYN，SYN 用于向客户端同步序号。
  3. 第三次握手：
      - 客户端接收服务端的 SYN+ACK 后，发送一个 ACK 报文，确认连接建立。

```go
客户端               服务端
  SYN  ------------>
       <------------  SYN+ACK
  ACK  ------------>
```

四次挥手（释放连接）：
  1. 第一次挥手：
      - 客户端发送一个 FIN 报文，表示不再发送数据，但可以接收数据。
  2. 第二次挥手：
       - 服务端接收 FIN 后，返回一个 ACK 报文，确认关闭请求。
  3. 第三次挥手：
      - 服务端发送一个 FIN 报文，表示数据传输结束，准备关闭连接。
  4. 第四次挥手：
      - 客户端接收 FIN 后，返回 ACK 并进入 TIME_WAIT 状态，等待一段时间以确保服务端收到 ACK 后关闭连接。

```go
客户端               服务端
  FIN  ------------>
       <------------  ACK
       <------------  FIN
  ACK  ------------>
```

### 数据可靠性机制

- 序列号和确认号
  - 序列号：确保数据按序传输，避免乱序。
  - 确认号：接收方发送确认号，告知发送方已成功接收的数据。
- 超时重传
  - 发送方在指定时间内未收到 ACK，会重新发送数据。
- 滑动窗口
  - 控制发送数据的大小，防止接收方的缓冲区溢出。
- 校验和
  - 用于检测数据在传输过程中是否被篡改或损坏。

# 使用Nodejs简单实现一个TCP服务端和客户端

服务端：

```ts twoslash
import { createServer } from 'node:net'

const server = createServer((socket) => {
  console.log('[服务端] 连接成功')

  socket.on('data', (data) => {
    console.log('[服务端] 接收到数据:', data)

    // 向客户端发送数据
    socket.write('Hello, Client.')

    // 结束连接
    // socket.end('Bye')
  })

  socket.on('end', () => {
    console.log('[服务端] 连接关闭')
  })
})

server.on('close', () => {
  console.log('[服务端] 停止监听')
})

server.listen(3000, () => {
  console.log('[服务端] 启动成功，正在监听 3000 端口')
})
```

客户端：

```ts twoslash
import { createConnection } from 'node:net'

const socket = createConnection({
  host: '127.0.0.1',
  port: 3000
}, () => {
  console.log('[客户端] 连接成功')

  // 向服务端发送数据
  socket.write('Hello, Server.', () => {
    console.log('[客户端] 发送数据成功')
  })
})

// 当接收到服务端的数据
socket.on('data', (data) => {
  console.log(`[客户端] 接收的数据${data}`)

  setTimeout(() => {
    // 结束连接
    socket.end('Bye')
  }, 3000)
})

// 当服务端的连接关闭
socket.on('end', () => {
  console.log('[客户端] 连接关闭')

  // 销毁连接
  socket.destroy()
})

// 客户端的连接关闭
socket.on('close', () => {
  console.log('[客户端] 关闭')
})
```
