class Api::GamesController < ApplicationController
  def new
    @game = Game.new()
  end

  def create
    @game = Game.new(game_params)
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
    @games = Game.all
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
    params.require(:game).permit(:time, :latitude, :longitude, :sport, :level, :comments)
  end
end
