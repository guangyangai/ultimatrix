/**
 * 全站基础信息配置
 * 修改这里的值就能更新整个站点内容
 */
export const site = {
  brand: {
    zh: '极智矩阵',
    en: 'Ultimatrix',
    tagline: 'AI OPC Studio',
    version: 'v1.0',
  },
  founder: {
    name: {
      zh: '杨光',
      en: 'Guang Yang',
    },
    title: {
      zh: '斯坦福博士 · AWS 资深应用科学家',
      en: 'Stanford PhD · Senior Applied Scientist at AWS',
    },
    shortTitle: {
      zh: '用一套 AI Agent 撑起一个人的公司。',
      en: 'One Person. Full-Stack AI Production.',
    },
    location: '深圳',
    applyingTo: '前海 OPC 国际社区',
  },
  contact: {
    email: 'guang.k.yang@gmail.com',
    phone: '+86 180 3340 0322',
    linkedin: 'linkedin.com/in/guang-kevin-yang-504a0519',
    github: 'github.com/guangyangsjc18',
  },
  /** SEO meta */
  meta: {
    title: '极智矩阵 · Ultimatrix AI Studio — 一人 AI 工作室',
    description:
      '极智矩阵（Ultimatrix）是杨光创立的 AI OPC 一人工作室。一套 Agent 底层，同时驱动 AI 短剧、AI 智能设计与 Agent 量化投研三条赛道。',
  },
} as const;

/**
 * 三大业务赛道
 * 后续要新增/排序/隐藏，改这个数组即可
 */
export const tracks = [
  {
    id: 'drama',
    index: '01',
    title: '极智短剧',
    category: '内容生产',
    pitch: '从选题到成片全流程 AI 工业化，单条成本下降 90%，产能提升 10 倍。',
    facts: [
      { label: '使用场景', value: '商单 / 平台分发 / IP 孵化' },
      { label: '关键能力', value: '剧本 / 分镜 / 数字人 / 配音' },
      { label: '设计重点', value: '合规自检 + 平台适配' },
      { label: '交付内容', value: '成片 + 工作流授权' },
    ],
    meta: { left: '2026 · MVP', right: 'AI 内容工业化' },
    illustration: 'DramaClapper',
    accent: 'solis',
  },
  {
    id: 'design',
    index: '02',
    title: '极智设计',
    category: '商业设计',
    pitch: '网页、装修、服装三类设计需求的 AI 工具集；分钟级交付，单次 / 订阅双轨变现。',
    facts: [
      { label: '使用场景', value: '建站 / 装修 / 服装设计' },
      { label: '关键能力', value: '一键生成 / 模板库 / 风格替换' },
      { label: '设计重点', value: '分钟级交付 + 商用授权' },
      { label: '独家资源', value: '深圳服装供应链 + 趋势数据' },
    ],
    meta: { left: '2026 · MVP', right: '设计工业化' },
    illustration: 'DesignGrid',
    accent: 'paper',
  },
  {
    id: 'quant',
    index: '03',
    title: '极智投研',
    category: '量化投研',
    pitch: '7×24 Agent 全网爬取交易策略，自动解析逻辑、批量回测，可视化 Dashboard 实时排名。',
    facts: [
      { label: '使用场景', value: '个人 / 工作室 / 小型资管' },
      { label: '关键能力', value: '策略爬虫 / 解析 / 回测 / 排名' },
      { label: '设计重点', value: '实时更新 · 剔除拟合' },
      { label: '交付内容', value: 'Dashboard / 私有部署' },
    ],
    meta: { left: '2026 · 内测', right: '技术壁垒业务' },
    illustration: 'QuantCandles',
    accent: 'transfer',
  },
] as const;

/**
 * 联系方式（独立导出，方便组件直接引用）
 */
export const contact = site.contact;

/**
 * 工作室能力卡片（暗调部分）
 */
export const capabilities = [
  {
    no: '01',
    label: '内容生产',
    title: 'AI 短剧工业化',
    body:
      '从选题、剧本、分镜到数字人、配音、剪辑的全流程 AI 工作流；内置合规自检，适配抖音、快手、红果等全平台。',
    methods: ['LLM 剧本生成', '分镜 / 数字人', '合规校验', '矩阵分发'],
    output: '成片 · 工作流授权',
  },
  {
    no: '02',
    label: '商业设计',
    title: '一键网页 / 装修 / 服装',
    body:
      '为中小商家、装修公司与服装品牌提供 AI 设计工具集；分钟级交付、批量模板库、清晰商用授权。',
    methods: ['一键生成', '户型识别', '服装出稿', '模板库'],
    output: '设计稿 · 工具订阅',
  },
  {
    no: '03',
    label: '智能投研',
    title: 'Agent 量化研究',
    body:
      '7×24 Agent 全网爬取交易策略，NLP 拆解逻辑、多周期回测剔除拟合，可视化 Dashboard 实时排名。',
    methods: ['策略爬虫', 'NLP 解析', '批量回测', '实时排名'],
    output: 'Dashboard · 私有部署',
  },
  {
    no: '04',
    label: '系统工程',
    title: '共享 Agent 底层',
    body:
      '三大业务复用同一套 Agent 调度与算力底座；模型路由、成本控制、可观测性统一管理，边际成本持续下降。',
    methods: ['Agent 调度', '模型路由', '可观测性', '成本控制'],
    output: '内部平台 · 工程规范',
  },
] as const;