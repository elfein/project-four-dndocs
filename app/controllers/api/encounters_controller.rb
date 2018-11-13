class Api::EncountersController < ApplicationController
    def index
        @encounters = Character.find(params[:character_id]).encounters.all.order("id DESC")
        render json: @encounters
    end

    def show
        @encounter = Encounter.find(params[:id])
        render json: @encounter
    end

    def create
        @encounter = Character.find(params[:character_id]).encounters.create!(encounter_params)
        render json: @encounter
    end
    
    def update
        @encounter = Encounter.find(params[:id])
        @encounter.update!(encounter_params)
        render json: @encounter
    end

    def destroy
        @encounter = Encounter.find(params[:id])
        @encounter.destroy
        render status: 200
    end

    private

    def encounter_params
        params.require(:encounter).permit(:encounter_type)
    end
end
