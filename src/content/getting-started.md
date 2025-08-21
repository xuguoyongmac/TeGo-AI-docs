# TeGo-AI 快速开始指南 {#overview}

欢迎使用 TeGo-AI 智能体管理平台！本指南将帮助您快速上手，了解如何配置和使用平台的核心功能。

## 🚀 环境准备 {#environment}

### 系统要求

- **操作系统**：Linux (Ubuntu 18.04+)、macOS 10.15+、Windows 10+
- **内存**：最低 8GB，推荐 16GB+
- **存储**：最低 50GB 可用空间
- **网络**：稳定的互联网连接

### 依赖软件

- **Docker**：版本 20.10+
- **Docker Compose**：版本 2.0+
- **Node.js**：版本 16.0+
- **Git**：版本 2.0+

## 📦 安装部署 {#installation}

### 1. 下载安装包

```bash
# 克隆项目仓库
git clone https://github.com/your-org/tego-ai.git
cd tego-ai

# 或者下载发布包
wget https://github.com/your-org/tego-ai/releases/latest/download/tego-ai.tar.gz
tar -xzf tego-ai.tar.gz
cd tego-ai
```

### 2. 配置环境

```bash
# 复制配置文件模板
cp .env.example .env

# 编辑配置文件
nano .env
```

### 3. 启动服务

```bash
# 使用 Docker Compose 启动
docker-compose up -d

# 或者使用脚本启动
./scripts/start.sh
```

## ⚙️ 基础配置 {#configuration}

### 数据库配置

```yaml
# config/database.yml
database:
  host: localhost
  port: 5432
  name: tego_ai
  username: admin
  password: your_password
```

### API 配置

```yaml
# config/api.yml
api:
  port: 8080
  host: 0.0.0.0
  cors:
    enabled: true
    origins: ["*"]
```

### 安全配置

```yaml
# config/security.yml
security:
  jwt_secret: your_jwt_secret_key
  session_timeout: 3600
  max_login_attempts: 5
```

## 🔧 首次使用 {#first-use}

### 1. 访问管理界面

打开浏览器，访问：`http://localhost:8080`

### 2. 创建管理员账户

1. 点击"注册"按钮
2. 填写管理员信息
3. 设置安全密码
4. 完成邮箱验证

### 3. 系统初始化

1. 登录管理界面
2. 完成系统初始化向导
3. 配置基础参数
4. 导入示例数据

## 📊 功能验证 {#verification}

### 检查服务状态

```bash
# 检查所有服务状态
docker-compose ps

# 查看服务日志
docker-compose logs -f api
docker-compose logs -f web
```

### 测试API接口

```bash
# 测试健康检查接口
curl http://localhost:8080/api/health

# 测试用户接口
curl http://localhost:8080/api/users
```

### 验证功能模块

1. **用户管理**：创建、编辑、删除用户
2. **权限管理**：配置角色和权限
3. **数据管理**：导入、查看、导出数据
4. **系统监控**：查看系统状态和日志

## 🛠️ 常见问题 {#troubleshooting}

### 服务启动失败

**问题**：Docker 容器启动失败

**解决方案**：
```bash
# 检查端口占用
netstat -tulpn | grep :8080

# 清理容器
docker-compose down
docker system prune -f

# 重新启动
docker-compose up -d
```

### 数据库连接错误

**问题**：无法连接到数据库

**解决方案**：
```bash
# 检查数据库状态
docker-compose logs database

# 重启数据库服务
docker-compose restart database

# 检查网络连接
docker network ls
```

### 权限问题

**问题**：文件权限不足

**解决方案**：
```bash
# 修改文件权限
chmod +x scripts/*.sh
chmod 755 data/
chmod 644 config/*.yml
```

## 📚 下一步 {#next-steps}

### 深入学习

- 📖 [核心功能详解](/product-intro/features)
- 🏗️ [技术架构说明](/product-intro/architecture)
- 📖 [API 文档](/api-docs)
- 🎥 [视频教程](/tutorials)

### 获取帮助

- 💬 [社区论坛](https://community.tego-ai.com)
- 📧 [技术支持](mailto:support@tego-ai.com)
- 📖 [在线文档](https://docs.tego-ai.com)
- 🐛 [问题反馈](https://github.com/your-org/tego-ai/issues)

<div class="feature-highlight">
  <div class="highlight-box">
    <h4>💡 提示</h4>
    <p>如果您在安装或使用过程中遇到任何问题，请查看我们的<a href="/faq">常见问题</a>页面，或者联系技术支持团队。</p>
  </div>
</div>
