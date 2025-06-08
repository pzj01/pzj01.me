<script lang="ts" setup>
import type { Comment } from '../../types'
import { differenceInDays, differenceInSeconds, format, formatDistanceToNowStrict } from 'date-fns'
import { zhCN } from 'date-fns/locale'
import { storeToRefs } from 'pinia'
import { useCommentStore } from '../../composables/comment'

const commentStore = useCommentStore()
const { comments } = storeToRefs(commentStore)
const { updateComment, deleteComment } = commentStore
const { user } = useSession()
const [isEditing, toggle] = useToggle()
const state = reactive({
  currentCommentId: '',
  content: '',
})

function formatDateString(date: Date) {
  if (differenceInDays(Date.now(), date) > 3) {
    return format(date, 'yyyy-MM-dd', { locale: zhCN })
  }

  if (differenceInDays(Date.now(), date) === 1) {
    return `昨天 ${format(date, 'HH:mm', { locale: zhCN })}`
  }

  if (differenceInSeconds(Date.now(), date) === 0) {
    return '刚刚'
  }

  return formatDistanceToNowStrict(date, { addSuffix: true, locale: zhCN })
}

function toggleEditMode(commentId: string, cnt: string) {
  commentId === state.currentCommentId ? toggle() : toggle(true)
  state.currentCommentId = commentId
  state.content = cnt
}

async function submitHandler(comment: Comment) {
  await updateComment({
    ...comment,
    content: state.content,
    updated_at: new Date(),
  })

  toggle(false)
}
</script>

<template>
  <ol space-y-8 bg-gray-800 rounded border border-gray-700 p-4>
    <p v-if="comments.length === 0" text="center gray-400">
      暂无留言
    </p>
    <li v-for="comment, i in comments" v-else :key="comment.id" relative :class="i < comments.length - 1 && `after:(content-[''] w-1 h-full bg-gray-700 left-6 top-12 -translate-x-1/2 absolute)`" flex="~ gap-3">
      <img :src="`https://github.com/${comment.username}.png`" object-cover s-12 rounded-full>
      <div flex="~ col items-start" w-full>
        <span mb-2 text="gray-400 sm">{{ comment.username }} · {{ formatDateString(new Date(comment.created_at)) }}</span>
        <form v-if="isEditing && state.currentCommentId === comment.id" w-full @submit.prevent="submitHandler(comment)">
          <textarea v-model="state.content" class="w-full text-white resize-none outline outline-gray-700 focus:outline-gray-400 bg-gray-700 dark:bg-gray-800 rounded p-2" rows="4" placeholder="请输入评论" />
          <button type="submit" ml-auto github-btn>
            修改留言
          </button>
        </form>
        <p v-else text-white>
          {{ comment.content }}
        </p>
        <div v-if="user.user_metadata.provider_id === comment.user_id" mt-2 self-end space-x-2>
          <button i-ri-edit-2-line text="sm gray-400 hover:blue" @click="toggleEditMode(comment.id, comment.content)" />
          <button i-ri-delete-bin-6-line text="sm gray-400 hover:red" @click="deleteComment(comment.id)" />
        </div>
      </div>
    </li>
  </ol>
</template>
