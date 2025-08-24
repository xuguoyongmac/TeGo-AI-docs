/**
 * 核心类型定义
 * 为整个项目提供统一的类型支持
 */

// 基础类型
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// 文档相关类型
export interface DocContent extends BaseEntity {
  title: string;
  description: string;
  content: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  readingTime: number;
  wordCount: number;
}

export interface DocCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  parentId?: string;
  children?: DocCategory[];
  docCount: number;
}

// 搜索相关类型
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'doc' | 'page' | 'faq';
  category: string;
  tags: string[];
  score: number;
  highlights: {
    title: string[];
    description: string[];
    content: string[];
  };
}

export interface SearchQuery {
  q: string;
  category?: string;
  tags?: string[];
  type?: string;
  page?: number;
  limit?: number;
}

export interface SearchFilters {
  categories: string[];
  tags: string[];
  types: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// 导航相关类型
export interface NavigationItem {
  name: string;
  path: string;
  description?: string;
  icon?: string;
  children?: NavigationItem[];
  external?: boolean;
  badge?: {
    text: string;
    variant: 'default' | 'success' | 'warning' | 'error';
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string;
  current: boolean;
}

// 用户相关类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'viewer';
  permissions: string[];
}

// 页面元数据
export interface PageMeta {
  title: string;
  description: string;
  keywords: string[];
  author: string;
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  noFollow?: boolean;
}

// 主题相关类型
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  neutral: Record<string, string>;
}

export interface ThemeSpacing {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
}

export interface ThemeBorderRadius {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: ThemeBorderRadius;
}

// 配置类型
export interface SiteConfig {
  name: string;
  description: string;
  version: string;
  navigation: {
    main: NavigationItem[];
  };
  search: {
    placeholder: string;
    minQueryLength: number;
    maxResults: number;
    highlightClass: string;
  };
  pages: Record<string, any>;
  theme: Theme;
  performance: {
    lazyLoadThreshold: number;
    imageOptimization: boolean;
    preloadCritical: boolean;
  };
}

// 组件Props类型
export interface BaseComponentProps {
  className?: string;
  id?: string;
  'data-testid'?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export interface InputProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'search' | 'number';
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  error?: string;
  disabled?: boolean;
}

// 工具类型
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type Required<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// 事件类型
export interface SearchEvent {
  query: string;
  results: SearchResult[];
  filters: SearchFilters;
  timestamp: Date;
}

export interface NavigationEvent {
  from: string;
  to: string;
  timestamp: Date;
  userAgent: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// 导出所有类型
export * from './doc';
export * from './search';
export * from './navigation';
export * from './user';
export * from './theme';
export * from './api';
