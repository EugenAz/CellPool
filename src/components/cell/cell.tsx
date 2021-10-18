import { FC, memo } from "react";
import classNames from "classnames";

import { CellState } from "../../utils/cell-pool.utils";

import "./cell.css";

interface Props {
  state: CellState;
}

export const Cell: FC<Props> = memo(({ state }) => {
  return (
    <div
      className={classNames("pool__cell", {
        "pool__cell--alive": state === CellState.ALIVE,
      })}
    />
  );
});
