import genDiff from '../src/index.js';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const rightPlain = readFile('rightPlain.txt');
const rightStylish = readFile('rightStylish.txt');
const rightJson = readFile('rightJSON.txt');

test.each(['yml', 'json'])('genDiff', (extention) => {
    const path1 = getFixturePath(`file1.${extention}`);
    const path2 = getFixturePath(`file2.${extention}`);
    const testPlain = genDiff(path1, path2, 'plain');
    expect(testPlain).toEqual(rightPlain);
    const testStylish = genDiff(path1, path2, 'stylish');
    expect(testStylish).toEqual(rightStylish);
    const testJSON = genDiff(path1, path2, 'json');
    expect(testJSON).toEqual(rightJson);
});