import { readFile } from 'node:fs/promises';

export async function getFileContents(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, 'utf8');
    return content.split('\n');
  } catch (err) {
    throw new Error('error reading file', err);
  }
}

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

export function isMonotonic(arr: number[]) {
  return isDecreasing(arr) || isIncreasing(arr);
}

export function validDiff(arr: number[]) {
  for (let i = 1; i < arr.length; i++) {
    const diff = Math.abs(arr[i] - arr[i - 1]);
    if (diff < 1 || diff > 3) return false;
  }
  return true;
}

export function convertToNumArray(line: string) {
  const split: string[] = line.trim().split(' ');
  const nums: number[] = [];
  
  for (let str of split) {
    if (str === '' || str === ' ') continue;
    const number = Number(str.trim());
    nums.push(number);
  }
  return nums;
}

