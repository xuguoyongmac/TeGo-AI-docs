#!/usr/bin/env node

/**
 * 文档验证脚本
 * 检查文档的完整性和格式
 */

const fs = require('fs');
const path = require('path');

// 验证规则
const validationRules = {
  requiredFields: ['title', 'description', 'category', 'tags'],
  validCategories: ['getting-started', 'product-intro', 'features', 'architecture', 'guides', 'poc-manual'],
  validStatuses: ['draft', 'published', 'archived'],
  minWordCount: 50,
  maxTitleLength: 100,
  maxDescriptionLength: 200
};

// 验证结果
const validationResults = {
  total: 0,
  passed: 0,
  failed: 0,
  errors: [],
  warnings: []
};

function validateDocument(filePath, content) {
  const { metadata, content: markdownContent } = parseFrontmatter(content);
  const errors = [];
  const warnings = [];
  
  // 检查必需字段
  for (const field of validationRules.requiredFields) {
    if (!metadata[field]) {
      errors.push(`缺少必需字段: ${field}`);
    }
  }
  
  // 检查分类
  if (metadata.category && !validationRules.validCategories.includes(metadata.category)) {
    errors.push(`无效的分类: ${metadata.category}`);
  }
  
  // 检查状态
  if (metadata.status && !validationRules.validStatuses.includes(metadata.status)) {
    errors.push(`无效的状态: ${metadata.status}`);
  }
  
  // 检查标题长度
  if (metadata.title && metadata.title.length > validationRules.maxTitleLength) {
    warnings.push(`标题过长: ${metadata.title.length} 字符 (建议不超过 ${validationRules.maxTitleLength})`);
  }
  
  // 检查描述长度
  if (metadata.description && metadata.description.length > validationRules.maxDescriptionLength) {
    warnings.push(`描述过长: ${metadata.description.length} 字符 (建议不超过 ${validationRules.maxDescriptionLength})`);
  }
  
  // 检查内容长度
  const wordCount = markdownContent.split(/\s+/).length;
  if (wordCount < validationRules.minWordCount) {
    warnings.push(`内容过短: ${wordCount} 字 (建议至少 ${validationRules.minWordCount} 字)`);
  }
  
  // 检查标签
  if (metadata.tags && Array.isArray(metadata.tags)) {
    if (metadata.tags.length === 0) {
      warnings.push('建议添加至少一个标签');
    }
    if (metadata.tags.length > 10) {
      warnings.push(`标签过多: ${metadata.tags.length} 个 (建议不超过 10 个)`);
    }
  }
  
  // 检查日期格式
  if (metadata.date) {
    const date = new Date(metadata.date);
    if (isNaN(date.getTime())) {
      errors.push(`无效的日期格式: ${metadata.date}`);
    }
  }
  
  // 检查最后修改日期
  if (metadata.lastModified) {
    const lastModified = new Date(metadata.lastModified);
    if (isNaN(lastModified.getTime())) {
      errors.push(`无效的最后修改日期: ${metadata.lastModified}`);
    }
  }
  
  return { errors, warnings };
}

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
    return { content: markdownContent.trim() };
  }
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
      validationResults.total++;
      
      try {
        const content = fs.readFileSync(itemPath, 'utf8');
        const { errors, warnings } = validateDocument(itemPath, content);
        
        if (errors.length === 0 && warnings.length === 0) {
          validationResults.passed++;
        } else {
          validationResults.failed++;
          
          if (errors.length > 0) {
            validationResults.errors.push({
              file: itemPath,
              errors
            });
          }
          
          if (warnings.length > 0) {
            validationResults.warnings.push({
              file: itemPath,
              warnings
            });
          }
        }
      } catch (error) {
        validationResults.failed++;
        validationResults.errors.push({
          file: itemPath,
          errors: [`读取文件失败: ${error.message}`]
        });
      }
    }
  }
}

function showResults() {
  console.log('\n📋 文档验证报告');
  console.log('=' .repeat(50));
  
  console.log(`\n📊 总体统计:`);
  console.log(`  总文档数: ${validationResults.total}`);
  console.log(`  通过: ${validationResults.passed} ✅`);
  console.log(`  失败: ${validationResults.failed} ❌`);
  
  if (validationResults.errors.length > 0) {
    console.log(`\n❌ 错误详情:`);
    validationResults.errors.forEach(({ file, errors }) => {
      console.log(`\n  📄 ${file}:`);
      errors.forEach(error => console.log(`    • ${error}`));
    });
  }
  
  if (validationResults.warnings.length > 0) {
    console.log(`\n⚠️  警告详情:`);
    validationResults.warnings.forEach(({ file, warnings }) => {
      console.log(`\n  📄 ${file}:`);
      warnings.forEach(warning => console.log(`    • ${warning}`));
    });
  }
  
  if (validationResults.errors.length === 0 && validationResults.warnings.length === 0) {
    console.log(`\n🎉 所有文档验证通过！`);
  } else if (validationResults.errors.length === 0) {
    console.log(`\n✅ 所有文档验证通过，但有 ${validationResults.warnings.length} 个警告`);
  } else {
    console.log(`\n❌ 有 ${validationResults.errors.length} 个文档验证失败`);
    process.exit(1);
  }
}

function main() {
  const contentDir = path.join(process.cwd(), 'src', 'content');
  
  console.log('🔍 开始验证文档...');
  scanDirectory(contentDir);
  showResults();
}

if (require.main === module) {
  main();
}

module.exports = { validateDocument, validationResults };
