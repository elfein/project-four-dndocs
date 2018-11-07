class Encounter < ApplicationRecord
  belongs_to :character
  has_many :hpactions, dependent: :destroy
end
