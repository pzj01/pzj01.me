/// <reference types="vite/client" />

import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    frontmatter?: Record<string, any>
  }
}

interface ImportMetaEnv {
  readonly VITE_BAIDU_MAP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
