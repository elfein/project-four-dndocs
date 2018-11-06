Rails.application.routes.draw do
  namespace :api do
    resources :accounts do
      resources :characters do
        resources :weapons
        resources :spells
        resources :items
        resources :encounters do
          resources :actions
        end
      end
    end
  end
end
