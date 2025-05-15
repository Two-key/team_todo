class CreateMembers < ActiveRecord::Migration[7.2]
  def change
    create_table :members do |t|
      #t.integer :team_id, null: false
      #t.integer :user_id, null: false
      #t.integer :role, null: false, default: 0
      
      t.timestamps
    end
    
    #add_foreign_key :members, :teams
    #add_foreign_key :members, :users
    #add_index :members, [:team_id, :user_id], unique: true
    #end
  end
end
