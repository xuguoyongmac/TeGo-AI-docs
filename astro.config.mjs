import { defineConfig } from 'astro/config';

export default defineConfig({
  // 禁用开发模式下的toolbar
  devToolbar: {
    enabled: false
  },
  // 其他配置
  site: 'https://docs.tego-ai.com',
  integrations: []
});
