class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
  end

  def show
  end

  def new
  end
end
