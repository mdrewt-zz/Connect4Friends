# Tell the user what he is?
get "/game/:id" do
  @user = User.where(id: session[:user_id]).first
  if Game.where(id: params[:id]).first
    erb :connect
  else
    return 404
  end
end

post "/game/:id/usertype" do
  game = Game.find(params[:id])
  player = game.players.select {|player| player.user_id == session[:user_id] }.first 

  return { user: player.username, type: player.playertype }.to_json
end

# Get the current board from the server
get "/game/:id/board" do
  game = Game.find(params[:id])
  
  moves = game.moves.map{ |move| {row: move.row, column: move.column, player: move.playertype} }
  return moves.to_json
end

post "/game/:id/move" do
  game = Game.find(params[:id])
  player = game.players.find_by(user_id: session[:user_id])
  turn = game.turns + 1 # try doing in before_create callback in model
  game.moves.create(player_id: player.id, turn: turn, row: params[:row], column: params[:column])
end

get "/games/find" do
  @user = User.where(id: session[:user_id]).first
  if @user
    games = Game.all.select { |game| game.players.length <= 1 && !(game.users.include? User.find(session[:user_id])) }
    game = games.first || Game.create
    type = "player1" if game.players.length == 0
    type = "player2" if game.players.length == 1

    game.players.create(user_id: session[:user_id], playertype: type)

    redirect "/game/#{game.id}"
  else
    redirect "/"
  end
end