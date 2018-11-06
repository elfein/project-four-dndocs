class CreateWeapons < ActiveRecord::Migration[5.2]
  def change
    create_table :weapons do |t|
      t.references :character, foreign_key: true
      t.string :name
      t.integer :die_number
      t.integer :die_type
      t.integer :bonus
      t.string :damage_type
      t.string :description
      t.string :skill
      t.boolean :prof

      t.timestamps
    end
  end
end
