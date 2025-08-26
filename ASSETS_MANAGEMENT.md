# Astro 静态资源管理指南

## 📁 两种静态资源管理方式

### 1. Public 目录方式（不推荐用于多服务部署）

```bash
public/
  ├── image.png
  ├── logo.png
  └── favicon.ico
```

**特点：**
- 文件直接复制到构建输出的根目录
- 访问路径：`/image.png`、`/logo.png`
- 简单直接，适合单服务部署

**问题：**
- ❌ 在多服务部署时路径错误
- ❌ 部署在子路径（如 `/docs/`）时，实际访问的是 `/image.png`，但应该是 `/docs/image.png`
- ❌ 导致404错误

**使用场景：**
- 单服务部署
- 部署在根域名
- 简单的静态资源

### 2. Src/Assets 方式（推荐）

```bash
src/
  ├── assets/
  │   ├── images/
  │   │   ├── logo.png
  │   │   └── hero.jpg
  │   ├── icons/
  │   │   └── favicon.ico
  │   └── fonts/
  │       └── custom.woff2
  └── pages/
      └── index.astro
```

**特点：**
- ✅ 支持相对路径引用
- ✅ 自动优化和压缩
- ✅ 支持TypeScript类型检查
- ✅ 多服务部署友好
- ✅ 自动生成哈希文件名（缓存优化）

**使用方式：**

```astro
---
// 在Astro组件中导入
import logo from '../assets/images/logo.png';
import hero from '../assets/images/hero.jpg';
---

<!-- 在模板中使用 -->
<img src={logo.src} alt="Logo" />
<img src={hero.src} alt="Hero Image" />
```

## 🔄 迁移指南

### 从 Public 到 Assets 的步骤：

1. **创建assets目录结构：**
   ```bash
   mkdir -p src/assets/images
   mkdir -p src/assets/icons
   mkdir -p src/assets/fonts
   ```

2. **移动文件：**
   ```bash
   cp public/*.png src/assets/images/
   cp public/*.jpg src/assets/images/
   cp public/*.jpeg src/assets/images/
   ```

3. **更新引用：**
   ```astro
   <!-- 旧方式 -->
   <img src="/logo.png" alt="Logo" />
   
   <!-- 新方式 -->
   ---
   import logo from '../assets/images/logo.png';
   ---
   <img src={logo.src} alt="Logo" />
   ```

## 🎯 最佳实践

### 1. 目录结构建议
```
src/
  ├── assets/
  │   ├── images/          # 图片文件
  │   │   ├── icons/       # 图标
  │   │   ├── logos/       # 品牌标识
  │   │   └── backgrounds/ # 背景图片
  │   ├── fonts/           # 字体文件
  │   ├── videos/          # 视频文件
  │   └── documents/       # 文档文件
  └── pages/
```

### 2. 文件命名规范
- 使用小写字母和连字符：`hero-image.png`
- 避免空格和特殊字符
- 使用有意义的名称

### 3. 图片优化
- 选择合适的格式（PNG、JPG、WebP）
- 压缩图片大小
- 使用响应式图片

### 4. 类型安全
```typescript
// 在 TypeScript 中，导入的图片有类型检查
import logo from '../assets/images/logo.png';
// logo 的类型是 ImageMetadata
// 使用 logo.src 获取实际路径
```

## 🚀 部署优势

### 多服务部署场景：
- **子路径部署**：`https://example.com/docs/`
- **CDN部署**：`https://cdn.example.com/`
- **多环境部署**：开发、测试、生产环境

使用 `src/assets` 方式，所有资源都会自动使用相对路径，确保在任何部署环境下都能正常工作。

## 📝 总结

| 特性 | Public 目录 | Src/Assets |
|------|-------------|------------|
| 多服务部署 | ❌ 不支持 | ✅ 支持 |
| 类型安全 | ❌ 无 | ✅ 有 |
| 自动优化 | ❌ 无 | ✅ 有 |
| 缓存优化 | ❌ 无 | ✅ 有 |
| 相对路径 | ❌ 不支持 | ✅ 支持 |
| 使用复杂度 | ✅ 简单 | ⚠️ 稍复杂 |

**推荐：** 对于需要多服务部署的项目，强烈推荐使用 `src/assets` 方式管理静态资源。
