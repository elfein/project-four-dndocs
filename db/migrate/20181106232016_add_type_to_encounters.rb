class AddTypeToEncounters < ActiveRecord::Migration[5.2]
  def change
    add_column :encounters, :type, :string
  end
end
