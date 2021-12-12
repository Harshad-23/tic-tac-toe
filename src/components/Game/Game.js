import "./Game.css";
import react, { useEffect, useState } from "react";
import Board from "../Board/Board";
import ResultModal from "../ResultModal/ResultModal";
import { calculateWinner, cpuMoves } from "../../Utils/WinnerCalculator";

const Game = () => {
  const [cellValues, setcellValues] = useState(Array(9).fill(""));
  const initialvalues = {
    Player1: "Player 1",
    Player2: "Player 2",
  };
  const [playerValue, setPlayerValue] = useState(initialvalues); //player names
  const [xIsNext, setxISNext] = useState(true); //check the turn of X
  const [isPlay, setIsPlay] = useState(false); //to confirm playing choices
  const [isGameOver, setIsGameOver] = useState(false);
  const isCellEmpty = (cellIndex) => cellValues[cellIndex] === "";
  const [winner, setWinner] = useState();
  const [winningCombination, setWinningCombination] = useState();
  const [noOfTrunsLeft, setnoOfTrunsLeft] = useState(9);
  const [PlayerTurn, setPlayerTurn] = useState(playerValue.Player1); //to display next player's turn
  const [p1Count, setP1Count] = useState(0); //player1 count
  const [p2Count, setP2Count] = useState(0); //player2 count
  const [tieCount, setTieCount] = useState(0); //tie count
  const [isCPU, setIsCPU] = useState(false); // enable player vs cpu (if true)
  const [isMute, setIsMute] = useState(false); //mute sounds
  const [isChecked, setIsChecked] = useState(false); //cpu checkbox checked or not
  const [volumeclass, setvolumeclass] = useState("fas fa-volume-up"); //set fa icon volume class
  var moveAudio = new Audio(process.env.PUBLIC_URL + "/sounds/jump.wav"); //moves sfx
  var winAudio = new Audio(process.env.PUBLIC_URL + "/sounds/win.wav"); //win sfx
  var lostAudio = new Audio(process.env.PUBLIC_URL + "/sounds/lost.wav"); //tie sfx

  const restartGame = () => {
    setxISNext(true);
    setcellValues(["", "", "", "", "", "", "", "", ""]);
    setIsGameOver(false);
    setnoOfTrunsLeft(9);
    setWinner(undefined);
    setWinningCombination([]);
    setPlayerTurn(playerValue.Player1);
  };

  useEffect(() => {
    if (isCPU) {
      setTimeout(function () {
        //check cpu turn by filled cells % 2
        //1 is cpu turn, 0 is user turn
        //(odd number mod by 2 always gives value 1)
        const isCPUTurn =
          cellValues.filter((cells) => cells !== "").length % 2 === 1;

        if (isCPUTurn && !winner) {
          const emptyIndexes = cellValues
            .map((cell, index) => (cell === "" ? index : null))
            .filter((val) => val !== null);

          //random number generation
          const randomIndex =
            emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

          const newCellValues = [...cellValues];
          // cpuMoves(newCellValues);

          const nextMoves = cpuMoves(newCellValues);
          //const moveIndex = nextMoves ? undefined : randomIndex;
          let moveIndex;
          if (nextMoves === undefined) {
            moveIndex = randomIndex;
          } else {
            moveIndex = nextMoves;
          }
          //assign value to cell
          newCellValues[moveIndex] = "O";

          const newNoOfTrunsLeft = noOfTrunsLeft - 1;
          //Calculate result
          const calcResult = calculateWinner(
            newCellValues,
            newNoOfTrunsLeft,
            moveIndex
          );

          let winnerName = "";
          let winCount = 0;
          if (calcResult.winner === "X") {
            winnerName = playerValue.Player1;
            winCount = p1Count;
            winCount = winCount + 1;
            setP1Count(winCount);
            if (!isMute) {
              winAudio.play();
            }
          } else if (calcResult.winner === "O") {
            winnerName = playerValue.Player2;
            winCount = p2Count;
            winCount = winCount + 1;
            setP2Count(winCount);
            if (!isMute) {
              winAudio.play();
            }
          } else if (calcResult.winner === "Tie") {
            winnerName = "Tie";
            winCount = tieCount;
            winCount = winCount + 1;
            setTieCount(winCount);
            if (!isMute) {
              lostAudio.play();
            }
          }

          setxISNext(!xIsNext);
          setcellValues([...newCellValues]);
          setIsGameOver(calcResult.hasResult);
          setnoOfTrunsLeft(newNoOfTrunsLeft);
          setWinner(winnerName);
          setWinningCombination(calcResult.winningCombination);
          setPlayerTurn(xIsNext ? playerValue.Player2 : playerValue.Player1);
          if (!isMute) {
            moveAudio.play();
          }
        }
      }, 300);
    }
  }, [cellValues]);

  const cellClicked = (cellIndex) => {
    if (isCellEmpty(cellIndex)) {
      //store previous cell values
      const newCellValues = [...cellValues];
      //assign value to clicked cell
      newCellValues[cellIndex] = xIsNext ? "X" : "O";
      const newNoOfTrunsLeft = noOfTrunsLeft - 1;
      //Calculate result
      const calcResult = calculateWinner(
        newCellValues,
        newNoOfTrunsLeft,
        cellIndex
      );
      let winnerName = "";
      let winCount = 0;
      if (calcResult.winner === "X") {
        winnerName = playerValue.Player1;
        winCount = p1Count;
        winCount = winCount + 1;
        setP1Count(winCount);
        if (!isMute) {
          winAudio.play();
        }
      } else if (calcResult.winner === "O") {
        winnerName = playerValue.Player2;
        winCount = p2Count;
        winCount = winCount + 1;
        setP2Count(winCount);
        if (!isMute) {
          winAudio.play();
        }
      } else if (calcResult.winner === "Tie") {
        winnerName = "Tie";
        winCount = tieCount;
        winCount = winCount + 1;
        setTieCount(winCount);
        if (!isMute) {
          lostAudio.play();
        }
      }

      setxISNext(!xIsNext);
      setcellValues(newCellValues);
      setIsGameOver(calcResult.hasResult);
      setnoOfTrunsLeft(newNoOfTrunsLeft);
      //setWinner(calcResult.winner);
      setWinner(winnerName);
      setWinningCombination(calcResult.winningCombination);
      setPlayerTurn(xIsNext ? playerValue.Player2 : playerValue.Player1);
      if (!isMute) {
        moveAudio.play();
      }
    }
  };

  //on input text chnaged
  const onValueChange = (e) => {
    setPlayerValue({
      ...playerValue,
      [e.target.name]: e.target.value,
    });
  };

  //checkbox changes related to cpu's turn
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    setIsCPU(!isChecked);
  };

  const setPlay = (e) => {
    setIsPlay(true);
    if (isChecked) {
      setPlayerValue({
        Player1: playerValue.Player1,
        Player2: "CPU",
      });
    }
    //reassign player turn
    setPlayerTurn(playerValue.Player1);
  };

  //mute all sounds
  const muteSound = () => {
    setIsMute(isMute ? false : true);
    setvolumeclass(isMute ? "fas fa-volume-up" : "fas fa-volume-mute");
  };

  if (!isPlay) {
    return (
      <>
        <form autoComplete="off" className="form">
          <h1>Tic Tac Toe</h1>
          <input
            onChange={(e) => onValueChange(e)}
            className="input"
            maxLength="10"
            name="Player1"
            placeholder="Enter Player 1 Name"
          />
          <input
            onChange={(e) => onValueChange(e)}
            className="input"
            maxLength="10"
            name="Player2"
            disabled={isChecked}
            placeholder="Enter Player 2 Name"
          />

          <div className="row-h">
            <div className="col-2">
              <input
                id="checkbox"
                type="checkbox"
                checked={isChecked}
                onChange={() => handleOnChange()}
              />
              <label htmlFor="checkbox"></label>
            </div>
            <div className="col-10">
              <button
                className="button"
                style={{ width: "80%" }}
                type="submit"
                onClick={(e) => setPlay(e)}
              >
                Let's Play
              </button>
            </div>
          </div>
        </form>
      </>
    );
  }
  return (
    <react.StrictMode>
      <div>
        <div className="row">
          <div className="column"></div>
          <div className="column">
            <h1>Tic Tac Toe</h1>
          </div>
          <div className="column">
            <div className="icon-column">
              <p>
                <i className={volumeclass} onClick={() => muteSound()}></i>
              </p>
            </div>
            <div className="icon-column">
              <p>
                <i
                  className="fas fa-redo-alt"
                  onClick={() => window.location.reload()}
                ></i>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div id="game" className="game">
        <div className="row">
          <div className="column" style={{ textAlign: "right" }}>
            <h3>{playerValue.Player1} (X)</h3>
            <p>{p1Count}</p>
          </div>
          <div className="column" style={{ textAlign: "center" }}>
            <h3>Tie</h3>
            <p>{tieCount}</p>
          </div>
          <div className="column" style={{ textAlign: "left" }}>
            <h3>{playerValue.Player2} (O)</h3>
            <p>{p2Count}</p>
          </div>
        </div>
        <div className="row">
          <Board
            cellValues={cellValues}
            winningCombination={winningCombination}
            cellClicked={cellClicked}
            winner={winner}
          />
          <h3 style={{ textAlign: "center" }}>Next Turn: {PlayerTurn}</h3>
        </div>
      </div>
      <ResultModal
        isGameOver={isGameOver}
        winner={winner}
        onNewGameClicked={restartGame}
      />
    </react.StrictMode>
  );
};

export default Game;
