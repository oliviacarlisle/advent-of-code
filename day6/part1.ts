import path from 'path';
import { fileURLToPath } from 'url';
import { getFileContents } from './utils';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const lines: string[] = await getFileContents(path.join(__dirname, 'input.txt'));

const grid: string[][] = lines.map((row) => row.split(''));

// get map dims
const rows = grid.length;
const columns = grid[0].length;

interface Guard {
  r: number,
  c: number,
  direction: {r: number, c: number}
}

//find guard position and direction
const [r, c]: [number, number] = findGuard(grid);
let guard: Guard = {
  r,
  c,
  direction: { r: -1, c: 0 }
}

const directionPatterns: Record<string, [number, number]> = {
  '-1,0': [0, 1],
  '0,1': [1, 0],
  '1,0': [0, -1],
  '0,-1': [-1, 0]
}

function findGuard(matrix: string[][]): [number, number] {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns; c++) {
      if (matrix[r][c] === '^') {
        return [r, c];
      }
    }
  }
  throw new Error('not found')
}

function isOOB(r: number, c: number): boolean {
  if (r < 0 || r > rows - 1) return true;
  if (c < 0 || c > columns - 1) return true;
  return false;
}

let steps = 0;

function move(guard: Guard, matrix: string[][]): boolean {
  const { r, c, direction } = guard;
  const [nextR, nextC]: [number, number] = [r + direction.r, c + direction.c];

  if (matrix[r][c] !== 'X') steps++;
  matrix[r][c] = 'X';
  
  if (isOOB(nextR, nextC)) {
    return false;
  }

  if (matrix[nextR][nextC] !== '#') {
    guard.r = nextR;
    guard.c = nextC;
  } else {
    const [nextRDir, nextCDir]: [number, number] = directionPatterns[`${direction.r},${direction.c}`]
    guard.direction = {r: nextRDir, c: nextCDir};
  }

  return true;
}

while(true) {
  if (!move(guard, grid)) break;
}

console.log(steps); // 5208
