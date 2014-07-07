class Move < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :player
  belongs_to :game

  def playertype
    self.player.playertype
  end
end
