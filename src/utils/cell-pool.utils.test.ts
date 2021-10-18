import {
  CellState,
  createRandomlyPopulatedCellPool,
  generateNewCellPoolOnTick,
  matrixSize,
} from "./cell-pool.utils";

describe("Cell Pool Utils", () => {
  it("should create a cell pool", () => {
    const cellPool = createRandomlyPopulatedCellPool();

    expect(cellPool.length).toBe(matrixSize);
    cellPool.map((row) => {
      expect(row.length).toBe(matrixSize);
    });
  });

  it("should populate a cell pool", () => {
    const cellPool = createRandomlyPopulatedCellPool();

    const randomI = Math.round(Math.random() * (matrixSize - 1));
    const randomJ = Math.round(Math.random() * (matrixSize - 1));

    expect([CellState.ALIVE, CellState.DEAD]).toContain(
      cellPool[randomI][randomJ]
    );
  });

  describe("on tick", () => {
    it("should kill a cell with no live neighbours", () => {
      const cellPool = getCleanCellPool();
      cellPool[0][0] = CellState.ALIVE;
      const newCellPool = generateNewCellPoolOnTick(cellPool);
      expect(newCellPool[0][0]).toBe(CellState.DEAD);
    });

    it("should kill a cell with only 1 live neighbours", () => {
      const cellPool = getCleanCellPool();
      cellPool[0][0] = cellPool[0][1] = CellState.ALIVE;
      const newCellPool = generateNewCellPoolOnTick(cellPool);
      expect(newCellPool[0][0]).toBe(CellState.DEAD);
    });

    it("should keep alive a cell with 2 live neighbours", () => {
      const cellPool = getCleanCellPool();
      cellPool[0][0] = cellPool[0][1] = cellPool[1][0] = CellState.ALIVE;
      const newCellPool = generateNewCellPoolOnTick(cellPool);
      expect(newCellPool[0][0]).toBe(CellState.ALIVE);
    });

    it("should kill a cell with more than 3 live neighbours", () => {
      const cellPool = getCleanCellPool();
      cellPool[1][1] =
        cellPool[0][1] =
        cellPool[0][2] =
        cellPool[1][2] =
        cellPool[2][1] =
          CellState.ALIVE;
      const newCellPool = generateNewCellPoolOnTick(cellPool);
      expect(newCellPool[1][1]).toBe(CellState.DEAD);
    });

    it("should keep alive a cell with 3 live neighbours", () => {
      const cellPool = getCleanCellPool();
      cellPool[1][1] =
        cellPool[0][1] =
        cellPool[0][2] =
        cellPool[1][2] =
          CellState.ALIVE;
      const newCellPool = generateNewCellPoolOnTick(cellPool);
      expect(newCellPool[1][1]).toBe(CellState.ALIVE);
    });

    it("should resurrect a cell with 3 live neighbours", () => {
      const cellPool = getCleanCellPool();
      cellPool[0][0] = CellState.DEAD;
      cellPool[0][1] = cellPool[1][0] = cellPool[1][1] = CellState.ALIVE;

      const newCellPool = generateNewCellPoolOnTick(cellPool);

      expect(newCellPool[0][0]).toBe(CellState.ALIVE);
    });
  });
});

const getCleanCellPool = () =>
  Array.from({ length: matrixSize }, () =>
    Array.from({ length: matrixSize }, () => CellState.DEAD)
  );
