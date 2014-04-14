class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable

  has_many :user_conversations
  has_many :conversations, :through => :user_conversations
  has_many :messages
  has_many :friendships
end
