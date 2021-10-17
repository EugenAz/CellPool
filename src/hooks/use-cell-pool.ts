import { useEffect, useState } from "react";
import {
  createRandomlyPopulatedCellPool,
  generateNewCellPoolOnTick,
} from "../utils/cell-pool.utils";

export const useCellPool = () => {
  const [cellPool, setCellPool] = useState<number[][]>([]);

  useEffect(() => {
    const initialCellPool = createRandomlyPopulatedCellPool();
    setCellPool(initialCellPool);

    setInterval(() => {
      setCellPool((currentCellPool) =>
        generateNewCellPoolOnTick(currentCellPool)
      );
    }, 400);
  }, []);

  return cellPool;
};
