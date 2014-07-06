require 'bcrypt'

class User < ActiveRecord::Base
  has_secure_password
  has_many :conversations
  has_many :messages
  has_many :players
  has_many :games, through: :players
end
