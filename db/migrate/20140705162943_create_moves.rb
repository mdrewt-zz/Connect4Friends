class CreateMoves < ActiveRecord::Migration
  def change
    create_table :moves do |t|
      t.belongs_to :game, :user
      t.integer :turn, :row, :column

      t.timestamps
    end
  end
end
