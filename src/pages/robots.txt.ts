import type { APIRoute } from 'astro';

const SITE = 'https://ultimatrix.dev';

export const GET: APIRoute = () => {
  const body = `# 极智矩阵 Ultimatrix AI Studio
# https://ultimatrix.dev/

User-agent: *
Allow: /
Disallow: /dist/

# Sitemap
Sitemap: ${SITE}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};