---
title: 读《JavaScript高级程序设计》—— 什么是JavaScript
description: 这是我读《JavaScript高级程序设计》的第一章节的读书笔记
date: 2024-12-24
duration: 5min
tags: [JavaScript, 读书笔记]
---

> [!PREFACE]
> “JavaScript很简单，学会它只要几分钟，但是它又很复杂，精通它需要很多年。”

# JavaScript的诞生和历史回顾

1995年，[Netspace（网景）](https://zh.wikipedia.org/wiki/%E7%B6%B2%E6%99%AF)公司的一位名叫 [Brendan Eich（布兰登·艾克）](https://zh.wikipedia.org/wiki/%E5%B8%83%E8%98%AD%E7%99%BB%C2%B7%E8%89%BE%E5%85%8B)的工程师开发了一个名为 Mocha 的语言，后来改名为 LiveScript，后来他们公司和Sun公司结为开发伙伴，共同完成 LiveScript 的开发，在发布之前为了蹭一蹭Java的风潮，LiveScript 的名称被改成了 JavaScript，这是 JavaScript 的诞生。

后来微软公司进入了Web浏览器市场，推出了IE3浏览器，并且发布了自己的 JavaScript 实现，名为 JScript（叫这个名字是为了避免与网景公司发生许可纠纷），这意味着市面上有两个版本的 JavaScript，与其他的编程语言不同，JavaScript 并没有自己的语言规范，这对许多的Web开发者并不友好，意味着他们要写更多的代码来兼容不同的浏览器。后来，在众多开发者的催促下，JavaScript 的规范化工作终于开始了。

1997年，JavaScript 作为提案被提交给 [Ecma（欧洲计算机制造商协会）](https://zh.wikipedia.org/wiki/Ecma%E5%9B%BD%E9%99%85)，由 [TC39（第39技术委员会）](https://tc39.es/zh-Hans)来承担 JavaScript 标准化（制定语法和语义）的工作。TC39委员会由来自网景、Sun、微软等对这门脚本语言感兴趣的工程师组成。最终，他们花了数月时间打造出了ECMA-262，也就是[ECMAScript](https://zh.wikipedia.org/wiki/ECMAScript)，并把它作为 JavaScript 的实现标准。

自此以后，各家的浏览器均以 ECMAScript 作为自己 JavaScript 的实现标准。

# JavaScript的实现

一个完成的JavaScript实现包含以下几个部分：

![JavaScript实现](/images/JavaScript实现.svg)

ECMAScript，即实现ECMA-262的语言（不止一门语言实现了它，比如ActionScript），JavaScript 就是一门 ECMAScript，Web浏览器只是它的一种宿主环境（Host environment），其他的宿主环境还有Node.js等其他运行环境。

那么它在 JavaScript 中具体定义了什么呢？
- 语法
- 类型
- 语句
- 关键字
- 保留字
- 操作符，比如：数学运算符和逻辑运算符。
- 全局对象，比如：`window`、`console`等。

## ECMAScript的历代版本以及其特性

<details>
    <summary>ECMAScript 1 (ES1) - 1997年6月发布</summary>

- 第一个正式发布的 ECMAScript 标准，定义了基本的语言特性和语法。
- 包括变量声明、基本运算符、控制结构（如 if、for 循环）等。
- 定义了基本的数据类型，如 Number、String、Boolean 等。
</details>

<details>
    <summary>ECMAScript 2 (ES2) - 1998年6月发布</summary>

- 主要是对 ES1 的修订，进行了一些语法和规范化的调整。
- 没有引入新的功能或特性，主要用于增强标准的兼容性和一致性。
</details>

<details>
    <summary>ECMAScript 3 (ES3) - 1999年12月发布</summary>

- 增强了正则表达式支持。
- 引入了新的语法和特性，如 try...catch 异常处理、`String.prototype.trim()`、数组方法（如 map、filter 等）。
- 支持 严格模式（strict mode），尽管严格模式直到后来的版本才成为正式特性。
</details>

<details>
    <summary>ECMAScript 4 (ES4) - 未发布</summary>

- ES4 是一个计划中的版本，但由于其相对于ES3的跨度太大（几乎像是在ES3上新定义了一门语言），所以在最终发布之前被放弃了。它包含了许多创新的功能，如类（class）、模块、接口、类型声明、协程等。
- 与此同时，TC39的一个子委员会提出了另外一份提案，只需要在JavaScript引擎基础上做一些更改就可以实现。最终被主委员会支持，这个版本内部叫ES3.1，最后转变为ES5发布。
- 因为无法达成共识，ES4 被放弃，随后 ECMAScript 的更新转向了 ES5。
</details>

<details>
    <summary>ECMAScript 5 (ES5) - 2009年12月发布</summary>

- 严格模式（strict mode）：强制执行更严格的错误检查，并禁用一些容易出错的 JavaScript 特性。
- 新增了 JSON 支持，通过 `JSON.parse()` 和 `JSON.stringify()` 方法。
- 引入了 `Array.prototype.forEach、Array.prototype.map` 等数组方法。
- 对 Object 增强了支持（如 `Object.create()、Object.defineProperty()`）。
- 支持 `getter/setter` 方法。
- 增强了 `eval()` 和 `with` 的行为。
</details>

<details>
    <summary>ECMAScript 6 (ES6) / ECMAScript 2015 - 2015年6月发布</summary>

- 符号（Symbol）：引入了新的数据类型，用于唯一标识符。
- 类（class）：引入了类的概念，简化了面向对象编程。
- 模块（import/export）：支持模块化编程，使代码更易维护。
- 箭头函数（=>）：提供了一种更简洁的函数表达式，且有词法作用域的 this。
- Set 和 Map，以及它们的弱引用版本：引入了新的数据结构，用于集合操作。
- Fetch API：提供了一种更简单的 HTTP 请求方式。
- 默认参数和剩余参数：提供了更灵活的参数传递方式。
- 模板字符串（Template literals）：提供了多行字符串和内插变量的语法。
- Promise：用于异步编程，解决回调地狱的问题。
- 迭代器（Iterator）和生成器（Generator）：迭代器用于遍历对象和数组，生成器允许创建可以暂停和恢复的函数。
- let 和 const：块级作用域的变量声明，避免了传统的 var 作用域问题。
- 解构赋值：简化了对象和数组的赋值操作。
- 增强对象字面量：简化了对象字面量的写法。
- 代理和反射：Proxy 用于拦截对象的操作，Reflect定义了一组对象的基本操作方法，它们属于元编程的一部分。
- 类型化数组（Typed Arrays）：支持更多的数据类型，如 Uint8Array、Int8Array 等。
- 正则表达式：`RegExp.prototype.flags` 返回正则表达式的标志，粘性标志（y），Unicode标志（u），`\u{}` 语法，对 Unicode 的扩展支持。
</details>

<details>
    <summary>ECMAScript 7 (ES7) / ECMAScript 2016 - 2016年6月发布</summary>

- 指数运算符（Exponentiation Operator）：引入了 `**` 作为指数运算符，替代 `Math.pow()`。
- `Array.prototype.includes`：检查数组是否包含某个值。
</details>

<details>
    <summary>ECMAScript 8 (ES8) / ECMAScript 2017 - 2017年6月发布</summary>

- Async/Await：简化异步代码的写法，成为 JavaScript 异步编程的标准。
- 异步迭代（Async Iteration）：使得异步操作支持 `for-await-of` 循环。
- `Object.entries()` 和 `Object.values()`：获取对象的键值对或值数组。
- `Object.getOwnPropertyDescriptors()`：获取对象的所有属性的描述符（descriptor）。
- 字符串填充（String padding）：`String.prototype.padStart()` 和 `String.prototype.padEnd()`。
- 共享内存和原子操作（Shared memory and Atomics）：为并行编程提供了支持。
- 尾逗号（Trailing comma）：支持在数组和对象字面量中使用尾逗号支持。
</details>

<details>
    <summary>ECMAScript 9 (ES9) / ECMAScript 2018 - 2018年6月发布</summary>

- 异步迭代（Async Iteration）：使得异步操作支持 `for-await-of` 循环。
- 对象展开/剩余（Object spread/rest）：通过 `...` 操作符进行对象的展开和获取剩余参数。
- 正则表达式改进：添加了命名捕获组和后行断言，支持 s（dotAll）标志和 Unicode property escapes。
- Promise.finally()：为 Promise 提供了 finally 方法，在处理完成后执行清理工作。
</details>

<details>
    <summary>ECMAScript 10 (ES10) / ECMAScript 2019 - 2019年6月发布</summary>

- `Array.prototype.flat()` 和 `Array.prototype.flatMap`()：展平数组。
- `Object.fromEntries()`：从键值对转换为对象。
- `String.prototype.trimStart()` 和 `String.prototype.trimEnd()`：用于修剪字符串的开始和结束部分。
- 符号（Symbol）增强：`Symbol.prototype.description` 获取符号的描述。
- `Function.prototype.toString()`：返回函数的字符串表示函数的源代码。
- 可选catch绑定（Optional catch binding）：允许在 catch 语句中绑定变量。
- `Array.prototype.sort()`：固定了排序顺序。
</details>

<details>
    <summary>ECMAScript 11 (ES11) / ECMAScript 2020 - 2020年6月发布</summary>

- BigInt：提供了对大整数的支持，超过了 JavaScript 中 Number 类型的最大值。
- 动态导入（Dynamic import）：允许动态加载模块。
- 可选链（Optional chaining）：允许在链式调用中使用可选成员。
- 空值合并（Nullish coalescing）：允许在表达式中使用 `??` 运算符。
- `Promise.allSettled()`：允许获取多个 Promise 的执行结果，无论它们是成功还是失败。
- `globalThis`：统一访问全局对象的方法。
- `import.meta`：获取模块的元数据。
- `String.prototype.matchAll()`：获取字符串中所有匹配的子字符串。
- `for...in` 优化：避免获取继承的属性。
- 模块导出命名（Named exports）：允许在模块中导出命名的成员。
</details>

<details>
    <summary>ECMAScript 12 (ES12) / ECMAScript 2021 - 2021年6月发布</summary>

- 逻辑赋值运算符（Logical Assignment Operators）：简化了条件赋值操作，支持 `&&=, ||=, ??=`。
- 聚合错误（AggregateError）：用于将多个错误合并为一个错误。
- 数字分隔符（Numeric Separators）：可以使用 _ 分隔数字，提高可读性。
- `String.prototype.replaceAll()`：替换字符串中所有匹配的子字符串。
- `Promise.any()`：类似于 Promise.race()，返回第一个成功的 Promise。
- 弱引用（Weak Reference）：用于创建弱引用，可以在垃圾回收时清除不再使用的对象。
- Internationalization API：提供了国际化的支持，包括日期和数字格式化。
- FinalizationRegistry：可以在对象被垃圾回收时执行清理操作。
</details>

<details>
    <summary>ECMAScript 13 (ES13) / ECMAScript 2022 - 2022年6月发布</summary>

- `at()`方法：支持字符串、数组，支持负索引。
- 类字段和私有字段：使用 `#` 修饰私有字段。
- 顶层 await（Top-level await）：在模块的顶层支持 await，无需在函数内使用。
- Error Cause：为错误对象添加 cause 属性，便于追踪错误的原因。
- `Object.hasOwn()`：检查对象是否拥有某个属性。
- 正则表达式支持 `d` 标志，提供索引位置。
</details>

<details>
    <summary>ECMAScript 14 (ES14) / ECMAScript 2023 - 2023年6月发布</summary>

- `findLast()` 和 `findLastIndex()`：在数组中查找最后一个匹配的元素和索引。
- Hashbang：支持在脚本文件的开头添加 `#!` 作为注释，表示脚本使用特定的解释器。
- 添加了一些不会修改源数组版本的方法：`toSorted()`，`toSpliced()`，`toReversed()`、`with()`。
- Set方法增强：添加了`Set.prototype.difference()`、`Set.prototype.intersection()`、`Set.prototype.union()`、`Set.prototype.symmetricDifference()`、`Set.prototype.isDisjointFrom()`方法，用于处理集合的交集，差集，并集，对称差集。
- 支持未注册的符号成为弱引用的key。
</details>

<details>
    <summary>ECMAScript 15 (ES15) / ECMAScript 2024 - 2024年6月发布</summary>

- `Object.groupBy()`：对对象的键进行分组，返回一个对象，键为分组后的键，值为分组后的值。
- `Promise.withResolvers()`：创建一个 Promise 对象，同时返回 resolve 和 reject 函数。
- 正则表达式支持 `v` 标志，使用 Unicode 属性集模式。
</details>

从历史版本来看，第6版带来的特性无疑是最多的，同时它还是JavaScript历史上最为重大的一个版本，在这个版本发布之后JavaScript才算是真正的踏入编程语言的行列了。

## DOM

DOM（Document Object Model），全称“文档对象模型”，它将页面上的内容抽象为一个个节点组成的一颗树。使用DOM API，JavaScript就可以通过更好的操作页面上的元素。

![DOM](/images/DOM.svg)

DOM还有着级别，它们按照完善程度来分为以下几个层次：
- DOM Level 0
  - 这不是一个正式的标准版本，而是指早期浏览器中实现的基本功能。它通常指的是浏览器提供的基本 JavaScript 对象模型，能够进行简单的文档操作。
  - 早期的浏览器（如 Netscape Navigator 和 Internet Explorer）支持了一些 JavaScript 对象来操作页面内容（如 document.getElementById()，document.createElement() 等），但是没有明确的标准或统一的 API。
- DOM Level 1
  - 1998年10月发布的，这是第一个正式的 DOM 标准，它由两个模块组成：DOM Core 和 DOM HTML。
  - 前者是 DOM 的基础，提供了对文档树的通用操作接口，适用于 HTML 和 XML 等所有类型的文档。
  - 后者则是扩展了 DOM Core，专门为 HTML 文档设计，提供了对  HTML 的对象和方法。
- DOM Level 2
  - 2000年发布，新增了以下模块：
    - DOM View：提供了对窗口和文档的操作。
    - DOM Events：提供了对事件的对象和方法。
    - DOM Style：提供了对 CSS 的对象和方法。
    - DOM Range and Traversal：提供了对文档树的遍历操作。
- DOM Level 3
