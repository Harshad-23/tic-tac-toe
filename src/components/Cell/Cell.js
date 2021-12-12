import "./Cell.css";
import react from "react";
import classNames from "classnames";

const Cell = (props) => {
  let isTie = false;
  if (props.winner === "Tie") {
    isTie = true;
  }
  let cellClasses = classNames({
    cell: true,
    winner: props.canHighlight,
    tie: isTie,
  });
  let bl0 = classNames({
    bl_0: true,
  });
  let br0 = classNames({
    br_0: true,
  });
  let bt0 = classNames({
    bt_0: true,
  });
  let bb0 = classNames({
    bb_0: true,
  });

  let cellContentClass = classNames({
    "cell-content": true,
    populated: props.value,
    winner: props.canHighlight,
  });

  let borderClass = "";
  if (props.index === 0) {
    borderClass = cellClasses + " " + bl0 + " " + bt0;
  }
  if (props.index === 1) {
    borderClass = cellClasses + " " + bt0;
  }
  if (props.index === 2) {
    borderClass = cellClasses + " " + bt0 + " " + br0;
  }
  if (props.index === 3) {
    borderClass = cellClasses + " " + bl0;
  }
  if (props.index === 4) {
    borderClass = cellClasses;
  }
  if (props.index === 5) {
    borderClass = cellClasses + " " + br0;
  }
  if (props.index === 6) {
    borderClass = cellClasses + " " + bl0 + " " + bb0;
  }
  if (props.index === 7) {
    borderClass = cellClasses + " " + bb0;
  }
  if (props.index === 8) {
    borderClass = cellClasses + " " + bb0 + " " + br0;
  }
  return (
    <react.StrictMode>
      <button className={borderClass + " cell-button"} onClick={props.onClick}>
        <span className={cellContentClass}>{props.value}</span>
      </button>
    </react.StrictMode>
  );
};

export default Cell;
