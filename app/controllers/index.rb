get '/' do
  @user = Object.new
  @Articles = []
  erb :index
end

get '/news' do
  @user = Object.new
  @Articles = []
  erb :index
end