import _ from 'lodash';

const getSpace = (defaultDepth, backTab = 2) => {
  const tab = ' ';
  const tabDefault = 4;
  const defaultSpace = tab.repeat(defaultDepth * tabDefault - backTab);
  return defaultSpace;
};

const getformattedValue = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }
  const newspace = getSpace(depth);
  const elements = Object.entries(value);
  const result = elements.map(([keys, elValue]) => `${newspace}  ${keys}: ${getformattedValue(elValue, depth + 1)}`);

  return ['{', ...result, `${getSpace(depth, 4)}}`].join('\n');
};

const stylish = (data) => {
  const iter = (node, depth) => {
    const space = getSpace(depth);

    const stylishArr = node.map((item) => {
      switch (item.type) {
        case 'nested': {
          return `${space}  ${item.key}: {\n${iter(item.children, depth + 1)}`;
        }
        case 'unchanged': {
          return `${space}  ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
        }
        case 'removed': {
          return `${space}- ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
        }
        case 'added': {
          return `${space}+ ${item.key}: ${getformattedValue(item.value, depth + 1)}`;
        }
        case 'changed': {
          return `${space}- ${item.key}: ${getformattedValue(item.value1, depth + 1)}\n${space}+ ${item.key}: ${getformattedValue(item.value2, depth + 1)}`;
        }
        default: {
          throw new Error('This type in not exsist');
        }
      }
    });
    return [...stylishArr, `${getSpace(depth, 4)}}`].join('\n');
  };
  const result = `{\n${iter(data, 1)}`;
  return result;
};

export default stylish;
