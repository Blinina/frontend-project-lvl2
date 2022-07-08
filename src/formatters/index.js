import plain from './plain.js';
import stylish from './stylish.js';
import formattJson from './json.js';

const formatt = (data, format = 'stylish') => {
  let result;
  switch (format) {
    case 'plain':
      result = plain(data);
      break;
    case 'stylish':
      result = stylish(data);
      break;
    case 'json':
      result = formattJson(data);
      break;
    default:
      throw new Error();
  }
  return result;
};
export default formatt;
