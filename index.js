var CHESSBOARD_SIZE = 8;
// create the board first
// each position will be undefined first
var board = new Array(CHESSBOARD_SIZE)
    .fill(undefined)
    .map(function () { return new Array(CHESSBOARD_SIZE).fill(undefined); });
// console.log('board: ', board);
function printSolution(board) {
    for (var rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
        var chessRow = "";
        for (var colIdx = 0; colIdx < CHESSBOARD_SIZE; colIdx++) {
            chessRow += board[rowIdx][colIdx] ? "Q" : ".";
        }
        // print the result here:
        console.log("chessRow: ".concat(rowIdx), chessRow);
    }
}
// helper fn to check if Q can be placed on board[rowIdx][colIdx]
function isSafe(board, currentRowIdx, currentColIdx) {
    var colIdx, rowIdx;
    // check col on the left of current position
    for (colIdx = 0; colIdx < currentColIdx; colIdx++) {
        if (board[currentRowIdx][colIdx])
            return false;
    }
    // check col on upper left diagonal of current position
    for (rowIdx = currentRowIdx, colIdx = currentColIdx; rowIdx >= 0 && colIdx >= 0; rowIdx--, colIdx--) {
        if (board[rowIdx][colIdx])
            return false;
    }
    // check col on lower left diagonal of current position
    for (rowIdx = currentRowIdx, colIdx = currentColIdx; rowIdx < CHESSBOARD_SIZE && colIdx >= 0; rowIdx++, colIdx--) {
        // console.log('position: ', rowIdx, colIdx);
        if (board[rowIdx][colIdx])
            return false;
    }
    // all pass, safe to place the Q on this position
    return true;
}
// recursively check and place Q in the board
function checkAndPlaceQ(board, currentColIdx) {
    // base case: if all columns are checked, return true
    if (currentColIdx >= CHESSBOARD_SIZE)
        return true;
    // stick with currentCol
    // and try placing Q in all rows of the column one by one
    for (var rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
        // check if Q can be placed on board[rowIdx][currentColIdx]
        if (isSafe(board, rowIdx, currentColIdx)) {
            board[rowIdx][currentColIdx] = true;
            // recursively run this fn to place other Qs
            if (checkAndPlaceQ(board, currentColIdx + 1))
                return true;
            // if placing Q in board[rowIdx][currentColIdx] doesn't lead to
            // final solution, backtrack
            board[rowIdx][currentColIdx] = false;
        }
    }
    // if Q cannot be placed in any row of this column, return false
    return false;
}
function executeThisAlgo() {
    if (!checkAndPlaceQ(board, 0)) {
        console.log("Solution does not exist");
        return false;
    }
    printSolution(board);
    return true;
}
executeThisAlgo();
