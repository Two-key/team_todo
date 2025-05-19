class AddTeamIdToTasks < ActiveRecord::Migration[7.2]
  def change
    #add_column :tasks, :team_id, :bigint, null: false
    change_column :tasks, :team_id, :bigint, null: false

    add_foreign_key :tasks, :teams, column: :team_id
    add_index :tasks, :team_id
  end
end

