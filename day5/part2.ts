import path from 'path';
import { fileURLToPath } from 'url';
import { findDivIdx, getFileContents, isSeqValid, getBrokenRules, fixSeq } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

// find the blank line that divides the sections
const divIdx = findDivIdx(lines);

// load the rules and sequences into memory
const rules: number[][] = lines.slice(0, divIdx).map((line: string) => line.split('|').map((num: string) => Number(num)));
const sequences: number[][] = lines.slice(divIdx + 1).map((line: string) => line.split(',').map((num: string) => Number(num)));

if (rules.length + sequences.length + 1 === lines.length) console.log('PASS');

const invalidSeqs: number[][] = [];

// find the invalid sequences
for (const seq of sequences) {
  if (!isSeqValid(seq, rules)) invalidSeqs.push(seq);
}

const fixedSeqs: number[][] = [];

// fix invalid sequences
for (const sequence of invalidSeqs) {
  // index the sequence using a Map
  const seq = [...sequence];
  const seqIdx = new Map<number, number>(); 
  seq.forEach((num, i) => seqIdx.set(num, i)) // assume there are no duplicates

  let brokenRules: number[][] = getBrokenRules(seq, seqIdx, rules);
  while (brokenRules.length) {
    fixSeq(seq, seqIdx, brokenRules[0]);
    brokenRules = getBrokenRules(seq, seqIdx, rules);
  }

  fixedSeqs.push(seq);
  
}

console.log(fixedSeqs.every((seq: number[]) => isSeqValid(seq, rules)) ? 'PASS' : 'FAIL');

// sum up the middle elements
let fixedSum = 0;
for (const fixed of fixedSeqs) {
  fixedSum += fixed[Math.floor(fixed.length / 2)];
}

console.log(fixedSum); // 5353


  



