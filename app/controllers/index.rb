get '/' do
  @user = Object.new
  @Articles = []
  erb :index
end

get '/connect' do
  erb :connect
end