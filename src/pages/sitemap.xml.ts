import type { APIRoute } from 'astro';

const SITE = 'https://ultimatrix.dev';

export const GET: APIRoute = () => {
  const now = new Date().toISOString().split('T')[0];

  // 列出所有可索引的页面
  const pages = [
    { loc: '/',          priority: '1.0',  changefreq: 'monthly' },
    { loc: '/#projects', priority: '0.8',  changefreq: 'monthly' },
    { loc: '/#studio',   priority: '0.8',  changefreq: 'monthly' },
    { loc: '/#contact',  priority: '0.7',  changefreq: 'monthly' },
  ];

  const urls = pages
    .map(
      (p) => `  <url>
    <loc>${SITE}${p.loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`,
    )
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};