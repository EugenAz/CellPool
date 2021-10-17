export enum CellState {
  ALIVE = 1,
  DEAD = 0,
}

export const createRandomlyPopulatedCellPool = (): number[][] =>
  Array.from({ length: 50 }, () =>
    Array.from({ length: 50 }, () =>
      Math.round(Math.random() * 10) % 2 === 0
        ? CellState.DEAD
        : CellState.ALIVE
    )
  );

export const generateNewCellPoolOnTick = (cellPool: number[][]): number[][] => {
  const newCellPool: number[][] = [];

  for (let i = 0; i < 50; i++) {
    newCellPool[i] = newCellPool[i] ?? [];

    for (let j = 0; j < 50; j++) {
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

  if (cellPool[i - 1]) {
    amount +=
      (cellPool[i - 1][j - 1] ?? 0) +
      (cellPool[i - 1][j] ?? 0) +
      (cellPool[i - 1][j + 1] ?? 0);
  }

  amount += (cellPool[i][j - 1] ?? 0) + (cellPool[i][j + 1] ?? 0);

  if (cellPool[i + 1]) {
    amount +=
      (cellPool[i + 1][j - 1] ?? 0) +
      (cellPool[i + 1][j] ?? 0) +
      (cellPool[i + 1][j + 1] ?? 0);
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
