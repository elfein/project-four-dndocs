class Api::HpactionsController < ApplicationController
    def index
        @hpactions = Encounter.find(params[:encounter_id]).hpactions.all.order("id DESC")
        render json: @hpactions
    end

    def show
        @hpaction = Hpaction.find(params[:id])
        render json: @hpaction
    end

    def create
        @hpaction = Encounter.find(params[:encounter_id]).hpactions.create!(hpaction_params)
        render json: @hpaction
    end
    
    def update
        @hpaction = Hpaction.find(params[:id])
        @hpaction.update!(hpaction_params)
        render json: @hpaction
    end

    def destroy
        @hpaction = Hpaction.find(params[:id])
        @hpaction.destroy
        render status: 200
    end

    private

    def hpaction_params
        params.require(:hpaction).permit(:diff, :diff_type, :source, :diff_2, :diff_2_type)
    end
end
