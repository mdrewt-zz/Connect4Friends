class Player < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :user
  belongs_to :game

  def username
    self.user.username
  end
end
