import _ from 'lodash';

const getSpace = (defaultDepth) => {
  const tab = '  ';
  const defoultSpace = tab.repeat(defaultDepth);
  return defoultSpace;
};

const getformattedValue = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const newspace = getSpace(depth);
  const newspaceClose = getSpace(depth - 1);
  const elements = Object.entries(value);
  const result = elements.map(([keys, elValue]) => `${newspace}  ${keys}: ${getformattedValue(elValue, depth + 2)}`);

  return ['{', ...result, `${newspaceClose}}`].join('\n');
};

const stylish = (data) => {
  const iter = (node, depth) => {
    const space = getSpace(depth);
    const spaceClose = getSpace(depth - 1);

    const stylishArr = node.map((dkey) => {
      switch (dkey.type) {
        case 'nested': {
          return `${space}  ${dkey.key}: {\n${iter(dkey.children, depth + 2)}`;
        }
        case 'unchanged': {
          return `${space}  ${dkey.key}: ${getformattedValue(dkey.value, depth + 2)}`;
        }
        case 'removed': {
          return `${space}- ${dkey.key}: ${getformattedValue(dkey.value, depth + 2)}`;
        }
        case 'added': {
          return `${space}+ ${dkey.key}: ${getformattedValue(dkey.value, depth + 2)}`;
        }
        case 'changed': {
          return `${space}- ${dkey.key}: ${getformattedValue(dkey.value1, depth + 2)}\n${space}+ ${dkey.key}: ${getformattedValue(dkey.value2, depth + 2)}`;
        }
        default: {
          throw new Error(`This type in not exsist: ${dkey.type}`);
        }
      }
    });
    return [...stylishArr, `${spaceClose}}`].join('\n');
  };
  const result = `{\n${iter(data, 1)}`;
  return result;
};

export default stylish;
