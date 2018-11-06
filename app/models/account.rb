class Account < ApplicationRecord
    has_many :characters, dependent: :destroy
end
