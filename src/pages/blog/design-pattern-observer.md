---
title: 代码设计模式——观察者模式
description: 介绍观察者模式
date: 2024-07-12T22:16:00
duration: 5min
tags: [设计模式]
---

接上期[策略模式](/blog/design-pattern-strategy)之后，现在来介绍观察者模式，实际上我们写代码时经常直接或者间接接触这个模式。实际上发布和订阅消息，以及事件驱动都是观察者模式的应用。它们通常是一对多的形式，即一个主题（可被观察者）和多个观察者组成。映射到现实世界中的应用最明显的就是订报纸，主题就是报纸，观察者就是订阅报纸的人。

假如我们有一个气象站数据，当数据发生变化时，我们需要对应的布告板进行更新，这时我们就可以使用观察者模式。还记得我们之前讲过的设计原则吗？针对接口编程，首先实现主题和观察者的接口，你可以想一下主题和观察者接口需要如何实现会比较好。

```ts
// 被观察接口
interface Observable {
  // eslint-disable-next-line ts/method-signature-style
  notify(): void
  // eslint-disable-next-line ts/method-signature-style
  register(observer: Observer): void
  // eslint-disable-next-line ts/method-signature-style
  unregister(observer: Observer): void
}

// 观察者接口
interface Observer<T extends Observable = any> {
  // eslint-disable-next-line ts/method-signature-style
  update(observable: T): void
}

// 定义显示布告板的接口
interface Display<T> {
  // eslint-disable-next-line ts/method-signature-style
  display(data: T): void
}
```

接着就是实现气象站数据和布告板。

```ts
// 气象站数据
class WeatherData implements Observable {
  private temperature: number = 0
  private humidity: number = 0
  private pressure: number = 0
  private observers: Observer[] = []
  // 注册观察者
  public register(observer: Observer): void {
    this.observers.push(observer)
  }

  // 取消注册观察者
  public unregister(observer: Observer): void {
    const index = this.observers.indexOf(observer)
    if (index !== -1) {
      this.observers.splice(index, 1)
    }
  }

  // 通知观察者
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this)
    }
  }
}
// 布告板
class CurrentConditionsDisplay implements Observer<WeatherData>, Display<WeatherData> {
  update(observable): void {
    this.display(observable)
  }

  display(data): void {
    console.log(`
      温度：${data.temperature}
      湿度：${data.humidity}
      气压：${data.pressure}
    `)
  }
}
// 布告板
class ForecastDisplay implements Observer<WeatherData>, Display<WeatherData> {
  update(observable): void {
    this.display(observable)
  }

  display(data): void {
    console.log(`
      预报温度：${data.temperature}
      预报湿度：${data.humidity}
      预报气压：${data.pressure}
    `)
  }
}
```

这是一个非常基础的实现，其实我们还可以将`observers`属性提取到一个`Subject`抽象类中，这样我们可以通过继承`Subject`类来管理观察者，这样就可以将观察者的注册和取消注册放在一起了。

如果你对这个模式比较感兴趣，可以尝试使用[ReactiveX](https://reactivex.io/)，这是一个使用充分使用观察者模式的库，并且它支持多种语言。
