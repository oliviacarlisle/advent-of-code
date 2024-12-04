import { readFile } from 'node:fs/promises';

export async function getFileContents(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, 'utf8');
    return content.split('\n');
  } catch (err) {
    throw new Error('error reading file', err);
  }
}

export function checkLeftToRight(matrix: string[][], word: string, r: number, c: number): number {
  const offset = word.length - 1; // i can be at most word.length - 1
  if (c + offset >= matrix[0].length) return 0; // out of bounds check

  let valid = 1;

  for (let i = 0; i < word.length; i++) {
    if (matrix[r][c + i] !== word[i]) {
      valid = 0;
      break;
    }
  }

  return valid;
}

export function checkTopToBottom(matrix: string[][], word: string, r: number, c: number): number {
  const offset = word.length - 1; // i can be at most word.length - 1
  if (r + offset >= matrix.length) return 0; // out of bounds check

  let valid = 1;

  for (let i = 0; i < word.length; i++) {
    if (matrix[r + i][c] !== word[i]) {
      valid = 0;
      break;
    }
  }
  
  return valid;
}

export function checkTopLeftToBottomRight(matrix: string[][], word: string, r: number, c: number): number {
  const offset = word.length - 1; // i can be at most word.length - 1
  if (r + offset >= matrix.length) return 0; // out of bounds check
  if (c + offset >= matrix[0].length) return 0; // out of bounds check

  let valid = 1;

  for (let i = 0; i < word.length; i++) {
    if (matrix[r + i][c + i] !== word[i]) {
      valid = 0;
      break;
    }
  }
  
  return valid;
}

export function checkTopRightToBottomLeft(matrix: string[][], word: string, r: number, c: number): number {
  const offset = word.length - 1; // i can be at most word.length - 1
  if (r + offset >= matrix.length) return 0; // out of bounds check
  if (c - offset < 0) return 0; // out of bounds check

  let valid = 1;

  for (let i = 0; i < word.length; i++) {
    if (matrix[r + i][c - i] !== word[i]) {
      valid = 0;
      break;
    }
  }

  return valid;
}

export function checkAll(matrix: string[][], word: string, r: number, c: number): number {
  return checkLeftToRight(matrix, word, r, c)
   + checkTopToBottom(matrix, word, r, c)
   + checkTopLeftToBottomRight(matrix, word, r, c)
   + checkTopRightToBottomLeft(matrix, word, r, c)
}