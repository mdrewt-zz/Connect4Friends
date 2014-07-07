class Game < ActiveRecord::Base
  # Remember to create a migration!
  has_many :players
  has_many :users, through: :players
  has_many :moves
  has_many :messages

  def turns
    self.moves.length
  end
end