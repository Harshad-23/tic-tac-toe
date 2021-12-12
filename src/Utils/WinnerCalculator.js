////old logic winning matrix
// const winningMatrix = {
//   0: [
//     [1, 2],
//     [3, 6],
//     [4, 8],
//   ],
//   1: [
//     [0, 2],
//     [4, 7],
//   ],
//   2: [
//     [0, 1],
//     [5, 8],
//     [4, 6],
//   ],
//   3: [
//     [0, 6],
//     [4, 5],
//   ],
//   4: [
//     [2, 6],
//     [3, 5],
//     [1, 7],
//     [0, 8],
//   ],
//   5: [
//     [3, 4],
//     [2, 8],
//   ],
//   6: [
//     [7, 8],
//     [0, 3],
//     [2, 4],
//   ],
//   7: [
//     [6, 8],
//     [1, 4],
//   ],
//   8: [
//     [6, 7],
//     [2, 5],
//     [0, 4],
//   ],
// };

//winning combinations
const WinningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//function to calculate CPU moves
export const cpuMoves = (cellvalues) => {
  const cells = cellvalues;
  //find winning combo line
  const linesThatAre = (a, b, c) => {
    return WinningLines.filter((cellIndexes) => {
      const newCellValues = cellIndexes.map((index) => cells[index]);

      return (
        JSON.stringify([a, b, c].sort()) ===
        JSON.stringify(newCellValues.sort())
      );
    });
  };

  //try to win
  const linesToWin = linesThatAre("O", "O", "");
  if (linesToWin.length > 0) {
    const winIndex = linesToWin[0].filter((index) => cells[index] === "")[0];
    return winIndex;
  }

  //try to block opponent's move
  const linesToBlock = linesThatAre("X", "X", "");
  if (linesToBlock.length > 0) {
    const blockIndex = linesToBlock[0].filter(
      (index) => cells[index] === ""
    )[0];
    return blockIndex;
  }

  //try move for win
  const linesToContinue = linesThatAre("O", "", "");
  if (linesToContinue.length > 0) {
    const continueIndex = linesToContinue[0].filter(
      (index) => cells[index] === ""
    )[0];
    return continueIndex;
  }

  //effective cpu first move(difficult level )
  const linesForFirstmove = linesThatAre("X", "", "");
  if (linesForFirstmove.length > 0) {
    let firstIndex = linesForFirstmove[0].filter(
      (index) => cells[index] === ""
    )[0];
    if (cellvalues[4] === "") {
      firstIndex = 4;
    }
    if (cellvalues[4] !== "" && cellvalues[0] === "") {
      firstIndex = 0;
    }
    return firstIndex;
  }
};

// function to calculate winner(returns result,winner,combination number)
export const calculateWinner = (cellvalues, noOfTrunsLeft, cellIndex) => {
  const cells = cellvalues;

  const linesThatAre = (a, b, c) => {
    return WinningLines.filter((cellIndexes) => {
      const newCellValues = cellIndexes.map((index) => cells[index]);

      return (
        JSON.stringify([a, b, c].sort()) ===
        JSON.stringify(newCellValues.sort())
      );
    });
  };

  const PlayerXWon = linesThatAre("X", "X", "X").length > 0;
  const PlayerOWon = linesThatAre("O", "O", "O").length > 0;

  if (PlayerXWon || PlayerOWon) {
    return {
      hasResult: true,
      winner: cellvalues[cellIndex],
      winningCombination: PlayerXWon
        ? linesThatAre("X", "X", "X")[0]
        : linesThatAre("O", "O", "O")[0],
    };
  }
  if (noOfTrunsLeft === 0) {
    return {
      hasResult: true,
      winner: "Tie",
      winningCombination: [],
    };
  }

  return {
    hasResult: false,
    winner: undefined,
    winningCombination: [],
  };

  //older logic
  //const winningRanges = winningMatrix[cellIndex];
  // for (let i = 0; i < winningRanges.length; i++) {
  //   const currentvalue = cellvalues[cellIndex];
  //   const firstOption = cellvalues[winningRanges[i][0]];
  //   const secondOption = cellvalues[winningRanges[i][1]];

  //   // console.log(
  //   //   `currentvalue: ${currentvalue}, firstOption: ${firstOption}, secondOption: ${secondOption} `
  //   // );

  //   if (currentvalue === firstOption && firstOption === secondOption) {
  //     return {
  //       hasResult: true,
  //       winner: currentvalue,
  //       winningCombination: [
  //         cellIndex,
  //         winningRanges[i][0],
  //         winningRanges[i][1],
  //       ],
  //     };
  //   }
  // }

  // if (noOfTrunsLeft === 0) {
  //   return {
  //     hasResult: true,
  //     winner: "Tie",
  //     winningCombination: [],
  //   };
  // }

  // return {
  //   hasResult: false,
  //   winner: undefined,
  //   winningCombination: [],
  // };
};
