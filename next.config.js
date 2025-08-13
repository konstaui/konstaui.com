import mdxLoader from './src/mdx/loader.js';
import fs from 'fs';

const pkg = JSON.parse(
  fs.readFileSync('./node_modules/konsta/package.json', 'utf8')
);

export default {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx'],
  distDir: 'out',
  env: {
    konstaVersion: pkg.version,
    konstaReleaseDate: pkg.releaseDate,
  },
  webpack(config, options) {
    mdxLoader(config, options);

    return config;
  },
  // ...mdxLoader,
};
