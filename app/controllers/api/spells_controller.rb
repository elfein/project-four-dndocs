class Api::SpellsController < ApplicationController
    def index
        @spells = Character.find(params[:character_id]).spells.all
        render json: @spells
    end

    def show
        @spell = Spell.find(params[:id])
        render json: @spell
    end

    def create
        @spell = Character.find(params[:character_id]).spells.create!(spell_params)
        render json: @spell
    end
    
    def update
        @spell = Spell.find(params[:id])
        @spell.update!(spell_params)
        render json: @spell
    end

    def destroy
        @spell = Spell.find(params[:id])
        @spell.destroy
        render status: 200
    end

    private

    def spell_params
        params.require(:spell).permit(:name, :die_number, :die_type, :damage_type, :description, :skill, :prof, :bonus, :attack, :components, :casting_time, :duration, :die_number_2, :die_type_2, :damage_type_2)
    end
end
