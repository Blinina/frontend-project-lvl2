import plain from './plain.js';
import stylish from './stylish.js';
import formattJson from './json.js';

const formatt = (data, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return plain(data);
    case 'stylish':
      return stylish(data);
    case 'json':
      return formattJson(data);
    default:
      throw new Error(`This format is not exist ${format}`);
  }
};
export default formatt;
