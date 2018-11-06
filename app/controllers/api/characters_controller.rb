class Api::CharactersController < ApplicationController
    def index
        @characters = Account.find(params[:account_id]).characters.all
        render json: @characters
    end

    def show
        @character = Character.find(params[:id])
        render json: @character
    end

    def create
        @character = Account.find(params[:account_id]).characters.create!(character_params)
        render json: @character
    end

    def update
        @character = Character.find(params[:id])
        @character.update!(character_params)
        render json: @character
    end

    def destroy
        @character = Character.find(params[:id])
        @character.destroy
        render status: 200
    end

    private

    def character_params
        params.require(:character).permit(:name, :class_name, :race, :level, :max_hp, :current_hp, :str, :con, :dex, :cha, :wis, :int, :prof)
    end
    
end
