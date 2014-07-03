class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :articles
  has_many :comments
end
