const fs = require('fs');
const path = require('path');

const components = [
  'App',
  'Badge',
  'Block',
  'Button',
  'Card',
  'Checkbox',
  'Chip',
  'Fab',
  'Icon',
  'Link',
  'List',
  'ListButton',
  'ListInput',
  'ListItem',
  'MenuList',
  'Navbar',
  'Page',
  'Popover',
  'Popup',
  'Preloader',
  'Progressbar',
  'Radio',
  'Range',
  'Segmented',
  'Sheet',
  'Stepper',
  'Tabbar',
  'Toast',
  'Toggle',
  'Toolbar',
];

components.forEach((name) => {
  const dashName = name
    .split('')
    .map((char, index) =>
      char.toUpperCase() === char && index > 0
        ? `-${char.toLocaleLowerCase()}`
        : char
    )
    .join('')
    .toLowerCase();
  const fullName = name
    .split('')
    .map((char, index) =>
      char.toUpperCase() === char && index > 0 ? ` ${char}` : char
    )
    .join('');
  const content = `
---
title: '${fullName} Component | Tailwind Mobile React'
section: 'react'
---

import { ${name}Props } from '../../components/api/${name}Props';

# ${fullName} React Component

<${name}Props />

  `.trim();
  fs.writeFileSync(
    path.resolve(__dirname, `src/pages/${dashName}.mdx`),
    content
  );
});
