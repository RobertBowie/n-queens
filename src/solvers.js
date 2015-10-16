/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findSolution = function(row, n, board, validator, callback) {
  // if row === n return out of current loop;
  if(row === n) {
    return callback();
  }


  // iterate over possible piece placements
  for(var i = 0; i < n; i++) {
    // place a piece
    board.togglePiece(row, i);
    // only recurse to correct solutions
    if( !board[validator]() ) {
      // recurse to remaining row(s)
      var result = findSolution(row + 1, n, board, validator, callback);
      if( result ) {
        return result;
      }
    }
    // unplace piece
    board.togglePiece(row,i);
  }
};






window.findNRooksSolution = function(n) {
  // create a board with n number of rooks
  var solution = new Board({n: n});
  for(var i = 0; i < n; i++) {
    // place all rooks on diagonal line [i][i]
    solution.togglePiece(i, i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  // create an nxn board
  var board = new Board({n: n});

  // create and name a recursive inner function (board builder)

  findSolution(0, n, board, 'hasAnyRooksConflicts', function(){
    solutionCount++;
  });

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return correct solutions count
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});

  // Call findSolution
  var solution = findSolution(0, n, board, 'hasAnyQueensConflicts', function(){
    // set solution to be a correct board
    return _.map(board.rows(), function(row) {
      return row.slice();
    });
  }) || board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  // create an nxn board
  var board = new Board({n: n});

  // create and name a recursive inner function (board builder)

  findSolution(0, n, board, 'hasAnyQueensConflicts', function(){
    solutionCount++;
  });


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
