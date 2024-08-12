---
title: 修改移动端状态栏样式
description: 修改移动端状态栏样式
date: 2024-07-03T15:00:00
duration: 3min
tags: [mobile]
---

有的时候我们设计移动端网页的时候，为了让网页看起来更美观，我们可以设置手机浏览器状态栏的颜色以匹配网页的主色调，这样看起来整个网页会更自然一些。

通常都是在meta标签中设置，但是对于不同的浏览器来说设置的方式是不一样的。

## Chrome

```html
<meta name="theme-color" content="#fff000">
```

## Safari

如果content设置为*default*，状态栏显示正常。如果设置为*black*，状态栏背景为黑色。如果设置为*black-translucent*，状态栏为黑色半透明。

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

## Firefox

```html
<meta name="msapplication-navbutton-color" content="#fff000">
```
