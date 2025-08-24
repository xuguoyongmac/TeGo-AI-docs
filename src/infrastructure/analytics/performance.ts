/**
 * 性能监控配置
 * 收集和分析页面性能指标
 */

export interface PerformanceMetrics {
  // 页面加载性能
  navigationStart: number;
  domContentLoaded: number;
  loadComplete: number;
  
  // 核心Web指标
  lcp?: number; // Largest Contentful Paint
  fid?: number; // First Input Delay
  cls?: number; // Cumulative Layout Shift
  
  // 自定义指标
  timeToFirstByte: number;
  domInteractive: number;
  domComplete: number;
  
  // 资源加载性能
  resourceCount: number;
  resourceSize: number;
  
  // 错误统计
  errorCount: number;
  errorTypes: string[];
}

export interface PerformanceConfig {
  enabled: boolean;
  sampleRate: number;
  maxMetrics: number;
  reportUrl?: string;
  autoReport: boolean;
}

// 默认配置
const DEFAULT_CONFIG: PerformanceConfig = {
  enabled: true,
  sampleRate: 1.0, // 100%采样
  maxMetrics: 100,
  autoReport: false
};

class PerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: PerformanceMetrics[] = [];
  private observer: PerformanceObserver | null = null;
  
  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.init();
  }
  
  private init() {
    if (!this.config.enabled || !this.isSupported()) {
      return;
    }
    
    this.observeNavigationTiming();
    this.observeWebVitals();
    this.observeResources();
    this.observeErrors();
    
    // 页面卸载时收集最终指标
    window.addEventListener('beforeunload', () => {
      this.collectFinalMetrics();
    });
  }
  
  private isSupported(): boolean {
    return 'PerformanceObserver' in window && 'performance' in window;
  }
  
  private observeNavigationTiming() {
    if ('navigation' in performance) {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigation) {
        this.collectNavigationMetrics(navigation);
      }
    }
  }
  
  private observeWebVitals() {
    if ('PerformanceObserver' in window) {
      try {
        // 观察LCP
        this.observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              this.updateMetric('lcp', entry.startTime);
            }
          }
        });
        this.observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (error) {
        console.warn('Web Vitals observation failed:', error);
      }
    }
  }
  
  private observeResources() {
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver((list) => {
          let totalSize = 0;
          let count = 0;
          
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'resource') {
              const resourceEntry = entry as PerformanceResourceTiming;
              if (resourceEntry.transferSize) {
                totalSize += resourceEntry.transferSize;
                count++;
              }
            }
          }
          
          this.updateMetric('resourceCount', count);
          this.updateMetric('resourceSize', totalSize);
        });
        
        resourceObserver.observe({ entryTypes: ['resource'] });
      } catch (error) {
        console.warn('Resource observation failed:', error);
      }
    }
  }
  
  private observeErrors() {
    let errorCount = 0;
    const errorTypes = new Set<string>();
    
    window.addEventListener('error', (event) => {
      errorCount++;
      errorTypes.add(event.type);
      this.updateMetric('errorCount', errorCount);
      this.updateMetric('errorTypes', Array.from(errorTypes));
    });
    
    window.addEventListener('unhandledrejection', (event) => {
      errorCount++;
      errorTypes.add('unhandledrejection');
      this.updateMetric('errorCount', errorCount);
      this.updateMetric('errorTypes', Array.from(errorTypes));
    });
  }
  
  private collectNavigationMetrics(navigation: PerformanceNavigationTiming) {
    const metrics: Partial<PerformanceMetrics> = {
      navigationStart: navigation.startTime,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
      loadComplete: navigation.loadEventEnd - navigation.startTime,
      timeToFirstByte: navigation.responseStart - navigation.requestStart,
      domInteractive: navigation.domInteractive - navigation.startTime,
      domComplete: navigation.domComplete - navigation.startTime
    };
    
    this.addMetrics(metrics);
  }
  
  private updateMetric(key: keyof PerformanceMetrics, value: any) {
    if (this.metrics.length > 0) {
      const lastMetric = this.metrics[this.metrics.length - 1];
      (lastMetric as any)[key] = value;
    }
  }
  
  private addMetrics(metrics: Partial<PerformanceMetrics>) {
    if (Math.random() > this.config.sampleRate) {
      return;
    }
    
    this.metrics.push({
      navigationStart: 0,
      domContentLoaded: 0,
      loadComplete: 0,
      timeToFirstByte: 0,
      domInteractive: 0,
      domComplete: 0,
      ...metrics
    });
    
    // 限制指标数量
    if (this.metrics.length > this.config.maxMetrics) {
      this.metrics.shift();
    }
  }
  
  private collectFinalMetrics() {
    if (this.metrics.length === 0) return;
    
    const finalMetrics = this.metrics[this.metrics.length - 1];
    
    // 计算CLS (简化版本)
    if ('PerformanceObserver' in window) {
      try {
        const clsObserver = new PerformanceObserver((list) => {
          let cls = 0;
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'layout-shift') {
              const layoutShiftEntry = entry as any;
              if (!layoutShiftEntry.hadRecentInput) {
                cls += layoutShiftEntry.value;
              }
            }
          }
          finalMetrics.cls = cls;
        });
        
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (error) {
        console.warn('CLS observation failed:', error);
      }
    }
    
    // 自动上报
    if (this.config.autoReport && this.config.reportUrl) {
      this.reportMetrics(finalMetrics);
    }
  }
  
  public getMetrics(): PerformanceMetrics[] {
    return [...this.metrics];
  }
  
  public getLatestMetrics(): PerformanceMetrics | null {
    return this.metrics.length > 0 ? this.metrics[this.metrics.length - 1] : null;
  }
  
  public reportMetrics(metrics: PerformanceMetrics) {
    if (!this.config.reportUrl) return;
    
    fetch(this.config.reportUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        metrics
      })
    }).catch(error => {
      console.warn('Failed to report metrics:', error);
    });
  }
  
  public clearMetrics() {
    this.metrics = [];
  }
  
  public destroy() {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }
}

// 创建全局实例
export const performanceMonitor = new PerformanceMonitor();

// 导出工具函数
export function getPerformanceMetrics(): PerformanceMetrics[] {
  return performanceMonitor.getMetrics();
}

export function getLatestPerformanceMetrics(): PerformanceMetrics | null {
  return performanceMonitor.getLatestMetrics();
}

export function reportPerformanceMetrics(metrics: PerformanceMetrics) {
  performanceMonitor.reportMetrics(metrics);
}

// 自动收集页面加载性能
if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const metrics = getLatestPerformanceMetrics();
      if (metrics) {
        console.log('Page Performance Metrics:', metrics);
      }
    }, 1000);
  });
}
