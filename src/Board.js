// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var row = this.get(rowIndex);
      var count = 0;
      for(var i =0; i < row.length; i++){
        count += row[i];
        if(count > 1){
          return true;
        }
      } 
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var rows = this.rows();
      var context = this;
      var result = false;
      rows.forEach(function(row, i){
        if(context.hasRowConflictAt(i)){
          result = true;
        }
      });
      return result;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // Create an array that is column
      var column = [];
      var count = 0;
      // Iterate over each row and push row[colIndex] into column array
      this.rows().forEach(function(row){
        column.push(row[colIndex]);
      });
      // Iterate over column and determine if the contents add up to more than 1
      for(var i = 0; i < column.length; i++){
        count += column[i];
        if(count > 1){
          return true;
        }
      } 
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var columnLength = this.rows().length;
      var columnResults = [];
      //Iterate over columns using for loop over col length
      for(var i = 0; i < columnLength; i++){
        //call hasConfAt(i).push to colResults
        columnResults.push(this.hasColConflictAt(i));
      }
      return columnResults.reduce(function(prev, current){
        return (prev || current);
      }, false);
    },


    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // Build vars dependent on positive or neg input
      var rowIndex = 0;
      var columnIndex = 0;
      // if index is neg columnIndex = -index
      if(majorDiagonalColumnIndexAtFirstRow < 0) {
        rowIndex = -majorDiagonalColumnIndexAtFirstRow;
        //columnIndex = -majorDiagonalColumnIndexAtFirstRow;
      } else {
        //rowIndex = majorDiagonalColumnIndexAtFirstRow;
        columnIndex = majorDiagonalColumnIndexAtFirstRow;
      }

      var rowLength = this.get(0).length;
      var axisValues = 0;
      var boardMatrix = this.rows();

      for(var i = rowIndex; i < rowLength; i++){
        if(boardMatrix[i][columnIndex] === undefined) {
          break;
        }
        axisValues += boardMatrix[i][columnIndex];
        // console.log(axisValues, 'colInd: ' + columnIndex, 'rowInd: ' + i);
        columnIndex++;
      }

      return axisValues > 1 ? true : false;
    },


    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var rowLength = this.get('n');
      var result = false;
      for(var i = -rowLength + 1; i < rowLength; i++){
        result = result || this.hasMajorDiagonalConflictAt(i);
      }
      return result;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var rowIndex = 0;
      var columnIndex = 0;
      var rowLength = this.get(0).length;

      // if input < rowLength -1
       if(minorDiagonalColumnIndexAtFirstRow < (rowLength - 1)) {
        rowIndex = minorDiagonalColumnIndexAtFirstRow;
        rowColumn = 0;
       } else {
        rowIndex = rowLength - 1;
        columnIndex = minorDiagonalColumnIndexAtFirstRow - (rowLength - 1);
       }

      var axisValues = 0;
      var boardMatrix = this.rows();

      // for loop: set i = rowIndex while i >= 0 decrement i
      for (var i = rowIndex; i >= 0; i--) {
        if(boardMatrix[i][columnIndex] === undefined) {
          break;
        }
        axisValues += boardMatrix[i][columnIndex];
        // console.log(axisValues, 'colInd: ' + columnIndex, 'rowInd: ' + i);
        columnIndex++;
      }
      return axisValues > 1 ? true : false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var rowLength = this.get('n');
      var result = false;
      for(var i = 0; i < (rowLength * 2); i++){
        result = result || this.hasMinorDiagonalConflictAt(i);
      }
      return result;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
