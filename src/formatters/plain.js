import _ from 'lodash';

const plain = (data) => {
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (_.isString(value)) {
      return `'${value}'`;
    }
    return value;
  };

  const iter = (node, acc) => {
    const result = node
      .filter((dkey) => dkey.type !== 'unchanged')
      .map((dkey) => {
        const fullPath = (acc === '') ? `${dkey.key}` : `${acc}.${dkey.key}`;
        switch (dkey.type) {
          case 'removed':
            return `Property '${fullPath}' was removed`;
          case 'added':
            return `Property '${fullPath}' was added with value: ${formatValue(dkey.value)}`;
          case 'changed':
            return `Property '${fullPath}' was updated. From ${formatValue(dkey.value1)} to ${formatValue(dkey.value2)}`;
          case 'nested':
            return `${iter(dkey.children, fullPath)}`;
          default:
            throw new Error(`This type is not exist ${dkey.type}`);
        }
      });
    return result.join('\n').replace(/\n+/g, '\n');
  };
  return iter(data, '');
};

export default plain;
