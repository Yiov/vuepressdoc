# 页面

::: warning 更新时间
最近更新：2023-5-14

搭建版本：v2.0-beta.61
:::

页面总体上就是2种：

* 首页：无侧边栏，可做宣传页

* 普通页：有侧边栏，可做文档页

接下来，我们就对这两个页面进行配置


## logo

网站布局好了，但是logo即Favicon图标还没有，看下官方的目录表

```
└─ docs
   └─.vuepress
      └─ public
         └─ images
            └─ logo.png  <- Logo 文件
```


根据目录得知logo文件的位置，在 `.vuepress` 新建一个 `public` 文件夹，再新建一个 `images` 文件夹，放入`logo.png`

::: tip 说明：
官方给的是本地引用，懒人可以直接用远程引用

没有图片显示，确保你文件夹里有图片
:::

打开 `config.ts`文件，添加下列代码中的高亮代码

```ts{4-5}
import { defaultTheme } from 'vuepress'

export default {
  //========logo路径========//
  head: [['link', { rel: 'icon', href: '/images/logo.png' }]],

  //远程引用二选一
//head: [['link', { rel: 'icon', href: 'https://vuejs.org/images/logo.png' }]],
}
```


![](./vuepress-20.png)

![](./vuepress-21.png)


## 导航栏


VuePress有一个开箱即用的默认主题，你需要在你的配置文件中通过 theme 配置项来使用它

### 导航标签

在 `config.ts` 中我们先添加一个 `首页`标签


```ts{4-13}
import { defaultTheme } from 'vuepress'

export default {
//========默认主题配置========//
  theme: defaultTheme({
    // 导航栏
    navbar: [
      {
        text: '首页',
        link: '/',
      },
    ],
  }),
}
```

![](./vuepress-22.png)

![](./vuepress-23.png)


如何继续添加其他的导航标签呢，先看目录表

```
└─ docs
   ├─ guide                     <- 目录：指南
   │  └─ README.md 或 index.md  <- 指南的主页
   └─ README.md                 <- 网站的首页
```


我们在 `doc` 目录新建一个 `guide` 目录，然后新建一个 `READE.md` 文件，里面随便打点内容

```md
## 这是一个指南

我们在 `doc` 目录新建一个 `guide` 目录，然后新建一个 `READE.md` 文件
```

::: tip 说明
目录名都用英文！

这样，我们的指南标签的路由，就准备好了

如果访问404了，检查路由是否正确
:::

```ts{10-13}
export default {
  //========默认主题配置========//
  theme: defaultTheme({
    // 导航栏
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '指南',
        link: '/guide/',
      },
    ],
  }),
}
```

![](./vuepress-24.png)

其他导航标签添加就不赘述了，如果觉得文字单调，我们还可以添加emoji表情，随便找个网站即可

EmojiXD：[https://emojixd.com/](https://emojixd.com/)

```ts{3}
navbar: [
      {
        text: '🧝 指南',
        link: '/guide/',
      },
    ],
```

![](./vuepress-25.png)


### 导航数组

将原先的 `link: '/guide/'` 改成 `children: ['*.md']` ，如下

::: tip 说明
`children` 内包含都是md文件，自己按顺序列出即可
:::

```ts{11-12}
//========默认主题配置========//
  theme: defaultTheme({
    // 导航栏
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '🧝 指南',
        //link: '/guide/'
        children: ['/guide/README.md', '/guide/getting-started.md', '/guide/configuration.md','/guide/page.md']
      },
    ],
  }),
```

![](./vuepress-26.png)


在此基础上，我们还可以像官网一样，添加一个组名，也就是再嵌套一个children


```ts{14-21}
//========默认主题配置========//
  theme: defaultTheme({
    // 导航栏
    navbar: [
      {
        text: '首页',
        link: '/',
      },
      {
        text: '🧝 指南',
        //link: '/guide/'
        //children: ['/guide/README.md', '/guide/getting-started.md', '/guide/configuration.md','/guide/page.md']
        //导航数组
        children: [
          {
            //第1组名称(不可点击)
            text: '教程参考',
            //第1组导航标签
            children: ['/guide/README.md', '/guide/getting-started.md', '/guide/configuration.md','/guide/page.md']
          }
         ],
      },
    ],
  }),
```

![](./vuepress-27.png)


再继续添加第2组就不演示了，一样在childrren里加

::: tip 说明
我们这里有个小问题，就是`前言`，也就是guide目录下的README.md，一直处于激活状态，这个是默认主页，除非你用其他md文件
:::



### 屏蔽页面

::: warning 注意
若无必要，不要随意更改，屏蔽后会404，需自行修改路由到其他页面

比如你不想让别人访问`guide目录`，即屏蔽掉目录下的`README.md`，直接用 `pagePatterns` 修改页面模式
:::

```ts{5-6}
export default {
  //默认配置无需添加
  //pagePatterns: ['**/*.md', '!.vuepress', '!node_modules'],

  //添加一个屏蔽guide目录下的README.md文件
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules', '!guide/README.md'],
}
```



### 语言栏

要启用 VuePress 的语言支持，首先需要使用如下的文件目录结构

::: tip 说明
实际就是新建一个语言目录，再把根目录所有文档放进去，然后手动翻译

其他国语言也一样
:::

```
docs
├─ README.md       <- 默认主页
└─ en              <- 单独新建一个语言目录 例如:en
   └─ README.md    <- 英文版主页
```

在你的 `config.ts` 中设置 locales 选项：

```ts{2-15}
export default {
  //========站点语言配置========//
  locales: {
    //默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器',
    },
    '/en/': {
      lang: 'en-US',
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator',
    },
  },
}
```

![](./vuepress-34.png)


配置完我们发现一个小细节，就是右上角 `Languages` ，切换成中文了，还没有汉字显示


我们需要在`默认主题`下，配置 `selectLanguageName` 和 `selectLanguageText` 来改变


```ts{3-13}
export default {
  theme: defaultTheme({
  //多国语言切换
    locales: {
      '/': {
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
      },
      '/en/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Language',
      },
    },
  }),
}
```

![](./vuepress-35.png)

::: tip 说明
这里很多人搞不定，是因为看错了

站点语言是和语言切换位置不一样
```ts
export default {
  //站点语言位置
  theme: defaultTheme({
    //语言切换位置
  }),
}
```


:::



### 搜索框

官方文档使用的是 [Algolia DocSearch](https://docsearch.algolia.com/)，非常的高大上

::: tip 说明
需要提交你的网站 URL 来加入 DocSearch 项目才能获得索引，索引成功创建后， DocSearch 团队会将 `apiKey` 和 `indexName` 发送到你的邮箱

所以，等我们网站搭建完毕后再去提交网址

[☛ 点我查看具体步骤](../guide/plugin.md#docsearch)
:::



## Frontmatter


我们可以通过 `Frontmatter` 来覆盖当前页面的 lang, title, description 等属性

从而建立一个专属自己的主页

基本的示例：

```md
---
lang: zh-CN
title: 页面的标题
description: 页面的描述
---
```

![](./vuepress-28.png)



### 设置首页

设定该页面是 `首页` 还是 `普通页面`

::: tip  说明
默认关闭，是普通页面，即文档页，有侧边栏

设置为 true ，就是首页，无侧边栏
:::

```md{2}
---
home: true
---
```

这样我们的首页就设定好了，我们依次添加其他元素来完善主页

![](./vuepress-29.png)



### 图片路径

默认的路径是public文件夹，首页图片的引用方式 二选一

```md{3,5}
---
# Public文件路径 本地引用
heroImage: /images/logo.png
# URL 远程引用
heroImage: https://vuejs.org/images/logo.png
---
```

夜间模式中，单独使用其他的首页图片，示例：

::: tip 说明
有的人logo是黑色的，如果遇到夜间模式就需要单独配置，不然看不到了
:::

```md{2}
---
heroImageDark: /images/logo.png
---
```



### 首页按钮

用 `actions` 配置首页按钮，一般2个是比较舒适的，当然你也可以配置多个

::: tip 说明
text 显示文字

link 跳转路径

type 主次类型显示；都赋予值，仅primary默认主要；不赋予值，全部默认主要按钮
:::

::: details 点击查看 其他type表达

```
主要的：primary

次要的：secondary

第3级：tertiary

第4级：quaternary

第5级：quinary

第6级：senary

第7级：septenary

第8级：octonary

第9级：nonary

第10级：denary
```
:::

输入：

```md{2-8}
---
actions:
  - text: 快速上手
    link: /guide/getting-started.html
    type: primary
  - text: 项目简介
    link: /guide/
    type: secondary
---
```

输出：

![](./vuepress-30.png)


### 特性列表

用 `features` 配置首页特性列表

输入：

```md{2-8}
---
features:
  - title: 简洁至上
    details: 以 Markdown 为中心的项目结构，以最少的配置帮助你专注于写作。
  - title: Vue 驱动
    details: 享受 Vue 的开发体验，可以在 Markdown 中使用 Vue 组件，又可以使用 Vue 来开发自定义主题。
  - title: 高性能
    details: VuePress 会为每个页面预渲染生成静态的 HTML，同时，每个页面被加载的时候，将作为 SPA 运行。
---
```

输出：

![](./vuepress-31.png)


### 页脚


用 `footer` 配置首页的页脚，一般就是版权和备案信息


```md{2}
---
footer: MIT Licensed | Copyright © 2018-present Evan You
---
```

但有一个特殊情况，要备案的话需要有跳转，这里直接打 `</a>` 标签不能用

我们将页脚的html开启，然后书写备案信息

```md{2}
---
footerHtml: true

footer: Copyright © 2023 备案号：<a href="https://beian.miit.gov.cn/">京****号</a>
---
```

输出：

![](./vuepress-32.png)


### 内容

官方文档在这里加入了一个代码块

我们后面会细说，先直接复制了看效果吧!

::: tip 说明
你不想加，也可以像写markdown一样添加内容

注意：markdown内容要放在`Frontmatter` 以外
:::

````md
### 像数 1, 2, 3 一样容易

:::: code-group
::: code-group-item PNPM
```bash
# 在你的项目中安装
pnpm add -D vuepress@next @vuepress/client@next vue

# 新建一个 markdown 文件
echo '# Hello VuePress' > README.md

# 开始写作
pnpm vuepress dev

# 构建静态文件
pnpm vuepress build
```
:::
::: code-group-item YARN
```bash
# 在你的项目中安装
yarn add -D vuepress@next

# 新建一个 markdown 文件
echo '# Hello VuePress' > README.md

# 开始写作
yarn vuepress dev

# 构建静态文件
yarn vuepress build
```
:::
::: code-group-item NPM
```bash
# 在你的项目中安装
npm install -D vuepress@next

# 新建一个 markdown 文件
echo '# Hello VuePress' > README.md

# 开始写作
npx vuepress dev

# 构建静态文件
npx vuepress build
```
:::
::::
````


输出：

![](./vuepress-33.png)



### 上个页面

上一个页面的链接，会自动根据侧边栏配置进行推断

你也可以手动配配置

输入：

```md
---
# NavLink
prev:
  text: Get Started
  link: /guide/getting-started.html

# NavLink - 外部 URL
prev:
  text: GitHub
  link: https://github.com

# 字符串 - 页面文件路径
prev: /guide/getting-started.md

# 字符串 - 页面文件相对路径
prev: ../../guide/getting-started.md
---
```


### 下个页面



下一个页面的链接，会自动根据侧边栏配置进行推断

输入：

```md
---
# NavLink
next:
  text: Get Started
  link: /guide/getting-started.html

# NavLink - 外部 URL
next:
  text: GitHub
  link: https://github.com

# 字符串 - 页面文件路径
next: /guide/getting-started.md

# 字符串 - 页面文件相对路径
next: ../../guide/getting-started.md
---
```




### layout

页面的布局

如果主题布局无法满足你的需求，你可以使用自定义布局组件。

示例：

在 `.vuepress/client.ts` 文件中注册一个布局组件：

```ts
import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'

export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
})
```

布局中写

```md
---
layout: CustomLayout
---
```



## 侧边栏

建议是基本都搭建完成后，再来配置此项目

::: tip 说明
这也是vuepress弊端之一，每次都需要手配
:::

最简单的配置

```ts{4-6}
export default {
  theme: defaultTheme({
    sidebar: [
      //这里填文件路径
      '/guide/README.md', '/guide/getting-started.md', '/guide/configuration.md', '/guide/page.md'
    ],
  }),
}
```


我们还可以加入父目录大标题，将这些文件放入children中

::: tip 说明
还可以添加远程连接引用
:::

```ts{4-20}
export default {
  theme: defaultTheme({
    sidebar: [
      //父目录包含子文件
      {
        text: '指南',
        link: '/guide/',
        children: ['/guide/README.md', '/guide/getting-started.md', '/guide/configuration.md', '/guide/page.md',
        {
          //子目录远程引用
          text: 'github',
          link: 'https://github.com',
        },
      ],
      },
      {
        //父目录远程引用
        text: 'github',
        link: 'https://github.com',
      },
    ],
  }),
}
```


不同子路径下的页面，使用不同的侧边栏，包括折叠开关

::: tip 说明
多个目录自己挨个添加即可，与guide同级
:::

```ts{4-10}
export default {
  theme: defaultTheme({
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          children: ['/guide/README.md', '/guide/getting-started.md', '/guide/configuration.md', '/guide/page.md',],
          collapsible: true, //折叠开关
        },
      ],
    },
  }),
}
```
