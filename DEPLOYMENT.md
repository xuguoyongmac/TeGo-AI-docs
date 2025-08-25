# 自动部署配置说明

## 🚀 GitHub Actions 自动部署

本项目配置了 GitHub Actions 自动部署到 Netlify，每次推送代码到 `main` 分支后会自动构建和部署。

## 📋 配置步骤

### 1. 获取 Netlify 认证信息

#### 获取 NETLIFY_AUTH_TOKEN：
1. 访问 [Netlify User Settings](https://app.netlify.com/user/settings/applications)
2. 点击 "New access token"
3. 输入描述（如：GitHub Actions Deploy）
4. 复制生成的 token

#### 获取 NETLIFY_SITE_ID：
1. 在 Netlify 控制台创建新站点
2. 在站点设置中找到 "Site ID"
3. 复制这个 ID

### 2. 配置 GitHub Secrets

在您的 GitHub 仓库中设置以下 Secrets：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 添加以下两个 secrets：

```
NETLIFY_AUTH_TOKEN: 您的 Netlify 访问令牌
NETLIFY_SITE_ID: 您的 Netlify 站点 ID
```

### 3. 配置环境变量

在 Netlify 控制台设置以下环境变量：

```
SMTP_HOST: SMTP 服务器地址（如：smtp.qq.com）
SMTP_PORT: SMTP 端口（如：587）
SMTP_USER: 发件人邮箱
SMTP_PASS: 发件人邮箱密码/授权码
RECIPIENT_EMAIL: 收件人邮箱（xuguoyong@zhama.com）
```

## 🔄 自动部署流程

1. **推送代码**：`git push origin main`
2. **自动触发**：GitHub Actions 自动运行
3. **构建项目**：`npm run build`
4. **部署到 Netlify**：自动上传到 Netlify
5. **函数部署**：Netlify Functions 自动部署

## 📧 邮件功能

- 预约表单提交后自动发送邮件
- 邮件内容包含完整的预约信息
- 支持自定义邮件模板和样式

## 🛠️ 故障排除

### 部署失败：
1. 检查 GitHub Secrets 是否正确配置
2. 检查 Netlify 环境变量是否设置
3. 查看 GitHub Actions 日志

### 邮件发送失败：
1. 检查 SMTP 配置是否正确
2. 检查邮箱密码/授权码是否有效
3. 查看 Netlify Functions 日志

## 📞 技术支持

如有问题，请检查：
1. GitHub Actions 运行日志
2. Netlify 部署日志
3. Netlify Functions 日志
