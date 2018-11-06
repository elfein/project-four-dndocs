class ChangeTypeColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :encounters, :type, :encounter_type
  end
end
