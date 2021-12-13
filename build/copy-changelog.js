/* eslint-disable no-useless-escape */
const fs = require('fs-extra');
const fetch = require('node-fetch');

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
  const exists = fs.existsSync(localPath);
  if (exists) {
    const content = await fs.readFile(localPath, 'utf-8');
    await writeFile(content);
    return;
  }
  console.log(`local didnt find: ${localPath}. Fetching from web`);
  const response = await fetch(
    'https://raw.githubusercontent.com/konstaui/konsta/master/CHANGELOG.md'
  );
  const content = await response.text();
  await writeFile(content);
})();
