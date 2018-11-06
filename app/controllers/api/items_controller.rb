class Api::ItemsController < ApplicationController
    def index
        @items = Character.find(params[:character_id]).items.all
        render json: @items
    end

    def show
        @item = Item.find(params[:id])
        render json: @item
    end

    def create
        @item = Character.find(params[:character_id]).items.create!(item_params)
        render json: @item
    end
    
    def update
        @item = Item.find(params[:id])
        @item.update!(item_params)
        render json: @item
    end

    def destroy
        @item = Item.find(params[:id])
        @item.destroy
        render status: 200
    end

    private

    def item_params
        params.require(:item).permit(:name, :description)
    end
end
