Rails.application.routes.draw do
  namespace :api do
    resources :accounts, shallow: true do
      resources :characters
    end
    resources :characters, shallow: true do
      resources :weapons
      resources :spells
      resources :items
      resources :encounters
    end
    resources :encounters, shallow: true do
      resources :hpactions
    end
  end
end
