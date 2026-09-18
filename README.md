# 极智矩阵 · Ultimatrix AI Studio

一人 AI 工作室的官方站点。基于 **Astro 5** 构建，零 JS 输出，纯静态可部署到任意主机。

## 目录结构

```
ultimatrix/
├── src/
│   ├── pages/
│   │   └── index.astro          # 页面入口，组合所有 section
│   ├── layouts/
│   │   └── BaseLayout.astro     # HTML 壳、meta、toast、全局脚本
│   ├── components/
│   │   ├── SiteNav.astro
│   │   ├── HeroGrid.astro       # Hero 7 卡片（身份/简介/信号/简历/技术栈/主推/索引）
│   │   ├── ProjectsList.astro   # 三条赛道 + 合作入口卡
│   │   ├── StudioSection.astro  # 暗调工作室（4 能力 + 创始人故事 + 工作流）
│   │   ├── ContactFooter.astro
│   │   └── illustrations/       # 7 张原创 SVG 插图（每个 .astro 一个）
│   │       ├── MatrixScene.astro
│   │       ├── QuantChart.astro
│   │       ├── DramaClapper.astro
│   │       ├── DesignGrid.astro
│   │       ├── QuantCandles.astro
│   │       ├── BridgeFlow.astro
│   │       └── WorkflowDots.astro
│   ├── data/
│   │   └── site.ts              # ⚙️ 全站配置（站点信息、tracks、capabilities、contact）
│   └── styles/
│       └── global.css           # 全局样式（变量、布局、响应式、动画）
├── public/
│   └── favicon.svg              # 站点图标
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

## 1. 准备环境

需要 Node.js **18.17+ 或 20.3+**（Astro 5 要求）。

```bash
# 没装的话用 Homebrew
brew install node

# 或者 nvm
nvm install 20
```

## 2. 安装依赖

```bash
cd "/Users/gavin/Projects/网站设计/ultimatrix"
npm install
```

## 3. 本地开发

```bash
npm run dev
# → http://localhost:4321
```

修改任何 `.astro` / `.ts` / `.css` 文件，浏览器会自动热更新。

## 4. 生产构建

```bash
npm run build
# → 生成 dist/ 目录
```

`dist/` 内容：

```
dist/
├── index.html              ← 单页站点
├── _astro/                 ← Astro 内部优化后的 CSS/JS
└── favicon.svg
```

## 5. 部署到 Spaceship Web Hosting

```bash
# 本地构建
npm run build

# 整个 dist/ 上传到 public_html/
# 方法 A：FileZilla 拖进去
# 方法 B：cPanel File Manager → Upload
# 方法 C：scp
scp -r dist/* user@your-host:/path/to/public_html/
```

⚠️ 上传的是 **`dist/` 里面的内容**（不是 `dist/` 文件夹本身）。

## 6. 部署到 Cloudflare Pages（推荐，免费 + CDN）

```bash
# 一次性
npm install -g wrangler
wrangler login

# 构建并部署
npm run build
wrangler pages deploy dist --project-name=ultimatrix
```

域名解析：Spaceship DNS 加 `CNAME @` → `ultimatrix.pages.dev`

---

## 7. 修改内容（最常用的操作）

几乎所有可见内容都在 **`src/data/site.ts`** 一个文件里：

```ts
export const site = {
  founder: { ... },
  contact: { ... },
};

export const tracks = [
  { title: '极智短剧', pitch: '...', facts: [...], illustration: 'DramaClapper' },
  // ...
];

export const capabilities = [
  { title: 'AI 短剧工业化', body: '...', methods: [...], output: '...' },
  // ...
];
```

| 改什么 | 在哪改 |
|---|---|
| 创始人姓名/简介 | `site.founder.*` |
| 邮箱/电话/LinkedIn | `site.contact.*` |
| 三大业务文案 | `tracks` 数组 |
| 工作室能力卡片 | `capabilities` 数组 |
| 站点标题/描述 | `site.meta.*`（也会同步影响 `<title>` 和 SEO meta） |

## 8. 修改样式

所有视觉规则在 `src/styles/global.css`。CSS 变量在文件顶部：

```css
:root {
  --paper: #e8e8e1;       /* 纸面背景 */
  --ink: #0c0e12;          /* 文字主色 */
  --accent: #4a5cff;       /* 电光 AI 蓝 */
  --signal: #00d4a8;       /* 薄荷信号色 */
  --warm: #f3b13a;         /* 暖琥珀 */
  --dark: #06080a;         /* 暗调背景 */
  /* ... */
}
```

改一处变量，全站同步。

## 9. 添加新的项目案例

```ts
// src/data/site.ts
export const tracks = [
  // ...现有三条
  {
    id: 'new-track',
    index: '04',
    title: '新赛道',
    category: '...',
    pitch: '一句话定位',
    facts: [...],
    meta: { left: '...', right: '...' },
    illustration: 'DramaClapper',  // 复用现有插图，或新增
    accent: 'paper',
  },
];
```

页面会自动渲染。如果需要新插图：

```bash
# 在 src/components/illustrations/ 下加 NewIllust.astro
# 在 ProjectsList.astro 的 illustrationMap 中注册
```

## 10. 添加联系表单（无后端方案）

推荐 [Formspree](https://formspree.io)（免费 50 条/月）：

1. 注册拿到 endpoint，形如 `https://formspree.io/f/xxxxxxx`
2. 修改 `src/components/ContactFooter.astro` 的"联系我"按钮为 `<form>`：

```astro
<form action="https://formspree.io/f/xxxxxxx" method="POST">
  <input type="email" name="email" required>
  <textarea name="message" required></textarea>
  <button type="submit" class="button contact-button">发送 →</button>
</form>
```

## 11. 上线版本

- **公网预览**：`https://nnms1sb7kqn7d.space.mcode.cn`（MiniMax Code 部署节点）
- **正式域名**：Spaceship 上，待上传 `dist/` 后激活

## 12. 进阶路径

需要博客 / CMS / 多页面时：

- **加 Astro 内容集合**：`src/content/projects/*.md` 用 Markdown 写案例，自动生成页面
- **加 Decap CMS**：Git 仓库存档，可视化后台编辑
- **加多语言**：Astro i18n 集成

详细参考 [Astro 文档](https://docs.astro.build/zh-cn/)。

---

需要任何调整，告诉我即可。