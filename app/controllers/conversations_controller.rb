class ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations.order('created_at DESC')
  end

  def show
    @conversation = current_user.conversations.find_by_id params.require(:id)
    @messages = @conversation.messages.order('created_at')
  end

  def new
    @message = Message.new

    to = params.permit(:to)[:to]

    if to
      c = current_user.conversations.includes(:users).where('users.number' => to)
      unless c.empty?
        redirect_to conversation_path(c.first)
      end
    end
  end

  def create
    to = params.require(:conversation).require(:to)
    conversations = current_user.conversations.includes(:users).where('users.number' => to)
    if conversations.empty?
      conversation = current_user.conversations.create!
      conversation.users << User.find_by_number(to)
    else
      conversation = conversations.first
    end
    conversation.messages.create file: params.require(:message).require(:file), user: current_user
    conversation.save

    redirect_to conversation_path(conversation)
  end
end
