class Encounter < ApplicationRecord
  belongs_to :character
  has_many :hp_actions, dependent: :destroy
end
