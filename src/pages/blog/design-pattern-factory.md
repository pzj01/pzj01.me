---
title: 代码设计模式——工厂模式
description: 介绍工厂模式
date: 2024-07-13T12:00:00
duration: 10min
tags: [设计模式]
---

> 上期[装饰器模式](/design-pattern-decorator)。

工厂模式是一种对象创建型设计模式，它通过一个工厂类来封装对象创建的过程，可以将对象的创建和对象的使用进行解耦。

当看到`new`关键字，就会想到”具体“，还记得设计原则中的针对接口而不是具体实现编程吗？当代码中绑定着具体类的时候就会使代码更脆弱，缺乏灵活性。

```ts
// 使用接口会更灵活
//           ↓
const duck: Duck = new RubberDuck() // ← 但是还得建立具体类的示例

// 当有需要根据条件创建鸭子的时候，我们可能会这样写
let d: Duck

if (Math.random() > 0.5) {
  d = new MallardDuck()
}
else {
  d = new RubberDuck()
}
```

当看到这样的代码，一旦发生改变或扩展，就要重新打开这段代码进行修改，这样修改可能会使程序更难维护，根据设计原则我们应该将它抽取出来。

假设你有一个披萨🍕店，你的代码可能会这样写：

```ts
class Pizza {
  // ...
}

class PizzaShop {
  orderPizza() {
    const pizza = new Pizza()

    // 以下是披萨店的流程
    // 准备
    pizza.prepare()
    // 烘烤
    pizza.bake()
    // 切片
    pizza.cut()
    // 打包
    pizza.box()

    return pizza
  }
}
```

如果你需要更多种类的披萨类型，并创建它们。

```ts
abstract class Pizza {
  // ...
}

// 具体的披萨
class CheesePizza extends Pizza {
  // ...
}

class VeggiePizza extends Pizza {
  // ...
}

class PepperoniPizza extends Pizza {
  // ...
}

class PizzaShop {
  orderPizza(type: string) {
    let pizza: Pizza
    if (type === 'cheese') {
      pizza = new CheesePizza()
    }
    else if (type === 'veggie') {
      pizza = new VeggiePizza()
    }
    else if (type === 'pepperoni') {
      pizza = new PepperoniPizza()
    }

    // 其他步骤...
  }
}
```

如果你需要在你的菜单中添加流行的披萨或者移除没有人吃的披萨，那么你将会修改`orderPizza`方法中的代码，很明显，这违反设计原则中的开闭原则，是时候将创建的过程封装起来了。

最好把创建披萨代码移动到一个新的对象中，由这个对象负责创建披萨，这个对象我们就称为“工厂”，让工厂处理创建披萨的细节，当需要披萨时，就叫工厂做一个披萨。`orderPizza`方法就只关心从工厂中获取披萨，并处理它。

### 建立一个简单的披萨工厂

```ts
class SimplePizzaFactory {
  createPizza(type: string) {
    let pizza: Pizza

    if (type === 'cheese') {
      pizza = new CheesePizza()
    }
    else if (type === 'veggie') {
      pizza = new VeggiePizza()
    }
    else if (type === 'pepperoni') {
      pizza = new PepperoniPizza()
    }

    return pizza
  }
}
```

现在，我们可以改造`PizzaShop`类，代码如下：

```ts
class PizzaShop {
  constructor(private factory: SimplePizzaFactory) {}

  orderPizza(type: string) {
    const pizza = this.factory.createPizza(type)

    // 其他步骤...
    return pizza
  }
}
```

经过良好的发展，我们的披萨店击败当地的同行，现在我们需要在其他的地方添加连锁店，但是有一个问题，那就是每个地域的风味都不一样，如果使用我们之前的方式会怎么样呢？

```ts
// 上海店的工厂
const shanghaiPizzaFactory = new ShanghaiPizzaFactory()
const shanghaiPizzaShop = new PizzaShop(shanghaiPizzaFactory)

// 北京店的工厂
const beijingPizzaFactory = new BeijingPizzaFactory()
const beijingPizzaShop = new PizzaShop(beijingPizzaFactory)
```

### 工厂方法模式

如果我需要每个店铺都有自己地域独特的制作手法呢？允许子类做决定，将创建披萨的方法交给子类实现，这样还能将一些固定步骤放在父类中。

> 工厂方法模式就是定义了一个创建对象的接口，让子类决定实例化哪一个产品类，工厂方法让类把实例化推迟到子类。

```ts
abstract class PizzaShop {
  // 我只要下订单就行了，并不需要关心做的是哪个口味的披萨，只要它是一个披萨就行
  abstract orderPizza(type: string): Pizza
  orderPizza(type: string) {
    // 这里使用的是参数化工厂方法，因为我们知道每个店铺都有自己的风味
    const pizza = this.createPizza(type)

    // 其他步骤...
    return pizza
  }
}

// 上海店
class ShanghaiPizzaShop extends PizzaShop {
  createPizza(type: string) {
    let pizza: Pizza
    if (type === 'cheese') {
      pizza = new ShanghaiCheesePizza()
    }
    else if (type === 'veggie') {
      pizza = new ShanghaiVeggiePizza()
    }
    else if (type === 'pepperoni') {
      pizza = new ShanghaiPepperoniPizza()
    }

    return pizza
  }
}

// 北京店
class BeijingPizzaShop extends PizzaShop {
  createPizza(type: string) {
    // 北京风味的披萨...

    return pizza
  }
}
```

这样的好处是当`orderPizza`方法被调用时，我们并不需要关心要做哪一种披萨，而是由子类决定。我们的每个地区的披萨店可以随时添加独特的风味披萨。

```ts
// 上海店
const shanghaiPizzaShop: PizzaShop = new ShanghaiPizzaShop()
// 上海口味的起司披萨
const shanghaiCheesePizza = shanghaiPizzaShop.orderPizza('cheese')

// 北京店
const beijingPizzaShop: PizzaShop = new BeijingPizzaShop()
// 北京口味的起司披萨
const beijingCheesePizza = beijingPizzaShop.orderPizza('cheese')
```

简单工厂模式和工厂方法模式的区别是，简单工厂只是将创建对象的方式封装起来，它不具有工厂方法的灵活性，而工厂方法模式则是定义了一个创建对象的接口（这个接口可以理解为超类型），让子类决定如何创建对象。

### 抽象工厂模式

假设你没有听说过“工厂”，下面是一个不使用工厂的披萨店：

```ts
// 这个版本的披萨店依赖于所有的披萨，每增加一种披萨就多一个依赖
class DependentPizzaShop {
  createPizza(style: string, type: string) {
    let pizza: Pizza
    if (style === 'shanghai') {
      if (type === 'cheese') {
        pizza = new ShanghaiCheesePizza()
      }
      else if (type === 'veggie') {
        pizza = new ShanghaiVeggiePizza()
      }
      else if (type === 'pepperoni') {
        pizza = new ShanghaiPepperoniPizza()
      }
    }
    else if (style === 'beijing') {
      if (type === 'cheese') {
        pizza = new BeijingCheesePizza()
      }
      else if (type === 'veggie') {
        pizza = new BeijingVeggiePizza()
      }
      else if (type === 'pepperoni') {
        pizza = new BeijingPepperoniPizza()
      }
    }

    pizza.prepare()
    pizza.bake()
    pizza.cut()
    pizza.box()

    return pizza
  }
}
```

很明显，在代码中减少对具体类的依赖是一件好事，事实上下面这个设计原则就阐述了这一点。

> 设计原则：要依赖于抽象，而不是具体。<br/>

以上这个设计原则就是著名的依赖倒置原则（DIP）。首先是不是感觉这个有点像“针对接口编程”，的确很相似，但是这里强调了“抽象”，这个原则说明了高层组件不应该依赖于低层组件，两者都应该依赖于抽象，而抽象不应该依赖于细节，细节应该依赖于抽象。简单来说，就是通过依赖于抽象（接口或抽象类）而不是具体实现类，使得系统更加灵活和可扩展。

以下几个方针可以帮我们遵循这个原则：
- 不要在一个类中new另一个类
- 不要让类继承一个具体类
- 不要覆盖基类中已实现的方法

当然不用完全遵循这个原则，只要能够满足我们的需求就可以了。

当我们需要披萨的原料的时候，抽象工厂模式就派上用场了。这个工厂将创建原料家族中的每一种原料（面团、酱料，芝士等等）。使用抽象工厂当然应该先创建一个接口来创建原料，你需要实现接口中的方法来创建原料。

### 总结

简单工厂模式适用于创建对象比较少的情况下使用，工厂方法模式适用于创建对象种类比较多且变化多的情况下使用，抽象工厂模式适用于创建对象家族类比较多的情况下使用。
