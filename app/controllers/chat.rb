post '/game/:id/chat' do 
	game = Game.find(params[:id])
	player = game.players.find_by(user_id: session[:user_id])
 	message = Message.create(content: params[:new_message])
 	game.messages << message
 	player.messages << messages
 	erb :chat
end

post '/conversation/:url/refresh' do 
	ActiveRecord::Base.include_root_in_json = true
	game = Game.where(params[:id]).take
	new_messages = (game.messages.size - params[:num_messages].to_i)
	if new_messages > 0
		return game.messages.last(new_messages).to_json
	end
end