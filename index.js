// 8 * 8
var CHESSBOARD_SIZE = 8;
// create the board first
// each position will be undefined first
var generateNewBoard = function (size) {
    return new Array(CHESSBOARD_SIZE)
        .fill(undefined)
        .map(function () { return new Array(CHESSBOARD_SIZE).fill(undefined); });
};
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
    // Check the ← direction
    for (colIdx = 0; colIdx < currentColIdx; colIdx++) {
        if (board[currentRowIdx][colIdx])
            return false;
    }
    // Check the ↖ direction
    for (rowIdx = currentRowIdx, colIdx = currentColIdx; rowIdx >= 0 && colIdx >= 0; rowIdx--, colIdx--) {
        if (board[rowIdx][colIdx])
            return false;
    }
    // Check the ↙ direction
    for (rowIdx = currentRowIdx, colIdx = currentColIdx; rowIdx < CHESSBOARD_SIZE && colIdx >= 0; rowIdx++, colIdx--) {
        if (board[rowIdx][colIdx])
            return false;
    }
    // all pass, safe to place the Q on this position
    return true;
}
// recursively check and place Q in the board
function checkAndPlaceQ(board, currentColIdx) {
    // base case: if all columns are checked, return true
    if (currentColIdx === CHESSBOARD_SIZE) {
        printSolution(board);
        console.log("---");
        return true;
    }
    // stick with currentCol
    // and try placing Q in all rows of the column one by one
    for (var rowIdx = 0; rowIdx < CHESSBOARD_SIZE; rowIdx++) {
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
    var board = generateNewBoard(CHESSBOARD_SIZE);
    if (!checkAndPlaceQ(board, 0)) {
        console.log("Solution does not exist");
        return false;
    }
    // printSolution(board);
    return true;
}
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
