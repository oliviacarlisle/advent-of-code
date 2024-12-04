import path from 'path';
import { fileURLToPath } from 'url';
import { getFileContents, checkAll } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

const matrix: string[][] = lines.map((line) => line.split(''));
matrix.pop(); // remove last blank row

console.log('matrix size', `${matrix.length} by ${matrix[0].length}`)

const WORD = 'XMAS';

let count = 0;

const wordReverse = WORD.split('').reverse().join('');

for (let r = 0; r < matrix.length; r++) {
  for (let c = 0; c < matrix[0].length; c++) {
    count += checkAll(matrix, WORD, r, c);
    count += checkAll(matrix, wordReverse, r, c);
  }
}

console.log(count); // 2370