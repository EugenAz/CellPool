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

    const intervalToken = setInterval(() => {
      setCellPool((currentCellPool: number[][]) =>
        generateNewCellPoolOnTick(currentCellPool)
      );
    }, 400);

    return () => {
      clearInterval(intervalToken);
    };
  }, []);

  return cellPool;
};
