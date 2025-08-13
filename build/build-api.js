import fs from 'fs-extra';
import path from 'path';
import execSh from 'exec-sh';
import { getDirname } from './get-dirname.js';

import buildReactProps from './api/build-react-props.js';
import buildVueProps from './api/build-vue-props.js';
import buildSvelteProps from './api/build-svelte-props.js';

const { promise: exec } = execSh;
const __dirname = getDirname(import.meta.url);

const buildApi = async () => {
  console.log('Begin types generation');
  const config = JSON.parse(
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );

  const typesFiles = fs
    .readdirSync(path.resolve(__dirname, '../node_modules/konsta/react/types'))
    .filter((f) => f[0] !== '.');

  typesFiles.forEach((file) => {
    const content = fs
      .readFileSync(
        path.resolve(`node_modules/konsta/react/types/${file}`),
        'utf-8'
      )
      .split('\n')
      .filter((line) => {
        if (line.startsWith('declare const ')) return false;
        if (line.startsWith('export default ')) return false;
        if (line.includes('ref?: ')) return false;
        return true;
      })

      .join('\n')
      .replace(/React.ComponentProps<'([a-z]*)'>/, '{}');
    fs.writeFileSync(
      path.resolve(`node_modules/konsta/react/types/${file}`),
      content
    );
  });
  config.typedocOptions.entryPoints = typesFiles.map(
    (f) => `node_modules/konsta/react/types/${f}`
  );
  fs.writeFileSync('./tsconfig.json', JSON.stringify(config, '', 2));

  await exec(`npx typedoc --json ./src/types.json`);

  const typesPath = path.join(__dirname, '../src/types.json');
  const { children } = await fs.readJSON(typesPath);
  const types = {};

  const getProp = (prop) => {
    let default_value =
      prop.comment &&
      prop.comment.tags &&
      prop.comment.tags.find((tag) => tag.tag === 'default');

    const defaultValueIsNoteOrExample =
      prop.comment && prop.comment.tags
        ? prop.comment.tags.find(
            (tag) =>
              (tag.tag === 'note' || tag.tag === 'example') &&
              tag.text === default_value
          )
        : false;
    if (defaultValueIsNoteOrExample) default_value = '';

    return {
      name: prop.name,
      default_value: default_value
        ? default_value.text.replace('\n', '')
        : null,
      type: prop.type,
      comment: prop.comment,
      signatures: prop.signatures,
    };
  };

  // eslint-disable-next-line
  children.forEach(({ name, children }) => {
    const propsEl = children.filter((child) => child.name === 'Props')[0];
    types[name] = (propsEl.children || []).map((prop) => getProp(prop));
  });
  Object.keys(types).forEach((name) => {
    const props = types[name];
    props.forEach((prop, index) => {
      if (prop.type && prop.type.type === 'reflection') {
        const { children } = prop.type.declaration;
        if (!children) return;
        const newChildren = children.map((subProp) => ({
          ...getProp(subProp),
          name: `${prop.name}.${subProp.name}`,
        }));
        props.splice(index + 1, 0, ...newChildren);
      }
    });
  });

  await fs.writeFile(typesPath, `${JSON.stringify(types, null, 2)}`);

  Object.keys(types).forEach((name) => {
    buildReactProps(name, types);
    buildVueProps(name, types);
    buildSvelteProps(name, types);
  });

  console.log('Types generation finished');
  fs.unlinkSync('./tsconfig.json');
};

buildApi();
