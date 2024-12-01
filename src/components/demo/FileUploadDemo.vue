<script setup lang="ts">
import SparkMD5 from 'spark-md5'

defineProps<{
  type: 'single' | 'multiple' | 'binary' | 'stream' | 'chunked'
}>()

const baseURL = 'https://localhost:3000/file/upload'
const singleFileInputRef = useTemplateRef('single-file')

function uploadSingleFile() {
  const files = singleFileInputRef.value?.files
  if (!files)
    return

  const formData = new FormData()
  formData.append('image', files[0])
  fetch(`${baseURL}/image`, {
    method: 'POST',
    body: formData,
  })
}

const multipleFileInputRef = useTemplateRef('multiple-file')

function uploadMultipleFile() {
  const files = multipleFileInputRef.value?.files
  if (!files)
    return
  const formData = new FormData()
  for (const file of files) {
    formData.append('images', file)
  }
  fetch(`${baseURL}/images`, {
    method: 'POST',
    body: formData,
  })
}

const streamFileInputRef = useTemplateRef('stream-file')

function streamUploadFile() {
  const files = streamFileInputRef.value?.files
  if (!files)
    return

  const stream = files[0].stream()
  fetch(`${baseURL}/video`, {
    method: 'POST',
    body: stream,
    // @ts-expect-error 缺失的类型定义
    duplex: 'half', // 半双工
  })
}

const binaryFileInputRef = useTemplateRef('binary-file')

function uploadBinaryFile() {
  const files = binaryFileInputRef.value?.files
  if (!files)
    return
  const file = files[0]
  const searchParams = new URLSearchParams({
    filename: file.name,
    type: file.type,
  })
  fetch(`${baseURL}/video?${searchParams}`, {
    method: 'POST',
    body: file,
    headers: {
      'Content-Type': 'application/octet-stream',
    },
  })
}

const chunkedFileInputRef = useTemplateRef('chunked-file')

interface Chunk {
  hash: string
  index: number
  data: ArrayBuffer
}

const chunkSize = 1024 * 1024 * 1 // 1MB
const chunks = reactive<Chunk[]>([])
const spark = new SparkMD5.ArrayBuffer()

async function uploadChunkedFile() {
  const files = chunkedFileInputRef.value?.files
  if (!files)
    return

  const file = files[0]

  if (!chunks.length) {
    const _chunks = await sliceChunks(file, {
      chunkSize,
    })
    chunks.push(..._chunks)
  }

  chunks.forEach(({ data }) => {
    spark.append(data)
  })
  const fileHash = spark.end()
  const promises = []

  for (const { index, hash, data } of chunks) {
    const formData = new FormData()
    formData.set('filename', file.name)
    // formData.set('type', file.type)
    formData.set('fileHash', fileHash)
    formData.set('index', index.toString())
    formData.set('hash', hash)
    formData.append('chunk', new Blob([data]))
    promises.push(fetch(`${baseURL}/video`, {
      method: 'POST',
      body: formData,
    }))
  }

  await Promise.all(promises)
  chunks.length = 0

  // 合并文件
  fetch(`${baseURL}/video/merge`, {
    method: 'POST',
    body: JSON.stringify({
      filename: file.name,
      type: file.type,
      fileHash,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

async function sliceChunks(file: File, options: {
  chunkSize: number
}) {
  const { chunkSize } = options
  const maxWorker = 4
  const chunkTotal = Math.ceil(file.size / chunkSize)
  const workerHandleTotal = Math.ceil(chunkTotal / maxWorker)
  const promises: Promise<Chunk[]>[] = []
  for (let i = 0; i < maxWorker; i++) {
    const worker = new Worker('/chunk.worker.js', {
      name: `chunk.worker.${i}`,
    })

    const promise = new Promise<Chunk[]>((resolve, reject) => {
      worker.postMessage({
        startIndex: i * workerHandleTotal,
        chunkTotal: workerHandleTotal,
        chunkSize,
        file,
      })

      worker.addEventListener('message', (e) => {
        const chunks = e.data as Chunk[]
        resolve(chunks)
      })

      worker.addEventListener('error', reject)
    })
    promises.push(promise)
    promise.finally(() => worker.terminate())
  }

  return (await Promise.all(promises)).sort((a, b) => a[0].index - b[0].index).flat()
}
</script>

<template>
  <!-- 单文件上传 -->
  <div v-if="type === 'single'" space-y-4>
    <!-- eslint-disable-next-line vue/no-unused-refs -->
    <input ref="single-file" type="file" accept="image/*">
    <button btn @click="uploadSingleFile">
      上传文件
    </button>
  </div>

  <!-- 多文件上传 -->
  <div v-else-if="type === 'multiple'" space-y-4>
    <!-- eslint-disable-next-line vue/no-unused-refs -->
    <input ref="multiple-file" type="file" multiple accept="image/*">
    <button btn @click="uploadMultipleFile">
      上传文件
    </button>
  </div>

  <!-- 流上传 -->
  <div v-else-if="type === 'stream'" space-y-4>
    <!-- eslint-disable-next-line vue/no-unused-refs -->
    <input ref="stream-file" type="file" accept="video/*">
    <button btn @click="streamUploadFile">
      上传文件
    </button>
  </div>

  <!-- 二进制上传 -->
  <div v-else-if="type === 'binary'" space-y-4>
    <!-- eslint-disable-next-line vue/no-unused-refs -->
    <input ref="binary-file" type="file" accept="video/*">
    <button btn @click="uploadBinaryFile">
      上传文件
    </button>
  </div>

  <!-- 分片上传 -->
  <div v-else-if="type === 'chunked'" space-y-4>
    <!-- eslint-disable-next-line vue/no-unused-refs -->
    <input ref="chunked-file" type="file" accept="video/*">
    <button btn @click="uploadChunkedFile">
      上传文件
    </button>
    <p>分片列表：</p>
    <ol>
      <li v-for="{ hash, data } in chunks" :key="hash">
        {{ hash }} - {{ data.byteLength }} bytes
      </li>
    </ol>
  </div>
</template>
