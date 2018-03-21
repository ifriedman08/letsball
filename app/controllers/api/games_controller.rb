class Api::GamesController < ApplicationController
  def new
    @game = Game.new()
  end

  def create
    @game = Game.new(game_params)
    @game.user_id = current_user.id
    if @game.save
      render json: @game
    else
      render json: @game.errors.full_messages
    end
  end

  def show
    @game = Game.find(params[:id])
    render json: @game
  end

  def index
    if params[:times]
      case params[:times]
      when "day"
        @games = Game.where("time > ? AND time < ?", Time.now, Time.now + 1.day)
      when "week"
        @games = Game.where("time > ? AND time < ?", Time.now, Time.now + 1.week)
      when "month"
        @games = Game.where("time > ? AND time < ?", Time.now, Time.now + 1.month)
      when "year"
        @games = Game.where("time > ? AND time < ?", Time.now, Time.now + 1.year)
      end
    else
      @games = Game.where("time > ?", Time.now)
    end

    if params[:sports]
      @games = @games.select{ |g| params[:sports].include?(g[:sport])}
    end

    if params[:levels]
      @games = @games.select{ |g| params[:levels].include?(g[:level].to_s)}
    end
    # debugger
    render json: @games
  end

  def edit
    @game = Game.find(params[:id])
  end

  def update
    @game = Game.find(params[:id])
    if @game.update(game_params)
      render json: @game
    else
      render json: @game.errors.full_messages
    end
  end

  def destroy
    @game = Game.find(params[:id])
    @game.destroy
    render :index
  end

  def game_params
    params.require(:game).permit(:time, :latitude, :longitude, :sport, :level, :comments, :byob, :show_number, :place_name)
  end
end
