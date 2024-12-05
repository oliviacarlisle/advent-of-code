import { readFile } from 'node:fs/promises';

export async function getFileContents(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, 'utf8');
    const raw: string[] = content.split('\n');
    if (raw[raw.length - 1].trim() === '') raw.pop(); // remove last empty line
    return raw;
  } catch (err) {
    throw new Error('error reading file', err);
  }
}

// find the blank line that divides the sections
export function findDivIdx(lines: string[]) {
  let divIdx: number = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i] === '') {
      divIdx = i;
      break;
    } 
  }
  return divIdx;
}

export function isSeqValid(sequence: number[], rules: number[][]) {
  // index the sequence using a Map
  const seqIdx = new Map<number, number>(); 
  sequence.forEach((num, i) => seqIdx.set(num, i)) // assume there are no duplicates

  let valid = true;
  for (const [a, b] of rules) {
    if (seqIdx.has(a) && seqIdx.has(b)) {
      if (seqIdx.get(b)! < seqIdx.get(a)!) {
        valid = false;
        break;
      }
    }
  }

  return valid;
}

export function fixSeq(seq: number[], seqIdx: Map<number, number>, rule: number[]): number[] {
  const [a, b] = rule;
  const aIndex: number = seq.indexOf(a);
  const bIndex: number = seq.indexOf(b);
  seq[aIndex] = b;
  seq[bIndex] = a;

  seqIdx.clear();
  seq.forEach((num, i) => seqIdx.set(num, i)) // assume there are no duplicates
  return seq;
}

export function getBrokenRules(seq: number[], seqIdx: Map<number, number>, rules: number[][]): number[][] {
  const brokenRules: number[][] = []; // keep track of the broken rules

  for (const [a, b] of rules) {
    if (seqIdx.has(a) && seqIdx.has(b)) {
      if (seqIdx.get(b)! < seqIdx.get(a)!) {
        brokenRules.push([a, b]);
      }
    }
  }
  return brokenRules;
}

