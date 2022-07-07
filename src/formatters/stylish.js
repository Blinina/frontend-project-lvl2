import _ from 'lodash';


const getSpace = (defoltTab = 4, depth ) =>{
  const tab = ' ';
  const space = tab.repeat(defoltTab*depth - 2);
  return space;
};

  const formattedValue = (value, depth ) =>{
    const space = getSpace(4, depth+1);
      const spaceClose = getSpace (4, depth+1)
      if(!_.isObject(value)){
        return value;
      }
      else {
    
      const elements =  Object.entries(value);
      const result = elements.map(([key, elvalue]) => `${space}  ${key}: ${formattedValue(elvalue, depth+1)}\n${getSpace(spaceClose, depth+1)}}`)
     return `{\n ${result.join('\n')}`;
    
      }
    };



const stylish = (data) => {
  const iter = (node, depth) => {
    const space = getSpace(4, depth);
    const stylishArr = node.map((dkey) => {
      switch (dkey.type) {
        case 'nested': {
         return `${space}  ${dkey.key}: {\n${iter(dkey.children, depth + 1)}}`;
        }
        case 'unchanged': {
          return `${space}  ${dkey.key}: ${(dkey.value)}`;
        }
        case 'deleted': {
          return `${space}- ${dkey.key}: ${formattedValue(dkey.value)}`;
        }
        case 'added': {
          return `${space}+ ${dkey.key}: ${formattedValue(dkey.value)}`;
        }
        case 'changed': {
          return `${space}- ${dkey.key}: ${formattedValue(dkey.value1)}\n${space}+ ${dkey.key}: ${formattedValue(dkey.value2)}`;
          
        }
        default: {
          return null;
        }
      }
    });
    return stylishArr.join('\n');
  };
  const result = `{\n${iter(data, 1)}\n}`;
  return result;
};

export default stylish;
