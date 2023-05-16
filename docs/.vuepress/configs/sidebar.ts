import type { SidebarConfig } from '@vuepress/theme-default'

export const sidebarA: SidebarConfig = {
    '/guide/': [
        {
          text: '指南',
          children: [
            '/guide/README.md', 
            '/guide/getting-started.md', 
            '/guide/configuration.md', 
            '/guide/page.md',
            '/guide/markdown.md',
            '/guide/assets.md',
            '/guide/beautification.md', 
            '/guide/plugin.md', 
            '/guide/vitepress.md',
          ],
          collapsible: true, //折叠开关
        },
      ],
}