class ChangeActionTableName < ActiveRecord::Migration[5.2]
  def change
    rename_table :actions, :hp_actions
  end
end
