export interface Photo {
  name: string
  url: string
}

const modules = import.meta.glob('./**/*.{jpg,png,webp}', {
  eager: true,
  import: 'default',
})

const photos = Object.entries(modules).map(([name, url]) => {
  return {
    name: name.replace('./', '').replace(/\.\w+$/, ''),
    url,
  }
}).sort((a, b) => a.name.localeCompare(b.name))

export default photos as Photo[]
