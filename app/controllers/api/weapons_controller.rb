class Api::WeaponsController < ApplicationController
    def index
        @weapons = Character.find(params[:character_id]).weapons.all
        render json: @weapons
    end

    def show
        @weapon = Weapon.find(params[:id])
        render json: @weapon
    end

    def create
        @weapon = Character.find(params[:character_id]).weapons.create!(weapon_params)
        render json: @weapon
    end
    
    def update
        @weapon = Weapon.find(params[:id])
        @weapon.update!(weapon_params)
        render json: @weapon
    end

    def destroy
        @weapon = Weapon.find(params[:id])
        @weapon.destroy
        render status: 200
    end

    private

    def weapon_params
        params.require(:weapon).permit(:name, :die_number, :die_type, :damage_type, :description, :skill, :prof, :bonus)
    end
end
