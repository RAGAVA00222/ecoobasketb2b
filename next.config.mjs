/** @type {import('next').NextConfig} */

// Old static URLs → new extensionless routes. 301 permanent to preserve SEO.
const htmlRedirects = [
  ['index', '/'],
  ['about', '/about'],
  ['services', '/services'],
  ['we-serve', '/we-serve'],
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

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return htmlRedirects;
  },
};

export default nextConfig;
