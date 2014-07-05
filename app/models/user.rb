class User < ActiveRecord::Base
  # Remember to create a migration!
  has_many :players
  has_many :games through :players
end
