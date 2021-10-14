const fs = require('fs');
const path = require('path');

const buildExamples = async () => {
  const pagesPath = path.resolve(
    __dirname,
    '../../public/kitchen-sink/react/pages'
  );
  const pages = fs
    .readdirSync(pagesPath)
    .filter((page) => !page.includes('Home') && page.includes('.jsx'));

  pages.forEach((page) => {
    const name = page.split('.jsx')[0];
    const url = name
      .split('')
      .map((char, index) =>
        char.match(/[A-Z]/) && index !== 0 ? `-${char}` : char
      )
      .join('')
      .toLowerCase();
    let content = fs
      .readFileSync(path.resolve(pagesPath, page), 'utf-8')
      .replace(/\$\{/g, '\\${')
      .replace(/={`/g, '={\\`')
      .replace(/`}/g, '\\`}')
      .replace(/([a-zA-Z]*)\.displayName = '([a-zA-Z]*)';/g, '')
      .replace(
        `const isPreview = document.location.href.includes('examplePreview');\n  `,
        ''
      )
      .replace(
        `left={!isPreview && <NavbarBackLink onClick={() => history.back()} />}\n        `,
        ''
      )
      .replace(
        `left={!isPreview && <NavbarBackLink onClick={() => history.back()} />}\n      `,
        ''
      );

    content = content.trim();

    const demoContent = `
import { Pre } from '@/components/Pre.js';
import { ExamplePreview } from '@/components/ExamplePreview';

function ExampleContent() {
  return (
    <Pre lang="jsx">{\`${content}\`}</Pre>
  )
}

export default function Example() {
  return (
    <ExamplePreview
      react
      fileName="${name}.jsx"
      source={ExampleContent}
      url="#/${url}"
    />
  )
}


    `.trim();
    fs.writeFileSync(
      path.resolve(
        __dirname,
        '../../src/components/examples/react/',
        `${name}.jsx`
      ),
      demoContent
    );
  });
};

module.exports = buildExamples;
