# TeGo-AI 文档中心

基于 Astro 构建的现代化文档网站，专为 TeGo-AI 智能体管理平台设计。采用组件化架构和 Markdown 内容管理，支持运营人员和产品经理轻松维护产品文档。

## ✨ 项目特色

- 🎨 **现代化UI设计**：渐变背景、3D变换、动态动画效果
- 🔍 **智能搜索系统**：支持分词搜索、组合关键词匹配
- 📱 **响应式设计**：完美适配各种设备尺寸
- 🚀 **高性能体验**：静态生成、快速加载、流畅交互
- 🛠️ **易于维护**：运营人员只需编辑 Markdown 文件

## 📋 目录

- [项目概述](#项目概述)
- [快速开始](#快速开始)
- [UI特性](#ui特性)
- [内容管理流程](#内容管理流程)
- [技术架构](#技术架构)
- [部署指南](#部署指南)
- [常见问题](#常见问题)

## 🎯 项目概述

### 主要功能
- 📖 **产品介绍**：核心功能、技术优势、应用场景
- 🚀 **快速开始**：安装部署、基础配置、首次使用
- 🔧 **功能详解**：详细的功能说明和操作指南
- 📚 **技术文档**：架构说明、API文档、最佳实践
- 🔍 **智能搜索**：全站内容搜索，支持组合关键词
- 📱 **响应式设计**：支持各种设备访问

### 设计理念
- **运营友好**：运营人员只需编辑 Markdown 文件
- **产品导向**：突出产品核心功能和价值
- **用户友好**：清晰的导航和搜索体验
- **维护简单**：模块化设计，易于扩展和维护
- **视觉现代**：采用最新的设计趋势和交互效果

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装和运行

```bash
# 克隆项目
git clone <repository-url>
cd TeGo-AI-docs

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

访问 http://localhost:4321 查看网站。

## 🎨 UI特性

### 现代化设计元素
- **渐变背景**：多色渐变背景，营造现代感
- **3D变换**：卡片悬停时的3D倾斜效果
- **动态动画**：粒子背景、光晕效果、光波扫过
- **智能交互**：丰富的悬停和点击反馈

### 导航系统
- **动态下划线**：导航项的动画下划线效果
- **渐变高亮**：炫酷的渐变高亮背景
- **胶囊按钮**：现代化的按钮设计风格
- **智能隐藏**：滚动时的智能导航栏控制

### 搜索体验
- **智能匹配**：支持分词搜索和组合关键词
- **实时高亮**：搜索结果的关键词高亮显示
- **胶囊设计**：全圆角的搜索框设计
- **霸气按钮**：特色风格的搜索按钮

### 首页布局
- **分层设计**：主要功能和次要功能分层展示
- **紧凑卡片**：节省空间的信息展示方式
- **视觉层次**：清晰的信息架构和视觉引导
- **响应式网格**：自动适应的网格布局

## 📝 内容管理流程

### 🆕 添加新页面

#### 步骤 1：创建 Markdown 内容

1. **进入内容目录**
   ```bash
   cd src/content/
   ```

2. **创建新的 Markdown 文件**
   ```bash
   # 例如：创建 API 文档
   touch api-docs.md
   ```

3. **编写内容（使用标准格式）**
   ```markdown
   # API 文档 {#overview}
   
   这里是页面简介...
   
   ## 认证 {#authentication}
   
   认证相关内容...
   
   ## 接口列表 {#endpoints}
   
   接口相关内容...
   ```

#### 步骤 2：创建页面文件

1. **创建对应的 Astro 文件**
   ```bash
   cd src/pages/
   touch api-docs.astro
   ```

2. **使用标准模板**
   ```astro
   ---
   import DocLayout from '../layouts/DocLayout.astro';
   import { readFileSync } from 'fs';
   import { marked } from 'marked';

   // 读取Markdown内容
   const markdownContent = readFileSync('./src/content/api-docs.md', 'utf-8');
   const htmlContent = marked(markdownContent);

   // 侧边栏配置
   const sidebarItems = [
     { href: '#overview', text: '概述' },
     { href: '#authentication', text: '认证' },
     { href: '#endpoints', text: '接口列表' }
   ];

   // 面包屑配置
   const breadcrumbs = [
     { href: '/', text: '首页' },
     { text: 'API 文档' }
   ];
   ---

   <DocLayout 
     title="API 文档"
     description="TeGo-AI API 接口文档"
     sidebarTitle="目录"
     sidebarItems={sidebarItems}
     breadcrumbs={breadcrumbs}
   >
     <div set:html={htmlContent} />
     
     <div slot="navigation">
       <a href="/" class="nav-link">← 返回首页</a>
       <a href="/next-page" class="nav-link">下一页 →</a>
     </div>
   </DocLayout>
   ```

#### 步骤 3：添加导航链接

在 `src/pages/index.astro` 中添加新页面链接：

```astro
<a href="/api-docs" class="home-resource-card compact">
  <div class="home-resource-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <!-- 图标路径 -->
    </svg>
  </div>
  <div class="home-resource-content">
    <h3>API 文档</h3>
    <p>详细的 API 接口文档和使用说明</p>
  </div>
</a>
```

### 📝 Markdown 编写规范

#### 标题格式
```markdown
# 一级标题 {#overview}
## 二级标题 {#section1}
### 三级标题 {#subsection1}
```

**重要**：每个标题后面都要加上 `{#锚点ID}`，用于侧边栏导航跳转。

#### 锚点ID命名规则
- 使用英文小写字母
- 单词间用连字符 `-` 分隔
- 简洁明了，便于理解
- 例如：`#overview`、`#installation`、`#api-endpoints`

#### 特殊样式支持

**1. 高亮提示框**
```markdown
<div class="feature-highlight">
  <div class="highlight-box">
    <h4>💡 提示</h4>
    <p>这里是提示内容</p>
  </div>
</div>
```

**2. 按钮样式链接**
```markdown
<a href="/api-docs" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
  查看API文档 →
</a>
```

**3. 代码块**
```markdown
```bash
npm install
```

```javascript
console.log('Hello World');
```
```

### 🔧 页面配置说明

#### 侧边栏配置
```javascript
const sidebarItems = [
  { href: '#overview', text: '概述' },
  { href: '#section1', text: '章节1' },
  { href: '#section2', text: '章节2' }
];
```

#### 面包屑配置
```javascript
const breadcrumbs = [
  { href: '/', text: '首页' },
  { href: '/parent', text: '父页面' },
  { text: '当前页面' }
];
```

### 📁 文件命名规范

- **Markdown 文件**：使用小写字母，单词间用连字符分隔
- **页面文件**：与 Markdown 文件名保持一致，使用 `.astro` 扩展名
- **图片文件**：放在 `public/` 目录下，使用描述性名称

## 🏗️ 技术架构

### 目录结构

```
src/
├── components/          # 可复用组件
│   ├── Navigation.astro # 导航组件
│   ├── Search.astro    # 搜索组件
│   └── BackToTop.astro # 返回顶部组件
├── content/            # Markdown 内容文件
├── layouts/            # 页面布局
│   ├── Layout.astro    # 主布局
│   └── DocLayout.astro # 文档布局
├── pages/              # 页面文件
│   ├── index.astro     # 首页
│   ├── product-intro.astro # 产品介绍
│   ├── getting-started.astro # 快速开始
│   └── search.astro    # 搜索页面
├── styles/             # 样式文件
│   ├── global.css      # 全局样式
│   ├── navigation.css  # 导航样式
│   ├── components.css  # 组件样式
│   └── pages.css       # 页面样式
└── assets/             # 资源文件
    └── productImage/   # 产品图片
```

### 技术栈

- **框架**：Astro (静态站点生成)
- **样式**：CSS Variables + Utility Classes + 现代CSS特性
- **内容**：Markdown
- **构建**：Vite
- **部署**：静态站点

### 设计原则

1. **内容与样式分离**：Markdown 管理内容，组件管理样式
2. **易维护性**：运营人员只需编辑 Markdown 文件
3. **扩展性强**：易于添加新页面和功能
4. **性能优化**：静态生成，快速加载
5. **现代体验**：采用最新的设计趋势和交互效果

## 🚀 部署指南

### 构建生产版本

```bash
npm run build
```

构建完成后，`dist/` 目录包含所有静态文件。

### 部署平台

#### Vercel 部署
1. 连接 GitHub 仓库
2. 选择项目目录
3. 构建命令：`npm run build`
4. 输出目录：`dist`

#### Netlify 部署
1. 连接 GitHub 仓库
2. 构建命令：`npm run build`
3. 发布目录：`dist`

#### 阿里云 OSS
1. 上传 `dist/` 目录内容到 OSS
2. 配置静态网站托管
3. 设置自定义域名

#### 腾讯云 COS
1. 上传 `dist/` 目录内容到 COS
2. 配置静态网站
3. 绑定自定义域名

### 环境变量配置

创建 `.env` 文件：
```env
# 生产环境配置
PUBLIC_SITE_URL=https://docs.tego-ai.com
PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🚨 常见问题

### 内容管理问题

#### Q1：修改 Markdown 文件后页面没有更新
**A**：确保开发服务器正在运行，保存文件后会自动刷新。如果还是没有更新，尝试手动刷新浏览器。

#### Q2：侧边栏链接不跳转
**A**：检查 Markdown 文件中的标题是否有 `{#锚点ID}`，确认侧边栏配置中的 `href` 与锚点ID一致。

#### Q3：图片不显示
**A**：确认图片文件存在，检查图片路径是否正确。图片应放在 `public/` 目录下。

#### Q4：页面显示空白
**A**：检查 Markdown 文件路径是否正确，确认文件有内容，检查文件编码是否为 UTF-8。

### 技术问题

#### Q5：开发服务器启动失败
**A**：检查 Node.js 版本是否为 18+，确认所有依赖已安装：`npm install`。

#### Q6：构建失败
**A**：检查是否有语法错误，查看控制台错误信息，确认所有文件路径正确。

#### Q7：样式显示异常
**A**：检查 Markdown 语法是否正确，确认 HTML 标签是否闭合。

### 维护问题

#### Q8：如何添加新的产品功能
**A**：按照"内容管理流程"中的步骤，更新对应的 Markdown 文件和页面文件。

#### Q9：如何更新技术指标
**A**：在对应的页面文件中找到指标位置，直接修改数值。

#### Q10：如何添加新的应用场景
**A**：在对应的页面文件中添加新的场景描述和图片。

## 📞 技术支持

### 联系方式
- 📧 **技术支持**：support@tego-ai.com
- 💬 **技术群**：QQ群 123456789
- 📖 **在线文档**：https://docs.tego-ai.com

### 维护团队
- **产品经理**：负责产品功能描述和业务逻辑
- **运营人员**：负责内容更新和用户反馈
- **技术团队**：负责系统维护和技术支持

### 更新日志
- **v1.3.0** (2024-01-25)：完成UI全面优化，添加现代化设计元素
- **v1.2.0** (2024-01-20)：优化搜索功能，支持分词搜索
- **v1.1.0** (2024-01-15)：重构首页布局，优化用户体验
- **v1.0.0** (2024-01-01)：初始版本发布

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**最后更新**：2024年1月25日  
**维护团队**：TeGo-AI 产品团队
