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
    if (item.name === 'onAny') {
      return 'function';
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
  let parentType;

  const content = `
export const ${componentName}Props = () => {
  return (
    <table className="table-fixed params-table">
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
          <tr className="border-t ${
            parentType ? 'params-table-nested-row' : ''
          }">
            <td className="w-1/6 text-red-700 font-mono font-semibold">
              <a href="#param-${parentType ? `${parentType.name}-` : ''}${
              item.name
            }" id="param-${parentType ? `${parentType.name}-` : ''}${
              item.name
            }">${item.name}</a>
            </td>
            <td className="w-1/6 text-green-700 font-mono font-semibold">
              ${type(item)}
            </td>
            <td className="w-1/6 text-yellow-700 font-mono font-semibold">
              ${defaultValue(item)}
            </td>
            <td className="w-3/6 space-y-2">${description(item)}</td>
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
