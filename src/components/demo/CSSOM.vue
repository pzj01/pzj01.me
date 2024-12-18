<script lang="ts" setup>
const el = useTemplateRef('CSSOM')
onMounted(() => {
  if (!el.value)
    return

  const styleMap = el.value.attributeStyleMap

  styleMap.set('text-align', 'center')
  styleMap.set('margin', '16px auto')
  styleMap.set('background-color', 'rgba(74, 222, 128, 0.5)')
  styleMap.set('width', CSS.percent(50))
  styleMap.set('height', CSS.rem(4))
  styleMap.set('line-height', CSS.rem(4))
  styleMap.set('border-radius', '4px')
})
</script>

<template>
  <div ref="CSSOM" font-mono>
    CSS Typed OM
  </div>
</template>
