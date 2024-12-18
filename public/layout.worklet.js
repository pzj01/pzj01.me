globalThis.registerLayout('random', class {
  static layoutOptions = {
    childDisplay: 'normal',
    sizing: 'block-like',
  }

  static inputProperties = []
  async intrinsicSizes() {}

  async layout(children, edges, constraints) {
    // 获取子元素的内容尺寸
    const childrenSizes = await Promise.all(children.map(child => child.intrinsicSizes()))
    const availableSize = {
      availableInlineSize: constraints.fixedInlineSize - edges.inline,
      availableBlockSize: constraints.fixedBlockSize - edges.block,
    }
    // 获取子元素布局片段
    const childFragments = await Promise.all(children.map(child => child.layoutNextFragment(availableSize)))

    const random = (min, max) => Math.floor((Math.random() * (max - min) + 1) + min)

    childFragments.forEach((child, i) => {
      const x = random(0, availableSize.availableInlineSize)
      const y = random(0, availableSize.availableBlockSize)
      const minContentSize = childrenSizes[i].minContentSize
      // 超出布局区域的子元素进行偏移
      child.inlineOffset = x > availableSize.availableInlineSize ? x - child.inlineSize - minContentSize : x
      child.blockOffset = y > availableSize.availableBlockSize ? y - child.blockSize - minContentSize : y
    })

    // 返回子元素布局片段
    return {
      childFragments,
    }
  }
})
