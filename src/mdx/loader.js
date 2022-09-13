const path = require('path');
const frontMatter = require('front-matter');
const rehypePrism = require('@mapbox/rehype-prism');
const { createLoader } = require('simple-functional-loader');
const withTableOfContents = require('./withTableOfContents');

const layouts = {
  '/pages/react': ['@/layouts/withSidebar', 'withSidebarLayout'],
  '\\\\pages\\\\react': ['@/layouts/withSidebar', 'withSidebarLayout'],
  '/pages/vue': ['@/layouts/withSidebar', 'withSidebarLayout'],
  '\\\\pages\\\\vue': ['@/layouts/withSidebar', 'withSidebarLayout'],
  '/pages/svelte': ['@/layouts/withSidebar', 'withSidebarLayout'],
  '\\\\pages\\\\svelte': ['@/layouts/withSidebar', 'withSidebarLayout'],
  '/components/api': ['@/layouts/empty', 'emptyLayout'],
  '\\\\components\\\\api': ['@/layouts/empty', 'emptyLayout'],
  '/pages/sponsors': ['@/layouts/default', 'defaultLayout'],
  '\\\\pages\\\\sponsors': ['@/layouts/default', 'defaultLayout'],
};

const getLayout = (resourcePath) => {
  let layout;
  // eslint-disable-next-line
  for (let reString in layouts) {
    const re = new RegExp(reString);
    if (resourcePath.match(re)) {
      layout = layouts[reString];
    }
  }
  if (!layout) layout = ['@/layouts/default', 'defaultLayout'];
  return layout;
};

const mdxLoader = (config, options) => {
  config.module.rules.push({
    test: /\.mdx$/,
    use: [
      options.defaultLoaders.babel,
      // eslint-disable-next-line
      createLoader(function parseMeta(source) {
        if (source.includes('/*START_META*/')) {
          const [meta] = source.match(
            /\/\*START_META\*\/(.*?)\/\*END_META\*\//s
          );
          return `export default ${meta}`;
        }
        // prettier-ignore
        return (
            `${source.replace(/export const/gs, 'const')
            }\nMDXContent.layoutProps = layoutProps\n`
          );
      }),
      {
        loader: '@mdx-js/loader',
        options: {
          remarkPlugins: [withTableOfContents],
          rehypePlugins: [rehypePrism],
        },
      },
      createLoader(function (source) {
        const { attributes: meta, body } = frontMatter(source);
        const extra = [];
        const resourcePath = path.relative(__dirname, this.resourcePath);

        if (!/^\s*export\s+(var|let|const)\s+Layout\s+=/m.test(source)) {
          const layout = getLayout(resourcePath);
          if (layout) {
            extra.push(
              `import _Layout from '${layout[0]}'`,
              'export const Layout = _Layout'
            );
          }
        }

        if (
          !/^\s*export\s+default\s+/m.test(source.replace(/```(.*?)```/gs, ''))
        ) {
          const layout = getLayout(resourcePath);
          if (layout) {
            extra.push(
              `import _Default from '${layout[0]}'`,
              'export default _Default'
            );
          }
        }

        const result = [
          ...extra,
          body,
          `export const meta = ${JSON.stringify(meta)}`,
        ].join('\n\n');

        return result;
      }),
    ],
  });
};

module.exports = mdxLoader;
