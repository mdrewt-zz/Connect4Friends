class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.references :users, :articles
      t.text :body
      t.integer :points

      t.timestamps
    end
  end
end
