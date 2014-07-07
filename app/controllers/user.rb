enable :sessions

get '/login' do
  erb :"user/index"
end

post '/login' do
  #sign in
  @user = User.find_by(email: params[:email]).try(:authenticate, params[:password])
  if @user
    session[:user_id] = @user.id
    redirect "/users/#{@user.id}"
  else
    @invalid_login = true
    erb :"user/index"
  end
end

get '/join' do
  erb :"user/join"
end

post '/join' do
  @new_user = User.create(params[:user])
  redirect '/login'
end

get '/signout' do
  session.clear

end

get '/users/:id' do
  @user = User.find(params[:id])
  erb :connect
end





