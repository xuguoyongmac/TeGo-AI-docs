#!/usr/bin/env node

/**
 * 文档统计脚本
 * 分析文档库的状态和统计信息
 */

const fs = require('fs');
const path = require('path');

// 文档分类配置
const categories = [
  { id: 'getting-started', name: '快速开始' },
  { id: 'product-intro', name: '产品介绍' },
  { id: 'features', name: '功能详解' },
  { id: 'architecture', name: '技术架构' },
  { id: 'guides', name: '使用指南' },
  { id: 'poc-manual', name: '体验手册' }
];

// 统计信息
const stats = {
  totalDocs: 0,
  totalWords: 0,
  totalSize: 0,
  categories: {},
  tags: {},
  authors: {},
  status: {},
  recentUpdates: [],
  needsUpdate: []
};

function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    return { content: content.trim() };
  }
  
  const frontmatterStr = match[1];
  const markdownContent = match[2];
  
  try {
    const frontmatter = {};
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
    
    return { ...frontmatter, content: markdownContent.trim() };
  } catch (error) {
    console.warn('解析frontmatter失败:', error);
    return { content: markdownContent.trim() };
  }
}

function analyzeDocument(filePath, content) {
  const { content: markdownContent, ...metadata } = parseFrontmatter(content);
  
  // 基础统计
  const wordCount = markdownContent.split(/\s+/).length;
  const fileSize = Buffer.byteLength(content, 'utf8');
  const lastModified = fs.statSync(filePath).mtime;
  
  // 更新总统计
  stats.totalDocs++;
  stats.totalWords += wordCount;
  stats.totalSize += fileSize;
  
  // 分类统计
  const category = metadata.category || 'uncategorized';
  if (!stats.categories[category]) {
    stats.categories[category] = { count: 0, words: 0, size: 0 };
  }
  stats.categories[category].count++;
  stats.categories[category].words += wordCount;
  stats.categories[category].size += fileSize;
  
  // 标签统计
  if (metadata.tags && Array.isArray(metadata.tags)) {
    metadata.tags.forEach(tag => {
      if (!stats.tags[tag]) {
        stats.tags[tag] = 0;
      }
      stats.tags[tag]++;
    });
  }
  
  // 作者统计
  const author = metadata.author || 'Unknown';
  if (!stats.authors[author]) {
    stats.authors[author] = 0;
  }
  stats.authors[author]++;
  
  // 状态统计
  const status = metadata.status || 'published';
  if (!stats.status[status]) {
    stats.status[status] = 0;
  }
  stats.status[status]++;
  
  // 最近更新
  stats.recentUpdates.push({
    file: path.basename(filePath),
    category,
    title: metadata.title || path.basename(filePath, '.md'),
    lastModified,
    wordCount
  });
  
  // 检查是否需要更新
  const daysSinceUpdate = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceUpdate > 90 || wordCount < 100) {
    stats.needsUpdate.push({
      file: path.basename(filePath),
      category,
      title: metadata.title || path.basename(filePath, '.md'),
      daysSinceUpdate,
      wordCount,
      reason: daysSinceUpdate > 90 ? '长时间未更新' : '内容过短'
    });
  }
  
  return {
    metadata,
    wordCount,
    fileSize,
    lastModified
  };
}

function scanDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    console.log(`目录不存在: ${dirPath}`);
    return;
  }
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    const stat = fs.statSync(itemPath);
    
    if (stat.isDirectory()) {
      scanDirectory(itemPath);
    } else if (item.endsWith('.md')) {
      try {
        const content = fs.readFileSync(itemPath, 'utf8');
        analyzeDocument(itemPath, content);
      } catch (error) {
        console.warn(`读取文件失败: ${itemPath}`, error.message);
      }
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function showStats() {
  console.log('\n📊 文档库统计报告');
  console.log('=' .repeat(50));
  
  // 总体统计
  console.log('\n📈 总体统计:');
  console.log(`  总文档数: ${stats.totalDocs}`);
  console.log(`  总字数: ${stats.totalWords.toLocaleString()}`);
  console.log(`  总大小: ${formatBytes(stats.totalSize)}`);
  
  // 分类统计
  console.log('\n📁 分类统计:');
  Object.entries(stats.categories)
    .sort(([,a], [,b]) => b.count - a.count)
    .forEach(([category, data]) => {
      const categoryName = categories.find(c => c.id === category)?.name || category;
      console.log(`  ${categoryName}: ${data.count} 篇, ${data.words.toLocaleString()} 字, ${formatBytes(data.size)}`);
    });
  
  // 标签统计
  if (Object.keys(stats.tags).length > 0) {
    console.log('\n🏷️  标签统计:');
    Object.entries(stats.tags)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .forEach(([tag, count]) => {
        console.log(`  ${tag}: ${count} 篇`);
      });
  }
  
  // 作者统计
  if (Object.keys(stats.authors).length > 0) {
    console.log('\n👥 作者统计:');
    Object.entries(stats.authors)
      .sort(([,a], [,b]) => b - a)
      .forEach(([author, count]) => {
        console.log(`  ${author}: ${count} 篇`);
      });
  }
  
  // 状态统计
  if (Object.keys(stats.status).length > 0) {
    console.log('\n📋 状态统计:');
    Object.entries(stats.status).forEach(([status, count]) => {
      console.log(`  ${status}: ${count} 篇`);
    });
  }
  
  // 最近更新
  if (stats.recentUpdates.length > 0) {
    console.log('\n🕒 最近更新 (最近5篇):');
    stats.recentUpdates
      .sort((a, b) => b.lastModified - a.lastModified)
      .slice(0, 5)
      .forEach(doc => {
        const date = doc.lastModified.toLocaleDateString('zh-CN');
        console.log(`  ${doc.title} (${doc.category}) - ${date}`);
      });
  }
  
  // 需要更新
  if (stats.needsUpdate.length > 0) {
    console.log('\n⚠️  需要关注的文档:');
    stats.needsUpdate
      .sort((a, b) => b.daysSinceUpdate - a.daysSinceUpdate)
      .slice(0, 5)
      .forEach(doc => {
        console.log(`  ${doc.title} (${doc.category}) - ${doc.reason} (${doc.daysSinceUpdate}天前)`);
      });
  }
  
  // 建议
  console.log('\n💡 建议:');
  if (stats.totalDocs === 0) {
    console.log('  • 文档库为空，建议添加一些基础文档');
  } else {
    if (stats.needsUpdate.length > 0) {
      console.log(`  • 有 ${stats.needsUpdate.length} 篇文档需要关注`);
    }
    if (Object.keys(stats.tags).length < 5) {
      console.log('  • 建议为文档添加更多标签，提高可发现性');
    }
    if (stats.totalWords / stats.totalDocs < 200) {
      console.log('  • 平均文档长度较短，建议丰富文档内容');
    }
  }
}

function main() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  
  console.log('🔍 扫描文档库...');
  scanDirectory(contentDir);
  
  showStats();
}

if (require.main === module) {
  main();
}

module.exports = { analyzeDocument, stats };
