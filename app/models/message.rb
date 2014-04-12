class Message < ActiveRecord::Base
  belongs_to :user
  belongs_to :conversation

  has_attached_file :file, {
      :url => "/system/:class/:id_partition/:style/:basename:hash:updated_at.:extension",
      :hash_secret => "93urfoekh390rfhkdjvbsdfoi0eghdfkh03tughrdslkgsh0-3uhgb4egfklsf@#bhsl!#(hlkbhe093h1Ahr093ehgblaq09384"
  }

  validates_attachment_content_type :file, :content_type => [/\Avideo/]
  validates_attachment_file_name :file, :matches => [/mp4\Z/]
end
