---
title: Vue3 reactivity 源码解读 —— 第一部分
description: 了解 Vue3 的响应式系统
duration: 25min
date: 2024-09-29T17:15:00
tags: [Vue3]
---

[[TOC]]

# 什么是响应式？

这个借鉴了[观察者模式](/blog/design-pattern-observer)的思想，我们可以把数据看作一个被观察者，视图看作观察者。当数据发生变化时，我们可以通过观察者的方法更新视图。总结一句话：数据发生改变时，我们可以做一些事情，比如更新视图，发送网络请求等。有求必应，这就是响应式。

## 响应式对象是如何被创建的？

> [!IMPORTANT]
> 响应式对象的本质是一个代理对象。

我们一般都是使用reactive创建的，使用它创建的响应式对象都是深层次的。

```ts
import { reactive } from '@vue/reactivity'

const obj = reactive({
  a: {
    b: 1
  }
})

console.log(obj.a.b) // 输出 1
```

其实还有其他的响应式变体，比如：shallowReactive、readonly、shallowReadonly。

> 如果不懂 Proxy(代理)和 Reflect(反射)的，可以看这里[Proxy](/blog/js-proxy)和[Reflect](/blog/js-reflect)。

创建一个reactive.ts文件，我们可以尝试实现一个reactive函数（返回类型我们先忽略）。它会返回一个代理对象。

> [!NOTE]
> 为什么要使用 Proxy API？ <br/>
> 答：因为由于代理对象可以拦截对属性的操作，我们就可以知道用户使用了哪些属性，当属性重新设置的时候就可以更新视图了。

> [!NOTE]
> 为什么要使用 Reflect API? <br/>
> 答：Reflect 提供了一种更加一致和可靠的方式来访问对象属性。它是默认的操作行为，并且与常规的属性访问相同，但在某些边缘情况下更可预测。而且对于使用getter时，允许我们指定一个`receiver`参数，这个参数决定了getter的this指向。

## reactive 实现方式

`reactive()`将对象转换为一个深层响应式对象（即对嵌套对象生效），返回一个代理对象。

```ts
export function reactive<T extends object>(target: T) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集...
      return Reflect.get(target, key, receiver)
    },
    set(target, key, receiver) {
      // 派发更新...
      return Reflect.set(target, key, receiver)
    }
    // ...其他的处理方法
  })
}
```

> 关于依赖收集的讲解请看下一篇。

考虑到用户可能把一个已经代理的对象传入，我们需要做一个缓存，避免重复代理，这里可以使用WeakMap来实现。

> [!NOTE]
> 为什么选择WeakMap呢？<br/>
> 答：因为它的key必须是一个引用类型（一个对象或者是非全局的Symbol），因为它们是可垃圾回收的，WeakMap的键是创建它们的弱引用，即如果没有其他地方使用这个key，它就会被回收，而他对应的value也会被回收。这个使用场景非常适合响应式数据，当用户不需要时，就可以进行回收内存了。

```ts
const reactiveMap = new WeakMap<object, any>()

export function reactive<T extends object>(target: T) {
  const existingProxy = reactiveMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集...
      return Reflect.get(target, key, receiver)
    },
    set(target, key, receiver) {
      // 派发更新...
      return Reflect.set(target, key, receiver)
    }
    // ...其他的处理方法
  })

  reactiveMap.set(target, proxy)
  return proxy
}
```

这样就实现一个简单的reactive函数了。现在可以尝试实现其他的reactive变体了，比如：shallowReactive、readonly、shallowReadonly。

<details>
<summary>
  reactive()源码实现：
</summary>

```ts
// reactive.ts

export function reactive<T extends object>(target: T): Reactive<T>
export function reactive(target: object) {
  if (isReadonly(target)) {
    return target
  }

  return createReactiveObject(
    target,
    false, // 是否只读
    mutableHandlers, // 基本处理器
    mutableCollectionHandlers, // 集合处理器
    reactiveMap,
  )
}
```

</details>

## readonly 实现方式

`readonly()`可以将一个对象或者响应式对象转变为只读的响应式对象(对嵌套对象生效)，它会返回一个代理对象。

```ts
const readonlyMap = new WeakMap<object, any>()

export function readonly<T extends object>(target: T) {
  const existingProxy = readonlyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }
  const proxy = new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集...
      return Reflect.get(target, key, receiver)
    },
    set(target, key, receiver) {
      console.warn(`不能修改只读对象的属性${key}`)
      return true
    },
    // ...其他的处理方法
  })
  readonlyMap.set(target, proxy)
  return proxy
}
```

大家有没有发现，readonly和reactive实现方式的逻辑相同，只是代理的处理器不同和存放代理对象的map不同。这个时候就可以使用一个工厂函数来创建代理对象了，其实源码中也是这样实现的。

<details>
<summary>
  readonly()源码实现：
</summary>

```ts
// reactive.ts

export function readonly<T extends object>(
  target: T,
): DeepReadonly<UnwrapNestedRefs<T>> {
  return createReactiveObject(
    target,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap,
  )
}
```

</details>

### createReactiveObject 实现

这个工厂函数根据传入的`handlers`和`proxyMap`来创建不同的响应式对象。

> 源码中还针对集合类型做了专门处理，这个之后再讲。

```ts
import { isObject } from '@vue/shared'

export function createReactiveObject<T extends object>(
  target: T,
  handlers: ProxyHandler<T>,
  proxyMap: WeakMap<T, any>,
) {
  if (!isObject(target)) {
    return target
  }

  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }

  const proxy = new Proxy(target, handlers)

  proxyMap.set(target, proxy)
  return proxy
}
```

<details>
<summary>
  createReactiveObject()源码实现：
</summary>

```ts
import { isObject, toRawType } from '@vue/shared'

enum TargetType {
  INVALID, // 无效的
  COMMON, // 普通对象
  COLLECTION // 集合
}

// 根据目标对象的类型字符串返回相应的 TargetType
function targetTypeMap(rawType: string) {
  switch (rawType) {
    case 'Object':
    case 'Array':
      return TargetType.COMMON
    case 'Map':
    case 'Set':
    case 'WeakMap':
    case 'WeakSet':
      return TargetType.COLLECTION
    default:
      return TargetType.INVALID
  }
}

// 获取目标对象的类型
function getTargetType(value: Target) {
  // 如果目标跳过响应式代理或者目标不可扩展，那么直接返回无效的目标类型，否则将获取对应的目标类型
  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value))
}

function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>,
) {
  if (!isObject(target)) {
    // 在开发模式下打印警告...
    return target
  }
  // 如果目标对象已经是一个响应式对象，返回目标对象
  // 例外：在只读的情况下，如果目标对象已经是一个响应式对象，则创建一个只读代理，否则返回目标对象
  if (
    target[ReactiveFlags.RAW]
    && !(isReadonly && target[ReactiveFlags.IS_REACTIVE])
  ) {
    return target
  }

  // 如果目标对象已经存在一个代理对象，返回代理对象
  const existingProxy = proxyMap.get(target)
  if (existingProxy) {
    return existingProxy
  }


  const targetType = getTargetType(target)
  if (targetType === TargetType.INVALID) {
    return target
  }
  const proxy = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers,
  )
  proxyMap.set(target, proxy)
  return proxy
}
```

</details>

现在让我们改造reactive和readonly，让它们使用createReactiveObject工厂函数来创建代理对象。
对于每个响应式对象的处理器，我们将在之后的篇章进行详细讲解，现在请我们忽略它。

```ts
import { reactiveHandlers, readonlyHandlers } from './baseHandlers'

export function reactive<T extends object>(target: T) {
  return createReactiveObject(
    target,
    reactiveHandlers,
    reactiveMap
  )
}

export function readonly<T extends object>(target: T) {
  return createReactiveObject(
    target,
    readonlyHandlers,
    readonlyMap
  )
}
```

这样写的话，`reactive()`还是有一个问题，那就是如果传入一个readonly的对象时，不应该代理这个对象，而是直接返回这个readonly对象。那么我们需要一个函数来判断这个对象是否是readonly对象。

## 区分响应式对象和只读对象，以及其他的响应式变体

但是有一个问题，我们如何区分响应式对象和只读对象呢？我们可以使用一个唯一的标记来标记响应式对象。

```ts
// 响应式对象的标记
export enum ReactiveFlags {
  SKIP = '__v_skip', // 是否跳过响应式转换
  IS_REACTIVE = '__v_isReactive', // 是否是响应式对象
  IS_READONLY = '__v_isReadonly', // 是否是只读对象
  IS_SHALLOW = '__v_isShallow', // 是否只是浅响应式对象
  RAW = '__v_raw', // 原始对象
  IS_REF = '__v_isRef', // 是否是ref对象
}

// 一个响应式对象的接口，通过这个接口可以区分响应式对象和只读对象
export interface Target {
  [ReactiveFlags.SKIP]?: boolean
  [ReactiveFlags.IS_REACTIVE]?: boolean
  [ReactiveFlags.IS_READONLY]?: boolean
  [ReactiveFlags.IS_SHALLOW]?: boolean
  [ReactiveFlags.RAW]?: any
}
```

> 源码中`ReactiveFlags`的定义在`constant.ts`中。

## isReadonly 实现

通过响应式标记，我们就可以判断对象是否为只读的了，只要传入的值存在并且它的响应式标记为只读那么它就是一个readonly对象。

> 使用!!是强行将值转换为布尔值，因为表达式的结果可能不是一个布尔值。

```ts
export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}
```

这样我们就可以通过`isReadonly`来判断对象是否是只读对象了。

修改reactive的代码如下：

```ts
export function reactive<T extends object>(target: T) {
  if (isReadonly(target)) {
    return target
  }

  // 省略...
}
```

<details>
<summary>
  isReadonly()源码实现：
</summary>

```ts
// reactive.ts

export function isReadonly(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY])
}
```

</details>

我们还需要考虑以下边界情况：

例1：重复调用 reactive()
```ts
const reactiveObj1 = reactive({ foo: 1 })
const reactiveObj2 = reactive (obj)

// 如果是一个响应式对象，应该直接返回它
console.log(reactiveObj1 === reactiveObj2) // true
```

例2：尝试将reactive转换为readonly。

```ts
const reactiveObj = reactive({ foo: 1 })
const readonlyObj = readonly(reactiveObj)

// 如果是一个响应式对象，创建一个新的只读响应式对象
console.log(reactiveObj === readonlyObj) // false
```

例3：将只读对象传入readonly。

```ts
const reactiveObj = reactive({ foo: 1 })
const readonlyObj = readonly(reactiveObj)
const readonlyObj2 = readonly(readonlyObj)

// 如果是一个只读对象，返回它
console.log(reactiveObj === readonlyObj2) // true
```

这样我们需要使用`ReactiveFlags`来判断是否是响应式对象，并且还需要一个标记表示当前创建的是否为只读对象。
修改createReactiveObject的代码如下：

```ts
export function createReactiveObject(
  target: Target,
  isReadonly: boolean, // 表示创建的是只读对象
  handlers: ProxyHandler<any>,
  proxyMap: WeakMap<Target, any>,
) {
  // 省略...

  // 对于为什么能读取到`ReactiveFlags`，将会在handlers的部分中揭晓
  // 如果是一个响应式对象（不管是深层还是浅层），直接返回它
  // 例外情况：在只读的情况下，如果目标对象已经是一个响应式对象（不管是深层还是浅层），则直接返回目标对象，考虑例3
  if (target[ReactiveFlags.RAW] && !(isReadonly && target[ReactiveFlags.IS_REACTIVE])) {
    return target
  }

  // 省略...
}
```

## shallow 的定义

什么是shallow（浅层），即只代理顶层属性，而不代理深层属性。

```ts
const obj = {
  a: {
    b: 1
  },
  c: 2
}

// 属于浅层
obj.a
obj.c

// 属于深层
obj.a.b
```

## shallowReactive 实现

这个函数创建一个浅层响应式对象，即只有顶层属性具备响应式能力，而深层属性不具备响应式能力。

使用场景：
1. 性能优化：当只需要顶层属性具备响应式能力时，可以使用shallowReactive来创建浅层响应式对象，这样可以提高性能。
2. 部分状态管理：可以使用浅层响应式对象的深层属性创建局部状态，这样可以避免不必要的性能开销。

```ts
const shallowReactiveMap = new WeakMap<Target, any>()

export function shallowReactive<T extends object>(target: T) {
  return createReactiveObject(
    target,
    false, // 是否只读
    shallowReactiveHandlers, // 浅层处理器
    shallowCollectionHandlers, // 浅层集合处理器
    shallowReactiveMap, // 浅层响应式Map
  )
}
```

<details>
<summary>
  shallowReactive()源码实现：
</summary>

```ts
// reactive.ts

export function shallowReactive<T extends object>(
  target: T,
): ShallowReactive<T> {
  return createReactiveObject(
    target,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap,
  )
}
```

</details>

## shallowReadonly 实现

这个函数创建一个浅层只读对象，即只有顶层属性是只读的，而深层属性是可以修改的。

```ts
export function shallowReadonly<T extends object>(target: T) {
  return createReactiveObject(
    target,
    true, // 是否只读
    shallowReadonlyHandlers, // 浅层只读处理器
    shallowReadonlyCollectionHandlers, // 浅层只读集合处理器
    shallowReadonlyMap, // 浅层只读Map
  )
}
```

<details>
<summary>
  shallowReadonly()源码实现：
</summary>

```ts
// reactive.ts

export function shallowReadonly<T extends object>(target: T): Readonly<T> {
  return createReactiveObject(
    target,
    true,
    shallowReadonlyHandlers,
    shallowReadonlyCollectionHandlers,
    shallowReadonlyMap,
  )
}
```

</details>

# 其他的工具函数

让我们来实现剩下的工具函数。

## isReactive 实现

这个函数判断一个值是否为响应式对象，只要判断是否存在`ReactiveFlags.IS_REACTIVE`标记即可。

```ts
export function isReactive(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}
```

这样可能会有一些问题，比如：如果对象是一个只读对象，那么它是不是响应式对象呢？这个得分情况讨论一下。

```ts
const original = { foo: 1 }

// case 1
const reactiveObj = reactive(original)
isReactive(reactiveObj) // true，很明显，这具备响应式功能

// case 2
const readonlyObj1 = readonly(original)
isReactive(readonlyObj1) // 结果为false，预计为false，因为这不具备响应式功能，因为它是接收的不是一个代理，而是一个原始对象

// case 3
const readonlyObj2 = readonly(reactiveObj)
isReactive(readonlyObj2) // 结果为false，预计为true，但是这具备响应式功能，因为它接收的是一个代理，当代理的响应式对象改变时，它也会改变

// case 4
const readonlyObj3 = readonly(readonlyObj2)
isReactive(readonlyObj3) // 结果为false，预计为true，这个应该也具备响应式，因为它的代理上层包含了readonlyObj2，当readonlyObj2改变时，它也会改变，而readonlyObj2的值又受到reactiveObj的影响。
```

这样来看只要代理链上层中只要有一个响应式对象，那么它就是响应式对象，那么如何解决这个问题呢？

> 源码中还考虑了当传入的值是一个ref对象时，应该如何处理。

<details>
<summary>
  isReactive()源码实现：
</summary>

```ts
// reactive.ts

/**
 * @example
 * ```js
 * isReactive(reactive({}))            // => true
 * isReactive(readonly(reactive({})))  // => true
 * isReactive(ref({}).value)           // => true
 * isReactive(readonly(ref({})).value) // => true
 * isReactive(ref(true))               // => false
 * isReactive(shallowRef({}).value)    // => false
 * isReactive(shallowReactive({}))     // => true
 * ```
*/
export function isReactive(value: unknown): boolean {
  // 如果是只读对象就获取它的原始对象，递归判断原始对象是否为响应式对象，只要代理链中有一个响应式对象，那么它就是响应式对象
  if (isReadonly(value)) {
    return isReactive((value as Target)[ReactiveFlags.RAW])
  }
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE])
}
```

</details>

## isShallow 实现

这个函数判断一个值是否为浅响应式对象，只要判断是否存在`ReactiveFlags.IS_SHALLOW`标记即可。

通过以下例子即可：
```ts
const shallowObj = shallowReactive({ foo: 1 })
const shallowReadonlyObj = shallowReadonly({ foo: 1 })

isShallow(shallowObj) // true
isShallow(shallowReadonlyObj) // true
```

```ts
export function isShallow(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.IS_SHALLOW])
}
```

> `isShallow()`源码同上。

## isProxy 实现

这个函数判断一个值是否为代理对象，只要判断`ReactiveFlags.RAW`对象是否存在即可。

```ts
export function isProxy(value: unknown): boolean {
  return !!(value && (value as Target)[ReactiveFlags.RAW])
}
```

<details>
<summary>
  isProxy()源码实现：
</summary>

```ts
// reactive.ts

export function isProxy(value: any): boolean {
  return value ? !!(value as Target)[ReactiveFlags.RAW] : false
}
```

</details>

## toRaw 实现

这个函数返回响应式对象（如果是多层代理，那么返回的是最原始的响应式对象）的原始对象，如果传入的是一个原始对象，那么直接返回它。

```ts
export function toRaw<T>(observed: T): T {
  const raw = observed && (observed as Target)[ReactiveFlags.RAW]
  // 如果原始对象存在，那么递归获取最原始的响应式对象
  return raw ? toRaw(raw) : observed
}
```

> `toRaw()`源码同上。

## markRaw 实现

这个函数将标记这个对象，即不会被转换为响应式对象，并返回它。

使用方式：
```ts
const markRawObj = markRaw({ foo: 1 }) // 标记为原始对象，这个对象不能转换为响应式对象
const reactiveObj = reactive(markRawObj) // 返回这个原始对象
console.log(reactiveObj === markRawObj) // true
```

> [!NOTE]
> 为什么不使用Reflect.set呢？
> 因为Reflect.set会被代理拦截。

```ts
export function markRaw<T extends object>(value: T): T {
  // 如果对象可以扩展，则添加ReactiveFlags.SKIP标记，跳过响应式转换。
  // Reflect.defineProperty和Object.defineProperty的区别就是它返回是布尔值
  if(Object.isExtensible(value)) {
    Reflect.defineProperty(value, ReactiveFlags.SKIP, {
      value: true,
      writable: false,
      enumerable: false,
      configurable: false
    })
  }

  return value
}
```

<details>
  <summary>
    markRaw
  </summary>

```ts
// reactive.ts
import { def } from '@vue/shared'

export function markRaw<T extends object>(value: T): Raw<T> {
  if (Object.isExtensible(value)) {
    def(value, ReactiveFlags.SKIP, true)
  }
  return value
}
```

</details>