/* eslint-disable no-restricted-globals */
/* eslint-disable new-cap */
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import editorWorker from 'monaco-editor-core/esm/vs/editor/editor.worker?worker'
import 'monaco-editor/esm/vs/editor/contrib/comment/browser/comment'
import * as monaco from 'monaco-editor'
import { createHighlighter } from 'shiki'

export const highlighter = await createHighlighter({
  themes: ['vitesse-light', 'vitesse-dark'],
  langs: ['typescript'],
})

export function initMonaco() {
  // @ts-expect-error 设置monaco全局环境变量
  self.MonacoEnvironment = {
    getWorker(_: any, label: string) {
      switch (label) {
        case 'css':
          return new cssWorker()
        case 'html':
          return new htmlWorker()
        case 'typescript':
          return new tsWorker()
        case 'json':
          return new jsonWorker()
        default:
          return new editorWorker()
      }
    },
  }

  monaco.languages.register({ id: 'javascript', extensions: ['.js'] })
  monaco.languages.register({ id: 'typescript', extensions: ['.ts'] })
  monaco.languages.register({ id: 'json', extensions: ['.json'] })
  monaco.languages.register({ id: 'html', extensions: ['.html'] })
}
