import "./Board.css";
import react from "react";
import Cell from "../Cell/Cell";

const Board = (props) => {
  const cells = props.cellValues.map((value, index) => {
    const canHighlight =
      props.winningCombination && props.winningCombination.indexOf(index) >= 0;
    return (
      <Cell
        key={index}
        value={value}
        index={index}
        canHighlight={canHighlight}
        winner={props.winner}
        onClick={() => props.cellClicked(index)}
      />
    );
  });

  return (
    <react.StrictMode>
      <div id="board">{cells}</div>
    </react.StrictMode>
  );
};

export default Board;
