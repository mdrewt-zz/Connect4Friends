class CreateUsers < ActiveRecord::Migration
  def change
    create table_users do |t|
      t.string :username, :email, :password_digest

      t.timestamps
    end
  end
end
