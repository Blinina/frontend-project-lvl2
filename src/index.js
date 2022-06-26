import fs from 'fs'
import {resolve}  from 'path'
import genDifferents from '../src/index.js'

const genDiff = (filepath1, filepath2) =>{

    const absolutPath1 = resolve(filepath1);
    const absolutPath2 = resolve(filepath2);


    const contentFile1  = fs.readFileSync(absolutPath1, 'utf8');
    const contentFile2  = fs.readFileSync(absolutPath2, 'utf8');

    const date1 = JSON.parse(contentFile1);
    const date2 = JSON.parse(contentFile2);

    const result = genDifferents(date1, date2);
    return result;
    

}
export default genDiff;