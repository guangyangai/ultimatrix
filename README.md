# 极智矩阵 · Ultimatrix AI Studio

一人 AI 工作室的官方站点。基于 **Astro 5** 构建，零 JS 输出，纯静态可部署到任意主机。

> **创始人**：杨光（Guang Yang） · 斯坦福博士 · AWS 资深应用科学家
> **业务**：AI 短剧生成 / AI 智能设计 / Agent 量化投研
> **域名**：https://ultimatrix.dev

---

## 目录结构

```
ultimatrix/
├── src/
│   ├── pages/                          # 路由 + 端点
│   │   ├── index.astro                 # 主页面
│   │   ├── 404.astro                   # 自定义 404
│   │   ├── sitemap.xml.ts              # 动态生成 /sitemap.xml
│   │   └── robots.txt.ts               # 动态生成 /robots.txt
│   ├── layouts/
│   │   └── BaseLayout.astro            # HTML 壳、meta、toast、全局脚本
│   ├── components/
│   │   ├── SiteNav.astro               # 顶部导航
│   │   ├── HeroGrid.astro              # Hero 7 卡片
│   │   ├── ProjectsList.astro          # 三条赛道 + 合作入口
│   │   ├── StudioSection.astro         # 暗调工作室
│   │   ├── ContactFooter.astro         # 联系区（mailto/tel 链接）
│   │   └── illustrations/              # 7 张原创 SVG（每个一个组件）
│   │       ├── MatrixScene.astro       # 矩阵节点 + 数据光晕
│   │       ├── QuantChart.astro        # 实时曲线 + 策略浮标
│   │       ├── DramaClapper.astro      # AI 场记板
│   │       ├── DesignGrid.astro        # 网页/户型/服装 三合一
│   │       ├── QuantCandles.astro      # 蜡烛图 + 趋势线
│   │       ├── BridgeFlow.astro        # 三卡 → 中央 Agent 桥接
│   │       └── WorkflowDots.astro      # 工作流节点示意
│   ├── data/
│   │   └── site.ts                     # ⚙️ 全站配置（站点信息、tracks、capabilities、contact）
│   └── styles/
│       └── global.css                  # 全局样式（42 KB）
├── public/
│   └── favicon.svg                     # 站点图标
├── .github/
│   └── workflows/
│       └── deploy.yml                  # GitHub Actions → Spaceship SSH 部署
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 1. 准备环境

Node.js **20+ 推荐 22 LTS**（Astro 5 要求）。

```bash
# 方式 A：官网下载（最快）
# 打开 https://nodejs.org → 下载 macOS LTS installer

# 方式 B：nvm（推荐，可多版本）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc
nvm install 22

# 方式 C：Homebrew
brew install node
```

---

## 2. 安装依赖

```bash
cd "/Users/gavin/Projects/网站设计/ultimatrix"
npm install
```

会生成 `package-lock.json`（用于 CI/CD 锁定版本，**必须** commit）。

---

## 3. 本地开发

```bash
npm run dev
# → http://localhost:4321
```

修改 `.astro` / `.ts` / `.css` 文件，浏览器自动热更新。

---

## 4. 生产构建

```bash
npm run build
# → 生成 dist/ 目录
```

`dist/` 内容：

```
dist/
├── index.html              ← Astro 生成的 HTML（~46 KB）
├── _astro/                 ← CSS + JS（~50 KB）
├── favicon.svg
├── sitemap.xml             ← 自动生成
└── robots.txt              ← 自动生成
```

---

## 5. 部署（推荐：GitHub Actions 自动）

### 5.1 准备 GitHub Secrets

进 GitHub repo → **Settings** → **Secrets and variables** → **Actions**

| Secret 名称 | Value |
|---|---|
| `SSH_HOST` | Spaceship Shared IP（cPanel 左侧可见）|
| `SSH_USER` | cPanel 用户名（**不带域名后缀**）|
| `SSH_PORT` | SSH 端口（默认 `22`）|
| `SSH_PRIVATE_KEY` | Spaceship 那把 SSH 私钥的完整内容（含 BEGIN/END 两行）|
| `SSH_TARGET` | 服务器目标路径：`public_html/ultimatrix.dev/` |

### 5.2 在 cPanel 启用 SSH

1. cPanel → **SSH Access**
2. 生成新密钥对 → 拷贝公钥到服务器 → Authorize
3. 把对应私钥粘到 `SSH_PRIVATE_KEY` secret

### 5.3 推送触发部署

```bash
cd "/Users/gavin/Projects/网站设计/ultimatrix"
git add -A
git commit -m "你的改动说明"
```

GitHub Actions 自动跑：

```
1. Build → 生成 dist/
2. SSH 进服务器，删除老 dist/ 和 index.html（清理残留）
3. SCP 上传 dist/ 内容，strip_components: 1 平铺到目标根
4. SSH 验证服务器文件结构
```

### 5.4 验证

```bash
curl -sI https://ultimatrix.dev/ | head -3
curl -sI https://ultimatrix.dev/_astro/ 2>&1 | head -1
curl -sI https://ultimatrix.dev/dist/ | head -1   # 应该是 404
```

---

## 6. 手动部署（备选，不依赖 Actions）

如果 Actions 还没配好，先手动传也行：

### 方案 A：cPanel File Manager
1. cPanel → File Manager → `public_html/ultimatrix.dev/`
2. 删除 `dist/` 和 `index.html`（如果有）
3. 把本机 `dist/index.html`、`dist/_astro/`、`dist/favicon.svg`、`dist/sitemap.xml`、`dist/robots.txt` 拖进去

### 方案 B：scp（Mac/Linux）
```bash
cd "/Users/gavin/Projects/网站设计/ultimatrix"
npm run build

scp -r dist/* gavin123@ultimatrix.dev:/home/gavin123/public_html/ultimatrix.dev/
```

---

## 7. 修改内容

几乎所有可见内容都在 **`src/data/site.ts`** 一个文件里。

| 改什么 | 在哪改 |
|---|---|
| 创始人姓名/简介/标语 | `site.founder.*` |
| 邮箱/电话/LinkedIn/GitHub | `site.contact.*` |
| 三条业务文案、关键能力 | `tracks` 数组 |
| 工作室 4 张能力卡 | `capabilities` 数组 |
| 站点标题/SEO 描述 | `site.meta.*` |

改完 `git push` → Actions 自动部署。

---

## 8. 修改样式

所有视觉规则在 **`src/styles/global.css`**。CSS 变量在文件顶部：

```css
:root {
  --paper: #e8e8e1;       /* 纸面背景 */
  --ink: #0c0e12;          /* 主文字 */
  --accent: #4a5cff;       /* 电光 AI 蓝 */
  --signal: #00d4a8;       /* 薄荷信号色 */
  --warm: #f3b13a;         /* 暖琥珀 */
  --violet: #7c5cff;       /* AI 紫 */
  --dark: #06080a;         /* 暗调背景 */
}
```

改一处变量，全站同步。

---

## 9. 添加新项目案例

```ts
// src/data/site.ts 的 tracks 数组加一条：
export const tracks = [
  // 现有三条...
  {
    id: 'new-track',
    index: '04',
    title: '新赛道',
    category: '...',
    pitch: '一句话定位',
    facts: [...],
    meta: { left: '...', right: '...' },
    illustration: 'DramaClapper',  // 复用现有插图
    accent: 'paper',
  },
];
```

页面自动渲染。要新插图：

```bash
# 在 src/components/illustrations/ 下加 NewIllust.astro
# 然后在 ProjectsList.astro 的 illustrationMap 中注册
```

---

## 10. SEO

### sitemap.xml

`src/pages/sitemap.xml.ts` 自动生成，包含 4 个 URL（主页 + 3 个锚点）。

### robots.txt

`src/pages/robots.txt.ts` 自动生成，允许全爬虫、声明 sitemap 位置。

### 404 页

`src/pages/404.astro` 自定义 404，匹配站点设计语言。

### 加新页面时

往 `src/pages/` 加 `.astro` 文件，在 `sitemap.xml.ts` 的 `pages` 数组加一行。

---

## 11. 联系功能

`ContactFooter.astro` 当前用 `mailto:` / `tel:` 真链接：

| 元素 | 行为 |
|---|---|
| "联系我 →" 大按钮 | 唤起邮件客户端（mailto）|
| 邮箱行 | 同样唤起邮件 |
| 电话行 | 移动端唤起拨号（tel）|
| LinkedIn / GitHub | 新标签打开 |

如果需要更复杂的表单（带留言、多字段），后续可换 Formspree（50 条/月免费）。

---

## 12. 当前部署信息

- **域名**：`ultimatrix.dev`（Spaceship 注册）
- **托管**：Spaceship Web Hosting（cPanel）
- **自动化**：GitHub Actions SSH 部署（`strip_components: 1` 平铺）
- **首屏样式**：全局 CSS + 内联关键样式（无 FOUT）

---

## 13. 进阶路径

需要博客 / CMS / 多页面时：

| 需求 | 方案 |
|---|---|
| 加博客 | Astro Content Collections（`src/content/posts/*.md`）|
| 可视化后台编辑 | Decap CMS（Git 仓库存档）|
| 多语言 | Astro i18n |
| 加 Formspree 表单 | 替换 ContactFooter 的 mailto |

参考 [Astro 文档](https://docs.astro.build/zh-cn/)。

---

## 14. 常见问题

| 问题 | 修法 |
|---|---|
| `npm ci` 报错缺 lock 文件 | 跑一次 `npm install` 生成 `package-lock.json` |
| SSH 连不上 Spaceship | 端口不是 22；cPanel 看实际端口 |
| `/_astro/` 404 | dist/ 没平铺；workflow 改 `strip_components: 1` |
| `dist/` 残留 | 在 deploy.yml 加 SSH 清理 step |
| 浏览器看到老的样式 | 强制刷新 Cmd+Shift+R，清缓存 |

---

需要任何调整，告诉我即可。