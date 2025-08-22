# TeGo-AI 文档中心

基于 Astro 构建的现代化文档网站，专为 TeGo-AI 智能体管理平台设计。采用组件化架构和 Markdown 内容管理，支持运营人员和产品经理轻松维护产品文档。

## 📋 目录

- [项目概述](#项目概述)
- [快速开始](#快速开始)
- [📝 产品核心功能维护指南](#产品核心功能维护指南)
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
- 🔍 **搜索功能**：全站内容搜索
- 📱 **响应式设计**：支持各种设备访问

### 设计理念
- **运营友好**：运营人员只需编辑 Markdown 文件
- **产品导向**：突出产品核心功能和价值
- **用户友好**：清晰的导航和搜索体验
- **维护简单**：模块化设计，易于扩展和维护

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

---

## 📝 产品核心功能维护指南

**⚠️ 重要：这是运营人员和产品经理的必读部分**

### 🎯 维护目标

本指南旨在帮助运营人员和产品经理：
- 快速更新产品功能描述
- 维护技术优势说明
- 更新应用场景案例
- 保持文档与产品同步

### 📁 核心功能文件结构

```
src/content/
├── features.md          # 产品核心功能详细说明
├── architecture.md      # 技术架构说明
├── getting-started.md   # 快速开始指南
└── product-manual.md    # 产品操作手册
```

### 🔧 核心功能维护流程

#### 1. 更新产品核心功能

**文件位置**：`src/content/features.md`

**维护内容**：
- 智能实例管理功能描述
- MCP 服务自动化生成说明
- 服务动态发现与组合功能
- 运行时 UI 动态生成
- LLM 网关功能
- 流程引擎与数据总线

**操作步骤**：
1. 打开 `src/content/features.md`
2. 找到对应的功能章节
3. 更新功能描述、特性列表、使用场景
4. 保存文件，页面自动刷新

**示例更新**：
```markdown
## 智能实例管理 {#instance-management}

### 功能概述
基于向量化技术对服务器实例多维度建模，实现拓扑感知调度。

### 核心特性
- **资源利用率提升100%**：通过智能调度算法优化资源分配
- **30+维度向量化**：多维度建模，精确匹配资源需求
- **拓扑感知调度**：考虑网络拓扑，优化部署位置

### 应用场景
- 大规模容器集群管理
- 微服务架构资源优化
- 边缘计算节点调度
```

#### 2. 更新技术优势

**文件位置**：`src/pages/product-intro.astro`

**维护内容**：
- 零代码接入说明
- 技术架构优势
- 性能指标
- 技术特色

**操作步骤**：
1. 打开 `src/pages/product-intro.astro`
2. 找到 "技术优势" 部分
3. 更新技术描述和指标
4. 保存文件，页面自动刷新

#### 3. 更新应用场景

**文件位置**：`src/pages/product-intro.astro`

**维护内容**：
- 行业应用案例
- 使用场景描述
- 客户价值说明

**操作步骤**：
1. 打开 `src/pages/product-intro.astro`
2. 找到 "应用场景" 部分
3. 更新场景描述和案例
4. 保存文件，页面自动刷新

### 📊 产品数据维护

#### 性能指标更新

在 `src/pages/product-intro.astro` 中更新以下指标：

```astro
<!-- 核心功能标签 -->
<span>资源利用率提升100%</span>
<span>30分钟上线</span>
<span>零代码接入</span>
```

#### 技术参数更新

```astro
<!-- 技术优势数据 -->
<div class="tech-banner-highlight">30分钟上线</div>
```

### 🖼️ 产品图片维护

#### 图片存放位置
```
public/
├── productImage/        # 产品功能截图
├── logo_light.png      # 品牌Logo
└── assets/             # 其他资源
```

#### 更新产品截图
1. 将新的产品截图放入 `public/productImage/` 目录
2. 在对应的页面文件中更新图片路径
3. 确保图片格式为 PNG/JPG，大小适中

### 📈 版本更新记录

#### 添加新版本功能
1. 在 `src/content/features.md` 中添加新功能章节
2. 更新 `src/pages/product-intro.astro` 中的功能展示
3. 在首页添加新功能的入口链接

#### 更新版本号
在 `package.json` 中更新版本号：
```json
{
  "version": "1.2.0"
}
```

### 🔄 定期维护检查清单

**每周检查项目**：
- [ ] 产品功能描述是否准确
- [ ] 技术指标是否最新
- [ ] 应用场景是否完整
- [ ] 图片是否清晰有效
- [ ] 链接是否正常工作

**每月检查项目**：
- [ ] 性能数据是否更新
- [ ] 客户案例是否添加
- [ ] 竞品对比是否准确
- [ ] SEO 关键词是否优化

---

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
<a href="/api-docs" class="home-doc-card">
  <div class="home-doc-icon">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <!-- 图标路径 -->
    </svg>
  </div>
  <div class="home-doc-content">
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

---

## 🏗️ 技术架构

### 目录结构

```
src/
├── components/          # 可复用组件
│   ├── Navigation.astro # 导航组件
│   ├── Sidebar.astro   # 侧边栏组件
│   └── Search.astro    # 搜索组件
├── content/            # Markdown 内容文件
│   ├── features.md     # 功能文档
│   ├── architecture.md # 架构文档
│   └── getting-started.md # 快速开始文档
├── layouts/            # 页面布局
│   ├── Layout.astro    # 主布局
│   └── DocLayout.astro # 文档布局
├── pages/              # 页面文件
│   ├── index.astro     # 首页
│   ├── product-intro.astro # 产品介绍
│   ├── getting-started.astro # 快速开始
│   └── search.astro    # 搜索页面
└── styles/             # 样式文件
    ├── global.css      # 全局样式
    ├── navigation.css  # 导航样式
    ├── components.css  # 组件样式
    └── pages.css       # 页面样式
```

### 技术栈

- **框架**：Astro (静态站点生成)
- **样式**：CSS Variables + Utility Classes
- **内容**：Markdown
- **构建**：Vite
- **部署**：静态站点

### 设计原则

1. **内容与样式分离**：Markdown 管理内容，组件管理样式
2. **易维护性**：运营人员只需编辑 Markdown 文件
3. **扩展性强**：易于添加新页面和功能
4. **性能优化**：静态生成，快速加载

---

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

---

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
**A**：按照"产品核心功能维护指南"中的步骤，更新 `src/content/features.md` 和 `src/pages/product-intro.astro`。

#### Q9：如何更新技术指标
**A**：在 `src/pages/product-intro.astro` 中找到对应的指标位置，直接修改数值。

#### Q10：如何添加新的应用场景
**A**：在 `src/pages/product-intro.astro` 的"应用场景"部分添加新的场景描述和图片。

---

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
- **v1.2.0** (2024-01-15)：添加产品核心功能维护指南
- **v1.1.0** (2024-01-10)：优化搜索功能和页面布局
- **v1.0.0** (2024-01-01)：初始版本发布

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

**最后更新**：2024年1月15日  
**维护团队**：TeGo-AI 产品团队
