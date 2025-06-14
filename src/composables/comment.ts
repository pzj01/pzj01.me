import type { Comment } from '../types'
import { compareAsc } from 'date-fns'
import { defineStore } from 'pinia'
import { supabase } from '../utils/supabase'

export const useCommentStore = defineStore('comment', () => {
  const session = useSession()
  const comments = ref<Comment[]>([])
  const userComments = computed(() => comments.value.filter(comment => comment.user_id === session.user.user_metadata.provider_id))
  const route = useRoute()
  const toast = useToast()

  watchEffect(() => fetchComments(route.path.split('/').at(-1)!))

  async function fetchComments(slug: string) {
    const { data, error } = await supabase.from('comments').select('*').eq('post_slug', slug)

    if (error) {
      console.error(error)
      return error
    }

    comments.value = (data as Comment[]).sort((a, b) => compareAsc(a.created_at, b.created_at))
  }

  async function addComment(comment: Omit<Comment, 'id' | 'created_at'>) {
    const { error } = await supabase.from('comments').insert(comment)

    if (error) {
      console.error(error)
      toast.error({
        title: 'Error',
        message: '添加留言失败',
      })
      return error
    }

    toast.success({
      title: 'Success',
      message: '添加留言成功',
    })

    return fetchComments(comment.post_slug)
  }

  async function deleteComment(id: string) {
    const { error } = await supabase.from('comments').delete().eq('id', id)

    if (error) {
      toast.error({
        title: 'Error',
        message: '删除留言失败',
      })
      return error
    }

    toast.success({
      title: 'Success',
      message: '删除留言成功',
    })

    return fetchComments(route.path.split('/').at(-1)!)
  }

  async function updateComment(comment: Comment) {
    const { error } = await supabase.from('comments').update(comment).eq('id', comment.id)

    if (error) {
      toast.error({
        title: 'Error',
        message: '更新留言失败',
      })
      return error
    }

    toast.success({
      title: 'Success',
      message: '更新留言成功',
    })

    return fetchComments(route.path.split('/').at(-1)!)
  }

  return {
    comments,
    userComments,
    addComment,
    deleteComment,
    updateComment,
  }
})
