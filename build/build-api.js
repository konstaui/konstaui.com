const fs = require('fs-extra');
const path = require('path');
const { promise: exec } = require('exec-sh');

const buildProps = require('./api/build-props');

const buildApi = async () => {
  console.log('Begin types generation');
  const config = JSON.parse(
    fs.readFileSync('./tsconfig.json.typedoc', 'utf-8')
  );

  const typesFiles = fs.readdirSync(
    path.resolve(__dirname, '../node_modules/tailwind-mobile/react/types')
  );
  config.typedocOptions.entryPoints = typesFiles.map(
    (f) => `node_modules/tailwind-mobile/react/types/${f}`
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
  children.forEach(async ({ name, children }) => {
    const propsEl = children.filter((child) => child.name === 'Props')[0];
    types[name] = (propsEl.children || []).map((prop) => getProp(prop));
  });
  Object.keys(types).forEach((name) => {
    const props = types[name];
    props.forEach((prop, index) => {
      if (prop.type && prop.type.type === 'reflection') {
        const newChildren = prop.type.declaration.children.map((subProp) => ({
          ...getProp(subProp),
          name: `${prop.name}.${subProp.name}`,
        }));
        props.splice(index + 1, 0, ...newChildren);
      }
    });
  });

  Object.keys(types).forEach((name) => {
    buildProps(name, types);
  });

  await fs.writeFile(typesPath, `${JSON.stringify(types, null, 4)}`);
  console.log('Types generation finished');
  fs.unlinkSync('./tsconfig.json');
};

buildApi();
