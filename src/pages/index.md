---
title: PZJ 's personal website
description: PZJ 's personal website
stack:
  - name: HTML5
    icon: i-devicon-html5
  - name: CSS3
    icon: i-devicon-css3
  - name: JavaScript
    icon: i-devicon-javascript
  - name: TypeScript
    icon: i-devicon-typescript
  - name: TailwindCSS
    icon: i-devicon-tailwindcss
  - name: UnoCSS
    icon: i-logos-unocss
  - name: Vue
    icon: i-devicon-vuejs
  - name: React
    icon: i-devicon-react
  - name: Nuxt.js
    icon: i-logos-nuxt-icon
  - name: Next.js
    icon: i-devicon-nextjs
  - name: Node.js
    icon: i-devicon-nodejs
  - name: Vite
    icon: i-devicon-vitejs
  - name: Vitest
    icon: i-devicon-vitest
  - name: Webpack
    icon: i-devicon-webpack
  - name: Git
    icon: i-devicon-git
  - name: MySQL
    icon: i-devicon-mysql
  - name: MongoDB
    icon: i-devicon-mongodb
  - name: Figma
    icon: i-devicon-figma
socialLinks:
  - provider: GitHub
    icon: i-ri-github-fill
    url: https://github.com/pzj01
  - provider: Twitter
    icon: i-ri-twitter-x-fill
    url: https://www.x.com/pzj01
  - provider: QQ
    icon: i-ri-qq-fill
    url: https://user.qzone.qq.com/2949195453
  - provider: WeChat
    icon: i-ri-wechat-fill
    url: https://weixin.qq.com/r/pzj01
---

# About me

你好，我是 {@pzj01} ，一名即将毕业的软件专业的大学生，对于前端技术有着浓厚的兴趣，目前正在积累前端知识，希望能够在未来的工作中有所应用。

> 现在我需要一份工作，如果你有兴趣，请联系我，我会尽快回复你的。

# Tech Stack

<TechStack :stack="frontmatter.stack" />

# Projects

- 阴阳师访问页：https://avenue-opposites-yys.netlify.app

# Where to find me ?

<SocialLinks :links="frontmatter.socialLinks" />
