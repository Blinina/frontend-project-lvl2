import _ from 'lodash';

const getSpace = (defoltTab = 4, depth) => {
  const tab = ' ';
  const space = tab.repeat(defoltTab * depth - 2);
  return space;
};

const formattedValue = (value, newdepth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const space = getSpace(5, newdepth + 1);
  const spaceClose = getSpace(4, newdepth + 2);
  const elements = Object.entries(value);
  const [[key, elvalue]] = elements;
  const result = elements.map((element) => `${space}  ${key}: ${formattedValue(elvalue, newdepth + 1)}\n ${spaceClose}}`);
  return `{\n${space}${result.join('\n')}`;
};

const stylish = (data) => {
  const iter = (node, depth) => {
    const space = getSpace(4, depth);
    const stylishArr = node.map((dkey) => {
      switch (dkey.type) {
        case 'nested': {
          return `${space}  ${dkey.key}: {\n${iter(dkey.children, depth + 1)}\n}`;
        }
        case 'unchanged': {
          return `${space}  ${dkey.key}: ${(dkey.value)}`;
        }
        case 'deleted': {
          return `${space}- ${dkey.key}: ${formattedValue(dkey.value)}`;
        }
        case 'added': {
          return `${space}+ ${dkey.key}: ${formattedValue(dkey.value)}`;
        }
        case 'changed': {
          return `${space}- ${dkey.key}: ${formattedValue(dkey.value1)}\n${space}+ ${dkey.key}: ${formattedValue(dkey.value2)}`;
        }
        default: {
          return null;
        }
      }
    });
    return stylishArr.join('\n');
  };
  const result = `{\n${iter(data, 1)}\n}`;
  return result;
};

export default stylish;
