import { defineConfig } from 'astro/config';

export default defineConfig({
  // 开发工具栏配置
  devToolbar: {
    enabled: false
  },
  
  // 站点配置
  site: 'https://docs.tego-ai.com',
  
  // 输出配置
  output: 'static',
  
  // 构建配置
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto'
  },
  
  // 图片优化
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**'
      }
    ]
  },
  
  // 集成配置
  integrations: [],
  
  // 实验性功能
  experimental: {
    assets: true,
    viewTransitions: true
  },
  
  // 服务器配置
  server: {
    port: 4321,
    host: true
  },
  
  // 路径别名配置
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@domains': '/src/domains',
        '@shared': '/src/shared',
        '@components': '/src/components',
        '@styles': '/src/styles',
        '@utils': '/src/shared/utils',
        '@types': '/src/shared/types',
        '@constants': '/src/shared/constants'
      }
    },
    css: {
      devSourcemap: true
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['astro'],
            'ui': ['@shared/ui'],
            'search': ['@domains/search'],
            'docs': ['@domains/docs']
          }
        }
      }
    }
  },
  
  // 标记配置
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    },
    remarkPlugins: [
      // 可以添加remark插件
    ],
    rehypePlugins: [
      // 可以添加rehype插件
    ]
  },
  
  // 压缩配置
  compressHTML: true,
  
  // 安全配置
  security: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
    }
  }
});
