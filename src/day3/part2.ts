import { readFile } from 'node:fs/promises';

async function getFileContents(path: string) {
  try {
    return await readFile(path, 'utf8');
  } catch (err) {
    throw new Error('error reading file', err);
  }
}

const content: string = await getFileContents('input.txt');

const doPattern = /do\(\)/g;

const dontPattern = /don't\(\)/g;

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const allMatches: RegExpExecArray[] = [...content.matchAll(pattern)];

const dos: Set<number> = new Set([...content.matchAll(doPattern)].map(match => match.index));
const donts: Set<number> = new Set([...content.matchAll(dontPattern)].map(match => match.index));

const filteredMatches = allMatches.map((match) => ({
    num1: Number(match[1]),
    num2: Number(match[2]),
    index: match.index
}));

const isEnabled: Uint8Array = new Uint8Array(content.length).fill(1);

let enabled = true;
for (let i = 0; i < isEnabled.length; i++) {
  if (enabled && donts.has(i)) enabled = false;
  else if (!enabled && dos.has(i)) enabled = true;

  if (enabled) isEnabled[i] = 1;
  else isEnabled[i] = 0;
}

const total = filteredMatches.reduce((sum, { num1, num2, index }) => sum += num1 * num2 * isEnabled[index], 0);

console.log(total); // 75920122

// Tests below
// console.log(isEnabled[200]) // 1
// console.log(isEnabled[282]) // 0
// console.log(isEnabled[400]) // 0
// console.log(isEnabled[451]) // 1
// console.log(isEnabled[600]) // 1
// console.log(isEnabled[18153]) // 1
// console.log(isEnabled[18154]) // 1
// console.log(isEnabled[18260]) // 0
// console.log(isEnabled[18270]) // 0
