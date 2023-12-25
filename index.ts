type Board = ("Q" | "." | boolean | undefined)[][];

// 8 * 8
const CHESSBOARD_SIZE = 4;

// create the board first
// each position will be undefined first
const generateNewBoard = (size: number): Board => {
  return new Array(CHESSBOARD_SIZE)
    .fill(undefined)
    .map(() => new Array(CHESSBOARD_SIZE).fill(undefined));
};

function printSolution(board: Board) {
  for (let rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
    let chessRow = "";

    for (let colIdx = 0; colIdx < CHESSBOARD_SIZE; colIdx++) {
      chessRow += board[rowIdx][colIdx] ? "Q" : ".";
    }

    // print the result here:
    console.log(`chessRow: ${rowIdx}`, chessRow);
  }
}

// helper fn to check if Q can be placed on board[rowIdx][colIdx]
function isSafe(board: Board, currentRowIdx: number, currentColIdx: number) {
  let colIdx: number, rowIdx: number;

  // Check the ← direction
  for (colIdx = 0; colIdx < currentColIdx; colIdx++) {
    if (board[currentRowIdx][colIdx]) return false;
  }

  // Check the ↖ direction
  for (
    rowIdx = currentRowIdx, colIdx = currentColIdx;
    rowIdx >= 0 && colIdx >= 0;
    rowIdx--, colIdx--
  ) {
    if (board[rowIdx][colIdx]) return false;
  }

  // Check the ↙ direction
  for (
    rowIdx = currentRowIdx, colIdx = currentColIdx;
    rowIdx < CHESSBOARD_SIZE && colIdx >= 0;
    rowIdx++, colIdx--
  ) {
    if (board[rowIdx][colIdx]) return false;
  }

  // all pass, safe to place the Q on this position
  return true;
}

// recursively check and place Q in the board
function checkAndPlaceQ(board: Board, currentColIdx: number) {
  // base case: if all columns are checked, return true
  if (currentColIdx === CHESSBOARD_SIZE) {
    printSolution(board);
    console.log("---");
    return true;
  }

  // stick with currentCol
  // and try placing Q in all rows of the column one by one
  for (let rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
    // check if Q can be placed on board[rowIdx][currentColIdx]
    if (isSafe(board, rowIdx, currentColIdx)) {
      board[rowIdx][currentColIdx] = true;

      // recursively run this fn to place other Qs
      checkAndPlaceQ(board, currentColIdx + 1);

      // if placing Q in board[rowIdx][currentColIdx] doesn't lead to
      // final solution, backtrack
      board[rowIdx][currentColIdx] = false;
    }
  }

  // if Q cannot be placed in any row of this column, return false
  return false;
}

function executeThisAlgo() {
  const board = generateNewBoard(CHESSBOARD_SIZE);

  if (!checkAndPlaceQ(board, 0)) {
    console.log("Solution does not exist");
    return false;
  }

  // printSolution(board);
  return true;
}

// run `npm run start` to run the file
executeThisAlgo();
