#!/usr/bin/env node

/**
 * 文档模板生成脚本
 * 用于快速创建新的文档模板
 */

const fs = require('fs');
const path = require('path');

// 文档模板
const templates = {
  new: `---
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

  update: `---
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
};

// 可用的分类
const categories = [
  { id: 'getting-started', name: '快速开始' },
  { id: 'product-intro', name: '产品介绍' },
  { id: 'features', name: '功能详解' },
  { id: 'architecture', name: '技术架构' },
  { id: 'guides', name: '使用指南' },
  { id: 'poc-manual', name: '体验手册' }
];

function showHelp() {
  console.log(`
文档模板生成工具

用法:
  node scripts/generate-doc-template.js [选项] <文件名>

选项:
  -t, --type <type>     模板类型 (new|update) [默认: new]
  -c, --category <id>   文档分类ID
  -h, --help            显示帮助信息

分类:
${categories.map(cat => `  ${cat.id} - ${cat.name}`).join('\n')}

示例:
  node scripts/generate-doc-template.js -t new -c getting-started my-doc
  node scripts/generate-doc-template.js update-doc
`);
}

function getCategoryById(id) {
  return categories.find(cat => cat.id === id);
}

function generateTemplate(type, categoryId, filename) {
  const template = templates[type] || templates.new;
  const category = getCategoryById(categoryId);
  
  if (categoryId && !category) {
    console.error(`错误: 无效的分类ID "${categoryId}"`);
    console.log('可用的分类:');
    categories.forEach(cat => console.log(`  ${cat.id} - ${cat.name}`));
    process.exit(1);
  }
  
  let content = template;
  
  if (categoryId) {
    content = content.replace('"category-id"', `"${categoryId}"`);
  }
  
  if (category) {
    content = content.replace('"文档标题"', `"${category.name}"`);
    content = content.replace('"文档描述"', `"${category.name}的详细说明"`);
  }
  
  // 确保文件名有.md扩展名
  if (!filename.endsWith('.md')) {
    filename += '.md';
  }
  
  // 确定文件路径
  let filePath;
  if (categoryId) {
    filePath = path.join('src', 'content', categoryId, filename);
  } else {
    filePath = path.join('src', 'content', filename);
  }
  
  // 创建目录（如果不存在）
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // 写入文件
  fs.writeFileSync(filePath, content, 'utf8');
  
  console.log(`✅ 文档模板已生成: ${filePath}`);
  console.log(`📝 分类: ${category ? category.name : '未指定'}`);
  console.log(`🔧 模板类型: ${type}`);
  
  if (categoryId) {
    console.log(`📁 文件位置: src/content/${categoryId}/`);
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('-h') || args.includes('--help')) {
    showHelp();
    return;
  }
  
  let type = 'new';
  let categoryId = null;
  let filename = null;
  
  // 解析参数
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '-t' || arg === '--type') {
      type = args[++i];
      if (!templates[type]) {
        console.error(`错误: 无效的模板类型 "${type}"`);
        console.log('可用的类型: new, update');
        process.exit(1);
      }
    } else if (arg === '-c' || arg === '--category') {
      categoryId = args[++i];
    } else if (!filename) {
      filename = arg;
    }
  }
  
  if (!filename) {
    console.error('错误: 请指定文件名');
    showHelp();
    process.exit(1);
  }
  
  generateTemplate(type, categoryId, filename);
}

if (require.main === module) {
  main();
}

module.exports = { generateTemplate, templates, categories };
