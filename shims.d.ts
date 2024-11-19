/// <reference types="vite/client" />

import type { Frontmatter } from 'unplugin-vue-markdown/types'
import type { Post } from './src/types'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter?: Frontmatter & Partial<Post>
  }
}

interface ImportMetaEnv {
  readonly VITE_BAIDU_MAP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
