<script lang="ts" setup>
import type { User } from '@supabase/supabase-js'
import { supabase } from '../../utils/supabase'

const session = useSession()
const route = useRoute()
const content = ref('')
const commentStore = useCommentStore()

async function sendComment(user: User) {  
  await commentStore.addComment({
    post_slug: route.path.split('/').at(-1)!,
    user_id: user.user_metadata.provider_id,
    content: content.value,
    username: user.user_metadata.user_name,
  })

  content.value = ''
}

function github() {
  supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: route.fullPath,
    },
  })
}
</script>

<template>
  <div border bg-gray-700 dark:bg-gray-800 border-gray-700 rounded p-4>
    <button v-if="!session" github-btn mx-auto @click="github">
      <i i-ri-github-fill s-6 mr-2 />
      通过Github登录
    </button>
    <form v-else @submit.prevent="sendComment(session.user)">
      <div flex="~ gap-x-4">
        <label for="comment">
          <img :src="session.user.user_metadata.avatar_url" object-cover s-12 rounded-full>
        </label>
        <textarea v-model="content" id="comment" flex-1 text-white resize-none outline-none bg-gray-700 dark:bg-gray-800 rows="4" placeholder="请输入评论" />
      </div>
      <button ml-auto type="submit" github-btn rounded-md>
        发送留言
      </button>
    </form>
  </div>
</template>
