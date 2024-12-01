globalThis.importScripts('https://cdnjs.cloudflare.com/ajax/libs/spark-md5/3.0.2/spark-md5.min.js')

const { SparkMD5 } = globalThis

globalThis.addEventListener('message', async (e) => {
  const { startIndex, chunkTotal, file, chunkSize } = e.data
  const total = startIndex + chunkTotal
  const spark = new SparkMD5.ArrayBuffer()

  const chunks = []
  for (let i = startIndex; i < total; i++) {
    const start = i * chunkSize
    let end = start + chunkSize

    if (end > file.size) {
      end = file.size
      i = total
    }

    const slice = await file.slice(start, end).arrayBuffer()
    spark.append(slice)
    chunks.push({
      index: i,
      data: slice,
      hash: spark.end(),
    })
  }

  globalThis.postMessage(chunks)
})
