module ConversationsHelper
  def media_tag(message, args = {})
    if message.file_content_type =~ /video/ || message.file_file_name =~ /.mp4$/
      args[:controls] = true
      video_tag message.file.url, args
    else
      image_tag message.file.url, args
    end
  end

  def friend_name(c)
    c.users.select { |u| u if u.number != current_user.number }.first.name
  end
end
