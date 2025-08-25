# TeGo-AI 文档中心

基于 Astro 框架构建的智能文档系统，采用传统的页面文件结构，支持 Markdown 内容管理和组件化开发。

## 🏗️ 项目架构

```
TeGo-AI-docs/
├── src/
│   ├── content/           # 📝 内容目录（目前为空）
│   │   ├── knowledgebase/        # 知识库相关（空目录）
│   │   ├── appointment/          # 预约演示（空目录）
│   │   ├── other/                # 其他内容（空目录）
│   │   └── about/                # 关于我们（空目录）
│   ├── pages/             # 🌐 页面文件（路由控制）
│   │   ├── index.astro           # 首页
│   │   └── search.astro          # 搜索页面
│   ├── components/        # 🧩 可复用组件
│   │   ├── Navigation.astro      # 导航栏组件
│   │   ├── Search.astro          # 搜索组件
│   │   ├── Sidebar.astro         # 侧边栏组件
│   │   └── BackToTop.astro       # 返回顶部组件
│   ├── layouts/           # 🎨 页面布局模板
│   │   ├── Layout.astro          # 主布局
│   │   └── DocLayout.astro       # 文档布局
│   ├── styles/            # 💅 样式文件
│   │   ├── global.css            # 全局样式
│   │   ├── navigation.css        # 导航样式
│   │   ├── pages.css             # 页面样式
│   │   ├── components.css        # 组件样式
│   │   └── common.css            # 通用样式
│   └── assets/            # 🖼️ 资源文件
│       └── productImage/         # 产品图片
├── public/                # 📁 静态资源
│   ├── logo_light.png            # Logo 图片
│   ├── logo_light-32.png         # 小 Logo
│   └── productImage/             # 产品相关图片
├── astro.config.mjs      # ⚙️ Astro 配置文件
└── package.json           # 📦 项目依赖
```

## 🔄 当前工作流程

### 1. 页面结构
- **首页**：`src/pages/index.astro` - 包含 6 个快捷入口
- **搜索页**：`src/pages/search.astro` - 搜索结果展示
- **导航栏**：`src/components/Navigation.astro` - 主导航菜单

### 2. 导航菜单结构
```
知识库（下拉菜单）
├── 产品介绍 → /product-intro
├── 技术架构 → /architecture
├── 使用手册 → /product-guide
├── 产品手册 → /product-manual
├── 快速开始 → /getting-started
├── 产品核心功能 → /features
├── 产品功能清单 → /features-list
├── POC体验手册 → /poc-manual
├── 运维部署 → /operations
└── 常见问题 → /faq

关于我们 → /about
预约演示 → /appointment
```

### 3. 首页快捷入口
- 产品介绍 → `./product-intro`
- 快速开始 → `./getting-started`
- POC体验手册 → `./poc-manual`
- 技术架构 → `./architecture`
- 运维部署 → `./operations`
- 常见问题 → `./faq`

## 📝 如何添加新页面

### 🎯 模板位置

项目提供了两个页面模板，位于 `src/layouts/` 目录：

1. **`Layout.astro`** - 基础页面模板（简单页面使用）
2. **`DocLayout.astro`** - 智能文档模板（支持 Markdown 自动生成侧边栏）

### 📋 方法 1：使用基础模板（推荐新手）

#### 步骤 1：创建页面文件
在 `src/pages/` 目录下创建新的 `.astro` 文件：

```bash
# 例如创建产品介绍页面
touch src/pages/product-intro.astro
```

#### 步骤 2：复制基础模板
复制以下模板代码到新文件中：

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="页面标题" description="页面描述">
  <div class="content-card">
    <h1>页面标题</h1>
    <p>这里是页面内容...</p>
    
    <!-- 可以添加更多内容 -->
    <div class="hero-section">
      <h2>特色标题</h2>
      <p>特色描述内容</p>
    </div>
  </div>
</Layout>
```

#### 步骤 3：页面自动生效
- 保存文件后，页面即可通过 `/product-intro` 访问
- 无需额外配置，Astro 自动处理路由

### 📚 方法 2：使用智能文档模板（自动生成侧边栏）

#### 步骤 1：创建页面文件
```bash
touch src/pages/architecture.astro
```

#### 步骤 2：使用 Markdown 内容自动生成侧边栏
```astro
---
import DocLayout from '../layouts/DocLayout.astro';
import { readFileSync } from 'fs';

// 读取 Markdown 文件内容
const markdownContent = readFileSync('./src/content/architecture.md', 'utf-8');
---

<DocLayout 
  title="技术架构"
  description="TeGo-AI 系统技术架构详解"
  markdownContent={markdownContent}
>
  <div set:html={markdownContent} />
</DocLayout>
```

#### 步骤 3：创建对应的 Markdown 文件
```bash
touch src/content/architecture.md
```

在 `src/content/architecture.md` 中编写内容：
```markdown
# 技术架构概述

## 系统架构
这里是系统架构内容...

## 核心组件
这里是核心组件内容...

### 组件A
组件A的详细说明...

### 组件B
组件B的详细说明...

## 部署说明
这里是部署说明内容...
```

**重要**：系统会自动从 Markdown 的 `#`、`##`、`###` 标题生成侧边栏目录！

### 🎨 可用的样式类

#### 基础模板样式类：
- **`.content-card`** - 内容卡片容器
- **`.hero-section`** - 特色区域（渐变背景）
- **`.content-card:hover`** - 悬停效果

#### 文档模板样式类：
- **`.markdown-content h1`** - 主标题（渐变文字效果）
- **`.markdown-content h2`** - 二级标题
- **`.markdown-content h3`** - 三级标题（带背景色）

### 📖 实际模板示例

#### 搜索页面模板（`src/pages/search.astro`）：
```astro
---
import Layout from '../layouts/Layout.astro';
const query = Astro.url.searchParams.get('q') || '';
---

<Layout title={`搜索: ${query} - TeGo-AI 文档中心`}>
  <div class="search-page page-background">
    <div class="search-header">
      <h1>搜索结果</h1>
    </div>
    <!-- 页面内容 -->
  </div>
</Layout>
```

#### Markdown 自动侧边栏示例：
```astro
---
import DocLayout from '../layouts/DocLayout.astro';
import { readFileSync } from 'fs';

// 读取 Markdown 文件
const markdownContent = readFileSync('./src/content/product-intro.md', 'utf-8');
---

<DocLayout 
  title="产品介绍"
  description="了解 TeGo-AI 的核心功能"
  markdownContent={markdownContent}
>
  <div set:html={markdownContent} />
</DocLayout>
```

对应的 Markdown 文件会自动生成侧边栏：
```markdown
# 产品介绍
## 核心功能
### 智能实例管理
### MCP服务生成
## 技术架构
### 拓扑感知
### 实时发现
```

### 🔧 模板选择建议

- **选择 `Layout.astro`**：简单页面、介绍页面、功能说明
- **选择 `DocLayout.astro`**：技术文档、操作手册、长篇文章（推荐，支持 Markdown 自动侧边栏）

## 🔗 导航配置

### 主导航栏
编辑 `src/components/Navigation.astro` 文件中的 `navItems` 数组：

```javascript
const navItems = [
  { 
    name: '知识库', 
    path: '/product-intro',
    children: [
      { name: '产品介绍', path: '/product-intro' },
      { name: '技术架构', path: '/architecture' },
      // ... 其他菜单项
    ]
  },
  { name: '关于我们', path: '/about' },
  { name: '预约演示', path: '/appointment', isHighlight: true }
];
```

### 首页菜单
编辑 `src/pages/index.astro` 文件中的链接：

```html
<a href="./product-intro" class="home-feature-card primary">
  <h3>产品介绍</h3>
  <p>了解 TeGo-AI 的核心功能和技术优势</p>
</a>
```

## 🚀 开发命令

### 启动开发服务器
```bash
npm run dev
```
- 本地访问：`http://localhost:4321`
- 热重载：修改文件后自动刷新

### 构建生产版本
```bash
npm run build
```
- 输出目录：`dist/`
- 静态文件：可直接部署到任何 Web 服务器

### 预览生产版本
```bash
npm run preview
```

## 📚 内容管理最佳实践

### 1. 文件命名
- 使用小写字母和连字符
- 避免空格和特殊字符
- 例如：`product-intro.astro`、`getting-started.astro`

### 2. 目录结构
- 页面文件放在 `src/pages/` 下
- 组件文件放在 `src/components/` 下
- 样式文件放在 `src/styles/` 下

### 3. 链接管理
- 页面间链接使用相对路径
- 例如：`./product-intro`、`../components/Component.astro`
- 避免使用绝对路径

### 4. 图片引用
- 图片文件放在 `public/` 目录下
- 引用路径：`/images/filename.png`
- 支持 PNG、JPG、SVG 等格式

## 🛠️ 技术特性

### Astro 框架优势
- **静态生成**：构建时生成静态 HTML
- **零 JavaScript**：默认无 JS 运行时
- **组件系统**：支持 Astro 组件语法
- **文件路由**：基于文件系统的自动路由

### 项目依赖
- **Astro**: `^5.2.5` - 主框架
- **Marked**: `^16.2.0` - Markdown 解析器

## 📖 维护指南

### 产品经理工作流程
1. **内容更新**：编辑对应的 `.astro` 页面文件
2. **预览效果**：运行 `npm run dev` 查看实时效果
3. **发布部署**：运行 `npm run build` 生成生产版本
4. **文件上传**：将 `dist/` 目录上传到 Web 服务器

### 开发人员工作流程
1. **功能开发**：修改组件、样式、布局文件
2. **页面创建**：创建新的 `.astro` 页面文件
3. **系统维护**：确保构建和部署流程正常

## 🔧 常见问题

### Q: 如何修改页面样式？
A: 编辑 `src/styles/` 目录下的 CSS 文件

### Q: 如何添加新的导航菜单？
A: 修改 `src/components/Navigation.astro` 文件中的 `navItems` 数组

### Q: 如何自定义页面布局？
A: 修改 `src/layouts/Layout.astro` 或 `DocLayout.astro` 文件

### Q: 如何创建新页面？
A: 在 `src/pages/` 目录下创建新的 `.astro` 文件

### Q: 构建后页面样式丢失？
A: 检查 `astro.config.mjs` 中的构建配置

## 📞 技术支持

如有技术问题，请联系开发团队或查看：
- [Astro 官方文档](https://docs.astro.build/)
- [项目 Issues](项目地址/issues)
- [开发团队联系方式](联系方式)

---

**注意**：本项目采用传统的 Astro 页面文件结构，每个页面都需要创建对应的 `.astro` 文件。如需使用 Markdown 内容管理，需要手动配置 Markdown 解析和页面生成逻辑。
