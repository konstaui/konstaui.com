/* eslint-disable no-useless-escape */
import fs from 'fs-extra';

const banner = `---
title: Release Notes | Konsta UI
---\n`;

async function writeFile(content) {
  await fs.writeFile(
    './src/pages/release-notes.mdx',
    banner +
      content
        .replace(/\# \[/g, '## [')
        .replace('# Changelog', '# Release Notes')
        .replace(/\#\#\# \[/g, '## [')
  );
  console.log('copy changelog done');
}

(async () => {
  const localPath = '../konsta/CHANGELOG.md';
  const content = await fs.readFile(localPath, 'utf-8');
  await writeFile(content);
})();
