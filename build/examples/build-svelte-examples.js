import fs from 'fs';
import path from 'path';
import { getDirname } from '../get-dirname.js';

const __dirname = getDirname(import.meta.url);

const buildExamples = async () => {
  const pagesPath = path.resolve(
    __dirname,
    '../../public/kitchen-sink/svelte/pages'
  );
  const pages = fs
    .readdirSync(pagesPath)
    .filter((page) => !page.includes('Home') && page.includes('.svelte'));

  pages.forEach((page) => {
    const name = page.split('.svelte')[0];
    let url = name
      .split('')
      .map((char, index) =>
        char.match(/[A-Z]/) && index !== 0 ? `-${char}` : char
      )
      .join('')
      .toLowerCase();
    if (url === 'side-panels') url = 'panel';
    let content = fs
      .readFileSync(path.resolve(pagesPath, page), 'utf-8')
      .replace(/\$\{/g, '\\${')
      .replace(/={`/g, '={\\`')
      .replace(/`}/g, '\\`}')
      .replace(
        `  const isPreview = document.location.href.includes('examplePreview');\n`,
        ''
      )
      .replace(
        `\n    <svelte:fragment slot="left">
      {#if !isPreview}
        <NavbarBackLink onClick={() => history.back()} />
      {/if}
    </svelte:fragment>\n`,
        ''
      )
      .replace('>  </Navbar>', ' />')
      .replace('>    <Link', '>\n    <Link')
      .replace('>    <Segmented', '>\n    <Segmented');

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
      svelte
      fileName="${name}.svelte"
      source={ExampleContent}
      url="#/${url}"
    />
  )
}


    `.trim();
    fs.writeFileSync(
      path.resolve(
        __dirname,
        '../../src/components/examples/svelte/',
        `${name}.js`
      ),
      demoContent
    );
  });
};

export default buildExamples;
