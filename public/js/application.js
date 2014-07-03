$(document).ready(function() {

  // Connect 4 Board object
  var Column = function() {
    this.max_height = 6;
    this.checkers = [];
  };

  Column.prototype.length = function() {
    return this.checkers.length;
  };

  Column.prototype.full? = function() {
    return this.length >= 6;
  };

  Column.prototype.addpiece = function(piece) {
    this.checkers.push(piece);
  };



  var ConnectBoard = function() {
    this.board = [
      new Column, new Column, new Column, new Column,
      new Column, new Column, new Column
    ];
  };

  ConnectBoard.prototype.addpiece = function(column, piece) {
    this.board[column].addpiece(piece)
  };

  ConnectBoard.prototype.full? = function() {
    return this.board.filter(function(column) { column.full? }).length === 7;
  };
  
});