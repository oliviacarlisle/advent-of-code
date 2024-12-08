import { readFile } from 'node:fs/promises';

export async function getFileContents(path: string): Promise<string[]> {
  try {
    const content = await readFile(path, 'utf8');
    const raw: string[] = content.split('\n');
    if (raw[raw.length - 1].trim() === '') raw.pop(); // remove last empty line
    return raw;
  } catch (err) {
    throw new Error('error reading file', err);
  }
}