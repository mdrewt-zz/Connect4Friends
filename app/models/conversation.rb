
class Conversation < ActiveRecord::Base
  has_many :messages
  before_save :generate_url

  def generate_url
  	unless self.url == "z000"
  		self.url = self.class.last.url.next 
  	end
  	self.url
  end
end
