type Board = ("Q" | "." | boolean | undefined)[][];

// 8 * 8
const CHESSBOARD_SIZE = 8;

// create the board first
// each position will be undefined first
const generateNewBoard = (size: number): Board => {
  return new Array(size)
    .fill(undefined)
    .map(() => new Array(size).fill(undefined));
};

const printSolution = (board: Board) => {
  for (let rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
    let chessRow = "";

    for (let colIdx = 0; colIdx < CHESSBOARD_SIZE; colIdx++) {
      chessRow += board[rowIdx][colIdx] ? "Q" : ".";
    }

    // print the result here:
    console.log(`chessRow: ${rowIdx}`, chessRow);
  }
};

// helper fn to check if Q can be placed on board[rowIdx][colIdx]
const isSafe = (board: Board, currentRowIdx: number, currentColIdx: number) => {
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
};

// recursively check and place Q in the board
const checkAndPlaceQ = (board: Board, currentColIdx: number) => {
  // base case: if all columns are checked,
  // print the solution and return true
  if (currentColIdx === CHESSBOARD_SIZE) {
    printSolution(board);
    console.log("---");
    return true;
  }

  // stick with a row
  // and try placing Q in columns of the row one by one
  for (let rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
    // check if Q can be placed on board[rowIdx][currentColIdx]
    if (isSafe(board, rowIdx, currentColIdx)) {
      board[rowIdx][currentColIdx] = true;

      // recursively run this fn to place other Qs in next column
      checkAndPlaceQ(board, currentColIdx + 1);

      // if the position cannot lead to final answer, backtrack
      board[rowIdx][currentColIdx] = false;
    }
  }

  // if Q cannot be placed in any row of this column, return false
  return false;
};

const executeThisAlgo = () => {
  const board = generateNewBoard(CHESSBOARD_SIZE);
  const INIT_COLUMN_INDEX = 0;

  checkAndPlaceQ(board, INIT_COLUMN_INDEX);
};

// run `npm run start` to run the file
executeThisAlgo();

/*
Ref:
1. 八皇后回溯算法原理剖析及其JS实现 
https://blog.csdn.net/weixin_45664402/article/details/115278420

2. 8.12 The 8 Queens Problem with Solutions Ruby, Javascript and Python
https://medium.com/cracking-the-coding-interview-in-ruby-python-and/8-12-the-8-queens-problem-with-solutions-ruby-javascript-and-python-409cea33b5b3

3. Finding Multiple Solutions to "8 Queens"
https://stackoverflow.com/questions/36487345/finding-multiple-solutions-to-8-queens
*/
