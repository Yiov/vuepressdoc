import { defaultTheme } from 'vuepress'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { getDirname, path } from '@vuepress/utils'
import { prismjsPlugin } from '@vuepress/plugin-prismjs'
import { sidebarA } from './configs/index.js'
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'

const __dirname = getDirname(import.meta.url)

export default {
  lang: 'zh-CN',
  title: '你好， VuePress ！',
  description: '这是我的第一个 VuePress 站点',
  base: '/vuepress/', //网站部署在根目录
  
  
  //========logo路径========//
  head: [['link', 
  //favicon图标
  { rel: 'icon', href: '/vuepress2/images/logo.png' },
  //自定义css样式
  //{ rel: 'stylesheet', href: '/styles/index.scss' },
  ]],

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
        //导航数组
        children: [
          {
            //第1组名称(不可点击)
            text: '基础配置',
            //第1组导航标签
            children: [
              '/guide/README.md', 
              '/guide/getting-started.md', 
              '/guide/configuration.md',
              '/guide/page.md',
            ]
          },
          {
            //第2组名称(不可点击)
            text: '进阶玩法',
            //第1组导航标签
            children: [
              '/guide/markdown.md', 
              '/guide/assets.md', 
              '/guide/beautification.md', 
              '/guide/plugin.md', 
            ]
          },
          {
            //第3组名称(不可点击)
            text: '其他',
            //第1组导航标签
            children: [
              '/guide/vitepress.md', 
            ],
          },
         ],
      },
    ],

    //侧边栏简化
    sidebar: sidebarA,
    

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
  
  //========插件配置========//
  plugins: [
    //docsearch配置
    docsearchPlugin({
      appId: '',
      apiKey: '',
      indexName: '',
      locales: {
        '/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          },
        },
        '/en/': {
          placeholder: 'Search Documentation',
          translations: {
            button: {
              buttonText: 'Search Documentation',
            },
          },
        },
      },
    }),

    //markdown代码高亮配置
    prismjsPlugin({
      preloadLanguages:['markdown', 'jsdoc', 'yaml']
    }),

  ],

  markdown: {
    importCode: {
      handleImportPath: (str) =>
        //将`@vuepress`目录作为一个`./`相对路径
        str.replace(/^@vuepress/, path.resolve(__dirname, './')),
    },
  },


}