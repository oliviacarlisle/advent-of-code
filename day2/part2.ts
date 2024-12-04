import path from 'path';
import { fileURLToPath } from 'url';
import { getFileContents, validDiff, isMonotonic, convertToNumArray } from './utils';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

let safeCount = 0;

for (const line of lines) {
  if (line.length === 0) continue;

  const nums: number[] = convertToNumArray(line);

  // check the main sequence
  if (validDiff(nums) && isMonotonic(nums)) {
    safeCount++;
    continue;
  }

  // check the alternate sequences
  for (let i = 0; i < nums.length; i++) {
    const seq: number[] = [...nums.slice(0, i), ...nums.slice(i + 1)];
    if (validDiff(seq) && isMonotonic(seq)) {
      safeCount++;
      break;
    }
  }
}

console.log('safe sequences:', safeCount); // 324