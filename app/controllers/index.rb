get '/' do
  @user = User.where(id: session[:user_id]).first
  session.clear unless @user
  erb :index
end
