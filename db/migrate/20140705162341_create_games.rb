class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :player1_id, :player2_id
      t.integer :turns

      t.timestamps
    end
  end
end
