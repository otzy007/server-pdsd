class UserConversation < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation
  has_many :messages, :through => :conversation
end
