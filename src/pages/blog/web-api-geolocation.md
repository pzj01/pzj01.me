---
title: Web API —— Geolocation(地理位置)
description: 获取用户当前的地理位置信息
date: 2024-09-06
duration: 5min
tags: [Web API]
---

这个 API 可以获取用户当前的地理位置信息。但是第一次使用的时候，它会询问用户是否允许我们获取地理位置信息，使用`navigator.geolocation`访问。

## 获取当前设备地理位置信息

当获取成功的时候会返回一个对象，包含用户当前的地理位置信息。

<GeolocationDemo />

options（可选）：
  - `enableHighAccuracy`：是否允许高精度，默认为 `false`
  - `maximumAge`：允许获取位置信息的时间范围，以毫秒为单位，默认为 `0`，即不限制，即获取最新的地理位置信息。
  - `timeout`：允许获取位置信息的超时时间，以毫秒为单位，默认为 `Infinity`，即在获取到位置信息之前不会返回。

返回结果是一个`GeoLocationPosition`对象，它有以下的属性。

- `coords`：当前坐标信息的对象
  - `latitude`：纬度。
  - `longitude`：经度。
  - `accuracy`：精度，默认单位为米。
  - `altitudeAccuracy`：海拔精度，默认单位为米。
  - `altitude`：海拔，默认单位为米。
  - `heading`：方向，该值以度为单位，表示设备的朝向。
  - `speed`：设备的速度，如果无法获取，则返回 `null`，需要特定的设备支持，比如运动传感器。
- `timestamp`：时间戳

```ts twoslash
// 判断是否支持地理位置 API
if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
    },
    (error) => {
      console.log(error)
    },
    {
      enableHighAccuracy: true,
    }
  )
}
```

## 监听地理位置变化

使用`watchPosition`方法监听地理位置变化，该方法的使用方式和`getCurrentPosition`方法一样，返回值为监听器的 ID。

```ts twoslash
if ('geolocation' in navigator) {
  // 监听
  const id = navigator.geolocation.watchPosition(
    (position) => {
      console.log(position)
    },
    (error) => {
      console.log(error)
    }
  )
  // 取消监听
  navigator.geolocation.clearWatch(id)
}
```
