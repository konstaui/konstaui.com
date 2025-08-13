import path from 'path';
import frontMatter from 'front-matter';
import rehypePrism from '@mapbox/rehype-prism';
import { createLoader } from 'simple-functional-loader';
import { getDirname } from '../../build/get-dirname.js';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

const __dirname = getDirname(import.meta.url);

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
        let result = `${source.replace(
          /export const/gs,
          'const'
        )}\nMDXContent.layoutProps = {meta}\n`;

        result = result.replace(
          `return _jsxDEV(MDXLayout, {`,
          `return _jsxDEV(MDXLayout, {meta,`
        );
        return result;
      }),
      {
        loader: '@mdx-js/loader',
        options: {
          remarkPlugins: [remarkToc, remarkGfm],
          rehypePlugins: [rehypePrism, rehypeSlug, rehypeAutolinkHeadings],
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

export default mdxLoader;
