class CreateHpactions < ActiveRecord::Migration[5.2]
  def change
    create_table :hpactions do |t|
      t.integer :diff
      t.string :diff_type
      t.string :source
      t.integer :diff_2
      t.string :diff_2_type
      t.references :encounter, foreign_key: true

      t.timestamps
    end
  end
end
