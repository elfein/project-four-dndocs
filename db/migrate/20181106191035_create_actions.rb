class CreateActions < ActiveRecord::Migration[5.2]
  def change
    create_table :actions do |t|
      t.references :encounter, foreign_key: true
      t.integer :diff
      t.string :diff_type
      t.string :source
      t.integer :diff_2
      t.string :diff_2_type

      t.timestamps
    end
  end
end
