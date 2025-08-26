// DOM 工具函数

/**
 * 安全地获取DOM元素，带类型断言
 */
export function getElement<T extends HTMLElement>(id: string, type: new () => T): T | null {
  const element = document.getElementById(id);
  return element ? (element as T) : null;
}

/**
 * 安全地获取DOM元素，默认为HTMLElement
 */
export function getElementById(id: string): HTMLElement | null {
  return getElement(id, HTMLElement);
}

/**
 * 安全地获取表单元素
 */
export function getFormElement(id: string): HTMLFormElement | null {
  return getElement(id, HTMLFormElement);
}

/**
 * 安全地获取输入元素
 */
export function getInputElement(id: string): HTMLInputElement | null {
  return getElement(id, HTMLInputElement);
}

/**
 * 安全地获取按钮元素
 */
export function getButtonElement(id: string): HTMLButtonElement | null {
  return getElement(id, HTMLButtonElement);
}

/**
 * 等待DOM加载完成
 */
export function onDOMReady(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
}

/**
 * 平滑滚动到元素
 */
export function scrollToElement(element: HTMLElement, offset: number = 0): void {
  const elementTop = element.offsetTop - offset;
  window.scrollTo({
    top: elementTop,
    behavior: 'smooth'
  });
}

/**
 * 获取导航栏高度
 */
export function getNavbarHeight(): number {
  const navbar = document.querySelector('.navbar') as HTMLElement;
  return navbar ? navbar.offsetHeight : 88;
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
