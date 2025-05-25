---
title: tsconfig.json
description: 一篇关于tsconfig的笔记
date: 2025-04-25
duration: 20min
tags: [tsconfig]
---

tsconfig.json 是 TypeScript 项目的配置文件，用于定义编译选项、文件包含规则以及其他项目设置。TypeScript 编译器（tsc）会根据该文件的内容来决定如何编译 TypeScript 代码。

> [!TIP]
> 当前配置版本为 TypeScript <Major>5.8.3</Major>。

以下是完整配置的 tsconfig（配置项采用默认值）：

```json
{
  "compilerOptions": {
    // 类型检查相关的选项
    "allowUnreachableCode": null, // 是否允许存在无法到达的代码（false 时会报错）
    "allowUnusedLabels": null, // 是否允许未使用的标签（false 时会报错）
    "alwaysStrict": false, // 确保编译后的 JavaScript 使用 "use strict"
    "exactOptionalPropertyTypes": false, // 严格检查可选属性的类型（如果开启将不可以使用 undefined 作为可选属性的值）
    "noFallthroughCasesInSwitch": false, // 要求 switch 语句的每个 case 都有显式终止（break 或 return）
    "noImplicitAny": false, // 禁止隐式的 any 类型
    "noImplicitOverride": false, // 要求重写方法时显式使用 override 关键字
    "noImplicitReturns": false, // 要求函数的所有路径都有返回值
    "noImplicitThis": false, // 禁止隐式的 this 类型为 any
    "noPropertyAccessFromIndexSignature": false, // 禁止通过点运算符访问索引签名的属性（需使用括号）
    "noUncheckedIndexedAccess": false, // 为索引访问添加 undefined 类型检查
    "noUnusedLocals": false, // 报告未使用的局部变量
    "noUnusedParameters": false, // 报告未使用的函数参数
    "strict": false, // 启用所有严格类型检查选项
    "strictBindCallApply": false, // 严格检查 bind、call 和 apply 方法的类型
    "strictFunctionTypes": false, // 严格检查函数参数的类型（启用逆变性）
    "strictNullChecks": false, // 启用严格的 null 和 undefined 检查
    "strictPropertyInitialization": false, // 要求类属性在构造函数中初始化
    "useUnknownInCatchVariables": false, // 将 catch 变量的默认类型设为 unknown 而非 any

    // 模块化相关的选项
    "allowArbitraryExtensions": false, // 允许导入任意扩展名的文件（需要对应 .d.ts 文件配合）
    "allowImportingTsExtensions": false, // 允许在 TypeScript 文件中导入 .ts .mts 或 .tsx 文件（仅在 emitDeclarationOnly 或 noEmit 时有效）
    "allowUmdGlobalAccess": false, // 允许在模块中以全局变量方式访问 UMD 模块，比如 Jquery
    "baseUrl": null, // 设置模块解析的基路径
    "customConditions": null, // 自定义模块解析条件（用于 exports 字段）
    "module": null, // 指定模块系统（none, commonjs, amd, system, umd, es6, es2015, es2020, es2022, esnext, node16, nodenext）
    "moduleResolution": null, // 指定模块解析策略（classic, node, node16, nodenext, bundler）
    "moduleSuffixes": null, // 指定模块解析时尝试的文件后缀
    "noResolve": false, // 禁用模块解析（仅编译显式指定的文件）
    "noUncheckedSideEffectImports": false, // 可以在不实际导入任何值的情况下导入模块。
    "paths": null, // 配置模块别名路径（需配合 baseUrl）
    "resolveJsonModule": false, // 允许导入 .json 文件并进行类型推断
    "resolvePackageJsonExports": null, // 使用 package.json 的 exports 字段进行模块解析，在 moduleResolution 为 node16、nodenext、bundler 下默认开启
    "resolvePackageJsonImports": null, // 使用 package.json 的 imports 字段进行模块解析
    "rewriteRelativeImportExtensions": false, // 将相对导入路径中的 .ts、.tsx、.mts 和 .cts 文件扩展名重写为输出文件中的 JavaScript 等效项。
    "rootDir": null, // 指定根目录
    "rootDirs": null, // 指定多个根目录，视为单一文件系统
    "typeRoots": null, // 指定类型声明文件的根目录，默认为所有可见的@types的包，比如 nodeModules/@types
    "types": null, // 指定包含的类型声明包（限制类型范围）

    // 输出（发射）到最终目录相关的选项
    "declaration": false, // 生成 .d.ts 类型声明文件
    "declarationDir": null, // 指定 .d.ts 文件的输出目录
    "declarationMap": false, // 为 .d.ts 文件生成源映射文件（.d.ts.map）
    "downlevelIteration": false, // 为迭代器（如 for...of）生成兼容低版本的代码（target 为 ES5 或更低，开启 importHelper 可以减少内联代码）
    "emitBOM": false, // 在输出文件开头添加字节顺序标记（BOM）
    "emitDeclarationOnly": false, // 仅生成 .d.ts 文件，不生成 JavaScript 文件
    "importHelpers": false, // 从 tslib 导入辅助函数（如 __extends），减少输出代码体积
    "inlineSourceMap": false, // 将源映射内联到 .js 文件中
    "inlineSources": false, // 将源代码内联到源映射中（需配合 sourceMap 或 inlineSourceMap）
    "mapRoot": null, // 指定源映射文件的根路径（用于调试）
    "newLine": null, // 指定输出文件的换行符（crlf, lf）
    "noEmit": false, // 禁用生成输出文件，仅进行类型检查
    "noEmitHelpers": false, // 不会导入 tslib 作为辅助函数，
    "noEmitOnError": false, // 当存在编译错误时不生成输出文件
    "outDir": null, // 指定编译输出文件的目录
    "outFile": null, // 将所有输出合并为单个文件（仅限 amd 或 system 模块）
    "preserveConstEnums": false, // 在输出中保留 const enum 声明
    "removeComments": false, // 从输出文件中移除所有注释
    "sourceMap": false, // 为输出文件生成源映射（.map 文件）
    "sourceRoot": null, // 指定源映射中的源文件根路径
    "stripInternal": false, // 从声明文件中移除标记为 @internal 的内容

    // 处理 Javascript 的相关的选项
    "allowJs": false, // 允许编译 JavaScript 文件（.js 和 .jsx）
    "checkJs": false, // 对 .js 文件进行类型检查（需配合 allowJs）
    "maxNodeModuleJsDepth": 0, // 在 node_modules 下搜索并加载 JavaScript 文件的最大依赖深度。

    // 编辑器相关的选项
    "disableSizeLimit": true, // 禁用 TypeScript 内存上限。为了避免在处理非常大的 JavaScript 项目时可能出现的内存膨胀问题，TypeScript 分配的内存量设有上限。
    "plugins": null, // 指定 TypeScript 语言服务插件

    // 模块互相操作相关的选项
    "allowSyntheticDefaultImports": false, // 允许对没有默认导出的模块使用默认导入（提高模块互操作性）
    "erasableSyntaxOnly": false, // Node.js 从 v23.6 开始支持直接运行 TypeScript 文件；但是，此模式下仅支持不具备运行时语义的 TypeScript 特定语法。换句话说，必须能够轻松地从文件中删除任何 TypeScript 特定语法，只留下有效的 JavaScript 文件。
    "esModuleInterop": false, // 启用 CommonJS 和 ES 模块的互操作性，简化导入
    "forceConsistentCasingInFileNames": false, // 强制文件名大小写一致（避免跨平台问题）
    "isolatedDeclarations": false, // 确保每个文件独立生成声明文件（实验性）
    "isolatedModules": false, // 将每个文件视为独立模块（适合 Babel 等工具）
    "preserveSymlinks": false, // 禁用符号链接解析（保留符号链接路径）
    "verbatimModuleSyntax": false, // 禁用类型导入的自动删除

    // 向后兼容性相关的选项
    "noImplicitUseStrict": false, // 禁用隐式使用严格模式。默认情况下，当将模块文件输出目标为非 ES6 时，TypeScript 会在文件顶部添加一个 "use strict" 语句。
    "noStrictGenericChecks": false, // 禁用严格的泛型检查
    "suppressExcessPropertyErrors": false, // 禁用多余属性检查
    "suppressImplicitAnyIndexErrors": false, // 禁用隐式 any 索引错误的报告

    // 语言和环境相关的选项
    "emitDecoratorMetadata": false, // 为装饰器生成元数据（需启用 experimentalDecorators）
    "experimentalDecorators": false, // 启用实验性装饰器功能
    "jsx": null, // 控制 JSX 的处理方式（preserve, react, react-native, react-jsx, react-jsxdev）
    "jsxFactory": "React.createElement", // 指定 JSX 工厂函数
    "jsxFragmentFactory": "React.Fragment", // 指定 JSX Fragment 工厂函数
    "jsxImportSource": "react", // 指定 JSX 模块的导入源（用于 react-jsx 等模式）
    "lib": null, // 指定包含的 TypeScript 标准库（如 ["es6", "dom"]）
    "libReplacement": null, // 替换指定的库包
    "moduleDetection": "auto", // 控制模块检测行为（auto, legacy, force）
    "noLib": false, // 禁用自动包含 TypeScript 标准库
    "reactNamespace": "React", // 指定 JSX 命名空间（推荐使用 jsxFactory）
    "target": "ES5", // 指定编译后的 JavaScript 目标版本（es3, es5, es6, es2015, es2016, es2017, es2018, es2019, es2020, es2021, es2022, esnext）
    "useDefineForClassFields": null, // 使用 defineProperty 而非直接赋值来定义类字段（符合 ECMAScript 标准），如果 target 为 es2022或者更高的版本，则默认为 true，否则为 false

    // 编译器诊断相关的选项
    "diagnostics": false, // 输出编译器的诊断信息（性能分析）
    "explainFiles": false, // 输出编译器处理的文件列表及其原因（用于调试）
    "extendedDiagnostics": false, // 输出详细的编译性能诊断信息
    "generateCpuProfile": "profile.cpuprofile", // 生成编译器的 CPU 性能分析文件
    "generateTrace": false, // 生产事件跟踪和类型列表
    "listEmittedFiles": false, // 列出所有生成的文件（用于调试）
    "listFiles": false, // 列出编译器处理的所有文件（用于调试）
    "noCheck": false, // 禁用全类型检查
    "traceResolution": false, // 输出模块解析的详细日志（用于调试）

    // 项目相关的选项
    "composite": false, // 启用项目引用和增量编译，生成 .tsbuildinfo 文件，适用于需要多个 tsconfig.json 的项目
    "disableReferencedProjectLoad": false, // 禁用自动加载引用的项目（用于优化大型项目，减少内存占用），只有在编辑器打开项目时动态加载
    "disableSolutionSearching": false, // 处理复合 TypeScript 项目时，此选项提供了一种方法，用于声明在使用“查找所有引用”或“跳转到编辑器中的定义”等功能时不希望包含该项目。（您可以使用此标志来提高大型复合项目的响应速度）
    "disableSourceOfProjectReferenceRedirect": false, // 禁用优先使用源文件而非声明文件（如 .d.ts）进行项目引用的重定向
    "incremental": false, // 启用增量编译，生成 .tsbuildinfo 文件以加速编译，composite 选项必须启用
    "tsBuildInfoFile": ".tsbuildinfo", // 指定增量编译信息文件的路径

    // 输出格式相关的选项
    "noErrorTruncation": false, // 禁用错误信息的截断，显示完整错误详情
    "preserveWatchOutput": false, // 在 --watch 模式下保留控制台输出
    "pretty": true, // 美化错误和消息的输出格式

    // 完备性相关的选项
    "skipDefaultLibCheck": false, // 跳过默认标准库的类型检查，推荐使用 skipLibCheck
    "skipLibCheck": false, // 跳过所有声明文件（.d.ts）的类型检查
    "assumeChangesOnlyAffectDirectDependencies": false, // 优化增量编译，仅重新检查直接依赖的文件

    // 以下为可能被废弃的选项
    "charset": "utf8", // 指定输入文件的字符编码
    "importsNotUsedAsValues": "remove", // 控制仅用于类型的导入的处理方式（remove 删除，preserve 保留，error 报错），已被 yerbatimModuleSyntax 取代
    "keyofStringsOnly": false, // 限制 keyof 操作符仅返回字符串
    "preserveValueImports": false // 保留仅用于值的导入（即使未使用），已被 yerbatimModuleSyntax 取代
  },
  "watchOptions": {
    "watchFile": null, // 指定watch模式下单个文件的策略，fixedPollingInterval（以固定间隔每秒多次检查每个文件是否有更改）、priorityPollingInterval（以优先检查间隔每秒多次检查每个文件是否有更改）、dynamicPriorityPolling（使用动态队列，减少对修改频率较低的文件的检查频率）、useFsEvents（默认，尝试使用操作系统/文件系统的原生事件来监听文件更改）、useFsEventsOnParent（尝试使用操作系统/文件系统的原生事件来监听文件父目录的更改）
    "watchDirectory": null, // 指定watch模式下目录的策略，fixedPollingInterval、dynamicPriorityPolling、useFsEvents
    "fallbackPolling": "fixed", // 使用文件系统事件时，此选项指定当系统耗尽原生文件监控器和/或不支持原生文件监控器时使用的轮询策略，fixedPollingInterval、priorityPollingInterval、dynamicPriorityPolling、synchronousWatchDirectory（禁用目录的延迟监控。当可能同时发生大量文件更改时（例如，运行 npm install 后 node_modules 发生变化），延迟监控非常有用，但对于一些不太常见的设置，您可能需要使用此标志禁用它。）
    "synchronousWatchDirectory": false, // 在不支持原生递归监视的平台上，同步调用回调并更新目录监视器的状态。无需设置短暂的超时时间，以允许对文件进行多次编辑。
    "excludeDirectories": ["node_modules", "dist"], // 指定watch模式下忽略的目录
    "excludeFiles": [] // 指定watch模式下忽略的文件
  },

  // 类型采集，适用于javascript项目
  "typeAcquisition": {
    "enable": true, // 启用类型采集
    "include": ["jqery"], // 指定类型采集的文件
    "exclude": ["jest", "mocha"], // 排除类型采集的文件
    "disableFilenameBasedTypeAcquisition": false // 禁用基于文件名的类型采集
  },
  "include": ["src/**/*", "test/**/*"], // 指定要包含的文件或者目录，支持通配符
  "exclude": ["dist/**/*"], // 指定要排除的文件，默认值为 ["node_modules", outDir]
  "references": [
    {
      "path": "./tsconfig.app.json"
    },
    {
      "path": "./tsconfig.node.json"
    }
  ], // 指定引用的 tsconfig 文件
  "extends": "./tsconfig.base.json", // 指定继承的 tsconfig 文件
  "files": [] // 指定要包含的文件，必须为明确的路径
}
```

> [!Note]
> <Major>allowArbitraryExtensions、customConditions</Major>以上字段仅在<Minor>moduleResolution</Minor>选项为 `node16`、`nodenext` 和 `bundler` 下有效。

## 经常使用的选项

以下是关于一些常见选项的详细说明。

### Module

- module：指定生成的 JavaScript 代码的模块系统，决定模块的定义和导入/导出方式。
  - `commonjs`：适用于 Node.js 项目（早期非 ES 模块环境）或传统环境。
  - `esnext`：现代项目使用 ES 模块，通常与打包工具（Webpack、Vite）或 Node.js 18+ 配合。
  - `node16`、`nodenext`：Node.js 项目。
  - `system`：适用于 SystemJS 环境，如 Webpack。
  - `amd`：适用于 AMD 模块环境，如 RequireJS。
  - `umd`：适用于 Universal Module Definition，如 Webpack。
- moduleResolution：指定模块的解析策略，决定如何从代码中导入模块。
  - `classic`：早期非 ES 模块环境，不推荐使用。
  - `node`：CommonJS 模块解析策略，适用于旧版本 Node.js。
  - `node16`：Node.js 16 解析策略，支持Node.js的CommonJS和ESM模块的双模解析，适用于混合模块项目。
  - `nodenext`：最新的Node.js解析策略，支持Node.js的CommonJS和ESM模块的双模解析，推荐使用ESM，适用于现代Node.js项目。
  - `bundler`：适用于 Webpack、Vite 等打包工具的策略。
- target：指定生成的 JavaScript 代码的目标环境。
- moduleDetection：控制如何检测模块系统（文件是否为模块）。
  - `auto`：自动检测模块和脚本，适用于大多数情况。
  - `force`：强制启用模块系统，无论文件是否为模块。
  - `legacy`：强制禁用模块系统，无论文件是否为模块。

```json
{
  "compilerOptions": {
    "types": ["node", "jest"] // 包含 @types/node 和 @types/jest
  }
}
```

- moduleSuffixes：指定模块解析时尝试的文件后缀，一般在多平台开发使用。

```json
{
  "compilerOptions": {
    "moduleSuffixes": [".ios.ts", ".android.ts", ".ts"]
  }
}
```

- resolvePackageJsonExports：使用 package.json 的 exports 字段进行模块解析。
- resolvePackageJsonImports：使用 package.json 的 imports 字段进行模块解析。
- esModuleInterop：启用 CommonJS 和 ES 模块的互操作性，简化导入语法。
- isolatedDeclarations：确保每个文件独立生成声明文件。
- isolatedModules：将每个文件视为独立模块，限制 TypeScript 特有语法。

### Types

- types：指定全局的类型声明文件，即不需要在每个文件中都引入都可以使用的类型。
- lib：指定包含的 TypeScript 标准库。

```json
{
  "compilerOptions": {
    "lib": [
      "DOM", // 浏览器环境
      "WebWorker", // WebWorker 环境
      "ScriptHost", // Windows Script Host
      "DOM.Iterable" // DOM 迭代器
    ]
  }
}
```

### Paths

- paths：指定路径别名，用于简化导入路径。

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

### Syntax

- verbatimModuleSyntax：禁止类型导入的自动移除

输入（报错）：
```ts
import { Foo } from './foo' // Foo 仅用于类型
let x: Foo
```

修复：
```ts
import type { Foo } from './foo'
let x: Foo
```

- suppressImplicitAnyIndexErrors：禁止隐式 `any` 索引类型错误

未禁用：
```ts twoslash
// @errors: 2339
const obj = { x: 10 }
console.log(obj.foo)
```

可以使用：
```ts twoslash
// @errors: 2339
const obj = { x: 10 }
// @ts-expect-error: Property 'foo' does not exist on type '{ x: number; }'.
console.log(obj.foo)
```

- noUncheckedIndexedAccess：启用严格的索引访问检查，要求在访问对象索引签名时考虑值的潜在 undefined 类型。

```ts
interface Environment {
  OS: string
  [key: string]: string
}

declare const env: Environment

const OS = env.OS // string
const NODE_ENV = env.NODE_ENV // 未启用时 string，启用时 string | undefined
```

- suppressExcessPropertyErrors：禁止多余属性检查

未禁用：
```ts twoslash
// @errors: 2353
interface Point {
  x: number
  y: number
}

const p: Point = { x: 1, y: 3, m: 10 } // 报错，m 属性不存在
```

### JSX

- jsx：控制 JSX 的处理方式。

> 以下是对应选项的输入和输出。

  ```tsx
  export const HelloWorld = () => <h1>Hello world</h1>
  ```

  - `preserve`：保留 JSX，交给其他工具（如 Babel）处理。

    ```tsx
    import React from 'react'
    export const HelloWorld = () => <h1>Hello world</h1>
    ```

  - `react-native`：适用于 React Native 开发。

    ```tsx
    import React from 'react'
    export const HelloWorld = () => <h1>Hello world</h1>
    ```

  - `react-jsx`：现代 React 项目，使用 JSX Transform，如 <Minor>react/jsx-runtime</Minor>。

    ```ts
    import { jsx as _jsx } from 'react/jsx-runtime'
    export const HelloWorld = () => _jsx('h1', { children: 'Hello world' })
    ```

  - `react`：传统 React 项目，使用 `React.createElement`。

    ```ts
    import React from 'react'
    export const HelloWorld = () => React.createElement('h1', null, 'Hello world')
    ```

- jsxFactory：指定编译 JSX 元素时使用的工厂函数，默认值为 `React.createElement`。

- jsxFragmentFactory：指定编译 JSX 片段（Fragment，如 <Patch><></></Patch>）时使用的工厂函数，默认值为 `React.Fragment`。
- jsxImportSource：指定 JSX 的导入路径。

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxFactory": "h", // 使用 h 代替 React.createElement
    "jsxFragmentFactory": "Fragment" // 使用 Fragment 代替 React.Fragment
    // "jsxImportSource": "preact" // 使用 preact/jsx-runtime
  }
}
```

输入：
```tsx
const HelloWorld = () => <div>Hello</div>
function Frag() {
  return (
    <>
      <h1>Fragment</h1>
      <p>Hello</p>
    </>
  )
}
```

输出：
```js
import * as preact_1 from 'preact'
const HelloWorld = () => (0, preact_1.h)('div', null, 'Hello')
function Frag() {
  return (0, preact_1.h)(
    preact_1.Fragment,
    null,
    (0, preact_1.h)('h1', null, 'Fragment'),
    (0, preact_1.h)('p', null, 'Hello')
  )
}
```
