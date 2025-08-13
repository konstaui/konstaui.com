import path from 'path';
import fs from 'fs';
import description from './description.js';
import lowerCaseNames from './lowercase-names.js';
import { getDirname } from '../get-dirname.js';

const __dirname = getDirname(import.meta.url);

const ignoreSlots = ['chevronIcon'];

const isSlotOnly = (item) => {
  const names = ['media', 'icon', 'input', 'button'];

  return (
    names.includes(item.name) &&
    JSON.stringify(item.type || {}).includes('ReactNode')
  );
};

const type = (item = {}) => {
  const typeObj = item.type || {};
  const t = (value) =>
    value.replace('React.ReactNode', 'string').replace('ReactNode', 'string');
  if (typeObj.type === 'array' && typeObj.elementType) {
    return t(`${typeObj.elementType.name}[]`);
  }
  if (typeObj.type === 'union') {
    const types = [];
    typeObj.types.forEach(({ name, value, type: subType, elementType }) => {
      if (value) types.push(`'${value}'`);
      else if (name) types.push(name);
      else if (subType === 'array' && elementType)
        types.push(`${elementType.name}[]`);
    });
    return t(types.join(`{' | '}`));
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
  return t(typeObj.name || '');
};

// eslint-disable-next-line
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

const buildPropsTable = (componentName, items) => {
  const propName = (name) => {
    const n = lowerCaseNames.includes(name.toLowerCase())
      ? name.toLowerCase()
      : name;
    return n.replace('ClassName', 'Class');
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
                <a href="#prop-${propName(item.name)}" id="prop-${propName(
                  item.name
                )}"><span>${propName(item.name)}</span></a>
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

  return content;
};

const buildEventsTable = (componentName, items) => {
  const eventName = (name) => name.slice(2).toLowerCase();
  const content = `
  export const ${componentName}Events = () => {
    return (
      <table className="events-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr>
              <td>
                <a href="#event-${eventName(item.name)}" id="event-${eventName(
                  item.name
                )}"><span>${eventName(item.name)}</span></a>
              </td>
              <td>
                <span>${type(item)}</span>
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

  return content;
};

const buildSlotsTable = (componentName, items) => {
  const slotName = (name) => name.toLowerCase().replace('children', '');
  const content = `
  export const ${componentName}Slots = () => {
    return (
      <table className="slots-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          ${items
            .map(
              (item) => `
            <tr>
              <td>
                <a href="#slot-${slotName(item.name)}" id="slot-${slotName(
                  item.name
                )}"><span>${slotName(item.name)}</span></a>
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

  return content;
};

const buildProps = async (componentName, typesData) => {
  const items = (typesData[componentName] || [])
    .filter((item) =>
      item.comment && item.comment.shortText
        ? !item.comment.shortText.toLowerCase().includes('internal')
        : true
    )
    .filter((item) => {
      if (item.name === 'defaultValue') return false;
      return true;
    });

  const props = items.filter(
    (item) =>
      item.name.indexOf('on') !== 0 &&
      !item.name.includes('Children') &&
      !isSlotOnly(item)
  );
  const events = items.filter((item) => item.name.indexOf('on') === 0);
  const slots = items
    .filter((item) => JSON.stringify(item.type || {}).includes('ReactNode'))
    .filter((item) => !ignoreSlots.includes(item.name));

  const propsTable = buildPropsTable(componentName, props);
  const eventsTable = buildEventsTable(componentName, events);
  const slotsTable = buildSlotsTable(componentName, slots);

  fs.writeFileSync(
    path.join(
      __dirname,
      `../../src/components/api/vue/${componentName}Props.js`
    ),
    propsTable
  );
  fs.writeFileSync(
    path.join(
      __dirname,
      `../../src/components/api/vue/${componentName}Events.js`
    ),
    eventsTable
  );
  fs.writeFileSync(
    path.join(
      __dirname,
      `../../src/components/api/vue/${componentName}Slots.js`
    ),
    slotsTable
  );
};

export default buildProps;
