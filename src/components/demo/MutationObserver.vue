<script setup lang="ts">
import { useTemplateRef } from 'vue'

const type = ref('')
const target = useTemplateRef<HTMLElement>('target')

onMounted(() => {
  if (!target.value)
    return

  const observer = new MutationObserver(([mutation]) => {
    type.value = mutation.type
  })
  observer.observe(target.value, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeOldValue: true,
    characterDataOldValue: true,
  })
})
</script>

<template>
  <div space-y-4>
    <span>MutationRecord type：{{ type }}</span>
    <div ref="target" border p-4>
      被监听的元素，你可以通过
      <kbd>f12</kbd>
      修改
    </div>
  </div>
</template>
