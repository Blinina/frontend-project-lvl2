import plain from '../formatters/plain.js' 
import stylish from '../formatters/stylish.js'
import formattJson from '../formatters/json.js'

const formatt = (data, format = 'stylish') =>{
    let result;
switch (format) {
case 'plain':
 result =  plain(data);
 break;
case 'stylish':
 result = stylish(data);
 break;

case 'json':
 result = formattJson(data);
 break;

// default:
//    throw new Error;
};
return result;
};
export default formatt;