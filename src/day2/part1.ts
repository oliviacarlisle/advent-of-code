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

function isIncreasing(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] <= arr[i - 1]) return false;
  }
  return true;
}

function isDecreasing(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] >= arr[i - 1]) return false;
  }
  return true;
}

function validDiff(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

let safe = 0;

console.log('lines', lines.length)

// const lines = [
//   "7 6 4 2 1",
//   "1 2 7 8 9",
//   "9 7 6 2 1",
//   "1 3 2 4 5",
//   "8 6 4 4 1",
//   "1 3 6 7 9"
// ]


for (const line of lines) {
  if (line.length === 0) continue;
  const split: string[] = line.trim().split(' ');
  const nums: number[] = [];

  for (let str of split) {
    const number = Number(str.trim());
    nums.push(number);
  }

  if (validDiff(nums) && (isDecreasing(nums) || isIncreasing(nums))) {
    safe++;
  }
}

console.log('safe sequences:', safe); // 252