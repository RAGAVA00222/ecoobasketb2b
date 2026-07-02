/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',

  // Use the unoptimized image loader for static exports to GitHub Pages
  images: {
    unoptimized: true,
  },
};

export default nextConfig;