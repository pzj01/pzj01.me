<script setup lang="ts">
import { shikiToMonaco } from '@shikijs/monaco'
import * as monaco from 'monaco-editor-core/esm/vs/editor/editor.api'

const modelValue = defineModel<string>({ required: true })

let editor: monaco.editor.IStandaloneCodeEditor
const el = ref<HTMLDivElement>()

initMonaco()

watch(el, async (oldValue) => {
  if (!oldValue)
    return

  shikiToMonaco(highlighter, monaco)

  editor = monaco.editor.create(oldValue, {
    value: modelValue.value,
    language: 'ts',
    automaticLayout: true,
    theme: isDark.value ? 'vitesse-dark' : 'vitesse-light',
    fontSize: 14,
    bracketPairColorization: {
      enabled: false,
    },
    glyphMargin: false,
    folding: false,
    lineDecorationsWidth: 10,
    lineNumbersMinChars: 3,
    fontFamily: 'input',
    minimap: {
      enabled: false,
    },
    padding: {
      top: 8,
    },
    overviewRulerLanes: 0,
    fixedOverflowWidgets: true,
  })

  editor.onDidChangeModelContent(() => {
    modelValue.value = editor.getValue()
  })
})

watch(isDark, () => {
  editor.updateOptions({
    theme: isDark.value ? 'vitesse-dark' : 'vitesse-light',
  })
})

onBeforeUnmount(() => {
  editor.dispose()
})
</script>

<template>
  <div h-sm>
    <div ref="el" w-full h-full />
  </div>
</template>
