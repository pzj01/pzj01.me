<script lang="ts" setup>
defineProps<{
  shortcut: string[]
}>()
</script>

<template>
  <span inline-block>
    <template v-for="key, i of shortcut" :key="i">
      <kbd>{{ key }}</kbd>{{ i < shortcut.length - 1 ? '+' : '' }}
    </template>
  </span>
</template>
