class CreateSpells < ActiveRecord::Migration[5.2]
  def change
    create_table :spells do |t|
      t.boolean :attack
      t.boolean :prof
      t.string :components
      t.string :casting_time
      t.string :duration
      t.references :character, foreign_key: true
      t.string :name
      t.integer :die_number
      t.integer :die_type
      t.integer :bonus
      t.string :damage_type
      t.string :description
      t.integer :die_number_2
      t.integer :die_type_2
      t.string :damage_type_2
      t.string :skill

      t.timestamps
    end
  end
end
