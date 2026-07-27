/** @type {import('next').NextConfig} */

// Old static URLs → new extensionless routes. 301 permanent to preserve SEO.
const htmlRedirects = [
  ['index', '/'],
  ['about', '/about'],
  ['services', '/services'],
  ['we-serve', '/services'],
  ['kirana', '/kirana'],
  ['partner', '/partner'],
  ['founders', '/founders'],
  ['vision', '/vision'],
  ['contact', '/contact'],
  ['faq', '/faq'],
  ['privacy', '/privacy'],
  ['terms', '/terms'],
  ['returns', '/returns'],
].map(([from, to]) => ({ source: `/${from}.html`, destination: to, permanent: true }));

// Cache-bust lever. Bump ASSET_VERSION on any deploy that must force clients
// off a stale build; combined with the build timestamp it namespaces the
// _next asset paths so browsers can't reuse an old bundle. This layers on top
// of the runtime self-heal script (SW unregister + cache clear) in layout.
const ASSET_VERSION = 'v3';

const nextConfig = {
  reactStrictMode: true,
  // WebP only. AVIF removed after P1 measurement (~10% larger for this asset
  // set) + slower decode on low-end Android — see CONTENT-NEEDED.md P1 notes.
  images: { formats: ["image/webp"] },
  // Stamped build id → new asset namespace every deploy (and a manual bump lever).
  generateBuildId: async () => `${ASSET_VERSION}-${Date.now()}`,
  async redirects() {
    return [
      ...htmlRedirects,
      // /we-serve merged into /services as a "who we serve" block (Phase 5.1).
      // Explicit 301 (Next's `permanent: true` would emit 308).
      { source: "/we-serve", destination: "/services", statusCode: 301 },
    ];
  },
  async headers() {
    return [
      {
        // Document/page routes only — never the hashed, immutable assets under
        // /_next/static or /assets. Force the browser to revalidate the HTML so
        // it always resolves to the latest bundle references.
        source: '/((?!_next/|assets/|.*\\.[a-z0-9]+$).*)',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
