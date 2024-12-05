import { readFile } from 'node:fs/promises';

export async function getFileContents(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, 'utf8');
    return content.split('\n');
  } catch (err) {
    throw new Error('error reading file', err);
  }
}