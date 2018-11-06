class Encounter < ApplicationRecord
  belongs_to :character
  has_many :actions, dependent: :destroy
end
