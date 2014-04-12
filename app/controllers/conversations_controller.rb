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
    conversation = current_user.conversations.create
    conversation.users << User.find_by_number(params.require(:conversation).require(:to))
    conversation.messages.create file: params.require(:message).require(:file)
    conversation.save

    redirect_to conversation_path(conversation)
  end
end
