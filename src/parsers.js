import yaml from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'yml':
      return yaml.load(content);
    case 'json':
      return JSON.parse(content);
    default:
      throw new Error('Format not supported');
  }
};

export default parse;
