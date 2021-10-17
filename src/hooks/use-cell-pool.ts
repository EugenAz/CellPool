import { createRandomlyPopulatedCellPool } from "../utils/cell-pool.utils";

export const useCellPool = () => {
  const cellPool = createRandomlyPopulatedCellPool();
  return cellPool;
};
