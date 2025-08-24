/**
 * 路由配置
 * 定义所有页面的路由规则和元数据
 */

import { SITE_CONFIG } from '../../shared/constants/site';

export interface RouteConfig {
  path: string;
  name: string;
  description: string;
  component: string;
  meta: {
    title: string;
    description: string;
    keywords: string[];
    author: string;
    image?: string;
    canonical?: string;
    noIndex?: boolean;
    noFollow?: boolean;
  };
  children?: RouteConfig[];
}

// 主要路由配置
export const ROUTES: RouteConfig[] = [
  {
    path: '/',
    name: '首页',
    description: 'TeGo-AI 文档中心首页',
    component: 'pages/index.astro',
    meta: {
      title: 'TeGo-AI 文档中心 - 了解产品功能，寻找问题答案',
      description: '欢迎参阅 TeGo-AI 帮助，了解产品功能，寻找问题答案。',
      keywords: ['TeGo-AI', '文档', '帮助', '产品功能', '问题答案'],
      author: 'TeGo-AI Team'
    }
  },
  
  // 文档路由
  {
    path: '/docs',
    name: '文档中心',
    description: '所有文档的入口',
    component: 'pages/docs/index.astro',
    meta: {
      title: '文档中心 - TeGo-AI 帮助文档',
      description: '浏览所有 TeGo-AI 相关文档，包括产品介绍、使用指南、技术架构等。',
      keywords: ['文档', '帮助', '指南', '手册'],
      author: 'TeGo-AI Team'
    },
    children: [
      {
        path: '/docs/getting-started',
        name: '快速开始',
        description: '新手指南和基础概念',
        component: 'pages/docs/getting-started.astro',
        meta: {
          title: '快速开始 - TeGo-AI 新手指南',
          description: '快速上手 TeGo-AI 智能体管理平台，包含环境配置、基础设置等步骤。',
          keywords: ['快速开始', '新手', '指南', '入门', 'TeGo-AI'],
          author: 'TeGo-AI Team'
        }
      },
      {
        path: '/docs/product-intro',
        name: '产品介绍',
        description: '产品功能和技术特性',
        component: 'pages/docs/product-intro.astro',
        meta: {
          title: '产品介绍 - TeGo-AI 核心功能和技术优势',
          description: '了解 TeGo-AI 的核心功能、技术优势和应用场景。',
          keywords: ['产品介绍', '功能', '技术', '优势', '应用场景'],
          author: 'TeGo-AI Team'
        }
      },
      {
        path: '/docs/features',
        name: '功能详解',
        description: '详细的功能说明和使用方法',
        component: 'pages/docs/features.astro',
        meta: {
          title: '功能详解 - TeGo-AI 核心功能和技术特性',
          description: '深入了解 TeGo-AI 的核心功能和技术特性。',
          keywords: ['功能详解', '核心功能', '技术特性'],
          author: 'TeGo-AI Team'
        }
      },
      {
        path: '/docs/architecture',
        name: '技术架构',
        description: '系统架构和技术实现',
        component: 'pages/docs/architecture.astro',
        meta: {
          title: '技术架构 - TeGo-AI 系统设计',
          description: '了解 TeGo-AI 的技术架构和系统设计。',
          keywords: ['技术架构', '系统设计', '技术实现'],
          author: 'TeGo-AI Team'
        }
      },
      {
        path: '/docs/guides',
        name: '使用指南',
        description: '操作指南和最佳实践',
        component: 'pages/docs/guides.astro',
        meta: {
          title: '使用指南 - TeGo-AI 操作指南',
          description: '详细的 TeGo-AI 使用指南和最佳实践。',
          keywords: ['使用指南', '操作指南', '最佳实践'],
          author: 'TeGo-AI Team'
        }
      },
      {
        path: '/docs/poc-manual',
        name: '体验手册',
        description: '概念验证和体验指南',
        component: 'pages/docs/poc-manual.astro',
        meta: {
          title: '体验手册 - TeGo-AI 概念验证',
          description: '快速体验 TeGo-AI 产品功能的完整指南。',
          keywords: ['体验手册', '概念验证', 'POC', '体验'],
          author: 'TeGo-AI Team'
        }
      }
    ]
  },
  
  // 搜索路由
  {
    path: '/search',
    name: '搜索',
    description: '文档搜索功能',
    component: 'pages/search.astro',
    meta: {
      title: '搜索 - TeGo-AI 文档搜索',
      description: '搜索 TeGo-AI 相关文档和帮助信息。',
      keywords: ['搜索', '文档搜索', '帮助搜索'],
      author: 'TeGo-AI Team'
    }
  },
  
  // 其他页面路由
  {
    path: '/faq',
    name: '常见问题',
    description: '常见问题解答',
    component: 'pages/faq.astro',
    meta: {
      title: '常见问题 - TeGo-AI FAQ',
      description: '解答 TeGo-AI 使用过程中的常见疑问和问题。',
      keywords: ['常见问题', 'FAQ', '问题解答', '帮助'],
      author: 'TeGo-AI Team'
    }
  },
  
  {
    path: '/about',
    name: '关于我们',
    description: '团队和项目信息',
    component: 'pages/about.astro',
    meta: {
      title: '关于我们 - TeGo-AI 团队介绍',
      description: '了解 TeGo-AI 团队和项目信息。',
      keywords: ['关于我们', '团队介绍', '项目信息'],
      author: 'TeGo-AI Team'
    }
  }
];

// 获取路由配置
export function getRouteConfig(path: string): RouteConfig | undefined {
  return findRouteByPath(ROUTES, path);
}

// 递归查找路由
function findRouteByPath(routes: RouteConfig[], path: string): RouteConfig | undefined {
  for (const route of routes) {
    if (route.path === path) {
      return route;
    }
    if (route.children) {
      const found = findRouteByPath(route.children, path);
      if (found) return found;
    }
  }
  return undefined;
}

// 获取所有路由路径
export function getAllRoutePaths(): string[] {
  const paths: string[] = [];
  
  function collectPaths(routes: RouteConfig[]) {
    for (const route of routes) {
      paths.push(route.path);
      if (route.children) {
        collectPaths(route.children);
      }
    }
  }
  
  collectPaths(ROUTES);
  return paths;
}

// 获取面包屑导航
export function getBreadcrumbs(path: string): Array<{ name: string; path: string; current: boolean }> {
  const breadcrumbs: Array<{ name: string; path: string; current: boolean }> = [];
  
  // 添加首页
  breadcrumbs.push({ name: '首页', path: '/', current: false });
  
  if (path === '/') {
    breadcrumbs[0].current = true;
    return breadcrumbs;
  }
  
  // 查找当前路由
  const currentRoute = findRouteByPath(ROUTES, path);
  if (currentRoute) {
    // 查找父级路由
    const parentRoute = findParentRoute(ROUTES, path);
    if (parentRoute && parentRoute.path !== '/') {
      breadcrumbs.push({ name: parentRoute.name, path: parentRoute.path, current: false });
    }
    
    breadcrumbs.push({ name: currentRoute.name, path: currentRoute.path, current: true });
  }
  
  return breadcrumbs;
}

// 查找父级路由
function findParentRoute(routes: RouteConfig[], childPath: string): RouteConfig | undefined {
  for (const route of routes) {
    if (route.children) {
      for (const child of route.children) {
        if (child.path === childPath) {
          return route;
        }
      }
      const found = findParentRoute(route.children, childPath);
      if (found) return found;
    }
  }
  return undefined;
}

// 获取相关路由
export function getRelatedRoutes(path: string, limit: number = 5): RouteConfig[] {
  const currentRoute = findRouteByPath(ROUTES, path);
  if (!currentRoute) return [];
  
  const related: RouteConfig[] = [];
  const currentCategory = getRouteCategory(path);
  
  // 收集同类别下的其他路由
  for (const route of ROUTES) {
    if (route.children) {
      for (const child of route.children) {
        if (child.path !== path && getRouteCategory(child.path) === currentCategory) {
          related.push(child);
          if (related.length >= limit) break;
        }
      }
    }
    if (related.length >= limit) break;
  }
  
  return related;
}

// 获取路由类别
function getRouteCategory(path: string): string {
  if (path.startsWith('/docs/')) {
    return 'docs';
  }
  if (path === '/search') {
    return 'search';
  }
  if (path === '/faq') {
    return 'help';
  }
  if (path === '/about') {
    return 'info';
  }
  return 'main';
}

// 导出路由配置
export default ROUTES;
