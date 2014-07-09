# Tell the user what he is?
get "/game/:id" do
  @user = User.where(id: session[:user_id]).first
  if Game.where(id: params[:id]).first
    erb :connect
  else
    return 404
  end
end

post '/game/:id/chat' do 
  game = Game.find_by_id(params[:id])
  user = User.find_by_id(session[:user_id])
  message = Message.create(content: params[:new_message])
  game.messages << message
  user.messages << message
  erb :chat
end

post '/game/:id/refresh' do 
  ActiveRecord::Base.include_root_in_json = true
  game = Game.find_by_id(params[:id])
  new_messages = (game.messages.size - params[:num_messages].to_i)
  if new_messages > 0
    return game.messages.last(new_messages).map{|message| {content: message.content, user: message.user.username} }.to_json
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
    games = Game.all.select { |game| game.players.length <= 1 && !(game.users.include? @user) }
    game = games.first || Game.create
    type = "player1" if game.players.length == 0
    type = "player2" if game.players.length == 1

    game.players.create(user_id: session[:user_id], playertype: type)

    redirect "/game/#{game.id}"
  else
    redirect "/"
  end
end