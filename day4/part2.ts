import path from 'path';
import { fileURLToPath } from 'url';
import { getFileContents, checkAll } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

const matrix: string[][] = lines.map((line) => line.split(''));
matrix.pop(); // remove last blank row

console.log('matrix size', `${matrix.length} by ${matrix[0].length}`)

function isMas(a: string, b: string): boolean {
  return (a === 'M' && b === 'S' || a === 'S' && b === 'M');
}

let count = 0;

for (let r = 1; r < matrix.length - 1; r++) {
  for (let c = 1; c < matrix[0].length - 1; c++) {

    if (matrix[r][c] === 'A') {
      const topLeft = matrix[r - 1][c - 1];
      const bottomRight = matrix[r + 1][c + 1];

      const topRight = matrix[r - 1][c + 1];
      const bottomLeft = matrix[r + 1][c - 1];

      if (isMas(topLeft, bottomRight) && isMas(topRight, bottomLeft)) count++;
    }
  }
}

console.log(count); // 1908