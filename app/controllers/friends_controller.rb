class FriendsController < ApplicationController
  # Lista de prieteni
  def index
    @friendships = current_user.friendships.joins(:friend).order('users.name COLLATE NOCASE ASC')
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

  # Cautarea unui nou prieten
  # Params:
  # +friend:number+:: numarul cautat
  def find_new
    p params
    @number = params.require(:friend).require :number
    @friend = User.find_by_number @number

    if @friend && current_user.friendships.find_by_friend_id(@friend.id)
      redirect_to new_friend_path, notice: "You and #{@friend.name} are already friends."
      return
    end

    unless @friend
      redirect_to new_friend_path, alert: "No user found with the phone number #{@number}"
      return
    end

    respond_to do |format|
      format.html
      format.json { render :json => @friend }
    end
  end

  # Adauga noul prieten
  # Params:
  # +friend_id+: idul primit de la find_new
  def add
    id = params.require(:friend_id)
    current_user.friendships.create friend_id: id

    respond_to do |format|
      format.html { redirect_to friends_path, alert: "#{User.find(id).name} is now your friend" }
      format.json { render :json => {success: 'OK'} }
    end
  end

  def destroy
    current_user.friendships.find_by_id(params.require(:id)).destroy
    redirect_to :friends
  end
end
