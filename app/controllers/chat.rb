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

