module ConversationsHelper
  def media_tag(message, args = {})
    if message.file_content_type =~ /video/
      args[:controls] = true
      video_tag message.file.url, args
    else
      image_tag message.file.url, args
    end
  end
end
