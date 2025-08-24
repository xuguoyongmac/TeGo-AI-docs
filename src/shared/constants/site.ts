/**
 * 网站核心常量配置
 * 重点支持Markdown文档管理和自动生成
 */

export const SITE_CONFIG = {
  // 基本信息
  name: 'TeGo-AI 文档中心',
  description: '了解产品功能，寻找问题答案',
  version: '1.0.0',
  
  // 文档配置 - 核心配置
  docs: {
    // 文档根目录
    rootDir: 'src/content',
    
    // 支持的文档格式
    supportedFormats: ['.md', '.mdx'],
    
    // 文档分类配置
    categories: [
      {
        id: 'getting-started',
        name: '快速开始',
        slug: 'getting-started',
        description: '新手指南和基础概念',
        icon: 'zap',
        order: 1
      },
      {
        id: 'product-intro',
        name: '产品介绍',
        slug: 'product-intro',
        description: '产品功能和技术特性',
        icon: 'book-open',
        order: 2
      },
      {
        id: 'features',
        name: '功能详解',
        slug: 'features',
        description: '详细的功能说明和使用方法',
        icon: 'layers',
        order: 3
      },
      {
        id: 'architecture',
        name: '技术架构',
        slug: 'architecture',
        description: '系统架构和技术实现',
        icon: 'settings',
        order: 4
      },
      {
        id: 'guides',
        name: '使用指南',
        slug: 'guides',
        description: '操作指南和最佳实践',
        icon: 'compass',
        order: 5
      },
      {
        id: 'poc',
        name: '体验手册',
        slug: 'poc-manual',
        description: '概念验证和体验指南',
        icon: 'play',
        order: 6
      }
    ],
    
    // 文档元数据配置
    metadata: {
      // 必需的元数据字段
      required: ['title', 'description', 'category', 'tags'],
      // 可选的元数据字段
      optional: ['author', 'date', 'lastModified', 'status', 'order', 'related'],
      // 默认值
      defaults: {
        status: 'published',
        order: 999,
        author: 'TeGo-AI Team'
      }
    },
    
    // 文档模板配置
    templates: {
      // 新文档模板
      newDoc: `---
title: "文档标题"
description: "文档描述"
category: "category-id"
tags: ["tag1", "tag2"]
author: "TeGo-AI Team"
date: "${new Date().toISOString().split('T')[0]}"
status: "published"
order: 999
---

# 文档标题

## 概述

在这里写文档概述...

## 主要内容

### 小节标题

内容描述...

## 总结

文档总结...
`,
      
      // 更新文档模板
      updateDoc: `---
title: "文档标题"
description: "文档描述"
category: "category-id"
tags: ["tag1", "tag2"]
author: "TeGo-AI Team"
date: "2024-01-01"
lastModified: "${new Date().toISOString().split('T')[0]}"
status: "published"
order: 999
---

# 文档标题

## 概述

在这里写文档概述...

## 主要内容

### 小节标题

内容描述...

## 总结

文档总结...
`
    }
  },
  
  // 导航配置 - 基于文档自动生成
  navigation: {
    // 自动生成导航的规则
    autoGenerate: true,
    // 导航排序规则
    sortBy: ['order', 'date', 'title'],
    // 最大嵌套深度
    maxDepth: 3
  },
  
  // 搜索配置
  search: {
    placeholder: '搜索文档',
    minQueryLength: 2,
    maxResults: 20,
    highlightClass: 'search-highlight',
    // 搜索索引配置
    index: {
      // 索引的字段
      fields: ['title', 'description', 'content', 'tags', 'category'],
      // 权重配置
      weights: {
        title: 10,
        description: 5,
        content: 3,
        tags: 4,
        category: 2
      }
    }
  },
  
  // 页面配置
  pages: {
    home: {
      hero: {
        title: '欢迎参阅 TeGo-AI 帮助',
        description: '了解产品功能，寻找问题答案'
      },
      features: {
        title: '快捷入口',
        // 从文档分类自动生成
        autoGenerate: true
      }
    }
  },
  
  // 主题配置
  theme: {
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#ec4899',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444',
      neutral: {
        50: '#f8fafc',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a'
      }
    },
    spacing: {
      xs: '0.25rem',
      sm: '0.5rem',
      md: '1rem',
      lg: '1.5rem',
      xl: '2rem',
      '2xl': '3rem',
      '3xl': '4rem'
    },
    borderRadius: {
      sm: '0.375rem',
      md: '0.5rem',
      lg: '0.75rem',
      xl: '1rem',
      '2xl': '1.5rem',
      full: '9999px'
    }
  },
  
  // 性能配置
  performance: {
    lazyLoadThreshold: 0.1,
    imageOptimization: true,
    preloadCritical: true,
    // 文档预加载配置
    docsPreload: {
      enabled: true,
      strategy: 'intersection-observer', // 'scroll' | 'intersection-observer'
      threshold: 0.1
    }
  },
  
  // 构建配置
  build: {
    // 输出目录
    outputDir: 'dist',
    // 是否生成sitemap
    generateSitemap: true,
    // 是否生成RSS
    generateRSS: false,
    // 是否压缩HTML
    minifyHTML: true,
    // 是否压缩CSS
    minifyCSS: true,
    // 是否压缩JS
    minifyJS: true
  }
} as const;

// 导出类型
export type SiteConfig = typeof SITE_CONFIG;
export type DocCategory = typeof SITE_CONFIG.docs.categories[0];
export type DocMetadata = typeof SITE_CONFIG.docs.metadata;
export type DocTemplate = typeof SITE_CONFIG.docs.templates;
