import yaml from 'js-yaml';

const parse = (content, format) => {
  let result;
  if (format === '.json') {
    result = JSON.parse(content);
  }
  if (format === '.yml') {
    result = yaml.load(content);
  }
  return result;
};

export default parse;
