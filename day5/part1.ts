import path from 'path';
import { fileURLToPath } from 'url';
import { findDivIdx, getFileContents, isSeqValid } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

// find the blank line that divides the sections
const divIdx = findDivIdx(lines);

// load the rules and sequences into memory
const rules: number[][] = lines.slice(0, divIdx).map((line: string) => line.split('|').map((num: string) => Number(num)));
const sequences: number[][] = lines.slice(divIdx + 1).map((line: string) => line.split(',').map((num: string) => Number(num)));

if (rules.length + sequences.length + 1 === lines.length) console.log('PASS');

let sum = 0;
// check each sequence
for (const seq of sequences) {
  if (isSeqValid(seq, rules)) {
    sum += (seq[Math.floor(seq.length / 2)]) // add the middle element
  }
}

console.log(sum); // 6384

