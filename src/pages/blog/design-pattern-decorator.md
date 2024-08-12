---
title: 代码设计模式——装饰器模式
description: 介绍装饰器模式
date: 2024-07-13T10:26:00
duration: 5min
tags: [设计模式]
---

> 上期[观察者模式](/blog/design-pattern-observer)。

这个模式一般是为了增强功能，不会影响到原来的功能。这就是设计模式中的**装饰器模式**。它很好的遵守以下设计原则。

> 设计原则：开放扩展功能，改变修改功能。

假设我需要开一家名为星巴兹的饮品店，饮品有许多种类，并且可以加的配料有很多种。

```ts
// 饮品抽象类
abstract class Beverage {
  // 对饮品的描述
  private description: string
  // 计算饮品价格
  cost(): number
  getDescription() {
    return this.description
  }
}

class Espresso extends Beverage {
  constructor() {
    this.description = '浓咖啡'
  }

  cost() {
    return 10
  }
}

class DarkRoast extends Coffee {
  constructor() {
    this.description = '深色咖啡'
  }

  cost() {
    return 10
  }
}
```

如果客人的口味不同，添加的配料也不同，那么我们可以在饮品类中添加一个装饰类来完成，这样就不用修改原来的饮品类，我们的装饰器需要继承饮品类这样才能保证每次都是对饮品这个核心添加调料（增强功能）。

```ts
// 配料装饰器
abstract class CondimentDecorator extends Beverage {
  // 添加配料的饮品
  private beverage: Beverage
  constructor(beverage: Beverage) {
    this.beverage = beverage
  }

  // 返回带有配料的饮品描述
  getDescription() {
    return `${this.beverage.getDescription()}, 加${this.description}`
  }
}

class Mocha extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage)
    this.description = '摩卡'
  }

  cost() {
    return this.beverage.cost() + 0.7
  }
}

class Milk extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage)
    this.description = '牛奶'
  }

  cost() {
    return this.beverage.cost() + 0.5
  }
}

class Whip extends CondimentDecorator {
  constructor(beverage: Beverage) {
    super(beverage)
    this.description = '绵绵冰'
  }

  cost() {
    return this.beverage.cost() + 0.8
  }
}

// 浓咖啡
const espresso = new Espresso()
// 带牛奶的浓咖啡
const milkEspresso = new Milk(espresso)
// 带摩卡的浓咖啡
const mochaEspresso = new Mocha(espresso)
// 带绵绵冰的浓咖啡
const whipEspresso = new Whip(espresso)
// 加了一大堆调料的深色咖啡
const darkRoast = new Whip(
  new Milk(
    new Mocha(
      new DarkRoast()
    )
  )
)
```

这样的话，我们可以在饮品类中添加一个装饰类来完成，这样就不用修改原来的饮品类，如果需要添加新的配料，只需要添加一个装饰类即可，但是这样写法看起来怪，这个在我们使用公厂模式和建造者模式的时候可以解决。

### 总结

装饰器实际上是一种“拓展”模式，它可以增强功能，但是不会影响到原来的功能，可以理解为一层外包装。
