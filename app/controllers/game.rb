# Tell the user what he is?
post "game/:id/usertype" do
  game = Game.find(params[:id])
  # first or create, and find out number of players so far?
  playercount = Players.where("user_id = ?", params[:id]).length
  case
  when playercount == 0
    playertype == "player1"
  when playercount == 1
    playertype == "player2"
  when playercount >= 2
    playertype == "watcher"
  end

  player = Players.where("user_id = ? AND game_id = ?", session[:user_id], params[:game_id]).first_or_create(user_id: session[:user_id], game_id: params[:id], type: playertype)

  return { user: player.username, type: player.type }.to_json
end

# Get the current board from the server
get "game/:id/board" do
  game = Game.find(params[:id])
  
  board = Array.new(7) { Array.new(6) { " " } }
  game.moves.each do |move|
    board[move.column][move.row] = move.player.playertype
  end

  return board.to_json
end

# send move to server
post "game/:id/move" do
  data = params[:data]
  move.create(game_id: params[:id], user_id: data[:user], row: data[:row], column[:column])
end