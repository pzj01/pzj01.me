<script setup lang="ts">
import { format } from 'date-fns'
import { zhCN } from 'date-fns/locale'

const { formatString = 'yyyy-MM-dd EEEE' } = defineProps<{
  date: Parameters<typeof format>[0]
  formatString?: string
}>()
</script>

<template>
  <span text-neutral-600>{{ format(date, formatString, { locale: zhCN }) }}</span>
</template>
