class FriendsController < ApplicationController
  def index
    @friendships = current_user.friendships.includes :user
    p current_user
    p @friendships
  end
end
