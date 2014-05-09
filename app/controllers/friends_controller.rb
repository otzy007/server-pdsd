class FriendsController < ApplicationController
  def index
    @friendships = current_user.friendships.includes :user
    p current_user
    p @friendships

    respond_to do |format|
      format.html
      format.json { render :json => @friendships.to_json(include: :friend) }
    end
  end

  def new
    @friend = User.new
  end

  def find_new
    p params
    @number = params.require(:friend).require :number
    @friend = User.find_by_number @number

    unless @friend
      respond_to do |format|
        format.html { redirect_to new_friend_path, alert: "No user found with the phone number #{@number}" }
        format.json { render :json => { errors: ["No user found with the phone number #{@number}"]}, status: :bad_request }
      end
    end

    respond_to do |format|
      format.html
      format.json { render :json => @friend }
    end
  end

  def add
    id = params.require(:friend_id)
    current_user.friendships.create friend_id: id

    respond_to do |format|
      format.html { redirect_to friends_path, alert: "#{User.find(id).name} is now your friend" }
      format.json { render :json => {success: 'OK'} }
    end
  end
end
