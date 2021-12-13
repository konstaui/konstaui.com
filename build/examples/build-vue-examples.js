const fs = require('fs');
const path = require('path');

const buildExamples = async () => {
  const pagesPath = path.resolve(
    __dirname,
    '../../public/kitchen-sink/vue/pages'
  );
  const pages = fs
    .readdirSync(pagesPath)
    .filter((page) => !page.includes('Home') && page.includes('.vue'));

  pages.forEach((page) => {
    const name = page.split('.vue')[0];
    const url = name
      .split('')
      .map((char, index) =>
        char.match(/[A-Z]/) && index !== 0 ? `-${char}` : char
      )
      .join('')
      .toLowerCase();
    // prettier-ignore
    let content = fs
      .readFileSync(path.resolve(pagesPath, page), 'utf-8')
      .replace(/\$\{/g, '\\${')
      .replace(/={`/g, '={\\`')
      .replace(/"`/g, '="\\`')
      .replace(/`}/g, '\\`}')
      .replace(/`"/g, '\\`"')
      .replace(/name: '([a-zA-Z]*)',\n {4}/g, '')
      .replace(/title: '([a-zA-Z \(\)\/]*)',\n {4}/g, '') // eslint-disable-line
      .replace(`        isPreview: document.location.href.includes('examplePreview'),\n`, '')
      .replace(`        history: window.history,\n`, '')
      .replace(`    setup() {\n      return {\n      };\n    },`, '')
      .replace(
`<template v-if="!isPreview" #left>
        <k-navbar-back-link @click="() => history.back()" />
      </template>`,
        ''
      )
      .replace(
        / {4}<k-navbar title="([a-zA-Z0-9 \(\)\/]*)">\n {6}\n {4}<\/k-navbar>/, // eslint-disable-line
        '    <k-navbar title="$1" />'
      )

    content = content.trim();

    const demoContent = `
import { Pre } from '@/components/Pre.js';
import { ExamplePreview } from '@/components/ExamplePreview';

function ExampleContent() {
  return (
    <Pre lang="html">{\`${content}\`}</Pre>
  )
}

export default function Example() {
  return (
    <ExamplePreview
      vue
      fileName="${name}.vue"
      source={ExampleContent}
      url="#/${url}"
    />
  )
}


    `.trim();
    fs.writeFileSync(
      path.resolve(
        __dirname,
        '../../src/components/examples/vue/',
        `${name}.jsx`
      ),
      demoContent
    );
  });
};

module.exports = buildExamples;
