export enum CellState {
  ALIVE = 1,
  DEAD = 0,
}

export const matrixSize = 50;

export const createRandomlyPopulatedCellPool = (): number[][] =>
  Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () =>
      Math.round(Math.random() * 10) % 2 === 0
        ? CellState.DEAD
        : CellState.ALIVE
    )
  );

export const generateNewCellPoolOnTick = (cellPool: number[][]): number[][] => {
  const newCellPool: number[][] = [];

  for (let i = 0; i < cellPool.length; i++) {
    newCellPool[i] = newCellPool[i] ?? [];

    for (let j = 0; j < cellPool.length; j++) {
      const amountOfLiveNeighbours = getAmountOfLiveNeighbours(cellPool, i, j);

      newCellPool[i][j] = getNewCellState(
        cellPool[i][j],
        amountOfLiveNeighbours
      );
    }
  }

  return newCellPool;
};

const getAmountOfLiveNeighbours = (
  cellPool: number[][],
  i: number,
  j: number
): number => {
  let amount = 0;
  for (let ii = -1; ii <= 1; ii++) {
    if (cellPool[i + ii] === undefined) {
      continue;
    }

    for (let jj = -1; jj <= 1; jj++) {
      if (cellPool[i + ii][j + jj] === undefined || (ii === 0 && jj === 0)) {
        continue;
      }

      amount += cellPool[i + ii][j + jj];
    }
  }
  return amount;
};

const getNewCellState = (
  cellState: CellState,
  amountOfLiveNeighbours: number
): CellState => {
  if (cellState === CellState.ALIVE) {
    if (amountOfLiveNeighbours < 2 || amountOfLiveNeighbours > 3) {
      return CellState.DEAD;
    } else {
      return cellState;
    }
  } else if (amountOfLiveNeighbours === 3) {
    return CellState.ALIVE;
  } else {
    return cellState;
  }
};
