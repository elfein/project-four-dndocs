class Api::HpActionsController < ApplicationController
    def index
        @hp_actions = Encounter.find(params[:encounter_id]).hp_actions.all
        render json: @hp_actions
    end

    def show
        @hp_action = HpAction.find(params[:id])
        render json: @hp_action
    end

    def create
        @hp_action = Encounter.find(params[:encounter_id]).hp_actions.create!(hp_action_params)
        render json: @hp_action
    end
    
    def update
        @hp_action = HpAction.find(params[:id])
        @hp_action.update!(hp_action_params)
        render json: @hp_action
    end

    def destroy
        @hp_action = HpAction.find(params[:id])
        @hp_action.destroy
        render status: 200
    end

    private

    def hp_action_params
        params.require(:hp_action).permit(:diff, :diff_type, :source, :diff_2, :diff_2_type)
    end
end
