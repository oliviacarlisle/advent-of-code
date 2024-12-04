import { readFile } from 'node:fs/promises';

async function getFileContents(path: string) {
  try {
    const content = await readFile(path, 'utf8');
    return content.split('\n');
  } catch (err) {
    throw new Error('error reading file', err);
  }
}

const lines: string[] = await getFileContents('input.txt');

const list1: number[] = [];
const list2: number[] = [];

for (const line of lines) {
  const split = line.split(' ');
  const num1 = Number(split[0].trim());
  const num2 = Number(split[split.length - 1].trim());
  list1.push(num1);
  list2.push(num2);
}

// sort the lists
if (list1.length !== list2.length) throw new Error('mismatching list lengths');
if (list1.length === 0 || list2.length === 0) throw new Error('lists are empty');

list1.sort((a, b) => a - b);
list2.sort((a, b) => a - b);

let sumDistance = 0;

for (let i = 0; i < list1.length; i++) {
  const dist = Math.abs(list1[i] - list2[i]);
  sumDistance += dist;
}

console.log(sumDistance); // 1882714