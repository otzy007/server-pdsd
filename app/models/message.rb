class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation

  has_attached_file :file, {
      url: 'server-pdsd',
      path: '/:class/:attachment/:id_partition/:style/:filename',
      s3_host_name: 's3-eu-west-1.amazonaws.com'
      # :storage => :dropbox,
      # :dropbox_credentials => Rails.root.join("config/dropbox.yml")
      # :url => "/system/:class/:id_partition/:style/:basename:hash:updated_at.:extension",
      # :hash_secret => "93urfoekh390rfhkdjvbsdfoi0eghdfkh03tughrdslkgsh0-3uhgb4egfklsf@#bhsl!#(hlkbhe093h1Ahr093ehgblaq09384"
  }

  validates_attachment_content_type :file, :content_type => [/\Avideo/, /\Aimage/]
  validates_attachment_file_name :file, :matches => [/mp4\Z/, /jpg\Z/, /png\Z/, /jpeg\Z/]

  def file_url
    self.file.url
  end
end
