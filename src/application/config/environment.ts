/**
 * 环境配置管理
 * 支持开发、测试、生产等不同环境的配置
 */

export interface EnvironmentConfig {
  // 基础配置
  NODE_ENV: 'development' | 'production' | 'test';
  SITE_URL: string;
  SITE_NAME: string;
  
  // API配置
  API_BASE_URL: string;
  API_TIMEOUT: number;
  
  // 功能开关
  FEATURES: {
    SEARCH: boolean;
    ANALYTICS: boolean;
    PWA: boolean;
    DEBUG: boolean;
  };
  
  // 性能配置
  PERFORMANCE: {
    LAZY_LOAD: boolean;
    PRELOAD_CRITICAL: boolean;
    IMAGE_OPTIMIZATION: boolean;
    CACHE_STRATEGY: 'aggressive' | 'balanced' | 'minimal';
  };
  
  // 安全配置
  SECURITY: {
    CSP_ENABLED: boolean;
    HSTS_ENABLED: boolean;
    XSS_PROTECTION: boolean;
  };
}

// 开发环境配置
const developmentConfig: EnvironmentConfig = {
  NODE_ENV: 'development',
  SITE_URL: 'http://localhost:4321',
  SITE_NAME: 'TeGo-AI 文档中心 (开发)',
  
  API_BASE_URL: 'http://localhost:3000/api',
  API_TIMEOUT: 10000,
  
  FEATURES: {
    SEARCH: true,
    ANALYTICS: false,
    PWA: false,
    DEBUG: true
  },
  
  PERFORMANCE: {
    LAZY_LOAD: false,
    PRELOAD_CRITICAL: false,
    IMAGE_OPTIMIZATION: false,
    CACHE_STRATEGY: 'minimal'
  },
  
  SECURITY: {
    CSP_ENABLED: false,
    HSTS_ENABLED: false,
    XSS_PROTECTION: true
  }
};

// 生产环境配置
const productionConfig: EnvironmentConfig = {
  NODE_ENV: 'production',
  SITE_URL: 'https://docs.tego-ai.com',
  SITE_NAME: 'TeGo-AI 文档中心',
  
  API_BASE_URL: 'https://api.tego-ai.com',
  API_TIMEOUT: 15000,
  
  FEATURES: {
    SEARCH: true,
    ANALYTICS: true,
    PWA: true,
    DEBUG: false
  },
  
  PERFORMANCE: {
    LAZY_LOAD: true,
    PRELOAD_CRITICAL: true,
    IMAGE_OPTIMIZATION: true,
    CACHE_STRATEGY: 'aggressive'
  },
  
  SECURITY: {
    CSP_ENABLED: true,
    HSTS_ENABLED: true,
    XSS_PROTECTION: true
  }
};

// 测试环境配置
const testConfig: EnvironmentConfig = {
  NODE_ENV: 'test',
  SITE_URL: 'https://test.docs.tego-ai.com',
  SITE_NAME: 'TeGo-AI 文档中心 (测试)',
  
  API_BASE_URL: 'https://test-api.tego-ai.com',
  API_TIMEOUT: 5000,
  
  FEATURES: {
    SEARCH: true,
    ANALYTICS: false,
    PWA: false,
    DEBUG: true
  },
  
  PERFORMANCE: {
    LAZY_LOAD: false,
    PRELOAD_CRITICAL: false,
    IMAGE_OPTIMIZATION: false,
    CACHE_STRATEGY: 'minimal'
  },
  
  SECURITY: {
    CSP_ENABLED: false,
    HSTS_ENABLED: false,
    XSS_PROTECTION: true
  }
};

// 获取当前环境配置
export function getEnvironmentConfig(): EnvironmentConfig {
  const env = import.meta.env.MODE || 'development';
  
  switch (env) {
    case 'production':
      return productionConfig;
    case 'test':
      return testConfig;
    case 'development':
    default:
      return developmentConfig;
  }
}

// 环境变量工具函数
export function getEnvVar(key: string, defaultValue?: string): string {
  return import.meta.env[key] || defaultValue || '';
}

export function isDevelopment(): boolean {
  return getEnvironmentConfig().NODE_ENV === 'development';
}

export function isProduction(): boolean {
  return getEnvironmentConfig().NODE_ENV === 'production';
}

export function isTest(): boolean {
  return getEnvironmentConfig().NODE_ENV === 'test';
}

// 功能开关检查
export function isFeatureEnabled(feature: keyof EnvironmentConfig['FEATURES']): boolean {
  return getEnvironmentConfig().FEATURES[feature];
}

// 性能配置获取
export function getPerformanceConfig() {
  return getEnvironmentConfig().PERFORMANCE;
}

// 安全配置获取
export function getSecurityConfig() {
  return getEnvironmentConfig().SECURITY;
}

// 导出当前配置
export const ENV_CONFIG = getEnvironmentConfig();
