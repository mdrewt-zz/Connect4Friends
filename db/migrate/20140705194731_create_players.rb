class CreatePlayers < ActiveRecord::Migration
  def change
  	create_table :players do |t|
  		t.belongs_to :game
  		t.belongs_to :user
  		t.boolean :win

  		t.timestamps
  	end
  end
end
