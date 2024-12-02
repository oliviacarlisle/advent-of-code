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

const list2Counts = new Map<number, number>();

for (const num of list2) {
  if (!list2Counts.has(num)) list2Counts.set(num, 0);
  const count = list2Counts.get(num)!;
  list2Counts.set(num, count + 1);
}

let score = 0;

for (const num of list1) {
  score += num * (list2Counts.get(num) ?? 0);
}

console.log(score); // 19437052
