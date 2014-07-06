post '/conversation/new' do
	@conversation = Conversation.create
	redirect "/conversation/#{@conversation.url}"
end

get '/conversation/:url' do 
	@conversation = Conversation.find_by_url(params[:url])
	p "HI"*100
	p @conversation
	erb :chat
end

post '/message' do 
	@conversation = Conversation.find_by_url(params[:url])
	@message = Message.create(params[:message])
	@conversation.messages << @message
	erb :chat
end

