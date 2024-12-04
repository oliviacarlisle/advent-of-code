import path from 'path';
import { fileURLToPath } from 'url';
import { getFileContents, validDiff, isMonotonic, convertToNumArray } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

let safeCount = 0;

for (const line of lines) {
  if (line.length === 0) continue;
  const nums: number[] = convertToNumArray(line);

  if (validDiff(nums) && isMonotonic(nums)) {
    safeCount++;
  }
}

console.log('safe sequences:', safeCount); // 252