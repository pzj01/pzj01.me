---
title: 代码设计模式——策略模式
description: 介绍策略模式
date: 2024-07-11T16:30:00
duration: 10min
tags: [设计模式]
---

在写代码的时候使用设计模式可以让我们的维护和扩展变得更加简单和方便，我看了《HeadFirst设计模式》这本书从而了解了设计模式，因为我是一名前端，所以我就使用typescript来编写代码示例。

策略模式是一种对象行为型设计模式，它定义了算法家族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用它的客户。

假如我们有一个Duck抽象类，但是它有几种不同的子类RubberDuck（橡皮鸭）、RedheadDuck（红头鸭），这些子类都是Duck的子类。

```ts
abstract class Duck {
  abstract quack(): void
  abstract display(): void
  abstract swim(): void
}

class RubberDuck extends Duck {
  display() {
    console.log('我是橡皮鸭。')
  }

  swim() {
    console.log('我会随着水波漂浮游。')
  }

  quack() {
    console.log('我会嘎嘎叫。')
  }
}

class RedheadDuck extends Duck {
  display() {
    console.log('我是红头鸭。')
  }

  swim() {
    console.log('我会扇动翅膀游泳。')
  }

  quack() {
    console.log('我会嘎嘎叫。')
  }
}
```

但是RubberDuck（橡皮鸭）会叫吗？很显然它并不会，所以并不是所有的鸭子都会叫。在这个时候接口就派上用场了，我们可以把“叫”这个行为抽出来，放到一个接口中。会“叫”的鸭子实现它即可。

> 设计原则：找出应用中可能会发生变化的地方，把它们抽取出来，不要和固定的行为混在一起。

```ts
// 很明显，每个鸭类的叫声可能不一样
interface QuackBehavior {
  // 可以忽略以下这行代码
  // eslint-disable-next-line ts/method-signature-style
  quack(): void
}
```

只有RedheadDuck（红头鸭）才会叫，所以它实现了`QuackBehavior`接口。

```ts
// 会叫的鸭子
class RedheadDuck extends Duck implements QuackBehavior {
  quack() {
    console.log('我会嘎嘎叫。')
  }
  // ...
}

// 不会叫的鸭子
class RubberDuck extends Duck {
  // ...
}
```

在这个时候添加一种GreenheadDuck（绿头鸭），它也会叫。

```ts
class GreenheadDuck extends Duck implements QuackBehavior {
  quack() {
    console.log('我会嘎嘎叫。')
  }
  // ...
}
```

现在再让我们添加BlueheadDuck（蓝头鸭）、PinkheadDuck（粉头鸭）、WhiteheadDuck（白天鹅）和BlackheadDuck（黑天鹅），它们也会叫，这时就会发现它们叫这个行为需要实现很多次，这样就会有很多的重复代码了。如何解决呢？很简单，我们不需要每个会“叫”的鸭子都去实现`QuackBehavior`接口，把这个行为抽象成一个类，然后每个鸭子使用这个类来“叫”就行了，这种方式叫做“委托”，也可以叫“组合”。

> 设计原则：针对接口编程，而不是针对具体实现编程。

```ts
class Quack implements QuackBehavior {
  quack() {
    console.log('我会嘎嘎叫。')
  }
}
```

使用这个行为类来”叫“就可以了。

```ts
class RedheadDuck extends Duck {
  constructor() {
    this.quackBehavior = new Quack()
  }

  quack() {
    this.quackBehavior.quack()
  }
  // ...
}

// ...
```

但是这样有一个缺点，如果我们并不知道是使用的具体哪个子类，那么就不行了，比如使用多态的时候。

```ts
function duckQuack(duck: Duck) {
  // 报错：因为Duck没有quack方法，这个时候我们就意识到了，应该把quack方法提取到Duck中
  duck.quack()
}

const redheadDuck = new RedheadDuck()
const rubberDuck = new RubberDuck()

duckQuack(redheadDuck) // 我会嘎嘎叫。
duckQuack(rubberDuck) // 报错：因为橡皮鸭不会叫，即没有quackBehavior
```

所以我们把`quack`方法提取到Duck中，这样也可以完成多态情况下的使用。

```ts
abstract class Duck {
  quackBehavior: QuackBehavior
  abstract quack()
  // ...
}

class RedheadDuck extends Duck {
  quack() {
    this.quackBehavior.quack()
  }
  // ...
}

class RubberDuck extends Duck {
  quack() {
    this.quackBehavior.quack()
  }
  // ...
}
```

但是有一个不足的地方，不知道你有没有发现。那就是每个继承Duck的子类都需要实现`quack`方法，这样就会出现重复代码了。

你想想如何解决这个问题呢？

<details>
  <summary>
    解决方案：
  </summary>

  ```ts
  abstract class Duck {
    quackBehavior: QuackBehavior
    quack() {
      this.quackBehavior.quack()
    }
  }
  ```

</details>

这样的话只要子类有`quackBehavior`这个属性就可以叫了，对于不会叫的RubberDuck（橡皮鸭），我们可以添加一个不会叫的行为给它就行了。

> 设计原则：尽量少的使用继承，而是使用组合。

```ts
// 不会叫的鸭子使用它就可以了
class MuteQuack implements QuackBehavior {
  quack() {
    console.log('我不会发出叫声。')
  }
}
```

如果我们想动态修改鸭子“叫”的行为，只要修改`quackBehavior`属性就可以了，所以我们可以添加一个`setQuackBehavior`方法。

```ts
abstract class Duck {
  setQuackBehavior(quackBehavior: QuackBehavior) {
    this.quackBehavior = quackBehavior
  }
  // ...
}
```

如你所见，使用组合可以进行解耦，可以实现灵活的替换，而且不会影响到其他的功能，只要符合对应的接口规范即可。这就是设计模式中的**策略模式**。

### 总结

策略模式定义了算法族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用它的客户。
