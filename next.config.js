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
  webpack(config, options) {
    mdxLoader(config, options);
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: { svgoConfig: { plugins: { removeViewBox: false } } },
        },
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });
    return config;
  },
  // ...mdxLoader,
};
