# Controllerul conversatiilor
class ConversationsController < ApplicationController
  # Lista de conversatii
  def index
    @conversations = current_user.conversations.order('created_at DESC')
    respond_to do |format|
      format.html
      format.json { render :json => @conversations }
    end
  end

  # Conversatia intre 2 utilizatori
  # Params:
  # +id+:: ID user
  def show
    @conversation = current_user.conversations.find_by_id params.require(:id)
    @messages = @conversation.messages.order('created_at')
    respond_to do |format|
      format.html
      format.json { render :json => @messages.to_json(include: :user) }
    end
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

  # Crearea de raspuns la conversatie sau creare de conversatie noua
  # Params:
  # +conversation:to+:: Numarul cui primeste mesajul
  # +message:file+:: Fisierul
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
