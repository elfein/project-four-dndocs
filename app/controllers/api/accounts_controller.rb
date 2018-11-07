class Api::AccountsController < ApplicationController
    def index
        @accounts = Account.all.order("name")
        render json: @accounts
    end

    def create
        @account = Account.create!(account_params)
        render json: @account
    end

    def show
        @account = Account.find(params[:id])
        render json: @account
    end

    def update
        @account = Account.find(params[:id])
        @account.update!(account_params)
        render json: @account
    end

    def destroy
        @account = Account.find(params[:id]).delete
        render status: 200
    end

    private

    def account_params
        params.require(:account).permit(:name)
    end
end
