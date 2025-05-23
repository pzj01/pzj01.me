import type { Element, ElementContent } from 'hast'
import type { ShikiTransformer } from 'shiki'

export default function transformerPzj01(): ShikiTransformer {
  const icon: Element = {
    type: 'element',
    tagName: 'svg',
    properties: {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '32',
      height: '32',
      viewBox: '0 0 32 32',
    },
    children: [
      {
        type: 'element',
        tagName: 'path',
        properties: {
          d: 'M28 10v18H10V10zm0-2H10a2 2 0 0 0-2 2v18a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2',
        },
        children: [],
      },
      {
        type: 'element',
        tagName: 'path',
        properties: {
          d: 'M4 18H2V4a2 2 0 0 1 2-2h14v2H4Z',
        },
        children: [],
      },
    ],
  }

  return {
    name: 'transformer-pzj01',
    root(root) {
      const copyButton: Element = {
        type: 'element',
        tagName: 'button',
        properties: {
          'data-clipboard-text': this.source,
        },
        children: [icon],
      }
      const langSymbol: Element = {
        type: 'element',
        tagName: 'span',
        properties: {},
        children: [
          {
            type: 'text',
            value: this.options.lang,
          },
        ],
      }

      const container: Element = {
        type: 'element',
        tagName: 'pre',
        properties: {
          style: 'position: relative',
        },
        children: [copyButton, langSymbol, ...root.children as ElementContent[]],
      }

      this.addClassToHast(icon, 'copy-icon')
      this.addClassToHast(copyButton, 'copy-button')
      this.addClassToHast(langSymbol, 'language-symbol')
      this.addClassToHast(container, 'shiki-container')
      root.children = [container]
    },
    pre(hast) {
      hast.properties.style = (hast.properties.style as string)
        .replace('background-color', '--shiki-bg')
        .replace('color', '--shiki')
    },
    span(hast) {
      hast.properties.style = (hast.properties.style as string)
        .replace('color', '--shiki')
    },
  }
}
