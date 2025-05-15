class CreateTasks < ActiveRecord::Migration[7.2]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :body, null: false
      #t.integer :status, null: false, default: 0
      #t.integer :team_id, null: false
      #t.integer :assignee_id

      t.timestamps
    end

    #add_foreign_key :tasks, :teams, column: :team_id
    #add_foreign_key :tasks, :users, column: :assignee_id
    #add_index :tasks :assignee_id
  end
end
