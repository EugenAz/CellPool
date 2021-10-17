export enum CellState {
  ALIVE = 1,
  DEAD = 0,
}

export const useCellPool = () => {
  const cellPool = createRandomlyPopulatedCellPool();
  return cellPool;
};

const createRandomlyPopulatedCellPool = (): number[][] =>
  Array.from({ length: 50 }, () =>
    Array.from({ length: 50 }, () =>
      Math.round(Math.random() * 10) % 2 === 0
        ? CellState.DEAD
        : CellState.ALIVE
    )
  );
