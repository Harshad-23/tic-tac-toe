import "./ResultModal.css";
import react from "react";
import classNames from "classnames";
const ResultModal = (props) => {
  const ResultModalClasses = classNames({
    "modal-open": props.isGameOver,
  });

  const message =
    props.winner === "Tie" ? `It's a Tie!` : `${props.winner} is a Winner!`;

  return (
    <react.StrictMode>
      <div id="modal-overlay" className={ResultModalClasses}>
        <div id="game-result-modal">
          <div id="result-container">
            <div id="winner-container">
              <span>{message}</span>
            </div>
          </div>

          <div id="new-game-container">
            <button id="new-game-button" onClick={props.onNewGameClicked}>
              Start New Game
            </button>
          </div>
        </div>
      </div>
    </react.StrictMode>
  );
};

export default ResultModal;
