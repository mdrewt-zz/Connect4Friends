post '/conversation/new' do
	@conversation = Conversation.create
	redirect "/conversation/#{@conversation.url}"
end

get '/conversation/:url' do 
	@conversation = Conversation.find_by_url(params[:url])
	erb :chat
end

post '/conversation/:url' do 
	@conversation = Conversation.where(url: params["url"]).take
	@message = Message.create(params[:message])
	@conversation.messages << @message
	redirect "/conversation/#{@conversation.url}"
end

post '/conversation/:url/refresh' do 
	ActiveRecord::Base.include_root_in_json = true
	@conversation = Conversation.where(url: params["url"]).take
	new_messages = (@conversation.messages.size - params[:num_messages].to_i)
	return @conversation.messages.last(new_messages).to_json if new_messages > 0
end