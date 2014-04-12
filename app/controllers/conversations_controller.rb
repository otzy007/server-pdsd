class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations
  end

  def show
    @conversation = current_user.conversations.find_by_id params.require(:id)
    @messages = @conversation.messages.order('created_at DESC')
  end

  def new
    @message = Message.new
  end

  def create
    to = params.require(:conversation).require(:to)
    conversations = current_user.conversations.includes(:users).where('users.number' => to)
    if conversations.empty?
      conversation = current_user.conversations.create!
      conversation.users << User.find_by_number(to)
      conversation.messages.create file: params.require(:message).require(:file)
    else
      conversation = conversations.first
      conversation.messages.create file: params.require(:message).require(:file)
    end
    conversation.save

    redirect_to conversation_path(conversation)
  end
end
