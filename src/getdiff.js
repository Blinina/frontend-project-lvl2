import _ from 'lodash';

const getTreeDiff = (file1, file2) => {
  const generalKeys = _.union(_.keys(file1), _.keys(file2));
  const keys = _.sortBy(generalKeys);
  const sortTypeKeys = keys.map((key) => {
    if (!_.has(file1, key)) {
      return { key, type: 'added', value: file2[key] };
    }
    if (!_.has(file2, key)) {
      return { key, type: 'removed', value: file1[key] };
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, type: 'nested', children: getTreeDiff(file1[key], file2[key]) };
    }
    if (file1[key] !== file2[key]) {
      return {
        key, type: 'changed', value1: file1[key], value2: file2[key],
      };
    }
    return { key, type: 'unchanged', value: file1[key] };
  });
  return sortTypeKeys;
};

export default getTreeDiff;
