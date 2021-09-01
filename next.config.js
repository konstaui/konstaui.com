const pkg = require('tailwind-mobile/package.json');
const mdxLoader = require('./src/mdx/loader');

module.exports = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  experimental: { esmExternals: true },
  env: {
    tailwindMobileVersion: pkg.version,
    tailwindMobileReleaseDate: pkg.releaseDate,
  },
  ...mdxLoader,
};
