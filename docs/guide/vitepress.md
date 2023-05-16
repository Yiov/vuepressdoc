# Vitepress


::: warning 更新时间
最近更新：2023-5-14

搭建版本：v1.0.0-alpha.63 
:::

## 简介

和vuepress是孪生兄弟，由于vuepress v1版是用Webpack打包，速度慢的感人

Vitepress在凭借vite的东风应运而生，要优于v1版

但如今的vuepress v2版也就是 [vuepress-next](https://github.com/vuepress/vuepress-next) ，也升级成了vite打包，没有比vite差

官网：[https://vitepress.dev/](https://vitepress.dev/)

vite官网：[https://vitejs.cn/](https://vitejs.cn/)

## 快速上手

熟悉了vuepress，安装步骤基本无差别，过程就快速的过一遍了

::: warning 推荐
强烈推荐使用pnpm安装
:::

`win+R键` 输入 `cmd` 进入终端，然后选个任意盘符存放文件，比如f盘

```sh
#盘符可以自己定
f:
```

```sh
#创建目录
mkdir vitepress-starter && cd vitepress-starter
```

已经安装过pnpm的可以无视

```sh
#安装pnpm
npm install -g pnpm
#查看版本号
pnpm -v
```

然后我们直接暗黄vitepress

```sh
#安装VitePress
pnpm add -D vitepress
```

::: details 相关依赖缺失警告?
如果使用pnpm,你会注意到一个依赖缺失警告`@docsearch/js`，这并不会阻碍VitePress工作。如果你想抑制这个警告，添加以下`package.json`

```json
"pnpm": {
  "peerDependencyRules": {
    "ignoreMissing": [
      "@algolia/client-search"
    ]
  }
}
```
:::


初始化向导

```sh
pnpm exec vitepress init
```
![](https://vitepress.dev/assets/vitepress-init.dfe5638e.png)



在`package.json`中添加脚本命令

```json
"scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:preview": "vitepress preview docs"
  },
```

添加git上传忽略项 `.gitignore`

::: warning 注意
.gitignore 里放的是上传时git的忽略项

建议先使用cmd，使用vscode有可能会出现乱码
:::

```sh
#将依赖文件添加到.gitignore文件中
echo node_modules >> .gitignore

#将临时目录添加到.gitignore文件中
echo .temp >> .gitignore

#将缓存目录添加到.gitignore文件中
echo .cache >> .gitignore

#将静态目录添加到.gitignore文件中
echo dist >> .gitignore
```

::: warning Github上传未忽略dist文件夹
原因：vscode输入命令导致编码错误

解决：Github Desktop - Repository settings - ignored files

输入我们忽略的dist文件即可，save保存即可

```忽略项
node_modules
.temp
.cache
dist
```
:::


创建docs目录

::: warning 注意
建议先使用cmd，使用vscode有可能会出现乱码
:::

```sh
mkdir docs && echo # Hello VitePress > docs/index.md
```


本地启动，会生成热重载链接开发服务器

[http://localhost:5173](http://localhost:5173)

::: tip 如何退出
`ctrl+c` 即可退出开发模式
:::

```sh
pnpm run docs:dev
```

## 配置

在`.vuepress`目录下创建一个 `config.js`文件

目录列表参考

```
.
├─ docs
│  ├─ .vitepress
│  │  └─ config.js          <--配置文件
│  │  └─ public             <--静态资源目录
│  │       └─ logo.svg      <--logo
│  ├─ markdown-examples.md
│  └─ index.md
└─ package.json
```

基本的描述

```js
export default {
  title: 'VitePress',
  description: 'Just playing around.',
}
```

网站的logo，要放在public文件夹中

```js{2-3}
export default {
  themeConfig: {
    logo: '/my-logo.svg',
    nav: [...],
    sidebar: { ... },
  }
}
```

导航和vuepress也是一样的方式

示例1：
```js
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      { text: 'Configs', link: '/configs' },
      { text: 'Changelog', link: 'https://github.com/...' }
    ]
  }
}
```

示例2：
```js
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      }
    ]
  }
}
```

示例3：
```js
export default {
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // 分组标题
            text: 'Section A Title',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          }
        ]
      },
      {
        text: 'Dropdown Menu',
        items: [
          {
            // 也可以省略标题
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' }
            ]
          }
        ]
      }
    ]
  }
}
```

自定义链接的 “active” 状态

::: warning 注意
activeMatch 预计是一个 regex 字符串，但你必须把它定义为一个字符串。我们不能在这里使用实际的正则表达式对象，因为它在构建时不能被序列化
:::


```js
export default {
  themeConfig: {
    nav: [
      // This link gets active state when the user is
      // on `/config/` path.
      {
        text: 'Guide',
        link: '/guide',
        activeMatch: '/config/'
      }
    ]
  }
}
```

侧边栏

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
          ...
        ]
      }
    ]
  }
}
```

多组侧边栏

```js
export default {
  themeConfig: {
    sidebar: {
      // This sidebar gets displayed when user is under `guide` directory.
      '/guide/': [
        {
          text: 'Guide',
          items: [
            // This shows `/guide/index.md` page.
            { text: 'Index', link: '/guide/' }, // /guide/index.md
            { text: 'One', link: '/guide/one' }, // /guide/one.md
            { text: 'Two', link: '/guide/two' } // /guide/two.md
          ]
        }
      ],
      // This sidebar gets displayed when user is under `config` directory.
      '/config/': [
        {
          text: 'Config',
          items: [
            // This shows `/config/index.md` page.
            { text: 'Index', link: '/config/' }, // /config/index.md
            { text: 'Three', link: '/config/three' }, // /config/three.md
            { text: 'Four', link: '/config/four' } // /config/four.md
          ]
        }
      ]
    }
  }
}
```

可收缩侧边栏

```js
export default {
  themeConfig: {
    sidebar: [
      {
        text: 'Section Title A',
        collapsible: true,
        items: [...]
      },
      {
        text: 'Section Title B',
        collapsible: true,
        collapsed: true, //进入页面默认分组展开，设置为true开启收缩状态
        items: [...]
      }
    ]
  }
}
```

首页，VitePress 默认主题提供了一个Home Page布局

```md
---
layout: home
---
```

示例

```md
---
hero:
  name: VitePress
  text: Vite & Vue powered static site generator.
  tagline: Lorem ipsum...
  image:
    src: /logo.png
    alt: VitePress
  actions:
    - theme: brand
      text: Get Started
      link: /guide/what-is-vitepress
    - theme: alt
      text: View on GitHub
      link: https://github.com/vuejs/vitepress
---
```

自定义 name 属性的 color，官网图片是有背景渐变色的，可以通过次方式添加

::: tip 说明
home-hero-name-color 是文字渐变色

home-hero-image-background-image 是图片背景渐变色

如果你想找到css文件路径：node_modules\vitepress\dist\client\theme-default\styles
:::

```md
<style>
  :root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe, #41d1ff);


  --vp-home-hero-image-background-image: linear-gradient(
    -45deg,
    #bd34fe 50%,
    #47caff 50%
  );
  --vp-home-hero-image-filter: blur(40px);
};

</style>
```


特性

```
---
features:
  - icon: ⚡️
    title: Vite, The DX that can't be beat
    details: Lorem ipsum...
  - icon: 🖖
    title: Power of Vue meets Markdown
    details: Lorem ipsum...
  - icon: 🛠️
    title: Simple and minimal, always
    details: Lorem ipsum...
---
```

团队成员

```md
<script setup>
import { VPTeamMembers } from 'vitepress/theme'
const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  },
  ...
]
</script>
# Our Team
Say hello to our awesome team.
<VPTeamMembers size="small" :members="members" />
```

页脚

```js
export default {
  themeConfig: {
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  }
}
```

## 特别鸣谢

* [码农叉叉歪](https://xxy5.com/vitepress-cn/)