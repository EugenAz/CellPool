import classNames from "classnames";

import "./cell-pool.css";

enum CellState {
  ALIVE = 1,
  DEAD = 0,
}

export const CellPool = () => {
  const cellPool: number[][] = [[]];

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
