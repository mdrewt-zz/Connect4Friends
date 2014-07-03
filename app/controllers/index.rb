get '/' do
  @user = Object.new
  @Articles = []
  erb :index
end