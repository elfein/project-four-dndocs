class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :class
      t.string :race
      t.integer :level
      t.integer :max_hp
      t.integer :current_hp
      t.integer :str
      t.integer :con
      t.integer :dex
      t.integer :cha
      t.integer :wis
      t.integer :int
      t.integer :prof
      t.references :account, foreign_key: true

      t.timestamps
    end
  end
end
