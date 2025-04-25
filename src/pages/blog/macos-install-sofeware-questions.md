---
title: 关于Mac安装第三方软件遇到的一些问题
description: 关于Mac安装第三方软件遇到的一些问题
duration: 5min
date: 2025-04-10
tags: [Mac]
---

# 如何开启“任何来源”选项

在 macOS 10.12 之后，系统默认隐藏了这个选项，这个苹果为了提高系统安全性，限制用户随意安装未知来源的软件做的调整。

解决方法：

1. 打开终端，运行以下命令

```bash
sudo spctl --master-disable
```

2. 输入管理员密码，并回车完成以上操作，重新打开设置就可以看到“任何来源”选项了。

# Gatekeeper

Gatekeeper 是 Apple 引入的一项 macOS 安全功能，旨在保护用户免受恶意软件的侵害。它通过验证应用的数字签名和来源，确保只有可信的软件能在 Mac 上运行。

以上命令就是禁用 Gatekeeper，如果需要检查 Gatekeeper 的状态：

```bash
spctl --status
```

如果返回 assessments disabled，表示 Gatekeeper 已禁用。

如果需要重新启用 Gatekeeper，请运行：

```bash
sudo spctl --master-enable
```

## 文件隔离（Quarantine）

从互联网下载的文件（如应用、插件或安装包）会被添加一个“隔离属性”（com.apple.quarantine），触发 Gatekeeper 在首次运行时进行检查。
Gatekeeper 要求用户确认是否信任该文件，防止误运行恶意代码。

删除隔离属性：
```bash
xattr -d com.apple.quarantine /path/to/your/app
```

查看隔离属性：
```bash
xattr -l com.apple.quarantine /path/to/your/app
```

如果输出中包含 `com.apple.quarantine`，说明该文件拥有隔离属性。
