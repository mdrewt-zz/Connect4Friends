$(document).ready(function() {

  var over = false;
  var last_turn = "";

  var board = [
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
    ["","","","","",""],
  ]

  player = {};
  var getPlayer = function() {
    $.ajax({
      url: window.location.pathname + "/usertype",
      type: "post",
      dataType: "json",
      success: function(data) { player = data; }
    });
  }
  getPlayer();

    function refresh() {
    $('#conversation').scrollTop($('#conversation').prop("scrollHeight"));
    var num_messages = $('div.message').length;
    $.ajax({
      type: "POST",
      dataType: "json",
      data: { num_messages : num_messages },
      url: window.location.pathname + "/refresh", 
      success: function(data) {
        for (i = 0; i < data.length; i++) {
          $('#conversation').append("<div class='message'>" + data[i].user + ": " + data[i].content + "</div><br>");
        }       
      },
      complete: function() {
        setTimeout(refresh, 200);
      }
    });
  };
  refresh();

  $('#new_message').on("submit", function(e) {
    e.preventDefault();
    console.log("Hi i'm being run");
    var new_message = $('#new_message :input').val();
    $('#new_message')[0].reset();
    $('#conversation').append("<div class='message'>" + player.user + ": " + new_message + "</div><br>");
    $.ajax({
      url: window.location.pathname + "/chat",
      type: "POST",
      dataType: "string",
      data: { new_message : new_message },
      success: function(data) {
      }
    });
    e.stopPropagation();
    return false;
  });

  function diagonalUp(last_move, count) {
    if (board[last_move.column + 1][last_move.row + 1] == last_move.player) {
      count++;
      if (board[last_move.column + 2][last_move.row + 2] == last_move.player) {
        count++;
        if (board[last_move.column + 3][last_move.row + 3] == last_move.player) {
          count++;
        }
      }
    }
    if (board[last_move.column - 1][last_move.row - 1] == last_move.player) {
      count++;
      if (board[last_move.column - 2][last_move.row - 2] == last_move.player) {
        count++;
        if (board[last_move.column - 3][last_move.row - 3] == last_move.player) {
          count++;
        }
      }
    }
    if (count >= 4) { return true }
  }

  function diagonaldown(last_move, count) {
    if (board[last_move.column - 1][last_move.row + 1] == last_move.player) {
      count++;
      if (board[last_move.column - 2][last_move.row + 2] == last_move.player) {
        count++;
        if (board[last_move.column - 3][last_move.row + 3] == last_move.player) {
          count++;
        }
      }
    }
    if (board[last_move.column + 1][last_move.row - 1] == last_move.player) {
      count++;
      if (board[last_move.column + 2][last_move.row - 2] == last_move.player) {
        count++;
        if (board[last_move.column + 3][last_move.row - 3] == last_move.player) {
          count++;
        }
      }
    }
    if (count >= 4) { return true }
  }

  function horizontal(last_move, count) {
    if (board[last_move.column - 1][last_move.row] == last_move.player) {
      count++;
      if (board[last_move.column - 2][last_move.row] == last_move.player) {
        count++;
        if (board[last_move.column - 3][last_move.row] == last_move.player) {
          count++;
        }
      }
    }
    if (board[last_move.column + 1][last_move.row] == last_move.player) {
      count++;
      if (board[last_move.column + 2][last_move.row] == last_move.player) {
        count++;
        if (board[last_move.column + 3][last_move.row] == last_move.player) {
          count++;
        }
      }
    }
    if (count >= 4) { return true }
  }

  function vertical(last_move, count) {
    if (board[last_move.column][last_move.row + 1] == last_move.player) {
      count++;
      if (board[last_move.column][last_move.row + 2] == last_move.player) {
        count++;
        if (board[last_move.column][last_move.row + 3] == last_move.player) {
          count++;
        }
      }
    }
    if (board[last_move.column][last_move.row - 1] == last_move.player) {
      count++;
      if (board[last_move.column][last_move.row - 2] == last_move.player) {
        count++;
        if (board[last_move.column][last_move.row - 3] == last_move.player) {
          count++;
        }
      }
    }
    if (count >= 4) { return true }
  }

  function finished(last_move) {
    if (typeof last_move != "undefined") {
      if (diagonalUp(last_move, 1) || diagonaldown(last_move, 1) || horizontal(last_move, 1) || vertical(last_move, 1)) {
        over = true;
      }
    }
  }

  function updateBoard(moves) {
    for (var i = 0; i < moves.length; i++) {
      board[moves[i].column][moves[i].row] = moves[i].player
      if (moves[i].player == "player1") {
        var color = "red";
      } else if (moves[i].player == "player2") {
        var color = "black";
      };
      $("#" + moves[i].column + "-" + moves[i].row).css("background-color", color);
    };
    if (moves.length >= 1) { last_turn = moves[moves.length - 1].player }
  };

  function getBoard() {
    $.ajax({
      url: window.location.pathname + "/board",
      dataType: "json",
      success: function(data) {
        var moves = data;
        updateBoard(moves);
        if(moves.length > 6) { finished(moves[moves.length - 1]) }
      }
    });
  };

  setInterval(getBoard, 400);

  $(".column").click(function(e) {
    e.preventDefault();
    if (!over) {
      if (last_turn != player.type) {
        var column = parseInt($(this).attr("id"));
        var row = board[column].indexOf("")
        $.ajax({
          url: window.location.pathname + "/move",
          type: "post",
          dataType: "string",
          data: { row: row, column: column, user: player.user }
        });
      } else {
        alert("It's not your turn.");
      };
    } else {
      alert("The Game is Over");
    }
  });

  getBoard();


  
});