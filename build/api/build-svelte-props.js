const path = require('path');
const fs = require('fs');
const description = require('./description');
const lowerCaseNames = require('./lowercase-names');

const ignoreSlots = ['chevronIcon'];

const componentsWithComponent = [
  'Button',
  'Checkbox',
  'ListInput',
  'ListItem',
  'NavbarBackLink',
  'Page',
  'Radio',
  'Stepper',
];

// eslint-disable-next-line
const defaultValue = (item) => {
  return (item.default_value || '').replace(
    /[{}]/g,
    (bracket) => `{'${bracket}'}`
  );
};

const isSlotOnly = (item) => {
  const names = ['media', 'icon', 'input', 'button'];

  return (
    names.includes(item.name) &&
    JSON.stringify(item.type || {}).includes('ReactNode')
  );
};

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

const buildPropsTable = (componentName, items) => {
  const propName = (name) => {
    const n = lowerCaseNames.includes(name.toLowerCase())
      ? name.toLowerCase()
      : name;
    return n.replace('ClassName', 'Class');
  };

  const typeFormatted = (typeValue) => {
    if (typeValue.includes('ReactNode'))
      return typeValue.replace('ReactNode', 'string');
    return typeValue;
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
              <span>${typeFormatted(type(item))}</span>
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
      if (item.name === 'defaultValue' || item.name === 'defaultChecked')
        return false;
      return true;
    });

  const props = items
    .filter((item) => !item.name.includes('Children') && !isSlotOnly(item))
    .filter((item) => {
      if (
        item.name === 'component' &&
        !componentsWithComponent.includes(componentName)
      ) {
        return false;
      }
      return true;
    });
  const slots = items
    .filter((item) => JSON.stringify(item.type || {}).includes('ReactNode'))
    .filter((item) => !ignoreSlots.includes(item.name));

  const propsTable = buildPropsTable(componentName, props);
  const slotsTable = buildSlotsTable(componentName, slots);

  fs.writeFileSync(
    path.join(
      __dirname,
      `../../src/components/api/svelte/${componentName}Props.js`
    ),
    propsTable
  );
  fs.writeFileSync(
    path.join(
      __dirname,
      `../../src/components/api/svelte/${componentName}Slots.js`
    ),
    slotsTable
  );
};

module.exports = buildProps;
