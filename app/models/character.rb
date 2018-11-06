class Character < ApplicationRecord
  belongs_to :account
  has_many :weapons, dependent: :destroy
  has_many :spells, dependent: :destroy
  has_many :items, dependent: :destroy
  has_many :encounters, dependent: :destroy
end
