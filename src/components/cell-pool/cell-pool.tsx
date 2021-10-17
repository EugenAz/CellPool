import classNames from "classnames";
import { useCellPool } from "../../hooks/use-cell-pool";
import { CellState } from "../../utils/cell-pool.utils";

import "./cell-pool.css";

export const CellPool = () => {
  const cellPool = useCellPool();

  return (
    <div className="pool">
      {cellPool.map((row, rowIndex) =>
        row.map((state, colIndex) => (
          <div
            className={classNames("pool__cell", {
              "pool__cell--alive": state === CellState.ALIVE,
            })}
            key={`${rowIndex}${colIndex}`}
          >
            &nbsp;
          </div>
        ))
      )}
    </div>
  );
};
