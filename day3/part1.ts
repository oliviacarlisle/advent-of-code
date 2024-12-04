import { readFile } from 'node:fs/promises';

async function getFileContents(path: string) {
  try {
    return await readFile(path, 'utf8');
  } catch (err) {
    throw new Error('error reading file', err);
  }
}

const content: string = await getFileContents('input.txt');

const pattern = /mul\((\d{1,3}),(\d{1,3})\)/g;

const allMatches: RegExpExecArray[] = [...content.matchAll(pattern)];

const total = allMatches.reduce((sum, match) => sum += Number(match[1]) * Number(match[2]), 0);

console.log(total); // 156388521



