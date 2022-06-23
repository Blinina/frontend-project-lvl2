import _ from 'lodash';

const genDiff = (filepath1, filepath2) => {
  let result = '';
  const keys1 = _.union(_.keys(filepath1), _.keys(filepath2));
  const keys = _.sortBy(keys1);
  result = keys.map((key) => {
    if (Object.hasOwn(filepath1, String(key)) && !Object.hasOwn(filepath2, String(key))) {
      return `- ${key}: ${filepath1[key]}`;
    }
    if (!Object.hasOwn(filepath1, String(key)) && Object.hasOwn(filepath2, String(key))) {
      return `+ ${key}: ${filepath2[key]}`;
    }
    if (filepath1[key] === filepath2[key]) {
      return `${key}: ${filepath2[key]}`;
    }
    if (filepath1[key] !== filepath2[key]) {
      return `- ${key}: ${filepath1[key]}\n+ ${key}: ${filepath2[key]}`;
    }
  });
  return result.join('\n');
};

export default genDiff;
