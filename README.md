# TeGo-AI 文档中心

这是一个基于 Astro 构建的现代化文档网站，采用组件化架构和 Markdown 内容管理。

## 🏗️ 项目架构

### 目录结构

```
src/
├── components/          # 可复用组件
│   ├── Navigation.astro # 导航组件
│   └── Sidebar.astro   # 侧边栏组件
├── content/            # Markdown 内容文件
│   ├── features.md     # 功能文档
│   ├── architecture.md # 架构文档
│   └── getting-started.md # 快速开始文档
├── layouts/            # 页面布局
│   ├── Layout.astro    # 主布局（一级页面）
│   └── DocLayout.astro # 文档布局（二级页面）
├── pages/              # 页面文件
│   ├── index.astro     # 首页
│   ├── product-intro.astro # 产品介绍
│   ├── getting-started.astro # 快速开始
│   └── product-intro/  # 二级页面
│       ├── features.astro
│       └── architecture.astro
└── styles/             # 样式文件
    ├── global.css      # 全局样式和变量
    ├── navigation.css  # 导航栏样式
    ├── components.css  # 页面组件样式
    └── pages.css       # 页面特定样式
```

## 🎯 设计原则

### 1. 内容与样式分离
- **Markdown 文件**：所有文档内容使用 Markdown 格式
- **组件化样式**：可复用的样式组件
- **全局样式系统**：统一的 CSS 变量和工具类

### 2. 易维护性
- **运营友好**：运营人员只需编辑 Markdown 文件
- **开发者友好**：清晰的组件结构和样式系统
- **扩展性强**：易于添加新页面和功能

### 3. 最佳实践
- **响应式设计**：适配各种设备
- **性能优化**：静态生成，快速加载
- **SEO 友好**：良好的元数据和结构

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

## 📝 内容管理指南

### 🆕 添加新页面（运营人员必读）

#### 步骤 1：创建 Markdown 内容文件

1. **进入内容目录**
   ```bash
   cd src/content/
   ```

2. **创建新的 Markdown 文件**
   ```bash
   # 例如：创建 API 文档
   touch api-docs.md
   ```

3. **编辑 Markdown 文件内容**
   ```markdown
   # API 文档 {#overview}
   
   这里是页面简介...
   
   ## 认证 {#authentication}
   
   认证相关内容...
   
   ## 接口列表 {#endpoints}
   
   接口相关内容...
   
   <div class="feature-highlight">
     <div class="highlight-box">
       <h4>💡 重要提示</h4>
       <p>这里是重要提示内容</p>
     </div>
   </div>
   ```

#### 步骤 2：创建页面文件

1. **进入页面目录**
   ```bash
   cd src/pages/
   ```

2. **创建对应的 Astro 文件**
   ```bash
   # 例如：创建 API 文档页面
   touch api-docs.astro
   ```

3. **编辑页面文件内容【以下内容直接复制粘贴】**
   ```astro
   ---
   import DocLayout from '../layouts/DocLayout.astro';
   import { readFileSync } from 'fs';
   import { marked } from 'marked';

   // 读取Markdown内容
   const markdownContent = readFileSync('./src/content/api-docs.md', 'utf-8');
   const htmlContent = marked(markdownContent);

   // 侧边栏配置（根据Markdown文件的标题来配置）
   const sidebarItems = [
     { href: '#overview', text: '概述' },
     { href: '#authentication', text: '认证' },
     { href: '#endpoints', text: '接口列表' }
   ];

   // 面包屑配置（显示页面层级关系）
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

1. **编辑首页文件**
   ```bash
   nano src/pages/index.astro
   ```

2. **在快速导航区域添加链接**
   ```astro
   <a href="/api-docs" class="nav-card">
     <div class="nav-icon">
       <img src="/src/assets/api-icon.png" alt="API文档" class="nav-icon-img" />
     </div>
     <div class="nav-content">
       <h3>API 文档</h3>
       <p>详细的 API 接口文档和使用说明</p>
     </div>
     <div class="nav-arrow">→</div>
   </a>
   ```

#### 步骤 4：添加普通跳转按钮（可选）

如果您想在页面中添加一个简单的按钮来跳转到Markdown文件，可以这样做：

1. **在Markdown文件中添加按钮**
   ```markdown
   <div style="text-align: center; margin: 2rem 0;">
     <a href="/api-docs" class="btn btn-primary" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
       查看完整API文档 →
     </a>
   </div>
   ```

2. **或者使用更简单的链接样式**
   ```markdown
   <p style="text-align: center;">
     <a href="/api-docs" style="color: #3b82f6; text-decoration: underline; font-weight: 500;">
       点击这里查看完整的API文档
     </a>
   </p>
   ```

3. **在页面底部添加导航按钮**
   ```markdown
   ---
   
   <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #e5e7eb; text-align: center;">
     <a href="/api-docs" style="display: inline-block; margin: 0 1rem; padding: 8px 16px; background: #f3f4f6; color: #374151; text-decoration: none; border-radius: 6px;">
       查看API文档
     </a>
     <a href="/getting-started" style="display: inline-block; margin: 0 1rem; padding: 8px 16px; background: #3b82f6; color: white; text-decoration: none; border-radius: 6px;">
       快速开始
     </a>
   </div>
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

**2. 代码块**
```markdown
```bash
# 这是 bash 代码
npm install
```

```javascript
// 这是 JavaScript 代码
console.log('Hello World');
```
```

**3. 链接**
```markdown
[链接文本](/path/to/page)
[外部链接](https://example.com)
```

**4. 按钮样式链接**
```markdown
<!-- 主要按钮 -->
<a href="/api-docs" style="display: inline-block; padding: 12px 24px; background: #3b82f6; color: white; text-decoration: none; border-radius: 8px; font-weight: 500;">
  查看API文档 →
</a>

<!-- 次要按钮 -->
<a href="/getting-started" style="display: inline-block; padding: 8px 16px; background: #f3f4f6; color: #374151; text-decoration: none; border-radius: 6px;">
  快速开始
</a>

<!-- 文本链接 -->
<a href="/features" style="color: #3b82f6; text-decoration: underline;">
  查看功能详情
</a>
```

**5. 图片**
```markdown
![图片描述](/src/assets/image.png)
```

**6. 列表**
```markdown
- **粗体项目**：描述内容
- 普通项目：描述内容
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

**配置规则**：
- `href`：对应 Markdown 文件中的锚点ID
- `text`：侧边栏显示的文本
- 顺序要与 Markdown 文件中的标题顺序一致

#### 面包屑配置
```javascript
const breadcrumbs = [
  { href: '/', text: '首页' },
  { href: '/parent', text: '父页面' },
  { text: '当前页面' }
];
```

**配置规则**：
- 最后一项不需要 `href`，表示当前页面
- 其他项都要有 `href` 和 `text`
- 按照页面层级关系配置

#### 页面元信息
```astro
<DocLayout 
  title="页面标题"
  description="页面描述（用于SEO）"
  sidebarTitle="目录"
  sidebarItems={sidebarItems}
  breadcrumbs={breadcrumbs}
>
```

### 📁 文件命名规范

#### Markdown 文件
- 使用小写字母
- 单词间用连字符 `-` 分隔
- 例如：`api-docs.md`、`user-guide.md`、`troubleshooting.md`

#### 页面文件
- 与 Markdown 文件名保持一致
- 使用 `.astro` 扩展名
- 例如：`api-docs.astro`、`user-guide.astro`

### 🖼️ 图片管理

#### 图片存放位置
```
src/assets/
├── icons/          # 图标文件
├── images/         # 普通图片
└── screenshots/    # 截图
```

#### 图片引用方式
```markdown
![图片描述](/src/assets/images/example.png)
```

### 🔄 更新现有页面

#### 修改内容
1. **直接编辑 Markdown 文件**
   ```bash
   nano src/content/features.md
   ```

2. **保存文件后自动刷新**
   - 开发模式下，页面会自动刷新
   - 无需重启服务器

#### 修改导航
1. **更新侧边栏**
   - 修改页面文件中的 `sidebarItems` 配置
   - 确保与 Markdown 文件中的锚点ID一致

2. **更新面包屑**
   - 修改页面文件中的 `breadcrumbs` 配置
   - 反映页面的层级关系

### 🚨 常见问题解决

#### 问题 1：页面显示空白
**原因**：Markdown 文件路径错误或内容为空
**解决**：
1. 检查文件路径是否正确
2. 确认 Markdown 文件有内容
3. 检查文件编码是否为 UTF-8

#### 问题 2：侧边栏链接不跳转
**原因**：锚点ID不匹配
**解决**：
1. 检查 Markdown 文件中的标题是否有 `{#锚点ID}`
2. 确认侧边栏配置中的 `href` 与锚点ID一致
3. 检查锚点ID是否包含特殊字符

#### 问题 3：样式显示异常
**原因**：Markdown 语法错误
**解决**：
1. 检查 Markdown 语法是否正确
2. 确认 HTML 标签是否闭合
3. 检查特殊样式代码是否正确

#### 问题 4：图片不显示
**原因**：图片路径错误
**解决**：
1. 确认图片文件存在
2. 检查图片路径是否正确
3. 确认图片格式支持（jpg、png、svg等）

### 📋 维护检查清单

添加新页面时，请检查以下项目：

- [ ] Markdown 文件已创建并包含内容
- [ ] 页面文件已创建并配置正确
- [ ] 所有标题都有锚点ID
- [ ] 侧边栏配置与锚点ID一致
- [ ] 面包屑配置正确
- [ ] 导航链接已添加到首页
- [ ] 图片路径正确
- [ ] 页面在浏览器中正常显示
- [ ] 侧边栏导航功能正常
- [ ] 响应式设计正常

### 🎨 样式定制

#### 样式文件结构

项目采用模块化样式管理，样式文件分为：

- **`src/styles/global.css`**：全局样式、CSS变量和工具类
- **`src/styles/navigation.css`**：导航栏相关样式
- **`src/styles/components.css`**：页面组件通用样式
- **`src/styles/pages.css`**：页面特定样式（首页、产品介绍页等）

#### 全局样式修改
编辑 `src/styles/global.css` 文件：
```css
:root {
  --primary-color: #3b82f6;    /* 主色调 */
  --secondary-color: #8b5cf6;  /* 次要色调 */
  --text-primary: #1e293b;     /* 主要文字颜色 */
  --bg-primary: #ffffff;       /* 主要背景色 */
}
```

#### 页面特定样式
在页面文件中添加 `<style>` 标签：
```astro
<style>
  .custom-style {
    color: var(--primary-color);
    font-weight: bold;
  }
</style>
```

#### 导航菜单配置

**添加二级菜单**

在 `src/components/Navigation.astro` 文件中，可以配置导航菜单的二级菜单：

```javascript
const navItems = [
  { name: '首页', path: '/' },
  { 
    name: '产品介绍', 
    path: '/product-intro',
    children: [
      { name: '概述', path: '/product-intro' },
      { name: '产品功能', path: '/product-intro/features' },
      { name: '技术架构', path: '/product-intro/architecture' }
    ]
  },
  // 其他菜单项...
];
```

**菜单项配置说明**

- `name`: 菜单显示名称
- `path`: 菜单链接地址
- `children`: 二级菜单数组（可选）
  - 每个子菜单项包含 `name` 和 `path`

**添加新的二级菜单**

1. **编辑导航配置文件**
   ```bash
   nano src/components/Navigation.astro
   ```

2. **在 navItems 数组中添加或修改菜单项**
   ```javascript
   { 
     name: '新菜单', 
     path: '/new-menu',
     children: [
       { name: '子菜单1', path: '/new-menu/sub1' },
       { name: '子菜单2', path: '/new-menu/sub2' }
     ]
   }
   ```

3. **保存文件后自动生效**

## 🔧 技术栈

- **框架**：Astro
- **样式**：CSS Variables + Utility Classes
- **内容**：Markdown
- **构建**：Vite
- **部署**：静态站点

## 📚 文档规范

### Markdown 规范

1. **标题层级**：使用 `#` 到 `######`
2. **代码块**：使用 ``` 包裹
3. **链接**：使用相对路径
4. **图片**：放在 `src/assets/` 目录

### 组件规范

1. **命名**：使用 PascalCase
2. **Props**：定义 TypeScript 接口
3. **样式**：使用 CSS 变量
4. **文档**：添加注释说明

## 🚀 部署

### 静态部署

```bash
npm run build
# 将 dist/ 目录部署到服务器
```

### 支持平台

- Vercel
- Netlify
- GitHub Pages
- 阿里云 OSS
- 腾讯云 COS

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 📄 许可证

MIT License

---

## 📞 技术支持

如果在维护过程中遇到问题，请联系：

- 📧 技术支持：support@tego-ai.com
- 💬 技术群：QQ群 123456789
- 📖 在线文档：https://docs.tego-ai.com
