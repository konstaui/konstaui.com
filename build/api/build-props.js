const path = require('path');
const fs = require('fs');
const description = require('./description');

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

  // eslint-disable-next-line
  const defaultValue = (item) => {
    return (item.default_value || '').replace(
      /[{}]/g,
      (bracket) => `{'${bracket}'}`
    );
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
              <a href="#param-${item.name}" id="param-${item.name}"><span>${
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
    path.join(__dirname, `../../src/components/api/${componentName}Props.js`),
    content
  );
};

module.exports = buildProps;
