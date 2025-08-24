# TeGo-AI 文档中心

## 🚀 项目概述

TeGo-AI 文档中心是一个基于 **Markdown 文档驱动** 的现代化文档网站，采用 **领域驱动设计 (DDD)** 架构，支持文档的自动生成、搜索和管理。

## 🏗️ 架构设计

### 核心原则

- **文档驱动**: 所有内容通过 Markdown 文件管理
- **关注点分离**: 清晰划分 UI、逻辑和状态
- **松耦合高内聚**: 模块功能独立，减少相互依赖
- **可扩展性**: 架构能轻松应对未来需求变化

### 技术栈

- **框架**: Astro (静态站点生成)
- **样式**: CSS + 现代CSS特性
- **构建**: Vite
- **部署**: 支持 Vercel、Netlify 等

## 📁 项目结构

```
src/
├── domains/                    # 核心领域模块 (DDD)
│   ├── docs/                  # 文档领域
│   │   ├── components/        # 文档相关组件
│   │   ├── services/          # 文档服务
│   │   └── types/            # 文档类型定义
│   ├── search/                # 搜索领域
│   │   ├── components/        # 搜索组件
│   │   ├── services/          # 搜索服务
│   │   └── types/            # 搜索类型定义
│   └── ui/                    # UI领域
│       ├── components/        # 基础UI组件
│       ├── styles/            # 样式文件
│       └── icons/            # 图标组件
├── application/                # 应用层
│   ├── routing/               # 路由配置
│   ├── state/                 # 状态管理
│   └── config/                # 应用配置
├── shared/                     # 共享资源
│   ├── constants/             # 常量配置
│   ├── types/                 # 类型定义
│   └── utils/                 # 工具函数
├── content/                    # Markdown 文档内容
│   ├── getting-started/       # 快速开始
│   ├── product-intro/         # 产品介绍
│   ├── features/              # 功能详解
│   ├── architecture/          # 技术架构
│   ├── guides/                # 使用指南
│   └── poc-manual/            # 体验手册
├── pages/                      # 页面组件
└── layouts/                    # 布局组件
```

## 📝 文档管理

### 文档结构

每个文档都是一个 Markdown 文件，包含以下结构：

```markdown
---
title: "文档标题"
description: "文档描述"
category: "category-id"
tags: ["tag1", "tag2"]
author: "TeGo-AI Team"
date: "2024-01-01"
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
```

### 必需元数据

- `title`: 文档标题
- `description`: 文档描述
- `category`: 文档分类 (必须与配置中的分类ID匹配)
- `tags`: 文档标签数组

### 可选元数据

- `author`: 作者 (默认为 "TeGo-AI Team")
- `date`: 发布日期
- `lastModified`: 最后修改日期
- `status`: 状态 (draft/published/archived，默认为 published)
- `order`: 排序顺序 (数字越小越靠前)
- `related`: 相关文档

### 文档分类

系统预定义了以下文档分类：

1. **快速开始** (`getting-started`) - 新手指南和基础概念
2. **产品介绍** (`product-intro`) - 产品功能和技术特性
3. **功能详解** (`features`) - 详细的功能说明和使用方法
4. **技术架构** (`architecture`) - 系统架构和技术实现
5. **使用指南** (`guides`) - 操作指南和最佳实践
6. **体验手册** (`poc-manual`) - 概念验证和体验指南

## 🛠️ 如何添加/更新文档

### 1. 添加新文档

1. 在 `src/content/` 目录下选择或创建相应的分类目录
2. 创建新的 `.md` 文件
3. 添加必要的 frontmatter 元数据
4. 编写 Markdown 内容
5. 保存文件，系统会自动生成对应的页面

### 2. 更新现有文档

1. 找到要更新的 `.md` 文件
2. 修改内容或元数据
3. 更新 `lastModified` 字段（可选，系统会自动更新）
4. 保存文件

### 3. 文档模板

系统提供了文档模板，可以通过以下方式获取：

```bash
# 新文档模板
npm run doc:template new

# 更新文档模板
npm run doc:template update
```

## 🔍 搜索功能

### 搜索配置

搜索系统支持以下配置：

- **索引字段**: title、description、content、tags、category
- **权重配置**: title(10)、description(5)、content(3)、tags(4)、category(2)
- **最小查询长度**: 2个字符
- **最大结果数**: 20个

### 搜索特性

- **分词搜索**: 支持多关键词组合搜索
- **智能匹配**: 基于权重的智能排序
- **高亮显示**: 搜索结果关键词高亮
- **分类过滤**: 支持按分类和标签过滤

## 🎨 主题定制

### 颜色系统

系统使用 CSS 变量管理颜色，主要颜色包括：

- **主色**: #3b82f6 (蓝色)
- **辅色**: #8b5cf6 (紫色)
- **强调色**: #ec4899 (粉色)
- **中性色**: 从 #f8fafc 到 #0f172a 的9个层级

### 间距系统

- **xs**: 0.25rem (4px)
- **sm**: 0.5rem (8px)
- **md**: 1rem (16px)
- **lg**: 1.5rem (24px)
- **xl**: 2rem (32px)
- **2xl**: 3rem (48px)
- **3xl**: 4rem (64px)

### 圆角系统

- **sm**: 0.375rem (6px)
- **md**: 0.5rem (8px)
- **lg**: 0.75rem (12px)
- **xl**: 1rem (16px)
- **2xl**: 1.5rem (24px)
- **full**: 9999px (完全圆形)

## 🚀 开发和部署

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

### 部署

项目支持多种部署方式：

- **Vercel**: 自动部署，支持预览分支
- **Netlify**: 自动部署，支持表单处理
- **GitHub Pages**: 静态文件托管
- **自托管**: 任何支持静态文件的服务器

### 环境变量

创建 `.env.local` 文件配置环境变量：

```env
# 站点配置
SITE_URL=https://docs.tego-ai.com
SITE_NAME=TeGo-AI 文档中心

# 构建配置
GENERATE_SITEMAP=true
GENERATE_RSS=false
```

## 📊 性能优化

### 构建优化

- **代码分割**: 基于路由的自动代码分割
- **资源优化**: 图片自动优化和压缩
- **缓存策略**: 合理的HTTP缓存配置
- **预加载**: 关键资源预加载

### 运行时优化

- **懒加载**: 图片和组件的懒加载
- **虚拟滚动**: 长列表的虚拟滚动支持
- **内存管理**: 组件卸载时的内存清理
- **错误边界**: 优雅的错误处理和降级

## 🔧 维护和更新

### 定期维护

1. **内容审核**: 每月检查文档内容的准确性
2. **链接检查**: 定期检查内部和外部链接
3. **性能监控**: 监控页面加载速度和用户体验
4. **安全更新**: 及时更新依赖包

### 内容更新流程

1. **需求收集**: 收集用户反馈和产品更新需求
2. **内容规划**: 规划文档结构和内容大纲
3. **内容编写**: 编写或更新Markdown文档
4. **内容审核**: 技术团队审核内容准确性
5. **发布上线**: 部署更新后的文档
6. **效果评估**: 评估更新效果和用户反馈

### 版本管理

- 使用 Git 进行版本控制
- 每个文档更新都应该有明确的提交信息
- 重要更新使用语义化版本号
- 维护更新日志记录所有变更

## 🤝 贡献指南

### 贡献流程

1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范

- 使用 TypeScript 进行类型检查
- 遵循 ESLint 和 Prettier 配置
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名
- 添加必要的注释和文档

### 文档规范

- 使用清晰的标题层级结构
- 添加适当的代码示例
- 使用表格展示结构化信息
- 添加必要的截图和图表
- 保持内容的准确性和时效性

## 📞 支持和反馈

### 获取帮助

- **文档问题**: 在 GitHub Issues 中报告
- **功能建议**: 通过 GitHub Discussions 讨论
- **技术问题**: 联系技术团队

### 反馈渠道

- **GitHub Issues**: 报告 bug 和功能请求
- **GitHub Discussions**: 讨论新功能和改进
- **邮件反馈**: 发送邮件到技术支持邮箱

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

---

**最后更新**: 2024年1月
**维护团队**: TeGo-AI 技术团队
