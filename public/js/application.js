$(document).ready(function() {

  // Connect 4 Board components
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


  // Connect 4 Board object
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



  // Connect 4 Board controller
  var Controller = function() {
    this.turn = "player1";
  };

  Controller.prototype.toggleTurn = function() {
    this.turn = ((this.turn === "player1") ? "player2" : "player1");
  };

  Controller.prototype.winner? = function(board, column) {
    // Check if last move connected four
  };

  Controller.prototype.getBoard = {
    $.ajax({
      url: "",
      success: this.updateBoard(board)
    });
  };

  Controller.prototype.updateBoard = function(board) {

  };

  setInterval(Controller.getBoard(), 500);



  // Chronological order of events
  var player = $.ajax({
    url: "/game/" + game.id + "/playertype",
    dataType: JSON,
    success: function(data) { return data }
  });
  
});



