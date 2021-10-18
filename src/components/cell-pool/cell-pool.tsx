import { useCellPool } from "../../hooks/use-cell-pool";
import { Cell } from "../cell/cell";

import "./cell-pool.css";

export const CellPool = () => {
  const cellPool = useCellPool();

  return (
    <div className="pool">
      {cellPool.map((row, rowIndex) =>
        row.map((state, colIndex) => (
          <Cell key={`${rowIndex}_${colIndex}`} state={state} />
        ))
      )}
    </div>
  );
};
