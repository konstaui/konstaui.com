const mdxLoader = require('./src/mdx/loader');

module.exports = {
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  experimental: { esmExternals: true },
  ...mdxLoader,
};
