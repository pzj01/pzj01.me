import type { Item } from 'feed'
import { readFile, writeFile } from 'node:fs/promises'
import { compareDesc } from 'date-fns'
import fg from 'fast-glob'
import { Feed } from 'feed'
import matter from 'gray-matter'
import MarkdownIt from 'markdown-it'

const DOMAIN = 'https://pzj01.netlify.app'
const AUTHOR = {
  name: 'pzj',
  email: '2949195453@qq.com',
  link: 'https://pzj01.netlify.app',
}
const md = MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
})

async function rss() {
  const paths = await fg(['src/pages/blog/*.md', 'src/pages/notes/*.md'])

  const posts: Item[] = await Promise.all(
    paths.filter(path => !path.includes('index.md'))
      .map(readPost),
  )

  const feed = new Feed({
    title: 'pzj\'s personal website',
    description: 'pzj\'s personal website',
    id: 'https://pzj01.netlify.app',
    link: 'https://pzj01.netlify.app',
    language: 'zh-CN',
    // image: '',
    // favicon: 'http://example.com/favicon.ico',
    copyright: 'Copyright (c) 2024 pzj',
    updated: new Date(),
    generator: 'https://github.com/jpmonette/feed',
    // feedLinks: {
    //   json: 'https://example.com/json',
    //   atom: 'https://example.com/atom',
    // },
    author: AUTHOR,
  })

  posts.sort((a, b) => compareDesc(a.date, b.date))

  posts.forEach(post => feed.addItem(post))

  await writeFile('dist/feed.xml', feed.rss2(), 'utf-8')
  await writeFile('dist/feed.json', feed.json1(), 'utf-8')
  await writeFile('dist/feed.atom', feed.atom1(), 'utf-8')
}

async function readPost(path: string) {
  const raw = await readFile(path, 'utf-8')
  const { data, content } = matter(raw)
  const html = md.render(content)
  const route = getPathRoute(path)

  return {
    title: data.title,
    description: data.description,
    date: data.date,
    category: data.tags,
    author: [AUTHOR],
    copyright: 'Copyright (c) 2024 pzj',
    id: `${DOMAIN}${route}`,
    link: `${DOMAIN}${route}`,
    content: html,
    path,
    route,
  } as Item
}

function getPathRoute(path: string) {
  return path.replace('src/pages', '').replace('.md', '')
}

rss()
