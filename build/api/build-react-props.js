import path from 'path';
import fs from 'fs';
import description from './description.js';
import { getDirname } from '../get-dirname.js';

const __dirname = getDirname(import.meta.url);

const buildProps = async (componentName, typesData) => {
  const items = (typesData[componentName] || []).filter((item) =>
    item.comment && item.comment.shortText
      ? !item.comment.shortText.toLowerCase().includes('internal')
      : true
  );

  const type = (item = {}) => {
    const typeObj = item.type || {};
    if (typeObj.type === 'array' && typeObj.elementType) {
      return `${typeObj.elementType.name}[]`;
    }
    if (typeObj.type === 'union') {
      const types = [];
      typeObj.types.forEach(({ name, value, type: subType, elementType }) => {
        if (value) types.push(`'${value}'`);
        else if (name) types.push(name);
        else if (subType === 'array' && elementType)
          types.push(`${elementType.name}[]`);
      });
      return types.join(`{' | '}`);
    }
    if (typeObj.type === 'reflection') {
      if (typeObj && typeObj.declaration && typeObj.declaration.signatures) {
        const args = (typeObj.declaration.signatures[0].parameters || [])
          .map((param) => `<span className="text-red-700">${param.name}</span>`)
          .join(', ');
        return `function(${args || ''})`;
      }
      return `object`;
    }
    if (!item.type && item.signatures) {
      const args = (item.signatures[0].parameters || [])
        .map((param) => `<span className="text-red-700">${param.name}</span>`)
        .join(', ');
      return `function(${args || ''})`;
    }
    return typeObj.name || '';
  };

  const defaultValue = (item) => {
    const defaultTag = item.comment?.blockTags?.find(
      (tag) => tag.tag === '@default'
    );
    if (!defaultTag) return '';
    const value = defaultTag.content[0].text
      .replace('```ts\n', '')
      .replace('\n```', '')
      .replace(/[{}]/g, (bracket) => `{'${bracket}'}`);
    return value;
  };

  const content = `
export const ${componentName}Props = () => {
  return (
    <table className="props-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        ${items
          .map(
            (item) => `
          <tr>
            <td>
              <a href="#prop-${item.name}" id="prop-${item.name}"><span>${
                item.name
              }</span></a>
            </td>
            <td>
              <span>${type(item)}</span>
            </td>
            <td>
              <span>${defaultValue(item)}</span>
            </td>
            <td>${description(item)}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>
  )
}
`;
  fs.writeFileSync(
    path.join(
      __dirname,
      `../../src/components/api/react/${componentName}Props.js`
    ),
    content
  );
};

export default buildProps;
