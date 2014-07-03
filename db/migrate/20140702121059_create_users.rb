class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, :email
      t.integer :karma, :delay
      t.text :about
      t.boolean :dead

      t.timestamps
    end
  end
end
