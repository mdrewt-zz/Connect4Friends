enable :sessions

get '/login' do
  erb :"user/index"
end

post '/login' do
  #sign in
  @user = User.find_by(email: params[:email]).try(:authenticate, params[:password])
  if @user
    redirect "/#{@user.id}/secret"
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

end

get '/users/:id/secret' do
  session[:id] = params[:id]
  @user = User.find(params[:id])
  erb :"user/secret"
end





