import path from 'path';
import { fileURLToPath } from 'url';
import { getFileContents } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));
if (lines[lines.length - 1].trim() === '') lines.pop(); // remove last empty line
// find the blank line that divides the sections
let divIdx: number = 0;

for (let i = 0; i < lines.length; i++) {
  if (lines[i] === '') {
    divIdx = i;
    break;
  } 
}

const rules: string[] = lines.slice(0, divIdx);
const sequences: string[] = lines.slice(divIdx + 1);

if (rules.length + sequences.length + 1 === lines.length) console.log('PASS');

let sum = 0;

// check each sequence
for (let i = 0; i < sequences.length; i++) {
  const seq: number[] = sequences[i].split(',').map((num: string) => Number(num));

  // index the sequence using a Map
  const seqIdx = new Map<number, number>(); 
  seq.forEach((num, i) => seqIdx.set(num, i)) // assume there are no duplicates

  // load the rules into a map
  const rulesPairs: number[][] = [];
  for (const rule of rules) {
    const [a, b]: number[] = rule.split('|').map((num: string) => Number(num));
    rulesPairs.push([a, b]);
  }

  let valid = true;
  for (const [a, b] of rulesPairs) {
    if (seqIdx.has(a) && seqIdx.has(b)) {
      if (seqIdx.get(b)! < seqIdx.get(a)!) {
        valid = false;
        break;
      }
    }
  }

  if (valid) {
    sum += (seq[Math.floor(seq.length / 2)])
  }
}

console.log(sum); // 6384

