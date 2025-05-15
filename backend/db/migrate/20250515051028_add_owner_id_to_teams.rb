class AddOwnerIdToTeams < ActiveRecord::Migration[7.2]
  def change
    add_column :teams, :owner_id, :bigint
    add_foreign_key :teams, :users, column: :owner_id
  end
end
