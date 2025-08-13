import fs from 'fs';
import path from 'path';
import { getDirname } from './get-dirname.js';

const __dirname = getDirname(import.meta.url);

fs.copyFileSync(
  path.resolve(__dirname, '../src/shared/sponsors-list.json'),
  path.resolve(__dirname, '../public/sponsors-list.json')
);
