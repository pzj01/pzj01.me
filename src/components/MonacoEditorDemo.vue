<script setup lang="ts">
const value = ref('const a: number = 1')
</script>

<template>
  <div>
    <MonacoEditor v-model="value" />
  </div>
</template>
