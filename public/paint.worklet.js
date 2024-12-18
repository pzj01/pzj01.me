globalThis.registerPaint('bezier', class {
  static contextOptions = { alpha: true }

  static inputProperties = ['--line-color', '--line-width']

  paint(ctx, size, properties) {
    const lineColor = properties.get('--line-color').toString() || 'rgba(255, 0, 0, 1)'
    const lineWidth = Number.parseFloat(properties.get('--line-width').toString() || 2)

    // 设置线条样式
    ctx.strokeStyle = lineColor
    ctx.lineWidth = lineWidth
    ctx.clearRect(0, 0, size.width, size.height) // 清空背景
    // 填充灰色透明背景
    ctx.fillStyle = 'rgba(115, 115, 115, 0.3)'
    ctx.fillRect(0, 0, size.width, size.height)

    const randomPoint = () => ({
      x: Math.random() * size.width,
      y: Math.random() * size.height,
    })

    const cp1 = randomPoint()
    const cp2 = randomPoint()

    // 使用二次贝塞尔曲线绘制
    ctx.beginPath()
    ctx.moveTo(0, size.height)
    ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, size.width, 0)
    ctx.stroke()
  }
})
