/**
 * 文档管理工具函数
 * 支持Markdown文档的解析、验证和生成
 */

import { SITE_CONFIG } from '../constants/site';
import type { DocContent, DocCategory } from '../types';

/**
 * 解析Markdown文档的frontmatter
 */
export function parseFrontmatter(content: string): Record<string, any> {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return {};
  }
  
  const frontmatterStr = match[1];
  const markdownContent = match[2];
  
  try {
    // 简单的YAML解析（生产环境建议使用js-yaml）
    const frontmatter: Record<string, any> = {};
    const lines = frontmatterStr.split('\n');
    
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // 处理数组值
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map(v => v.trim().replace(/"/g, ''));
        }
        // 处理字符串值
        else if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        // 处理布尔值
        else if (value === 'true') {
          value = true;
        } else if (value === 'false') {
          value = false;
        }
        
        frontmatter[key] = value;
      }
    }
    
    return { ...frontmatter, content: markdownContent };
  } catch (error) {
    console.error('解析frontmatter失败:', error);
    return { content };
  }
}

/**
 * 验证文档元数据
 */
export function validateDocMetadata(metadata: Record<string, any>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // 检查必需字段
  for (const field of SITE_CONFIG.docs.metadata.required) {
    if (!metadata[field]) {
      errors.push(`缺少必需字段: ${field}`);
    }
  }
  
  // 检查分类是否有效
  if (metadata.category) {
    const validCategories = SITE_CONFIG.docs.categories.map(cat => cat.id);
    if (!validCategories.includes(metadata.category)) {
      errors.push(`无效的分类: ${metadata.category}`);
    }
  }
  
  // 检查标签格式
  if (metadata.tags && Array.isArray(metadata.tags)) {
    if (metadata.tags.length === 0) {
      warnings.push('建议添加至少一个标签');
    }
  }
  
  // 检查状态值
  if (metadata.status && !['draft', 'published', 'archived'].includes(metadata.status)) {
    errors.push(`无效的状态值: ${metadata.status}`);
  }
  
  // 检查日期格式
  if (metadata.date) {
    const date = new Date(metadata.date);
    if (isNaN(date.getTime())) {
      errors.push(`无效的日期格式: ${metadata.date}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * 生成文档对象
 */
export function generateDocObject(
  filePath: string, 
  content: string, 
  metadata: Record<string, any>
): DocContent {
  const slug = filePath.replace(/\.md$/, '').split('/').pop() || '';
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200); // 假设每分钟200词
  
  return {
    id: slug,
    title: metadata.title || slug,
    description: metadata.description || '',
    content,
    slug,
    category: metadata.category || 'uncategorized',
    tags: Array.isArray(metadata.tags) ? metadata.tags : [],
    author: metadata.author || SITE_CONFIG.docs.metadata.defaults.author,
    status: metadata.status || SITE_CONFIG.docs.metadata.defaults.status,
    publishedAt: metadata.date ? new Date(metadata.date) : undefined,
    readingTime,
    wordCount,
    createdAt: metadata.date ? new Date(metadata.date) : new Date(),
    updatedAt: metadata.lastModified ? new Date(metadata.lastModified) : new Date()
  };
}

/**
 * 生成文档导航
 */
export function generateDocNavigation(docs: DocContent[]): DocCategory[] {
  const categories = SITE_CONFIG.docs.categories.map(cat => ({
    ...cat,
    docs: docs.filter(doc => doc.category === cat.id)
  }));
  
  // 按order排序
  return categories.sort((a, b) => a.order - b.order);
}

/**
 * 生成文档搜索索引
 */
export function generateSearchIndex(docs: DocContent[]): any[] {
  return docs.map(doc => ({
    id: doc.id,
    title: doc.title,
    description: doc.description,
    content: doc.content,
    category: doc.category,
    tags: doc.tags,
    url: `/docs/${doc.slug}`,
    type: 'doc' as const
  }));
}

/**
 * 生成新文档模板
 */
export function generateNewDocTemplate(category: string, title: string): string {
  const template = SITE_CONFIG.docs.templates.newDoc;
  const today = new Date().toISOString().split('T')[0];
  
  return template
    .replace('"文档标题"', `"${title}"`)
    .replace('"文档描述"', `"${title}的详细说明"`)
    .replace('"category-id"', `"${category}"`)
    .replace('"${new Date().toISOString().split(\'T\')[0]}"', today);
}

/**
 * 更新文档元数据
 */
export function updateDocMetadata(
  content: string, 
  updates: Record<string, any>
): string {
  const { metadata, markdownContent } = parseFrontmatter(content);
  const updatedMetadata = { ...metadata, ...updates };
  
  // 生成新的frontmatter
  const frontmatterLines = Object.entries(updatedMetadata)
    .filter(([key]) => key !== 'content')
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`;
      }
      if (typeof value === 'string') {
        return `${key}: "${value}"`;
      }
      return `${key}: ${value}`;
    });
  
  const newFrontmatter = `---\n${frontmatterLines.join('\n')}\n---\n`;
  
  return newFrontmatter + markdownContent;
}

/**
 * 计算文档相似度（用于相关文档推荐）
 */
export function calculateDocSimilarity(doc1: DocContent, doc2: DocContent): number {
  let score = 0;
  
  // 分类相同加分
  if (doc1.category === doc2.category) {
    score += 3;
  }
  
  // 标签重叠加分
  const commonTags = doc1.tags.filter(tag => doc2.tags.includes(tag));
  score += commonTags.length * 2;
  
  // 标题相似度加分
  const titleWords1 = doc1.title.toLowerCase().split(/\s+/);
  const titleWords2 = doc2.title.toLowerCase().split(/\s+/);
  const commonTitleWords = titleWords1.filter(word => titleWords2.includes(word));
  score += commonTitleWords.length;
  
  return score;
}

/**
 * 获取相关文档
 */
export function getRelatedDocs(
  currentDoc: DocContent, 
  allDocs: DocContent[], 
  limit: number = 5
): DocContent[] {
  const similarities = allDocs
    .filter(doc => doc.id !== currentDoc.id)
    .map(doc => ({
      doc,
      similarity: calculateDocSimilarity(currentDoc, doc)
    }))
    .sort((a, b) => b.similarity - a.similarity);
  
  return similarities.slice(0, limit).map(item => item.doc);
}

/**
 * 生成文档目录
 */
export function generateDocTOC(content: string): Array<{ level: number; title: string; id: string }> {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const toc: Array<{ level: number; title: string; id: string }> = [];
  
  let match;
  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const title = match[2].trim();
    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    toc.push({ level, title, id });
  }
  
  return toc;
}

/**
 * 检查文档是否需要更新
 */
export function checkDocUpdateNeeded(doc: DocContent): {
  needsUpdate: boolean;
  reasons: string[];
} {
  const reasons: string[] = [];
  let needsUpdate = false;
  
  // 检查最后更新时间
  const daysSinceUpdate = Math.floor(
    (Date.now() - doc.updatedAt.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  if (daysSinceUpdate > 90) {
    reasons.push(`文档已${daysSinceUpdate}天未更新，建议检查内容是否过时`);
    needsUpdate = true;
  }
  
  // 检查内容长度
  if (doc.wordCount < 100) {
    reasons.push('文档内容过短，建议补充更多信息');
    needsUpdate = true;
  }
  
  // 检查标签数量
  if (doc.tags.length === 0) {
    reasons.push('文档缺少标签，建议添加相关标签');
    needsUpdate = true;
  }
  
  return { needsUpdate, reasons };
}
