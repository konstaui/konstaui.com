const fs = require('fs');
const path = require('path');

const buildExamples = async () => {
  const pagesPath = path.resolve(__dirname, '../kitchen-sink/react/pages');
  const pages = fs
    .readdirSync(pagesPath)
    .filter((page) => !page.includes('Home') && page.includes('.jsx'));
  pages.forEach((page) => {
    const name = page.split('.jsx')[0];
    const content = fs
      .readFileSync(path.resolve(pagesPath, page), 'utf-8')
      .replace(/\$\{/g, '\\${')
      .replace(/={`/g, '={\\`')
      .replace(/`}/g, '\\`}');

    const demoContent = `
import { Pre } from '@/components/Pre.js';

export default function ${name}() {
  return (
    <Pre lang="jsx">{\`${content}\`}</Pre>
  )
}
    `.trim();
    fs.writeFileSync(
      path.resolve(
        __dirname,
        '../src/components/examples/react/',
        `${name}.jsx`
      ),
      demoContent
    );
  });
};

buildExamples();
