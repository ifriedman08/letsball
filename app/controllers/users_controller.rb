class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    if params[:user][:password] != params[:user][:password_confirmation]
      flash.now[:errors] = ['Passwords must match']
      @user = User.new(user_params)
      render :new
    else
      @user = User.new(user_params)

      if @user.save
        sign_in(@user)
        redirect_to '/'
      else
        flash.now[:errors] = @user.errors.full_messages
        render :new
      end
    end
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def user_params
    params.require(:user).permit(:email, :password)
  end
end
