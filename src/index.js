import fs from 'fs'
import path  from 'path'
import genDifferents from '../src/getdiff.js'

const genDiff = (filepath1, filepath2) =>{

    const absolutPath1 = path.resolve(process.cwd(), '__fixtures__,', filepath1);
    const absolutPath2 = path.resolve(process.cwd(), '__fixtures__,', filepath2);


    const contentFile1  = fs.readFileSync(absolutPath1, 'utf8');
    const contentFile2  = fs.readFileSync(absolutPath2, 'utf8');

    const data1 = JSON.parse(contentFile1);
    const data2 = JSON.parse(contentFile2);

    const result = genDifferents(data1, data2);
    console.log(result);

    return result;

}
export default genDiff;