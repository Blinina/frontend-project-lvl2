import _ from 'lodash';

const genDifferents = (file1, file2) => {

  const keys1 = _.union(_.keys(file1), _.keys(file2));
  const keys = _.sortBy(keys1);
  return keys.map((key) => {
    if (!_.has(file1, key)) {
      return {key, type:"added", value: file2[key]};
    }
    if (!_.has(file2, key)) {
      return {key, type:"removed", value:file1[key]};
    }
    if (file1[key] !== file2[key]) {
      return {key, type:"changed", value1:file1[key], value2:file2[key] };
    }
    return {key, type:"unchanged", value:file1[key]} ;
  });
};

export default genDifferents;

