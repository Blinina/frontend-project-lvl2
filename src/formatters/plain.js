import _ from 'lodash';

const plain = (data) => {
  const formatValue = (value) => {
    if (_.isObject(value)) {
      return '[complex value]';
    }
    if (value === null) {
      return null;
    }

    return _.isString(value) ? `'${value}'` : value;
  };

  const iter = (node, acc) => {
    const result = node.flatMap((dkey) => {
      const fullPath = (acc === '') ? `${dkey.key}` : `${acc}.${dkey.key}`;

      if (dkey.type === 'removed') {
        return `Property '${fullPath}' was removed`;
      }
      if (dkey.type === 'added') {
        return `Property '${fullPath}' was added with value: ${formatValue(dkey.value)}`;
      }
      if (dkey.type === 'changed') {
        return `Property '${fullPath}' was updated. From ${formatValue(dkey.value1)} to ${formatValue(dkey.value2)}`;
      }
      if (dkey.type === 'nested') {
        return `${iter(dkey.children, fullPath)}`;
      }
    });
    return result.join('\n').replace(/\n+/g, '\n');
  };
  return iter(data, '');
};

export default plain;
