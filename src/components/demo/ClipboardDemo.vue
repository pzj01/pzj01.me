<script setup lang="ts">
const { type = 'read', textMode = false } = defineProps<{
  type?: 'read' | 'write'
  textMode?: boolean
}>()

const supportImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']
const content = ref('')
const isSupport = ref(false)

if (navigator.clipboard) {
  isSupport.value = true
}

async function readText() {
  if (isSupport.value) {
    try {
      const t = await navigator.clipboard.readText()
      content.value = t
    }
    catch (e) {
      content.value = '读取失败'
      console.error(e)
    }
  }
}

async function readImage() {
  if (isSupport.value) {
    try {
      const [clipboardItem] = await navigator.clipboard.read()
      const index = supportImageTypes.findIndex(type => clipboardItem.types.includes(type))

      if (index !== -1) {
        const blob = await clipboardItem.getType(supportImageTypes[index])
        content.value = URL.createObjectURL(blob)
      }
      else {
        content.value = '图片格式不支持或者当前没有图片在剪切板中'
      }
    }
    catch (e) {
      content.value = '读取失败'
      console.error(e)
    }
  }
}

async function writeText() {
  if (isSupport.value) {
    try {
      await navigator.clipboard.writeText(content.value)
    }
    catch (e) {
      // eslint-disable-next-line no-alert
      alert('写入失败')
      console.error(e)
    }
  }
}

async function writeImage(e: Event) {
  const input = e.target as HTMLInputElement
  if (isSupport.value && input.files?.[0]) {
    const file = input.files[0]
    const reader = new FileReader()
    reader.addEventListener('load', async () => {
      if (reader.result) {
        const blob = new Blob([reader.result], { type: 'image/png' })
        try {
          await navigator.clipboard.write([new ClipboardItem({
            'image/png': blob,
          })])
        }
        catch (e) {
          // eslint-disable-next-line no-alert
          alert('写入失败')
          console.error(e)
        }
      }
    })
    reader.readAsArrayBuffer(file)
  }
}
</script>

<template>
  <div v-if="isSupport">
    <div v-if="type === 'read'">
      <div v-if="textMode" space-y-4>
        <span>剪切板的文本：{{ content }}</span>
        <button btn @click="readText">
          读取剪切板的文本内容
        </button>
      </div>
      <div v-else space-y-4>
        <span block>剪切板的图片：{{ content }}</span>
        <img :src="content" alt="剪切板的图片">
        <button btn @click="readImage">
          读取剪切板的图片
        </button>
      </div>
    </div>
    <div v-else>
      <div v-if="textMode" space-y-4>
        <span>请输入要写入剪切板的内容：</span>
        <input
          v-model="content"
          type="text"
          placeholder="请输入内容"
          class="w-full rounded px-2 py-1 text-black"
        >
        <button btn @click="writeText">
          写入剪切板
        </button>
      </div>
      <div v-else space-y-4>
        <input type="file" accept="image/*" @input="writeImage">
        <button btn @click="writeImage">
          写入图片数据
        </button>
      </div>
    </div>
  </div>
  <div v-else>
    您的浏览器不支持剪切板
  </div>
</template>
