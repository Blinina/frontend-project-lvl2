import fs from 'fs'
import path  from 'path'
import genDifferents from '../src/getdiff.js'
import parse from '../src/parsers.js'
import formatt from '../src/formatters/index.js'

const genDiff = (filepath1, filepath2,  outputformat) =>{

    const absolutPath1 = path.resolve(process.cwd(), '__fixtures__', filepath1);
    const absolutPath2 = path.resolve(process.cwd(), '__fixtures__', filepath2);

    const extnamefile1 = path.extname(absolutPath1);
    const extnamefile2 = path.extname(absolutPath2);

    const contentFile1  = fs.readFileSync(absolutPath1, 'utf8');
    const contentFile2  = fs.readFileSync(absolutPath2, 'utf8');
 
    const data1 =  parse(contentFile1, extnamefile1);
    const data2 =  parse(contentFile2, extnamefile2);
    //console.log(data2);
    const result = genDifferents(data1, data2);

    return formatt(result, outputformat);

}
export default genDiff;