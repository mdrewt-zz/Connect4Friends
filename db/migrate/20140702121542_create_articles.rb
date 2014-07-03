class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.references :users
      t.string :title, :url
      t.integer :points
      t.text :body

      t.timestamps
    end
  end
end
