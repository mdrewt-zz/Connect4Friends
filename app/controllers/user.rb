enable :sessions

get '/login' do
  @user = User.where(id: session[:user_id]).first
  erb :"user/index"
end

post '/login' do
  #sign in
  @user = User.find_by(email: params[:email]).try(:authenticate, params[:password])
  if @user
    session[:user_id] = @user.id
    redirect "/"
  else
    @invalid_login = true
    erb :"user/index"
  end
end

get '/join' do
  @user = User.where(id: session[:user_id]).first
  erb :"user/join"
end

post '/join' do
  @new_user = User.create(params[:user])
  redirect '/login'
end

get '/logout' do
  session.clear
  redirect "/"
end

get '/users/:id' do
  @user = User.where(id: session[:user_id]).first
  if @user
    erb :connect
  else
    redirect "/"
  end
end





