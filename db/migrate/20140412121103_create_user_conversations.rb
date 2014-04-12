class CreateUserConversations < ActiveRecord::Migration
  def change
    create_table :user_conversations do |t|
      t.integer :conversation_id
      t.integer :user_id
      t.boolean :read

      t.timestamps
    end
  end
end
