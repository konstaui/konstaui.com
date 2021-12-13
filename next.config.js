const pkg = require('konsta/package.json');
const mdxLoader = require('./src/mdx/loader');

module.exports = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  experimental: { esmExternals: true },
  env: {
    konstaVersion: pkg.version,
    konstaReleaseDate: pkg.releaseDate,
  },
  ...mdxLoader,
};
