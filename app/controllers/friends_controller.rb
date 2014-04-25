class FriendsController < ApplicationController
  def index
    @friendships = current_user.friendships.includes :user
    p current_user
    p @friendships
  end

  def new
    @friend = User.new
  end

  def find_new
    p params
    @number = params.require(:friend).require :number
    @friend = User.find_by_number @number

    unless @friend
      redirect_to new_friend_path, alert: "No user found with the phone number #{@number}"
    end
  end

  def add
    id = params.require(:friend_id)
    current_user.friendships.create friend_id: id
    redirect_to friends_path, alert: "#{User.find(id).name} is now your friend"
  end
end
